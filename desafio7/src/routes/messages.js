const { Router } = require('express');
const { getAllMessages, createMessage } = require('../controllers/messages');
const router = Router();

// router.get('/', async (req, res)=>{
//     res.render('formulario')
// });

router.get('/', getAllMessages);
router.post('/', createMessage);

module.exports = router;