import { Router } from "express";
import { sendEmail } from "../utils/sendEmail.js";

const router = Router();

router.post('/', async(req, res) => {
    const {name, email, msg} = req.body;

    if(!name || !email || !msg){
        return res.status(400).json({
            error: "Details not Provided"
        });
    }

    try {
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">New Contact Form Submission</h2>
                    
                    <div style="margin: 20px 0;">
                        <p style="margin: 10px 0;"><strong style="color: #555;">Name:</strong> ${name}</p>
                        <p style="margin: 10px 0;"><strong style="color: #555;">Email:</strong> <a href="mailto:${email}" style="color: #4F46E5;">${email}</a></p>
                    </div>
                    
                    <div style="margin-top: 20px; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #4F46E5; border-radius: 4px;">
                        <p style="margin: 0 0 10px 0;"><strong style="color: #555;">Message:</strong></p>
                        <p style="margin: 0; color: #333; line-height: 1.6;">${msg}</p>
                    </div>
                    
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #777; font-size: 12px;">
                        <p style="margin: 0;">This message was sent from your portfolio contact form.</p>
                        <p style="margin: 5px 0 0 0;">Reply to: ${email}</p>
                    </div>
                </div>
            </div>
        `;

        console.log('Attempting to send email from:', name, email);
        
        const result = await sendEmail({
            to: process.env.EMAIL_USER,
            subject: `Portfolio Contact - Message from ${name}`,
            html: emailHtml,
            replyTo: email
        });

        console.log('Email sent successfully to:', process.env.EMAIL_USER);
        
        return res.status(200).json({
            success: true,
            message: "Message sent successfully!"
        });

    } catch (error) {
        console.error("Error sending email:", {
            message: error.message,
            stack: error.stack,
            code: error.code
        });
        return res.status(500).json({
            success: false,
            error: "Failed to send message. Please try again later.",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

export default router;
