import { PdfGenerationException } from '@app/admin/administrator/model/domain/errors/pdf-generation.exception';
import {
  UserPdfGeneratorPort,
  UserReportPdfCommand,
} from '@app/admin/administrator/model/domain/ports/output/user-pdf-generator.port';
import { Either, left, right } from '@app/ddd/either';
import { colors } from '@frontend/design-tokens/colors';
import { Injectable } from '@nestjs/common';
import { join } from 'node:path';
import type { Readable } from 'node:stream';
import PDFDocument from 'pdfkit';
import { Role } from '../../domain/enums/role';

type PDFDoc = typeof PDFDocument extends new (...args: any[]) => infer R ? R : never;

/**
 * Generador de PDF para reportes de usuario usando PDFKit
 *
 * Implementación del puerto UserPdfGeneratorPort que utiliza la librería
 * PDFKit para crear documentos PDF con el diseño del reporte.
 *
 * Sigue arquitectura hexagonal y es inyectable en el contenedor de NestJS.
 */
@Injectable()
export class PdfKitUserReportGenerator implements UserPdfGeneratorPort {
  private readonly logoPath: string;

  constructor() {
    // Ruta al logo desde la carpeta de design tokens (funciona tanto en runtime como en tests)
    this.logoPath = join(process.cwd(), 'libs/design-tokens/src/icons/solidarian-128x128.png');
  }

  /**
   * Genera un PDF del reporte de usuario
   *
   * Implementación del contrato UserPdfGeneratorPort
   *
   * @param data Datos del usuario para el reporte
   * @returns Either con error o stream del PDF generado
   */
  generate(data: UserReportPdfCommand): Either<PdfGenerationException, Readable> {
    try {
      // Crear nuevo documento PDF
      const doc = new PDFDocument({
        size: 'A4',
        margins: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50,
        },
        info: {
          Title: `Reporte de Usuario - ${data.username}`,
          Author: 'SolidarianID',
          Subject: 'Reporte de Usuario',
          Keywords: 'reporte, usuario, voluntarios',
          CreationDate: data.generatedAt,
        },
      });

      // Header del documento
      this.renderHeader(doc, data);

      // Información personal
      this.renderPersonalInfo(doc, data);

      // Ubicación
      this.renderLocation(doc, data);

      // Comunidades
      this.renderCommunities(doc, data);

      // Footer
      this.renderFooter(doc, data);

      // Finalizar el documento
      doc.end();

      // Retornar éxito con el stream
      return right(doc as unknown as Readable);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error generating PDF document';
      return left(new PdfGenerationException(`Failed to generate PDF report: ${errorMessage}`, error));
    }
  }

  /**
   * Renderiza el header del documento
   */
  private renderHeader(doc: PDFDoc, data: UserReportPdfCommand): void {
    // Logo en la esquina superior derecha
    try {
      doc.image(this.logoPath, 490, 45, { width: 60 });
    } catch (error) {
      console.warn('No se pudo cargar el logo:', error);
    }

    // Título principal
    doc.fontSize(24).font('Helvetica-Bold').fillColor(colors.oceanBlue[700]).text('SolidarianID', 50, 50);

    // Título del reporte
    doc.fontSize(18).font('Helvetica-Bold').fillColor(colors.blackHaze[950]).text('Reporte de Usuario', 50, 90);

    // Línea separadora
    doc.strokeColor(colors.iron[200]).lineWidth(1).moveTo(50, 120).lineTo(545, 120).stroke();

    // Fecha de generación
    doc
      .fontSize(9)
      .font('Helvetica')
      .fillColor(colors.paleSky[500])
      .text(
        `Generado: ${data.generatedAt.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}`,
        50,
        130,
        { align: 'right' },
      );

    doc.moveDown(2);
  }

  /**
   * Renderiza la sección de información personal
   */
  private renderPersonalInfo(doc: PDFDoc, data: UserReportPdfCommand): void {
    const startY = 170;

    // Título de sección
    this.renderSectionTitle(doc, 'Información Personal', startY);

    // Campos con espaciado mejorado
    let currentY = startY + 30;

    this.renderField(doc, 'Nombre Completo', data.fullName, currentY);
    currentY += 30; // Espacio entre bloques

    this.renderField(doc, 'ID Solidario', data.id, currentY);
    currentY += 30; // Espacio entre bloques

    this.renderField(doc, 'Nombre de Usuario', `@${data.username}`, currentY);
    currentY += 30; // Espacio entre bloques

    this.renderField(doc, 'Teléfono', data.phone, currentY);

    doc.moveDown(2);
  }

  /**
   * Renderiza la sección de ubicación
   */
  private renderLocation(doc: PDFDoc, data: UserReportPdfCommand): void {
    const startY = doc.y;

    // Título de sección
    this.renderSectionTitle(doc, 'Ubicación', startY);

    // Campos con espaciado mejorado
    let currentY = startY + 30;

    this.renderField(doc, 'Ciudad', data.city, currentY);
    currentY += 30; // Espacio entre bloques

    this.renderField(doc, 'País', `(${data.countryCode})`, currentY);

    doc.moveDown(2);
  }

  /**
   * Renderiza la sección de comunidades
   */
  private renderCommunities(doc: PDFDoc, data: UserReportPdfCommand): void {
    const startY = doc.y;

    // Título de sección
    this.renderSectionTitle(doc, `Comunidades (${data.communities.length})`, startY);

    let currentY = startY + 30;

    if (data.communities.length === 0) {
      doc
        .fontSize(10)
        .font('Helvetica')
        .fillColor(colors.paleSky[400])
        .text('No pertenece a ninguna comunidad', 50, currentY);
    } else {
      data.communities.forEach(community => {
        // Verificar si hay espacio suficiente, si no, crear nueva página
        if (currentY > 700) {
          doc.addPage();
          currentY = 50;
        }

        // Fondo de la tarjeta de comunidad
        doc.rect(50, currentY, 495, 40).fillColor('#f8fafc').fill();

        // Nombre de la comunidad
        doc
          .fontSize(11)
          .font('Helvetica-Bold')
          .fillColor(colors.blackHaze[950])
          .text(community.name, 60, currentY + 12, {
            width: 350,
            ellipsis: true,
          });

        // Translate rol and get badge colors
        const badgeText = this.translateRole(community.role);
        const { background, text } = this.renderBadgeColor(community.role);
        const badgeColor = background;
        const badgeTextColor = text;

        const badgeWidth = doc.widthOfString(badgeText) + 20;
        const badgeX = 495 - badgeWidth;

        doc
          .rect(badgeX, currentY + 10, badgeWidth, 20)
          .fillColor(badgeColor)
          .fill();

        doc
          .fontSize(9)
          .font('Helvetica-Bold')
          .fillColor(badgeTextColor)
          .text(badgeText, badgeX + 10, currentY + 14);

        currentY += 50;
      });
    }

    doc.moveDown(2);
  }

  private translateRole(role: Role): string {
    switch (role) {
      case Role.CREATOR:
        return 'Creador';
      case Role.ADMIN:
        return 'Administrador';
      case Role.MEMBER:
        return 'Miembro';
      default:
        return role;
    }
  }

  private renderBadgeColor(role: Role): { background: string; text: string } {
    switch (role) {
      case Role.CREATOR:
        return { background: colors.darkWine[100], text: colors.darkWine[800] };
      case Role.MEMBER:
        return { background: colors.oceanBlue[100], text: colors.oceanBlue[800] };
      case Role.ADMIN:
        return { background: colors.harvestOrange[100], text: colors.harvestOrange[800] };
      default:
        return { background: colors.iron[100], text: colors.iron[800] };
    }
  }

  /**
   * Renderiza el footer del documento
   */
  private renderFooter(doc: PDFDoc, data: UserReportPdfCommand): void {
    const bottomY = 792 - 50; // A4 height - margin

    // Mover al final de la página
    doc
      .fontSize(8)
      .font('Helvetica')
      .fillColor(colors.paleSky[400])
      .text('Este documento ha sido generado automáticamente por SolidarianID', 50, bottomY, {
        align: 'center',
        width: 495,
      });

    doc.text(`Usuario: ${data.username} | ID: ${data.id}`, 50, bottomY + 12, {
      align: 'center',
      width: 495,
    });

    // Línea superior del footer
    doc
      .strokeColor(colors.iron[200])
      .lineWidth(1)
      .moveTo(50, bottomY - 10)
      .lineTo(545, bottomY - 10)
      .stroke();
  }

  /**
   * Renderiza un título de sección
   */
  private renderSectionTitle(doc: PDFDoc, title: string, y: number): void {
    doc.fontSize(14).font('Helvetica-Bold').fillColor(colors.blackHaze[950]).text(title, 50, y);

    // Línea debajo del título
    doc
      .strokeColor(colors.iron[200])
      .lineWidth(0.5)
      .moveTo(50, y + 20)
      .lineTo(545, y + 20)
      .stroke();
  }

  /**
   * Renderiza un campo con label y valor
   */
  private renderField(doc: PDFDoc, label: string, value: string, y: number): void {
    // Label
    doc.fontSize(9).font('Helvetica-Bold').fillColor(colors.paleSky[500]).text(label.toUpperCase(), 50, y);

    // Valor
    doc
      .fontSize(11)
      .font('Helvetica')
      .fillColor(colors.blackHaze[950])
      .text(value, 50, y + 12);
  }
}
