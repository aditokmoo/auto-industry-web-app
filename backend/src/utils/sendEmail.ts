import nodemailer from 'nodemailer';

interface UserTypes {
    username: string;
    email: string;
    password: string;
}

const sendEmail = async (user: UserTypes, confirmToken: string) => {
    // Ensure port and secure are properly cast from environment variables
    const port = parseInt(process.env.EMAIL_PORT || '587', 10);
    const secure = process.env.EMAIL_SECURE === 'true'; // true for 465, false for other ports
    console.log(process.env.EMAIL_USERNAME)
    // Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: port,
        secure: secure, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // Create message
    const message = {
        from: process.env.EMAIL_SENDER,
        to: user.email,
        subject: 'CarFix | Email verification',
        text: `${process.env.BASE_URL}/api/auth/verify/${confirmToken}`,
    };

    // Send message
    await transporter.sendMail(message);
};

export default sendEmail;