const {createMessage, getAllMessages, getOneMessage, updateMessage, deleteMessage} = require('../controllers/messageControllers');
const {createContact, getAll, getOne, deleteContact} = require('../controllers/contactController');
const isAuthenticated = require('../middleWares/isAuthenticated');
const router = require('express').Router();

router.post('/message/send', isAuthenticated, createMessage);
router.get('/message/get_all', isAuthenticated, getAllMessages);
router.get('/message/get_one', isAuthenticated, getOneMessage);
router.put('/message/update/:id', isAuthenticated, updateMessage);
router.delete('/message/delete/:id', isAuthenticated, deleteMessage);

router.post('/contact/create', isAuthenticated, createContact);
router.get('/contact/get_all', isAuthenticated, getAll);
router.get('/contact/get_one/:id', isAuthenticated, getOne);
router.delete('/contact/delete/:id', isAuthenticated, deleteContact);

module.exports = router;
