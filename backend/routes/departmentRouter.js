const router = require('express').Router();
const departmentCtrl = require('../controllers/departmentCtrl');
const auth = require('../middleware/auth');

router.get('/', auth, departmentCtrl.index);


module.exports = router;