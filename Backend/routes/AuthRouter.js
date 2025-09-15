const { signUp, login } = require('../controllers/AuthController');
const { signUpValidation, loginValidation } = require('../middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login',loginValidation, login)

router.post('/signUp',signUpValidation,signUp)

module.exports = router;