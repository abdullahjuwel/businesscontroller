const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');

router.post('/register', userCtrl.register);

router.post('/login', userCtrl.login);

router.get('/refresh_token', userCtrl.refreshToken);
router.get('/logout', userCtrl.logout);

router.get('/infor', auth, userCtrl.getUser);


module.exports = router;