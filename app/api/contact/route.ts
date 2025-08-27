import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    console.log('=== EMAIL SENDING START ===')
    
    // Check if environment variables exist
    console.log('Checking environment variables...')
    console.log('EMAIL_USER exists:', !!process.env.EMAIL_USER)
    console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS)
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing environment variables')
      return NextResponse.json(
        { success: false, message: 'E-Mail-Konfiguration fehlt' },
        { status: 500 }
      )
    }

    console.log('Parsing request body...')
    const { name, email, phone, service, message } = await request.json()
    console.log('Request data:', { name, email, phone: phone || 'not provided', service: service || 'not provided', message: message ? 'provided' : 'not provided' })

    // Validate required fields
    if (!name || !email || !message) {
      console.error('Missing required fields:', { name: !!name, email: !!email, message: !!message })
      return NextResponse.json(
        { success: false, message: 'Name, E-Mail und Nachricht sind erforderlich' },
        { status: 400 }
      )
    }

    console.log('Creating nodemailer transporter...')
    // Create transporter with Gmail service using env credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS?.replace(/\s/g, ''),
      },
    })
    console.log('Transporter created successfully')

    // Compose mail options
    console.log('Composing mail options...')
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'info@kd-car.de',
      subject: `Neue Kontaktanfrage von ${name} - KD-CAR`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">
            Neue Kontaktanfrage - KD-CAR
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Kontaktdaten:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>E-Mail:</strong> ${email}</p>
            ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
            ${service ? `<p><strong>Gewünschte Leistung:</strong> ${service}</p>` : ''}
          </div>
          
          <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px;">
            <h3 style="color: #1e293b; margin-top: 0;">Nachricht:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">
            <p>Diese E-Mail wurde über das Kontaktformular der KD-CAR Website gesendet.</p>
            <p>Zeitstempel: ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}</p>
          </div>
        </div>
      `,
      text: `
        Neue Kontaktanfrage - KD-CAR
        
        Kontaktdaten:
        Name: ${name}
        E-Mail: ${email}
        ${phone ? `Telefon: ${phone}` : ''}
        ${service ? `Gewünschte Leistung: ${service}` : ''}
        
        Nachricht:
        ${message}
        
        Diese E-Mail wurde über das Kontaktformular der KD-CAR Website gesendet.
        Zeitstempel: ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}
      `,
    }
    console.log('Mail options composed successfully')

    // Verify SMTP connection
    console.log('Verifying SMTP connection...')
    await transporter.verify()
    console.log('SMTP connection verified successfully')

    // Send the email
    console.log('Sending email...')
    const result = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', result.messageId)

    console.log('=== EMAIL SENDING SUCCESS ===')
    return NextResponse.json({ success: true, message: 'E-Mail erfolgreich gesendet' })

  } catch (error) {
    console.error('=== EMAIL SENDING ERROR ===')
    console.error('Error type:', typeof error)
    console.error('Error object:', error)
    console.error('Error message:', error instanceof Error ? error.message : 'No message')
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack')
    
    if (error && typeof error === 'object' && 'code' in error) {
      console.error('Error code:', error.code)
    }

    let errorMessage = 'Fehler beim Senden der E-Mail'

    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === 'EAUTH') {
        errorMessage = 'Gmail-Authentifizierung fehlgeschlagen. Überprüfen Sie Ihre E-Mail-Anmeldedaten.'
      } else if (error.code === 'ENOTFOUND') {
        errorMessage = 'Verbindung zum E-Mail-Server fehlgeschlagen.'
      } else if (error.code === 'ETIMEDOUT') {
        errorMessage = 'E-Mail-Server-Timeout. Versuchen Sie es später erneut.'
      }
    }

    console.error('Final error message:', errorMessage)
    return NextResponse.json(
      { success: false, message: errorMessage, details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

