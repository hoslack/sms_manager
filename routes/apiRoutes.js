const {createMessage, getAllMessages, getOneMessage, updateMessage, deleteMessage} = require('../controllers/messageControllers');
const isAuthenticated = require('../middleWares/isAuthenticated');
const router = require('express').Router();

router.post('/send', isAuthenticated, createMessage);
router.get('/read_all', isAuthenticated, getAllMessages);
router.get('/read_one', isAuthenticated, getOneMessage);
router.put('/update/:d', isAuthenticated, updateMessage);
router.delete('/delete/:id', isAuthenticated, deleteMessage);

module.exports = router;
