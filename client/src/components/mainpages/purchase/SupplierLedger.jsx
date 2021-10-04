import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import swal from "sweetalert";
import { GlobalState } from '../../GlobalState';


function SupplierLedger() {
    // ---------------------------------------
    //         from GlobalState
    // ---------------------------------------
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [suppliers] = state.supplierAPI.suppliers;

    // ---------------------------------------
    //         Local State
    // ---------------------------------------
    const [supplier,setSupplier] = useState(null);
    const [supplierledger,setSupplierledger] = useState([]);
    const [fromdate,setFromdate] = useState('');
    const [todate,setTodate] = useState('');
    var TableBody;

    const dropdownSuppliers = [];
  suppliers.map((supplier, i) => {
    const ob = {
      suppliername: supplier["name"]+' - '+supplier["mobile"],
      supplierid: supplier["_id"],
    };
    dropdownSuppliers.push(ob);
    return true;
  });

    const data = {
        supplier : supplier,
        fromdate : fromdate,
        todate : todate
    };

    const supplierLedgerList = async (e) => {
      e.preventDefault();
      try{
          if(supplier === null ){
            swal('Supplier is missing!');
            setSupplierledger([]);
            return false;
          }
         const res = await axios.post('/api/purchase/supplier-ledger', {data: data}, {
            headers: {Authorization: token}
        });
        if(res.data.length === 0){
            swal('No data found in this criteria!');
        }
        setSupplierledger(res.data);
      }catch(err){
        // swal(err.response.data.msg, "success");
        swal(err.response.data.msg, '', "warning");
      }
    }

    // Number formatter
    var formatter = new Intl.NumberFormat('en-BD', {
        style: 'currency',
        currency: 'BDT',
      
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });

    if(supplierledger.length >0){
        TableBody = () =>{
           return (
            <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Supplier Ledger</h5>
              </div>
              <div className="card-block">
                <div className="dt-responsive table-responsive">
                  <table
                    id="simpletable"
                    className="table table-striped table-bordered nowrap"
                  >
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Bill</th>
                        <th>Paid</th>
                        <th>Bill Due</th>
                        <th>Returned</th>
                        <th>Received</th>
                        <th className="label-danger">Balance</th>
                      </tr>
                      <tr>
                        <th colSpan="7" className="text-center" >Opening Balance >></th>
                        <th>{formatter.format(600)}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supplierledger.map((ledger, i) => {
                        return (
                          <tr key={i}>
                            <td>{ledger["ledger_date"]}</td>
                            <td>{ledger["description"]}</td>
                            <td>{ledger["bill"]}</td>
                            <td>{ledger["paid"]}</td>
                            <td>{ledger["bill_due"]}</td>
                            <td>{ledger["returned"] === '' ? 0 : ledger["returned"]}</td>
                            <td>{ledger["received"]}</td>
                            <td className="pcoded-badge label label-danger"><span style={{fontWeight: "bolder",color: "#F0FFF0",fontSize:"15px"}}>{formatter.format(ledger["balance"])}</span></td>
                          </tr>
                        );
                      })}
                      <tr>
                        <th colSpan="7" className="text-center" >Closing Balance >></th>
                        <th>{formatter.format(757775.70)}</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
           )
       }
    }
    else{
        TableBody = () =>{
            return(<div></div>)
         }
    }
    
    return (
      <div className="row">
        <div className="col-lg-12" style={{ marginBottom: "-20px" }}>
          <div className="card">
            <div className="card-header">
              <h5>Supplier Ledger</h5>
            </div>
            <div className="card-block">
              <form autoComplete="off" onSubmit={supplierLedgerList}>
                <div className="row">
                  <div className="col-sm-3">
                  <Autocomplete
                        value={supplier}
                        getOptionSelected={(option, value) => option.suppliername === value.suppliername}
                        id="combo-box-demo"
                        options={dropdownSuppliers}
                        size="small"
                        onChange={(event, newValue) => {
                            setSupplier(newValue);
                        }}
                        getOptionLabel={(option) => (option ? option.suppliername : "")}
                        style={{ width: '100%' }}
                        renderInput={(params) => (
                        <TextField {...params} label="Select Supplier" variant="outlined" />
                        )}
                    />
                  </div>
                  <TextField
                        value={fromdate}
                        id="date"
                        label="From Date"
                        type="date"
                        style={{ marginTop: "-10px" }}
                        onChange={(e) => setFromdate(e.target.value)}
                        // className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                  
                  <div className="col-sm-2">
                  <TextField
                        value={todate}
                        id="date"
                        style={{ marginTop: "-10px" }}
                        label="To Date"
                        type="date"
                        onChange={(e) => setTodate(e.target.value)}
                        // className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                  </div>
                  <div className="col-sm-2">
                    <Button
                      style={{ width: "100%" }}
                      variant="contained"
                      color="primary"
                      type="submit"
                      startIcon={<SearchIcon />}
                    >
                      <b>Search</b>
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <TableBody />

      </div>
    );
}

export default SupplierLedger;
