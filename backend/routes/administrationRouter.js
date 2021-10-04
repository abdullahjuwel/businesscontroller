const router = require('express').Router();
const categoryCtrl = require('../controllers/administration/categoryCtrl');
const productNameCtrl = require('../controllers/administration/productNameCtrl');
const productUnitCtrl = require('../controllers/administration/productUnitCtrl');
const productCtrl = require('../controllers/administration/productCtrl');
const auth = require('../middleware/auth');

router.get('/category', auth, categoryCtrl.index);
router.post('/category', auth, categoryCtrl.store);

router.get('/productname', auth, productNameCtrl.index);
router.post('/productname', auth, productNameCtrl.store);

router.get('/productunit', auth, productUnitCtrl.index);
router.post('/productunit', auth, productUnitCtrl.store);

router.get('/products', auth, productCtrl.index);
router.post('/products', auth, productCtrl.store);


module.exports = router;