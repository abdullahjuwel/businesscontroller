const router = require('express').Router();
const supplierCtrl = require('../controllers/purchase/supplierCtrl');
const auth = require('../middleware/auth');
const InventoryCtrl = require('../controllers/inventory/inventoryCtrl');

router.post('/product/stock', auth, InventoryCtrl.productStock);

module.exports = router;