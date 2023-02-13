const config = require('../config');
const nodemailer = require('nodemailer');
const twilio = require('twilio');

const twilioAPI = twilio(config.TWILIO_ACCOUNT_ID, config.TWILIO_TOKEN);

const owner = {
    name: config.GMAIL_NAME,
    address: config.GMAIL_EMAIL,
};

const gmailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.GMAIL_EMAIL,
        pass: config.GMAIL_PASSWORD,
    },
});

const notifyNewUserByEmail = async (userData) => {
    const mailOptions = {
        from: owner,
        to: config.GMAIL_EMAIL,
        subject: 'New User Created',
        html: `A New User was created. See info below\n\n\n ${userData}`,
    };
    const response = await gmailTransporter.sendMail(mailOptions);
    return response;
};

const notifyNewOrderUsingWhatsApp = async (orderData) => {
    const params = {
        body: `A New Order was created. See info below\n\n\n ${orderData}`,
        from: `whatsapp:${config.TWILIO_WSP_CELLPHONE}`,
        to: `whatsapp:${config.ADMIN_PHONE}`,
    };

    const response = await twilioAPI.messages.create(params);
    return response;
};

export const NotificationService = {
    notifyNewUserByEmail,
    notifyNewOrderUsingWhatsApp,
};