
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from '@material-ui/icons/Save';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
// import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import swal from "sweetalert";
import { GlobalState } from '../../GlobalState';
import Loader from '../utils/loading/Loading';


const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(-0.7),
        
      },
    },
  }));

function SalesEntry() {

  // for loader 
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 500)
  }, []);
  
// ---------------------------------------
//         from GlobalState
// ---------------------------------------
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [customers] = state.customerAPI.customers;
    const [products] = state.productAPI.products;
    const [users] = state.usersAPI.users;
    // const params = useParams()
// ---------------------------------------
//            Local state
// ---------------------------------------
  const [customer,setCustomer] = useState(null);
  const [address,setAddress] = useState('');
  const [mobile,setMobile] = useState('');
  const [currentdue,setCurrentdue] = useState('');
  const [product,setProduct] = useState(null);
  const [purchaserate,setPurchaserate] = useState('');
  const [salerate,setSalerate] = useState('');
  const [unit,setUnit] = useState('');
  const [quantity,setQuantity] = useState(0);
  const [stockqty,setStockqty] = useState(0);
  const [price,setPrice] = useState(0);
  const [vat,setVat] = useState(0);
  const [vatpercent,setVatpercent] = useState(0);
  const [discount,setDiscount] = useState(0);
  const [discountpercent,setDiscountpercent] = useState(0);
  const [transportcost,setTransportcost] = useState(0);
  const [paid,setPaid] = useState(0);
  const [due,setDue] = useState(0);
  const [cart] = useState([]);
  const [callback,setCallback] = useState(false);
  const [invoiceno,setInvoiceno] = useState('');
  const [user,setUser] = useState(null);
  const [saledate,setSaledate] = useState('');
  const [subtotal,setSubtotal] = useState(0);
  const [grandtotal,setGrandtotal] = useState(0);
  // const [value, setValue] = React.useState(new Date());

  const purchase = async (e) => {
    e.preventDefault();
    try{
      const data = {
        invoiceno : invoiceno,
        user : user,
        saledate : saledate,
        customer : 
        {
          ...customer,
          address,
          mobile,
        },
        cart : [...cart],
        currentdue : currentdue,
        subtotal : subtotal,
        vat : vat,
        discount : discount,
        transportcost : transportcost,
        grandtotal : grandtotal,
        paid : paid,
        due : due,
      }
      
      const res = await axios.post('/api/sales/salesentry', 
      { data }, 
      { headers: {Authorization: token}
    });
    // console.log(res.data.invoiceNo);
    swal({
      text: res.data.msg,
      icon: "success",
      buttons: true,
      dangerMode: false,
    })
    .then((willDelete) => {
      if (willDelete) {
        window.location.href = `/sales/sales-invoice/${res.data.invoiceNo}`;
      } else {
        window.location.href = '/product/sales/sales-entry';
      }
    });

    }catch(err){
      setQuantity(0);
      swal(err.response.data.msg);
    }
  }
  const addToCart = (e) => {
    e.preventDefault();
    if(product === null){
        swal('Product not selected');
        return false;
    }
    if(parseInt(stockqty) < parseInt(quantity)){
      swal('Quantity is greater than Stock!');
      setQuantity(0);
      return false;
  }
    var exists = false; 
    const item = {
        productid : product.productid,
        prod_name : product.productname,
        purchase_rate : purchaserate,
        sale_rate : salerate,
        qty : quantity,
        stockqty : stockqty,
        unit : unit,
        rest_qty : quantity,
        price : price,
        returnqty : 0,
        returnamount : 0
    };
    var sum = 0;
	 	if (cart.length > 0) {            
	 		cart.map((value,index) =>{
                if (value.productid === item.productid) {            
                    value.qty = parseInt(item.qty);
                    value.price = parseFloat(value.sale_rate) * parseFloat(item.qty);
                    exists = true;                                      
                }  
                sum += value.price;
                // setGrandtotal(sum);
                // console.log(sum)
                return false;
             }) 
             setSubtotal(sum);      
	 	}
      
	 	if (!exists) {             
	 		cart.push(item); 
       sum += item.price;
       setSubtotal(sum); 
            // console.log(cart) 
	 	} 
    setProduct(null);
    setPurchaserate('');
    setSalerate('');
    setQuantity(0);
    setCallback(!callback);

  }
// remove item from the cart
  const removeProduct = id => {
      swal({
        text: "Do you want to delete this product?",
        
        buttons: true,
        dangerMode: false,
      })
      .then((willDelete) => {
        if (willDelete) {
          cart.forEach((item, index) => {
            if (item.productid === id) {
                cart.splice(index, 1); 
                var st = parseFloat(subtotal) - parseFloat(item.sale_rate) * parseFloat(item.qty);
                setSubtotal(st);
            }
        })
        setCallback(!callback);
        } 
      });
}

  const dropdownCustomers = [];
  customers.map((customer, i) => {
    const ob = {
      customername: customer["institute"]+' - '+customer["name"],
      customerid: customer["_id"],
    };
    dropdownCustomers.push(ob);
    return true;
  });

  const dropdownUsers = [];
  users.map((user, i) => {
    const ob = {
      username: user["name"],
      userid: user["_id"],
    };
    dropdownUsers.push(ob);
    return true;
  });

  const dropdownProducts = [];
  products.map((product, i) => {
    const ob = {
      productname: product['product'].productname,
      productid: product["_id"],
    };
    dropdownProducts.push(ob);
    return true;
  });

    useEffect(() =>{
        if(token){
            try{
              if(customer !== null){
               const getData = async()=>{
                const response = await axios.post('/api/sales/idwisecustomerdata',
                {customer},
                {headers: {Authorization: token} });
                setAddress(response.data.address);
                setMobile(response.data.mobile);
                setCurrentdue(response.data.previous_due);
               }
               getData();
              }else{
                setAddress('');
                setMobile('');
              }
            }catch(err){
                alert(err.response.data.msg)
            }
        }
    },[customer,token])

    useEffect(() => {
      if(token){
          if(product != null){
            const getData = async()=>{
                const response = await axios.post('/api/sales/idwiseproductdata',
                {product},
                {headers: {Authorization: token} });
                setPurchaserate(response.data['purchaserate']);
                setSalerate(response['data']['salerate']);
                setStockqty(response['data']['stockqty']);
                setUnit(response['data']['productunit']);
                document.getElementById('hideShowRate').innerHTML = '******';
               }
               getData();
          }else{
            setPurchaserate('');
            setSalerate('');
            setQuantity('');
            setStockqty(0);
            setUnit('');
          }
      }
    },[token,product])

    useEffect(() =>{
      const tot = salerate * quantity;
      setPrice(tot);
    },[quantity,salerate])

   var hideShowPurchaseRate = (e) => {
       
       if(e.target.getAttribute('flag') === '0' && purchaserate !== ''){
        document.getElementById('hideShowRate').innerHTML = purchaserate;
        e.target.setAttribute('flag',1);
       }
       else if(e.target.getAttribute('flag') === '1'){
        document.getElementById('hideShowRate').innerHTML = '******';
        e.target.setAttribute('flag',0);
       }
       else if(e.target.getAttribute('flag') === '0' && purchaserate === ''){
        document.getElementById('hideShowRate').innerHTML = '0';
        e.target.setAttribute('flag',1);
       }
   }

    // useEffect(() => {
    //     if(params.id){
    //         console.log(params.id);
            
    //     }
    // },[params.id])

    

    // Vat Percentage calculation
    // useEffect(() =>{
    //   if(total !== 0){
    //     const vatp = (vat * 100)/total;
    //     setVatpercent(vatp);
    //   }
    //   else{
    //     setVatpercent(0);
    //   }
      
    // },[total,vat])


   // Vat calculation
    useEffect(() =>{
      if(subtotal !== 0){
        const vatamount = parseFloat((vatpercent * subtotal)/100).toFixed(2);
        const discountamount = parseFloat((discountpercent * subtotal)/100).toFixed(2);
        setVat(vatamount);
        setDiscount(discountamount);
      }
      else{
        setVat(0);
        setDiscount(0);
        setTransportcost(0);
      }

      if(vat === 0 && discount === 0 && transportcost === 0){
        setGrandtotal(subtotal);
      }
      else{
        const grdtotal = parseFloat(subtotal)+parseFloat(vat)-parseFloat(discount) + parseFloat(transportcost);
        setGrandtotal(grdtotal);
      }
    },[subtotal,vat,grandtotal,vatpercent,discount,discountpercent,transportcost]);



    useEffect(() =>{
      if(isNaN(parseFloat(paid)) || paid === 0){
         setDue(grandtotal);
      }
      else if(parseFloat(paid) > parseFloat(grandtotal)){
         swal('Invalid amount!');
         setPaid(0);
      }
      else{
        const finaldue = parseFloat(grandtotal) - parseFloat(paid);
        setDue(parseFloat(finaldue).toFixed(2));
      }
    },[grandtotal,paid])
 
   
    const classes = useStyles();
    if(loading) return <div><Loader /></div>
    return (
      <div className="row">
        <div className="col-lg-12" style={{ marginBottom: "-20px" }}>
          <div className="card">
            <div className="card-header">
              <div className="row">
              <div className="col-sm-3">
                    <TextField
                      style={{ width: "100%"}}
                      autoComplete="off"
                      id="outlined-basic"
                      label="Invoice no"
                      variant="outlined"
                      size="small"
                      value={invoiceno}
                      onChange={(e) => setInvoiceno(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-3">
                    <Autocomplete
                        value={user}
                        getOptionSelected={(option, value) => option.username === value.username}
                        id="combo-box-demo"
                        options={dropdownUsers}
                        size="small"
                        onChange={(event, newValue) => {
                          setUser(newValue);
                        }}
                        getOptionLabel={(option) => (option ? option.username : "")}
                        style={{ width: '100%' }}
                        renderInput={(params) => (
                        <TextField {...params} label="Sales by" variant="outlined" />
                        )}
                    />
                  </div>
                  <div className="col-sm-3">
                      <TextField
                        value={saledate}
                        id="date"
                        label="Sales Date"
                        type="date"
                        onChange={(e) => setSaledate(e.target.value)}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                  </div>
                  
                  <div className="col-sm-2" style={{backgroundImage : 'linear-gradient(to left,#e0f7fa 0,#e0f7fa 100%)',borderRadius:'10px',padding: '10px',textAlign:'center'}}><strong>Stock : {stockqty} {unit}</strong></div>
                  <div className="col-sm-1"><strong><span style={{cursor:'pointer',backgroundImage : 'linear-gradient(to left,#e0f7fa 0,#e0f7fa 100%)',borderRadius:'10px',padding: '10px',textAlign:'center'}} id="hideShowRate" flag="0" onClick={hideShowPurchaseRate}>******</span></strong></div>

              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-xl-8">
          <div className="card">
            <div className="card-header">
              <h5><strong>Sales Module</strong> (Customer & product information)</h5>
            </div>
            <div className="card-block">
              <form className={classes.root} autoComplete="off" onSubmit={addToCart}>
                <div className="row form-group">
                  <div className="col-sm-6">
                    <Autocomplete
                        value={customer}
                        getOptionSelected={(option, value) => option.customername === value.customername}
                        id="combo-box-demo"
                        options={dropdownCustomers}
                        size="small"
                        onChange={(event, newValue) => {
                            setCustomer(newValue);
                          }}
                        getOptionLabel={(option) => (option ? option.customername : "")}
                        style={{ width: '100%' }}
                        renderInput={(params) => (
                        <TextField {...params} label="Choose a customer" variant="outlined" />
                        )}
                    />
                  </div>
                  <div className="col-sm-6">
                  <Autocomplete
                        value={product}
                        getOptionSelected={(option, value) => option.productname === value.productname}
                        id="combo-box-demo"
                        options={dropdownProducts}
                        size="small"
                        onChange={(event, newValue) => {
                            setProduct(newValue);
                          }}
                        getOptionLabel={(option) => (option ? option.productname : "")}
                        style={{ width: '100%' }}
                        renderInput={(params) => (
                        <TextField {...params} label="Choose a product" variant="outlined" />
                        )}
                    />
                  </div>
                  {/* <div className="col-sm-1" style={{backgroundImage : 'linear-gradient(to left,#e0f7fa 0,#e0f7fa 100%)'}}>160 Pcs</div> */}
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <TextField
                      readOnly 
                      style={{ width: "100%", marginBottom: "13px" }}
                      id="outlined-basic"
                      label="Customer mobile"
                      variant="outlined"
                      value={mobile}
                      size="small"
                    />
                  </div>
                  <div className="col-sm-3">
                    <TextField
                      style={{ width: "100%", marginBottom: "13px" }}
                      id="outlined-basic"
                      label="Sale rate"
                      type="Number"
                      variant="outlined"
                      onChange={(e) =>setSalerate(e.target.value)}
                      value={salerate}
                      size="small"
                    />
                  </div>
                  <div className="col-sm-3">
                    <TextField
                      style={{ width: "100%", marginBottom: "13px" }}
                      id="outlined-basic"
                      label="Quantity"
                      variant="outlined"
                      onChange={(e) =>setQuantity(e.target.value)}
                      value={quantity}
                      size="small"
                      type="Number"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <TextField
                      readOnly
                      style={{ width: "100%", marginBottom: "10px" }}
                      id="outlined-basic"
                      label="Customer address"
                      value={address}
                      variant="outlined"
                      size="small"
                    />
                  </div>
                  <div className="col-sm-3">
                    <TextField
                      style={{ width: "100%", marginBottom: "10px" }}
                      id="outlined-basic"
                      label="Price"
                      variant="outlined"
                      value={price}
                      size="small"
                      type="Number"
                    />
                  </div>
                  <div className="col-sm-3">
                    <Button
                      style={{ width: "97%" }}
                      variant="contained"
                      color="primary"
                      size="small"
                      type="submit"
                      startIcon={<ShoppingBasketIcon />}
                    >
                      <b>ADD TO CART</b>
                    </Button>
                  </div>
                </div>
              </form>
              <div className="row">
                <div className="col-sm-12" style={{ marginLeft: "-5px" }}>
                  <div className="dt-responsive table-responsive">
                    <table className="table table-striped table-bordered nowrap">
                      <thead>
                        <tr>
                          <th>SL</th>
                          <th>Product</th>
                          <th>Sale Rate</th>
                          <th>Quantity</th>
                          <th>Item Total</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                      {cart.map((itemm, i) => {
                      return (
                      <tr key={i}>
                        <td>{++i}</td>
                        <td>{itemm['prod_name']}</td>
                        <td>{itemm['sale_rate']}</td>
                        <td>{itemm['qty'] +' '+ itemm['unit']}</td>
                        <td>{itemm['price']}</td>
                        <td>
                          <DeleteIcon
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => {
                              removeProduct(itemm.productid)
                            }}
                          />
                        </td>
                      </tr>
                      
                    );
                  })}
                     <tr>
                       <td style={{textAlign:'center'}} colSpan="4"><b>Sub Total</b></td>
                       <td><b>{subtotal}/-</b></td>
                       <td></td>
                     </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-12 col-xl-4">
          {/* Time card start */}
          <div className="card">
            <div className="card-header">
              <h5>Amount Details</h5>
            </div>
            <div className="card-block">
              <form className={classes.root} autoComplete="off" onSubmit={purchase}>
                <div className="row form-group">
                  <div className="col-sm-6">
                    <TextField
                      style={{ width: "100%" }}
                      id="outlined-basic"
                      label="Subtotal"
                      variant="outlined"
                      size="small"
                      type="Number"
                      value={subtotal}
                    />
                  </div>
                  <div className="col-sm-6">
                    <TextField
                      style={{ width: "100%" }}
                      id="outlined-basic"
                      label="Current due"
                      variant="outlined"
                      value={currentdue}
                      size="small"
                      type="Number"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <TextField
                      style={{ width: "100%", marginBottom: "10px" }}
                      id="outlined-basic"
                      label="Vat(Tk)"
                      variant="outlined"
                      size="small"
                      type="Number"
                      value={vat}
                    />
                  </div>
                  <div className="col-sm-6">
                    <TextField
                      value={vatpercent}
                      style={{ width: "100%", marginBottom: "10px" }}
                      id="outlined-basic"
                      label="Vat(%)"
                      variant="outlined"
                      size="small"
                      type="Number"
                      onChange={(e) =>setVatpercent(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <TextField
                      style={{ width: "100%", marginBottom: "10px" }}
                      id="outlined-basic"
                      label="Discount(Tk)"
                      variant="outlined"
                      size="small"
                      type="Number"
                      value={discount}
                    />
                  </div>
                  <div className="col-sm-6">
                    <TextField
                      value={discountpercent}
                      style={{ width: "100%", marginBottom: "10px" }}
                      id="outlined-basic"
                      label="Discount(%)"
                      variant="outlined"
                      size="small"
                      type="Number"
                      onChange={(e) =>setDiscountpercent(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <TextField
                      style={{ width: "100%", marginBottom: "10px" }}
                      id="outlined-basic"
                      label="Grand Total"
                      variant="outlined"
                      size="small"
                      type="Number"
                      value={grandtotal}
                    />
                  </div>
                  <div className="col-sm-6">
                    <TextField
                      style={{ width: "100%", marginBottom: "10px" }}
                      id="outlined-basic"
                      label="Transport cost"
                      variant="outlined"
                      size="small"
                      type="Number"
                      value={transportcost}
                      onChange={(e) =>setTransportcost(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <TextField
                      style={{ width: "100%", marginBottom: "10px" }}
                      id="outlined-basic"
                      label="Paid"
                      variant="outlined"
                      size="small"
                      type="Number"
                      value={paid}
                      onChange={(e) =>setPaid(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <TextField
                      style={{ width: "100%", marginBottom: "10px" }}
                      id="outlined-basic"
                      label="Due"
                      variant="outlined"
                      size="small"
                      value={due}
                      type="Number"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                  <Button
                      style={{ width: "97%" }}
                      variant="contained"
                      color="primary"
                      size="small"
                      type="submit"
                      startIcon={<SaveIcon />}
                    >
                      <b>PURCHASE</b>
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}

export default SalesEntry
