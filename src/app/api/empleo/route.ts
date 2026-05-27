import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/rtf",
  "image/jpeg",
  "image/png",
]);

const RECIPIENT = "positanopizzeria2023@gmail.com";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string | undefined): string {
  if (!value) return "";
  return `<tr><td style="padding:6px 12px;color:#7a7a7a;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(
    label,
  )}</td><td style="padding:6px 12px;color:#1d2750;font-size:14px;vertical-align:top;">${escapeHtml(
    value,
  )}</td></tr>`;
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();

    const nombre = String(form.get("nombre") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const telefono = String(form.get("telefono") ?? "").trim();
    const fechaNacimiento = String(form.get("fechaNacimiento") ?? "").trim();
    const ciudad = String(form.get("ciudad") ?? "").trim();
    const puesto = String(form.get("puesto") ?? "").trim();
    const experiencia = String(form.get("experiencia") ?? "").trim();
    const idiomas = form
      .getAll("idiomas")
      .map((value) => String(value).trim())
      .filter(Boolean)
      .join(", ");
    const disponibilidad = String(form.get("disponibilidad") ?? "").trim();
    const jornada = String(form.get("jornada") ?? "").trim();
    const documentacion = String(form.get("documentacion") ?? "").trim();
    const motivacion = String(form.get("motivacion") ?? "").trim();

    if (!nombre || !email || !telefono || !puesto) {
      return NextResponse.json(
        { ok: false, error: "Faltan campos obligatorios." },
        { status: 400 },
      );
    }

    const cv = form.get("cv");
    if (!(cv instanceof File) || cv.size === 0) {
      return NextResponse.json(
        { ok: false, error: "Debes adjuntar tu CV." },
        { status: 400 },
      );
    }

    if (cv.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { ok: false, error: "El CV supera el máximo permitido (5 MB)." },
        { status: 413 },
      );
    }

    if (cv.type && !ALLOWED_TYPES.has(cv.type)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Formato no soportado. Sube PDF, Word, RTF o imagen.",
        },
        { status: 415 },
      );
    }

    const cvBuffer = Buffer.from(await cv.arrayBuffer());
    const safeName = nombre.replace(/[^\p{L}\p{N}\s_-]/gu, "").trim() || "Candidato";
    const cvFilename = `CV-${safeName.replace(/\s+/g, "_")}${
      cv.name.includes(".") ? cv.name.slice(cv.name.lastIndexOf(".")) : ""
    }`;

    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!user || !pass) {
      console.error("[empleo] SMTP_USER/SMTP_PASS no configurados");
      return NextResponse.json(
        { ok: false, error: "Servicio de email no configurado." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    const html = `
      <div style="font-family:Helvetica,Arial,sans-serif;background:#f5efe1;padding:32px;">
        <div style="max-width:640px;margin:0 auto;background:#fffdf7;border:1px solid #e5dec9;">
          <div style="background:#1d2750;color:#f5efe1;padding:24px 28px;">
            <p style="margin:0;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#cbb56b;">Curriculum recibido · Positano</p>
            <h1 style="margin:8px 0 0;font-size:22px;font-weight:600;">${escapeHtml(nombre)}</h1>
            <p style="margin:4px 0 0;color:#cbb56b;font-size:14px;">${escapeHtml(puesto)}</p>
          </div>
          <table style="width:100%;border-collapse:collapse;padding:8px 0;">
            ${row("Email", email)}
            ${row("Teléfono", telefono)}
            ${row("Fecha de nacimiento", fechaNacimiento)}
            ${row("Ciudad", ciudad)}
            ${row("Puesto", puesto)}
            ${row("Experiencia", experiencia)}
            ${row("Idiomas", idiomas)}
            ${row("Disponibilidad", disponibilidad)}
            ${row("Tipo de jornada", jornada)}
            ${row("Documentación", documentacion)}
          </table>
          ${
            motivacion
              ? `<div style="padding:16px 28px 24px;border-top:1px solid #eee3c8;">
                  <p style="margin:0 0 6px;color:#7a7a7a;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;">Motivación</p>
                  <p style="margin:0;color:#1d2750;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(motivacion)}</p>
                </div>`
              : ""
          }
          <div style="padding:18px 28px;background:#f5efe1;font-size:12px;color:#7a7a7a;">
            CV adjunto: <strong>${escapeHtml(cvFilename)}</strong>
          </div>
        </div>
      </div>
    `;

    const text = [
      `Nuevo curriculum recibido — Positano`,
      ``,
      `Nombre: ${nombre}`,
      `Email: ${email}`,
      `Teléfono: ${telefono}`,
      fechaNacimiento && `Fecha de nacimiento: ${fechaNacimiento}`,
      ciudad && `Ciudad: ${ciudad}`,
      `Puesto: ${puesto}`,
      experiencia && `Experiencia: ${experiencia}`,
      idiomas && `Idiomas: ${idiomas}`,
      disponibilidad && `Disponibilidad: ${disponibilidad}`,
      jornada && `Jornada: ${jornada}`,
      documentacion && `Documentación: ${documentacion}`,
      motivacion && `\nMotivación:\n${motivacion}`,
    ]
      .filter(Boolean)
      .join("\n");

    await transporter.sendMail({
      from: `"Positano · Curriculums" <${user}>`,
      to: RECIPIENT,
      replyTo: `${nombre} <${email}>`,
      subject: `[Curriculum] ${nombre} — ${puesto}`,
      text,
      html,
      attachments: [
        {
          filename: cvFilename,
          content: cvBuffer,
          contentType: cv.type || "application/octet-stream",
        },
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[empleo] error", error);
    return NextResponse.json(
      { ok: false, error: "No se pudo enviar la candidatura." },
      { status: 500 },
    );
  }
}
