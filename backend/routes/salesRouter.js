const router = require('express').Router();
const customerCtrl = require('../controllers/sales/customerCtrl');
const auth = require('../middleware/auth');
const salesEntryCtrl = require('../controllers/sales/salesEntryCtrl');
const SalesReturnCtrl = require('../controllers/sales/salesReturnCtrl');
const SalesInvoiceCtrl = require('../controllers/sales/SalesInvoiceCtrl');

router.get('/customers', auth, customerCtrl.index);
router.post('/customers', auth, customerCtrl.store);

router.post('/idwisecustomerdata', auth, salesEntryCtrl.idwiseCustomerData);
router.post('/idwiseproductdata', auth, salesEntryCtrl.idwiseProductData);
router.post('/salesentry', auth, salesEntryCtrl.salesEntry);
router.post('/salesreturn', auth, SalesReturnCtrl.salesReturn);
router.post('/customerwisesalescode', auth, SalesReturnCtrl.customerwiseSalesCode);
router.post('/invoicenowisesalesdata', auth, SalesReturnCtrl.invoicenowiseSalesData);
router.post('/salesinvoicedata', auth, SalesInvoiceCtrl.salesInvoiceData); // Sales Invoice
router.get('/allsalescode', auth, SalesInvoiceCtrl.allSalesCode); // All Sales Invoice codes



module.exports = router;