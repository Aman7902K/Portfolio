import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, html, replyTo }) => {
    try {
        // Validate environment variables
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error('Email configuration missing: EMAIL_USER or EMAIL_PASS not set');
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Verify transporter configuration
        await transporter.verify();

        const mailOptions = {
            from: `Portfolio <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        };

        // Add replyTo if provided (for contact form messages)
        if (replyTo) {
            mailOptions.replyTo = replyTo;
        }

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error('SendEmail Error Details:', {
            message: error.message,
            code: error.code,
            command: error.command,
            response: error.response
        });
        throw error;
    }
};
