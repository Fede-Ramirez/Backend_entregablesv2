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
        subject: 'Nuevo usuario creado',
        html: `Un nuevo usuario ha sido creado. Ve su información a continuación:\n\n\n ${userData}`,
    };
    const response = await gmailTransporter.sendMail(mailOptions);
    return response;
};

const notifyNewOrderUsingWhatsApp = async (orderData) => {
    const params = {
        body: `Una nueva orden ha sido solicitada. Ver la información aquí debajo:\n\n\n ${orderData}`,
        from: `whatsapp:${config.TWILIO_WSP_CELLPHONE}`,
        to: `whatsapp:${config.ADMIN_PHONE}`,
    };

    const response = await twilioAPI.messages.create(params);
    return response;
};

const NotificationService = {
    notifyNewUserByEmail,
    notifyNewOrderUsingWhatsApp,
};

module.exports = NotificationService;