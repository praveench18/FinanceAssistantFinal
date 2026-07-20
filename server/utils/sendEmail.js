const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify((error) => {
    if (error) {
        console.log("SMTP ERROR:", error);
    } else {
        console.log("SMTP Ready");
    }
});

async function sendEmail(to, subject, text) {
    const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    });

    console.log("Mail sent:", info.messageId);
}

module.exports = sendEmail;