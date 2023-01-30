const { messagesInstance } = require('../services/database');

const getAllMessages = async () => {
    try {
        const messages = await messagesInstance.get();
        return messages;
    }
    catch (err) {
        console.log(err);
    }
}

const createMessage = async (req, res) => {
    try {
        await messagesInstance.create(req.body);
        res.status(200).send('Mensaje enviado con éxito!');
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}

module.exports = {
    getAllMessages,
    createMessage,
};