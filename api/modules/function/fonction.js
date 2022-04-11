const crypto = require("crypto");
const nodemailer = require('nodemailer');

function sha1(data) {
    return crypto.createHash("sha1").update(data, "binary").digest("hex");
}

let config = {
    service: "gmail",
    secure: true, // use SSL
    auth: {
        user: 'ekalyekaly2@gmail.com',
        pass: 'ekaly-3k4ly'
    },
    tls: {
        rejectUnauthorized: false
    }
};

function getTransporter() {
    return nodemailer.createTransport(config);
}

async function sendMail(payload) {
    await getTransporter().sendMail({
        from: config.user,
        to: payload.to,
        subject: payload.subject,
        text: playload.text
    });
}

module.exports = { sha1,sendMail }