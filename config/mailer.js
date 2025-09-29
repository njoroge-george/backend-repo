// backend-repo/utils/mailer.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // load .env variables

// Create a reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

  console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS:', process.env.SMTP_PASS ? 'Loaded' : 'Missing');

  

transporter.verify((err, success) => {
    if (err) {
        console.error("Error connecting to email server:", err);
    } else {
        console.log("Mailer is ready to send messages");
    }
});

export const sendEmail = async ({ to, subject, text, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `"Admin" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });
        console.log("Email sent: ", info.messageId);
        return info;
    } catch (err) {
        console.error("Error sending email:", err);
        throw err;
    }
};
