const { normalize, schema, denormalize } = require('normalizr');
const filesystem = require('fs');
const path = require('path');
// const { fileURLToPath } = require('url');
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const inputPath = path.resolve(__dirname, '../../data/messages.json');
// const inputPath = path.join(__dirname, '../data/messages.json');

const author = new schema.Entity('author', {}, { 
    idAttribute: 'email' 
});

const message = new schema.Entity(
    'message',
    {
        author: author,
    },
    { idAttribute: 'id' }
);

const messageSchema = new schema.Array(message);

const getOriginalMessages = async (req, res) => {
    try {
        const originalMessages = JSON.parse(filesystem.readFileSync(inputPath));

        res.status(200).json({
            originalMessages,
        });
    } catch (err) {
        res.status(500).json({
            msg: 'Error al traer los mensajes'
        })
    }
}

const normalizeMessages = async (req, res) => {
    try {
        const originalData = JSON.parse(filesystem.readFileSync(inputPath));
        const normalizedData = normalize(originalData, messageSchema);
        const normalizedDataPath = path.join(__dirname, '../data/normalize.json');
        let content = JSON.stringify(normalizedData, null, '\t');
        filesystem.writeFileSync(normalizedDataPath, content);

        res.status(200).json({
            normalizedData,
        })
    } catch (err) {
        res.status(500).json({
            msg: 'Error al normalizar los mensajes'
        })
    }
}

const denormalizeMessages = async (req, res) => {
    try {
        const normalizedDataPath = path.resolve(__dirname, '../data/normalize.json');
        const normalizedData = JSON.parse(filesystem.readFileSync(normalizedDataPath));
        const denormalizedData = denormalize( normalizedData.result, messageSchema, normalizedData.entities);

        res.status(200).json({
            denormalizedData
        })
    } catch (err) {
        res.status(500).json({
            msg: 'Error al desnormalizar los mensajes'
        })
    }
}

module.exports = {
    getOriginalMessages,
    normalizeMessages,
    denormalizeMessages
}