import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = 'Vinya.wine <reservas@vinya.app>'

export interface BookingEmailData {
  travelerName: string
  travelerEmail: string
  experienceName: string
  wineryName: string
  date: string
  guests: number
  pricePerPerson: number
}

export interface WineryApprovalData {
  wineryName: string
  ownerName: string | null
  ownerEmail: string
}

// ─── Layout helpers ───────────────────────────────────────────────────────────

function emailWrapper(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FAF8F5;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF8F5;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:#2C4A3E;padding:32px 40px;">
            <p style="margin:0;color:#FAF8F5;font-family:Georgia,serif;font-size:22px;letter-spacing:2px;">VINYA.WINE</p>
            <p style="margin:8px 0 0;color:#C4622D;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;">${title}</p>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:40px;">
            ${body}
          </td>
        </tr>
        <tr>
          <td style="background:#2C4A3E;padding:24px 40px;text-align:center;">
            <p style="margin:0;color:#FAF8F5;opacity:0.5;font-family:Arial,sans-serif;font-size:11px;letter-spacing:1px;">© 2026 Vinya.wine · El marketplace del turismo del vino en Catalunya</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function detailRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #f0ece8;">
      <span style="display:block;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#2C4A3E;opacity:0.4;margin-bottom:4px;">${label}</span>
      <span style="display:block;font-family:Georgia,serif;font-size:16px;color:#2C4A3E;">${value}</span>
    </td>
  </tr>`
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// ─── Templates ────────────────────────────────────────────────────────────────

function bookingConfirmationHtml(d: BookingEmailData): string {
  const total = (d.pricePerPerson * d.guests).toFixed(2)
  const body = `
    <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C4622D;">Solicitud de reserva</p>
    <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:28px;color:#2C4A3E;line-height:1.2;">Hola, ${d.travelerName}</h1>
    <p style="margin:0 0 32px;font-family:Arial,sans-serif;font-size:15px;color:#2C4A3E;opacity:0.7;line-height:1.6;">
      Hemos recibido tu solicitud para la siguiente experiencia. La bodega la revisará y te confirmará en un plazo de 48 horas.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e4e0;padding:0 24px;margin-bottom:32px;">
      <tbody>
        ${detailRow('Experiencia', d.experienceName)}
        ${detailRow('Bodega', d.wineryName)}
        ${detailRow('Fecha', formatDate(d.date))}
        ${detailRow('Personas', `${d.guests} persona${d.guests !== 1 ? 's' : ''}`)}
        ${detailRow('Precio por persona', `${d.pricePerPerson} €`)}
        ${detailRow('Total estimado', `${total} €`)}
      </tbody>
    </table>
    <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#2C4A3E;opacity:0.5;line-height:1.6;">
      ¿Tienes alguna pregunta? Responde a este email o escríbenos a reservas@vinya.app
    </p>`
  return emailWrapper('Confirmación de solicitud', body)
}

function wineryNotificationHtml(d: BookingEmailData): string {
  const total = (d.pricePerPerson * d.guests).toFixed(2)
  const body = `
    <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C4622D;">Nueva reserva</p>
    <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:28px;color:#2C4A3E;line-height:1.2;">Nueva solicitud de reserva</h1>
    <p style="margin:0 0 32px;font-family:Arial,sans-serif;font-size:15px;color:#2C4A3E;opacity:0.7;line-height:1.6;">
      Un viajero ha solicitado reservar una de tus experiencias. Aquí tienes todos los detalles.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e4e0;padding:0 24px;margin-bottom:32px;">
      <tbody>
        ${detailRow('Experiencia', d.experienceName)}
        ${detailRow('Fecha solicitada', formatDate(d.date))}
        ${detailRow('Personas', `${d.guests} persona${d.guests !== 1 ? 's' : ''}`)}
        ${detailRow('Total estimado', `${total} €`)}
        ${detailRow('Nombre del viajero', d.travelerName)}
        ${detailRow('Email del viajero', d.travelerEmail)}
      </tbody>
    </table>
    <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#2C4A3E;opacity:0.5;line-height:1.6;">
      Accede a tu panel de bodega en vinya.wine para confirmar o rechazar esta reserva.
    </p>`
  return emailWrapper('Nueva solicitud de reserva', body)
}

function wineryWelcomeHtml(d: WineryApprovalData): string {
  const greeting = d.ownerName ?? d.wineryName
  const body = `
    <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C4622D;">Bodega aprobada</p>
    <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:28px;color:#2C4A3E;line-height:1.2;">¡Bienvenida a Vinya.wine!</h1>
    <p style="margin:0 0 24px;font-family:Arial,sans-serif;font-size:15px;color:#2C4A3E;opacity:0.7;line-height:1.6;">
      Hola ${greeting}, nos alegra comunicarte que tu bodega <strong>${d.wineryName}</strong> ha sido revisada y <strong>aprobada</strong>.
    </p>
    <p style="margin:0 0 32px;font-family:Arial,sans-serif;font-size:15px;color:#2C4A3E;opacity:0.7;line-height:1.6;">
      Ya puedes acceder a tu panel para añadir experiencias y empezar a recibir reservas. La publicación es <strong>gratuita</strong> — solo pagamos el 12 % cuando se produce una venta.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e4e0;padding:0 24px;margin-bottom:32px;">
      <tbody>
        ${detailRow('Bodega', d.wineryName)}
        ${detailRow('Comisión por reserva', '12 %')}
        ${detailRow('Cuota de entrada', 'Gratuita')}
      </tbody>
    </table>
    <a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://vinya.wine'}/es/dashboard/bodega"
       style="display:inline-block;background:#C4622D;color:#FAF8F5;text-decoration:none;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;padding:16px 32px;">
      Acceder al panel →
    </a>
    <p style="margin:32px 0 0;font-family:Arial,sans-serif;font-size:13px;color:#2C4A3E;opacity:0.5;line-height:1.6;">
      ¿Necesitas ayuda? Escríbenos a reservas@vinya.app
    </p>`
  return emailWrapper('¡Tu bodega ha sido aprobada!', body)
}

// ─── Send functions ───────────────────────────────────────────────────────────

export async function sendBookingConfirmation(data: BookingEmailData) {
  return resend.emails.send({
    from: FROM,
    to: data.travelerEmail,
    subject: `Solicitud recibida: ${data.experienceName} — Vinya.wine`,
    html: bookingConfirmationHtml(data),
  })
}

export async function sendWineryBookingNotification(
  wineryEmail: string,
  data: BookingEmailData,
) {
  return resend.emails.send({
    from: FROM,
    to: wineryEmail,
    subject: `Nueva solicitud: ${data.experienceName} · ${data.guests} persona${data.guests !== 1 ? 's' : ''} · ${data.date}`,
    html: wineryNotificationHtml(data),
  })
}

export async function sendWineryWelcome(data: WineryApprovalData) {
  return resend.emails.send({
    from: FROM,
    to: data.ownerEmail,
    subject: `Tu bodega "${data.wineryName}" ha sido aprobada — Vinya.wine`,
    html: wineryWelcomeHtml(data),
  })
}
