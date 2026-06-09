import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://recallguard.ca'

// Shared email wrapper
function emailLayout(content: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RecallGuard Canada</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
          ${content}
        </table>

        <!-- Footer -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; margin-top: 24px;">
          <tr>
            <td align="center" style="padding: 0 16px;">
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">
                © ${new Date().getFullYear()} RecallGuard Canada · Protecting your business and family.
              </p>
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #cbd5e1;">
                This email was sent by RecallGuard. We are not affiliated with the Government of Canada.
              </p>
              <p style="margin: 0; font-size: 12px;">
                <a href="${BASE_URL}/dashboard" style="color: #94a3b8; text-decoration: underline;">Dashboard</a>
                &nbsp;·&nbsp;
                <a href="${BASE_URL}/recalls" style="color: #94a3b8; text-decoration: underline;">Browse Recalls</a>
                &nbsp;·&nbsp;
                <a href="${BASE_URL}/contact" style="color: #94a3b8; text-decoration: underline;">Support</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

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

  const riskLevel = score >= 85 ? 'Critical' : score >= 70 ? 'High' : 'Medium'
  const riskColor = score >= 85 ? '#dc2626' : score >= 70 ? '#ea580c' : '#d97706'
  const riskBg = score >= 85 ? '#fef2f2' : score >= 70 ? '#fff7ed' : '#fffbeb'

  const html = emailLayout(`
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 48px 36px 48px; text-align: center;">
        <div style="display: inline-block; background: rgba(255,255,255,0.1); border-radius: 12px; padding: 10px 14px; margin-bottom: 20px;">
          <span style="font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">Recall</span><span style="font-size: 24px; font-weight: 800; color: #61c554; letter-spacing: -0.5px;">Guard</span>
        </div>
        <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; line-height: 1.3;">
          🚨 Recall Match Detected
        </h1>
        <p style="margin: 8px 0 0 0; font-size: 14px; color: #94a3b8;">
          Action may be required for a product in your inventory.
        </p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 36px 48px 40px 48px;">

        <!-- Risk Badge -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
          <tr>
            <td align="center">
              <div style="display: inline-block; background-color: ${riskBg}; border: 1px solid ${riskColor}20; border-radius: 100px; padding: 8px 20px;">
                <span style="font-size: 12px; font-weight: 700; color: ${riskColor}; text-transform: uppercase; letter-spacing: 1px;">${riskLevel} Risk · ${score}% Match</span>
              </div>
            </td>
          </tr>
        </table>

        <!-- Match Details Card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 28px;">
          <tr>
            <td style="padding: 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 16px; border-bottom: 1px solid #e2e8f0;">
                    <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8;">Your Product</p>
                    <p style="margin: 0; font-size: 16px; font-weight: 600; color: #0f172a;">${productName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 16px;">
                    <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8;">Official Recall</p>
                    <p style="margin: 0; font-size: 16px; font-weight: 600; color: #dc2626;">${recallTitle}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <p style="margin: 0 0 28px 0; font-size: 15px; color: #475569; line-height: 1.7;">
          Our matching engine found a potential match between a product in your inventory and a Government of Canada product recall. Please review this match in your dashboard and take appropriate action.
        </p>

        <!-- CTA Button -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <a href="${BASE_URL}/dashboard/matches" style="display: inline-block; background: linear-gradient(135deg, #dc2626, #b91c1c); color: #ffffff; padding: 14px 36px; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 15px; letter-spacing: -0.2px; box-shadow: 0 4px 14px rgba(220,38,38,0.3);">
                Review Match Now →
              </a>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  `)

  try {
    const { data, error } = await resend.emails.send({
      from: 'RecallGuard Canada <alerts@recallguard.ca>',
      to: [to],
      subject: `🚨 ${riskLevel} Risk: Possible Recall Match for ${productName}`,
      html
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

  const displayName = name || 'there'

  const html = emailLayout(`
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 48px 48px 40px 48px; text-align: center;">
        <div style="display: inline-block; background: rgba(255,255,255,0.1); border-radius: 12px; padding: 10px 14px; margin-bottom: 24px;">
          <span style="font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">Recall</span><span style="font-size: 24px; font-weight: 800; color: #61c554; letter-spacing: -0.5px;">Guard</span>
        </div>
        <h1 style="margin: 0; font-size: 26px; font-weight: 700; color: #ffffff; line-height: 1.3;">
          Welcome aboard, ${displayName}! 🎉
        </h1>
        <p style="margin: 12px 0 0 0; font-size: 15px; color: #94a3b8; line-height: 1.5;">
          You're all set to start monitoring product recalls across Canada.
        </p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 40px 48px 44px 48px;">

        <p style="margin: 0 0 32px 0; font-size: 15px; color: #475569; line-height: 1.7;">
          Thank you for joining RecallGuard. We automatically monitor official Health Canada, CFIA, and Transport Canada databases so you'll be the first to know when a recall affects your products.
        </p>

        <!-- Getting Started Header -->
        <h2 style="margin: 0 0 20px 0; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8;">
          Get started in 3 steps
        </h2>

        <!-- Step 1 -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; margin-bottom: 12px;">
          <tr>
            <td style="padding: 20px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="44" valign="top">
                    <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #61c554, #4ea843); border-radius: 10px; text-align: center; line-height: 36px; font-size: 16px; font-weight: 800; color: #ffffff;">1</div>
                  </td>
                  <td valign="top" style="padding-left: 12px;">
                    <p style="margin: 0 0 2px 0; font-size: 15px; font-weight: 700; color: #0f172a;">Add Your Products</p>
                    <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">Upload a CSV or manually add items to your inventory for automatic monitoring.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Step 2 -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 12px;">
          <tr>
            <td style="padding: 20px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="44" valign="top">
                    <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #61c554, #4ea843); border-radius: 10px; text-align: center; line-height: 36px; font-size: 16px; font-weight: 800; color: #ffffff;">2</div>
                  </td>
                  <td valign="top" style="padding-left: 12px;">
                    <p style="margin: 0 0 2px 0; font-size: 15px; font-weight: 700; color: #0f172a;">Set Up Your Watchlist</p>
                    <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">Add specific brands, categories, or keywords you want to track for recalls.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Step 3 -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 32px;">
          <tr>
            <td style="padding: 20px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="44" valign="top">
                    <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #61c554, #4ea843); border-radius: 10px; text-align: center; line-height: 36px; font-size: 16px; font-weight: 800; color: #ffffff;">3</div>
                  </td>
                  <td valign="top" style="padding-left: 12px;">
                    <p style="margin: 0 0 2px 0; font-size: 15px; font-weight: 700; color: #0f172a;">Stay Protected</p>
                    <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">We'll monitor Health Canada 24/7 and alert you instantly when a recall matches.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- CTA Button -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
          <tr>
            <td align="center">
              <a href="${BASE_URL}/dashboard" style="display: inline-block; background: linear-gradient(135deg, #61c554, #4ea843); color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; letter-spacing: -0.2px; box-shadow: 0 4px 14px rgba(97,197,84,0.35);">
                Go to Dashboard →
              </a>
            </td>
          </tr>
        </table>

        <!-- Help Note -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
          <tr>
            <td style="padding: 20px 24px; text-align: center;">
              <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.6;">
                💬 Have questions? Simply reply to this email — our team is here to help.
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  `)

  try {
    const { data, error } = await resend.emails.send({
      // Using onboarding@resend.dev for testing purposes, per Resend docs
      from: 'RecallGuard Canada <onboarding@resend.dev>',
      to: [to],
      subject: 'Welcome to RecallGuard Canada! 🛡️',
      html
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
