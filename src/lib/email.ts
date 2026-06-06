import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendRecallAlertEmail(
  to: string, 
  productName: string, 
  recallTitle: string, 
  score: number,
  matchId: string
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Skipping email alert.')
    return { success: false, error: 'No API key' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'RecallGuard Canada <alerts@recallguard.ca>',
      to: [to],
      subject: `🚨 Action Required: Possible Recall Match for ${productName}`,
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Possible Recall Match Detected</h2>
          <p>Hello,</p>
          <p>Our matching engine found a potential match between a product in your inventory and a new Government of Canada product recall.</p>
          
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your Product:</strong> ${productName}</p>
            <p><strong>Official Recall:</strong> ${recallTitle}</p>
            <p><strong>Match Confidence:</strong> ${score}%</p>
          </div>
          
          <p>Please log in to your dashboard to review this match and take appropriate action if the product is affected.</p>
          
          <a href="https://recallguard.ca/dashboard/matches" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Review Match in Dashboard
          </a>
          
          <p style="margin-top: 40px; font-size: 12px; color: #64748b;">
            This is an automated alert from RecallGuard Canada. We are not affiliated with the Government of Canada.
          </p>
        </div>
      `
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (err) {
    console.error('Failed to send email:', err)
    return { success: false, error: err }
  }
}

export async function sendWelcomeEmail(to: string, name: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Skipping welcome email.')
    return { success: false, error: 'No API key' }
  }

  try {
    const { data, error } = await resend.emails.send({
      // Using onboarding@resend.dev for testing purposes, per Resend docs
      from: 'RecallGuard Canada <onboarding@resend.dev>',
      to: [to],
      subject: 'Welcome to RecallGuard Canada!',
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0f172a;">Welcome to RecallGuard, ${name || 'User'}!</h2>
          <p>Thank you for signing up. We're excited to help you keep your products and family safe.</p>
          
          <div style="background-color: #f8fafc; padding: 24px; border-radius: 12px; margin: 24px 0; border: 1px solid #e2e8f0;">
            <h3 style="margin-top: 0; color: #334155;">Getting Started</h3>
            <ul style="color: #475569; line-height: 1.6;">
              <li><strong>Add Products:</strong> Upload a CSV or add items manually to your inventory.</li>
              <li><strong>Watch Brands:</strong> Add specific brands or categories to your watchlist.</li>
              <li><strong>Stay Alert:</strong> We'll monitor Health Canada and notify you of matches.</li>
            </ul>
          </div>
          
          <a href="https://recallguard.ca/dashboard" style="display: inline-block; background-color: #61c554; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-bottom: 24px;">
            Go to your Dashboard
          </a>
          
          <p style="font-size: 14px; color: #64748b; line-height: 1.5;">
            If you have any questions, simply reply to this email. Our team is here to help!
          </p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
            RecallGuard Canada<br>
            Protecting your business and family.
          </div>
        </div>
      `
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (err) {
    console.error('Failed to send welcome email:', err)
    return { success: false, error: err }
  }
}
