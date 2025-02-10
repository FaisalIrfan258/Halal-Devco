import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    // Parse the incoming request body (Next.js handles parsing the body)
    const body = await req.json();
    const { Name, Email, Phone_Number, Sector, Message } = body;

    // Create the Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email provider, e.g., Gmail
      auth: {
        user: process.env.SMTP_SERVER_USERNAME, // Email address from .env.local
        pass: process.env.SMTP_SERVER_PASSWORD, // Email password from .env.local
      },
    });

    // Set up email options
    const mailOptions = {
      from: Email, // Sender's email (user's email)
      to: process.env.SITE_MAIL_RECIEVER, // Your receiving email (from .env.local)
      subject: `New Contact Form Submission from ${Name}`,
      text: `
        Name: ${Name}
        Email: ${Email}
        Phone Number: ${Phone_Number}
        Sector: ${Sector}
        Message: ${Message}
      `,
    };

    // Send the email using Nodemailer
    const info = await transporter.sendMail(mailOptions);

    // Return a successful response to the client
    return new Response(JSON.stringify({ message: 'Email sent successfully', info }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error);

    // Return an error response if email sending fails
    return new Response(JSON.stringify({ error: 'Error sending email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
