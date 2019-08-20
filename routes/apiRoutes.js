const {createMessage, getAllMessages, getOneMessage, updateMessage, deleteMessage} = require('../controllers/messageControllers');
const {createContact, getAll, getOne, deleteContact} = require('../controllers/contactController');
const {signUp, login} = require('../controllers/authControllers');
const isAuthenticated = require('../middleWares/isAuthenticated');
const router = require('express').Router();

router.post('/message', isAuthenticated, createMessage);
router.get('/message', isAuthenticated, getAllMessages);
router.get('/message/:id', isAuthenticated, getOneMessage);
router.put('/message/:id', isAuthenticated, updateMessage);
router.delete('/message/:id', isAuthenticated, deleteMessage);

router.post('/contact', isAuthenticated, createContact);
router.get('/contact', isAuthenticated, getAll);
router.get('/contact/:id', isAuthenticated, getOne);
router.delete('/contact/:id', isAuthenticated, deleteContact);

router.post('/sign_up', signUp);
router.post('/login', login);

module.exports = router;
