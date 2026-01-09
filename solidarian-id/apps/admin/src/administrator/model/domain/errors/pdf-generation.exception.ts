/**
 * Exception for PDF generation errors.
 *
 * Represents technical failures in the PDF generation infrastructure layer.
 */
export class PdfGenerationException extends Error {
  constructor(message: string, cause?: unknown) {
    super(message, { cause });
    this.name = PdfGenerationException.name;
  }
}
