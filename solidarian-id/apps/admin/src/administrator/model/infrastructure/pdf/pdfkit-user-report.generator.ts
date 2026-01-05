import PDFDocument from 'pdfkit';
import type { Readable } from 'stream';
import type { UserReportPdfDto } from './user-report-pdf.dto';
import { join } from 'path';
import { colors } from '@frontend/design-tokens/colors';
import { Injectable } from '@nestjs/common';
import { UserPdfGeneratorPort } from '../../domain/ports/output/user-pdf-generator.port';

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
   * @returns Stream del PDF generado
   * @throws Error si la generación falla
   */
  async generate(data: UserReportPdfDto): Promise<Readable> {
    return new Promise((resolve, reject) => {
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

        // Resolver con el stream
        resolve(doc as unknown as Readable);
      } catch (error) {
        reject(error instanceof Error ? error : new Error('Error generating PDF document'));
      }
    });
  }

  /**
   * Renderiza el header del documento
   */
  private renderHeader(doc: PDFDoc, data: UserReportPdfDto): void {
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
  private renderPersonalInfo(doc: PDFDoc, data: UserReportPdfDto): void {
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
    currentY += 40; // Espacio antes de la siguiente sección

    doc.moveDown(2);
  }

  /**
   * Renderiza la sección de ubicación
   */
  private renderLocation(doc: PDFDoc, data: UserReportPdfDto): void {
    const startY = doc.y;

    // Título de sección
    this.renderSectionTitle(doc, 'Ubicación', startY);

    // Campos con espaciado mejorado
    let currentY = startY + 30;

    this.renderField(doc, 'Ciudad', data.city, currentY);
    currentY += 30; // Espacio entre bloques

    this.renderField(doc, 'País', `${data.countryName} (${data.countryCode})`, currentY);
    currentY += 40; // Espacio antes de la siguiente sección

    doc.moveDown(2);
  }

  /**
   * Renderiza la sección de comunidades
   */
  private renderCommunities(doc: PDFDoc, data: UserReportPdfDto): void {
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

        // Badge de rol
        const badgeText = community.isAdmin ? 'Administrador' : 'Miembro';
        const badgeColor = community.isAdmin ? colors.harvestOrange[100] : colors.oceanBlue[100];
        const badgeTextColor = community.isAdmin ? colors.harvestOrange[800] : colors.oceanBlue[800];

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

  /**
   * Renderiza el footer del documento
   */
  private renderFooter(doc: PDFDoc, data: UserReportPdfDto): void {
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
