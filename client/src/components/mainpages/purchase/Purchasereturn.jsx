import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SaveIcon from '@material-ui/icons/Save';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import React, { useContext, useEffect, useState } from "react";
import swal from "sweetalert";
import { GlobalState } from "../../GlobalState";

function Purchasereturn() {
// ---------------------------------------
//         from GlobalState
// ---------------------------------------
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [suppliers] = state.supplierAPI.suppliers;
  // ---------------------------------------
//         from Local
// ---------------------------------------
  const [supplier, setSupplier] = useState(null);
  const [codes, setCodes] = useState([]);
  const [code, setCode] = useState(null);
  const [cart,setCart] = useState([]);
  const [callback,setCallback] = useState(false);
  const [returndate,setReturndate] = useState('');
  
  const purchaseReturnSubmit = async () => {

    if(code == null){
      swal('Invoice no is empty!');
      return false;
    }
    else if(returndate === ''){
      swal('Return date is empty!');
      return false;
    }
    
    try{
      const data = {
        invoiceno : code,
        cart : [...cart],
        supplier : supplier,
        returndate : returndate,
      }
      const res = await axios.post('/api/purchase/purchasereturn', 
      { data }, 
      { headers: {Authorization: token}
    });
    console.log(res.data.msg);
    swal({
      text: res.data.msg,
      icon: "success",
      buttons: true,
      dangerMode: false,
    })
    .then((willDelete) => {
      if (willDelete) {
        window.location.href = '/product/purchase/return';
      } else {
        swal("Your imaginary file is safe!");
      }
    });

    }catch(err){
      swal(err.response.data.msg);
    }
  }
  

  const dropdownSuppliers = [];
  suppliers.map((supplier, i) => {
    const ob = {
      suppliername: supplier["name"]+' - '+supplier["mobile"],
      supplierid: supplier["_id"],
    };
    dropdownSuppliers.push(ob);
    return true;
  });

  useEffect(() =>{
   if(code !== null){
    setCart([]);
   }
  },[code])


useEffect(() => {
    if(token){
        if(supplier != null){
          const getData = async()=>{
              const response = await axios.post('/api/purchase/supplierwisepurchasecode',
              {supplier},
              {headers: {Authorization: token} });
              setCode(null);
              setCart([]);
              setCodes(response.data);
              setCode(response.data[0]);
             }
             getData();
        }else{
            setCart([]);
            setCodes([]);
            setCode(null);
        }
    }
  },[token,supplier]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(code === null){
      swal('Invoice no is empty!','','warning');
      return false;
    }
    const getPurchaseData = async()=>{
        const response = await axios.post('/api/purchase/invoicenowisepurchasedata',
        {code},
        {headers: {Authorization: token} });
        // console.log(response.data[0].cart);
        setCart([]);
        setCart(response.data[0].cart);
       }
       getPurchaseData();
  };

  const handleTextChange = (e) => {
    cart.map((item, i) =>{
      if(e.target.id === item.productid && e.target.value !== ''){
        if(parseInt(e.target.value) > parseInt(item.rest_qty)){
          e.target.value = 0;
          item.returnqty =0;
          item.returnamount = 0;
          swal('Return quantity is greater than item quantity!','','warning');
        }
        else{
          item.returnamount = e.target.value * item.purchase_rate;
          item.returnqty = parseInt(e.target.value);
          console.log(item.returnqty)
        }
      }
      setCallback(!callback);
      return true;
    })
  }

  useEffect(() =>{
    cart.map((item, i) =>{
      item.returnamount = 0;
      item.returnqty = 0;
      // console.log(item.returnqty)
      return true;
    })
  },[cart]);
  
  return (
    <div className="row">
      <div className="col-lg-12" style={{ marginBottom: "-20px" }}>
        <div className="card">
          <div className="card-header">
            <h5>Purchase Return Entry</h5>
          </div>
          <div className="card-block">
            <form autoComplete="off" onSubmit={handleSubmit}>
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
                        <TextField {...params} label="Choose a supplier" variant="outlined" />
                        )}
                    />
                 </div>
                 <div className="col-sm-2">
                    <Autocomplete
                        value={code}
                        getOptionSelected={(option, value) => option === value}
                        id="combo-box-demo"
                        options={codes}
                        size="small"
                        onChange={(event, newValue) => {
                            setCode(newValue);
                          }}
                        getOptionLabel={(option) => (option)}
                        style={{ width: '100%' }}
                        renderInput={(params) => (
                        <TextField {...params} label="Purchase Invoice" variant="outlined" />
                        )}
                    />
                 </div>
                 <div className="col-sm-2">
                  <Button
                    style={{ width: "100%",outline:'none' }}
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<SearchIcon />}
                  >
                    <b>SEARCH</b>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-sm-12">
        <div className="card">
          <div className="card-header">
            
          </div>
          <div className="card-block">
          <div className="row">
              <div className="col-sm-11">
                      <TextField
                        value={returndate}
                        id="date"
                        label="Return Date"
                        type="date"
                        onChange={(e) => setReturndate(e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
              </div>
              <div className="col-sm-1">
                  <Button
                    style={{ width: "100%",height: '100%',outline:'none',textAlign:'center' }}
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={purchaseReturnSubmit}
                    startIcon={<SaveIcon />}>
                  </Button>
              </div>
            </div>
            <div className="dt-responsive table-responsive">
              <table
                id="simpletable"
                className="table table-striped table-bordered nowrap"
              >
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Initial Qty</th>
                    <th>Initial Amount</th>
                    <th>Already Ret. Qty</th>
                    <th width="15%">Return Qty</th>
                    <th width="15%">Return Rate</th>
                    <th>Return Amount</th>
                  </tr>
                </thead>
                <tbody>
                
                {cart.map((item, i) => {
                      return (
                      <tr key={i}>
                        <td>{item.prod_name}</td>
                        <td>{item.qty +' '+item.unit}</td>
                        <td>{item.price}</td>
                        <td>{item.qty - item.rest_qty}</td>
                        <td>
                        <TextField
                            style={{ width: "100%" }}
                            id={`${item.productid}`}
                            label="Return qty"
                            variant="outlined"
                            defaultValue='0'
                            size="small"
                            onChange={(e) => handleTextChange(e)}
                            name="retqty"
                            type="number"
                        />
                        </td>
                        <td>
                        <TextField
                            value={item.purchase_rate}
                            style={{ width: "100%" }}
                            label="Return amount"
                            variant="outlined"
                            size="small"
                            name="retamount"
                            type="number"
                        />
                        </td>
                        <td>{item.returnamount}</td>
                      </tr>
                 );
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Purchasereturn;
