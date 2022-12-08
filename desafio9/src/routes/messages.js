const { Router } = require('express');
const { getOriginalMessages, normalizeMessages, denormalizeMessages } = require('../controllers/messages');
const router = Router();

router.get('/original', getOriginalMessages);
router.get('/normalizar', normalizeMessages);
router.get('/desnormalizar', denormalizeMessages);

module.exports = router;