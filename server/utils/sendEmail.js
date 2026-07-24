const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to, subject, text) {
    try {
        const response = await resend.emails.send({
            from: "onboarding@resend.dev",
            to,
            subject,
            text,
        });

        console.log("Mail sent:", response);

        return response;

    } catch (err) {

        console.error("Resend Error:", err);
        throw err;

    }
}

module.exports = sendEmail;