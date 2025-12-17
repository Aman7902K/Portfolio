import nodemailer from 'nodemailer';

export const sendEmail = async ({to, subject, html, replyTo}) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

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

    await transporter.sendMail(mailOptions);
};
