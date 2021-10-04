const router = require('express').Router();
const supplierCtrl = require('../controllers/purchase/supplierCtrl');
const purchaseEntryCtrl = require('../controllers/purchase/purchaseEntryCtrl');
const auth = require('../middleware/auth');
const PurchaseReturnCtrl = require('../controllers/purchase/purchaseReturnCtrl');

router.get('/suppliers', auth, supplierCtrl.index);
router.post('/suppliers', auth, supplierCtrl.store);

router.post('/idwisesupplierdata', auth, purchaseEntryCtrl.idwiseSupplierData);
router.post('/idwiseproductdata', auth, purchaseEntryCtrl.idwiseProductData);
router.post('/purchaseentry', auth, purchaseEntryCtrl.purchaseEntry);
router.post('/list', auth, purchaseEntryCtrl.purchaseList); // Purchase List
router.post('/purchasereturn', auth, PurchaseReturnCtrl.purchaseReturn);
router.post('/supplier-ledger', auth, supplierCtrl.supplierLedger);
router.post('/supplierwisepurchasecode', auth, PurchaseReturnCtrl.supplierwisePurchaseCode);
router.post('/invoicenowisepurchasedata', auth, PurchaseReturnCtrl.invoicenowisePurchaseData);



module.exports = router;