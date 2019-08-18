const {signUp, login} = require('../controllers/authControllers');
const router = require('express').Router();

router.post('/sign_up', signUp);
router.post('/login', login);

module.exports = router;
