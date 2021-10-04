import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CategoryList from './administration/category/Index';
import Product from './administration/productentry/Index';
import ProductNameList from './administration/productname/Index';
import ProductUnitList from './administration/productunit/Index';
import Dashboard from './Dashboard';
import DepartmentList from './department/Index';
import ProductStock from './inventory/ProductStock';
import Purchaseentry from './purchase/Purchaseentry';
import PurchaseRecord from './purchase/Purchaserecord';
import PurchaseReturn from './purchase/Purchasereturn';
import SupplierList from './purchase/Supplierentry';
import SupplierLedger from './purchase/SupplierLedger';
import CustomerList from './sales/Customerentry';
import SalesEntry from './sales/SalesEntry';
import SalesInvoice from './sales/SalesInvoice';
import SalesReturn from './sales/SalesReturn';


function Pages() {
    return (
        <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/department" exact component={DepartmentList} />
            {/* Administration Module starts */}
            <Route path="/product/categories" exact component={CategoryList} />
            <Route path="/productname" exact component={ProductNameList} />
            <Route path="/productunit" exact component={ProductUnitList} />
            <Route path="/product" exact component={Product} />
            {/* Sales Module starts */}
            <Route path="/customer" exact component={CustomerList} />
            <Route path="/product/sales/sales-entry" exact component={SalesEntry} />
            <Route path="/product/sales/sales-return" exact component={SalesReturn} />
            <Route path="/sales/sales-invoice/:invoiceNo" exact component={SalesInvoice} />
            <Route path="/sales/sales-invoice" exact component={SalesInvoice} />
            {/* Purchase Module starts */}
            <Route path="/supplier" exact component={SupplierList} />
            <Route path="/product/purchase" exact component={Purchaseentry} />
            <Route path="/product/purchase/return" exact component={PurchaseReturn} />
            <Route path="/product/purchase/record" exact component={PurchaseRecord} />
            <Route path="/purchase/supplier-ledger" exact component={SupplierLedger} />
            {/* Inventory Module starts */}
            <Route path="/inventory/product/stock" exact component={ProductStock} />
        </Switch>
    )
}

export default Pages
