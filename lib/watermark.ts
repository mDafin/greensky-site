import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function watermarkPdf(input: Uint8Array, watermarkText: string): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(input);
  const pages = pdf.getPages();
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  pages.forEach((page) => {
    const { width, height } = page.getSize();
    const text = watermarkText;
    const fontSize = Math.max(24, Math.min(width, height) * 0.04);
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    const textHeight = fontSize;

    page.drawText(text, {
      x: (width - textWidth) / 2,
      y: (height - textHeight) / 2,
      size: fontSize,
      font,
      color: rgb(0.8, 0.1, 0.1),
      rotate: { type: "degrees", angle: 45 },
      opacity: 0.18,
    });
  });

  const out = await pdf.save();
  return out;
}
