import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, service, message, lang } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const RECIPIENTS = [
      'info@atreviaconsultores.com',
      'mauro@mauroferrante.com',
    ]

    const subjectMap: Record<string, string> = {
      es: `Nuevo mensaje de contacto: ${name}`,
      en: `New contact message: ${name}`,
      it: `Nuovo messaggio di contatto: ${name}`,
      fr: `Nouveau message de contact : ${name}`,
      de: `Neue Kontaktnachricht: ${name}`,
    }
    const subject = subjectMap[lang] ?? subjectMap.es

    const htmlBody = `
<!DOCTYPE html>
<html lang="${lang ?? 'es'}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#0d1323;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d1323;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#141c2e;border-radius:8px;overflow:hidden;border:1px solid #2a3450;">
          <!-- Header -->
          <tr>
            <td style="background:#0a0f1e;padding:32px 40px;border-bottom:1px solid #1e2a40;">
              <p style="margin:0;font-size:22px;font-weight:700;letter-spacing:0.2em;color:#f2ede4;font-family:Georgia,serif;">ATREVIA</p>
              <p style="margin:4px 0 0;font-size:10px;letter-spacing:0.4em;color:#c8a96e;text-transform:uppercase;">Consultores</p>
            </td>
          </tr>
          <!-- Gold line -->
          <tr>
            <td style="height:2px;background:linear-gradient(to right,transparent,#c8a96e,transparent);"></td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 28px;font-size:20px;font-weight:400;color:#f2ede4;font-family:Georgia,serif;">${subject}</h2>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1e2a40;">
                    <p style="margin:0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#c8a96e;">Nombre / Name</p>
                    <p style="margin:4px 0 0;font-size:15px;color:#d4cfc8;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1e2a40;">
                    <p style="margin:0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#c8a96e;">Email</p>
                    <p style="margin:4px 0 0;font-size:15px;color:#d4cfc8;"><a href="mailto:${email}" style="color:#c8a96e;text-decoration:none;">${email}</a></p>
                  </td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1e2a40;">
                    <p style="margin:0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#c8a96e;">Teléfono / Phone</p>
                    <p style="margin:4px 0 0;font-size:15px;color:#d4cfc8;">${phone}</p>
                  </td>
                </tr>` : ''}
                ${service ? `
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1e2a40;">
                    <p style="margin:0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#c8a96e;">Servicio / Service</p>
                    <p style="margin:4px 0 0;font-size:15px;color:#d4cfc8;">${service}</p>
                  </td>
                </tr>` : ''}
                <tr>
                  <td style="padding:12px 0;">
                    <p style="margin:0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#c8a96e;">Mensaje / Message</p>
                    <p style="margin:8px 0 0;font-size:15px;color:#d4cfc8;line-height:1.6;white-space:pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #1e2a40;background:#0a0f1e;">
              <p style="margin:0;font-size:11px;color:#3a4460;text-align:center;letter-spacing:0.1em;">
                ATREVIA Consultores &mdash; atreviaconsultores.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

    const textBody = [
      subject,
      '---',
      `Nombre: ${name}`,
      `Email: ${email}`,
      phone ? `Teléfono: ${phone}` : null,
      service ? `Servicio: ${service}` : null,
      '',
      `Mensaje:\n${message}`,
      '---',
      'ATREVIA Consultores — atreviaconsultores.com',
    ]
      .filter(Boolean)
      .join('\n')

    // Use the Resend API to send email (simple fetch, no SDK needed)
    const RESEND_API_KEY = process.env.RESEND_API_KEY

    if (!RESEND_API_KEY) {
      // No API key configured — log and return success so the form still works in dev
      console.warn('[ATREVIA] RESEND_API_KEY not set. Email not sent. Form data:', { name, email, service })
      return NextResponse.json({ ok: true, dev: true })
    }

    // Use verified Resend onboarding domain as fallback until atreviaconsultores.com is verified in Resend
    const fromAddress = 'ATREVIA Consultores <onboarding@resend.dev>'

    const payload = {
      from: fromAddress,
      to: RECIPIENTS,
      reply_to: email,
      subject,
      html: htmlBody,
      text: textBody,
    }

    console.log('[ATREVIA] Sending email via Resend to:', RECIPIENTS, '| subject:', subject)

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const resendBody = await resendRes.text()
    console.log('[ATREVIA] Resend response status:', resendRes.status, '| body:', resendBody)

    if (!resendRes.ok) {
      return NextResponse.json({ error: 'Email sending failed', detail: resendBody }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[ATREVIA] Contact route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
