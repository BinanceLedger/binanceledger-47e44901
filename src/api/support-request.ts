
// API endpoint for support requests
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, personalDetails, timestamp, supportCode } = body;

    // Log the support request
    console.log('Support request received:', { email, supportCode, timestamp });

    // In a real application, you would send this to your email service
    // For now, we'll just log it and return success
    
    // Example email content for support request
    const emailContent = {
      to: 'support@yourcompany.com',
      subject: `Urgent: Client Support Request - Code ${supportCode}`,
      body: `
        A client has requested support assistance.
        
        Support Code: ${supportCode}
        Email: ${email}
        Timestamp: ${timestamp}
        
        Client Details:
        Name: ${personalDetails?.firstName} ${personalDetails?.lastName}
        Phone: ${personalDetails?.phoneNumber}
        Address: ${personalDetails?.address}, ${personalDetails?.city}, ${personalDetails?.country}
        
        Please contact the client immediately.
      `
    };

    // Here you would integrate with your email service (SendGrid, NodeMailer, etc.)
    // await sendEmail(emailContent);

    return new Response(
      JSON.stringify({ success: true, message: 'Support request submitted successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error processing support request:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to process support request' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
