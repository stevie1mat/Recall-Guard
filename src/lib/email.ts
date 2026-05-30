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
