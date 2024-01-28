const router = require('express').Router();
const { celebrate } = require('celebrate');
const { signupValidation, signinValidation } = require('../utils/joiSettings');
const { createUser, login } = require('../controllers/users');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const wrongPathRouter = require('./wrong');
const auth = require('../middlewares/auth');

// router.post('/signup', createUser);
// router.post('/signin', login);
router.post('/signup', celebrate(signupValidation), createUser);
router.post('/signin', celebrate(signinValidation), login);
router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
router.use('/*', wrongPathRouter);

module.exports = router;
