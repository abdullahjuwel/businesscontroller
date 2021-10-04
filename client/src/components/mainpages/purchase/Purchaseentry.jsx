
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


const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(-0.7),
        
      },
    },
  }));

function Purchaseentry() {
// ---------------------------------------
//         from GlobalState
// ---------------------------------------
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [suppliers] = state.supplierAPI.suppliers;
    const [products] = state.productAPI.products;
    const [users] = state.usersAPI.users;
    // const params = useParams()
// ---------------------------------------
//            Local state
// ---------------------------------------
  const [supplier,setSupplier] = useState(null);
  const [address,setAddress] = useState('');
  const [mobile,setMobile] = useState('');
  const [currentdue,setCurrentdue] = useState('');
  const [product,setProduct] = useState(null);
  const [purchaserate,setPurchaserate] = useState('');
  const [unit,setUnit] = useState('');
  const [quantity,setQuantity] = useState(0);
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
  const [purchasedate,setPurchasedate] = useState('');
  const [subtotal,setSubtotal] = useState(0);
  const [grandtotal,setGrandtotal] = useState(0);
  // const [value, setValue] = React.useState(new Date());
  const purchase = async (e) => {
    e.preventDefault();
    try{
      const data = {
        invoiceno : invoiceno,
        user : user,
        purchasedate : purchasedate,
        supplier : 
        {
          ...supplier,
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
      
      const res = await axios.post('/api/purchase/purchaseentry', 
      { data }, 
      { headers: {Authorization: token}
    });
    swal({
      text: res.data.msg,
      icon: "success",
      buttons: true,
      dangerMode: false,
    })
    .then((willDelete) => {
      if (willDelete) {
        window.location.href = '/product/purchase';
      } else {
        swal("Your imaginary file is safe!");
      }
    });

    }catch(err){
      swal(err.response.data.msg);
    }


  }
  const addToCart = (e) => {
    e.preventDefault();
    if(product === null){
        swal('Product not selected');
        return false;
    }
    var exists = false; 
    const item = {
        productid : product.productid,
        prod_name : product.productname,
        purchase_rate : purchaserate,
        qty : quantity,
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
                    value.price = parseFloat(value.purchase_rate) * parseFloat(item.qty);
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
    setQuantity(0);
    setCallback(!callback);

  }

  const dropdownSuppliers = [];
  suppliers.map((supplier, i) => {
    const ob = {
      suppliername: supplier["institute"]+' - '+supplier["name"],
      supplierid: supplier["_id"],
    };
    dropdownSuppliers.push(ob);
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
              if(supplier !== null){
               const getData = async()=>{
                const response = await axios.post('/api/purchase/idwisesupplierdata',
                {supplier},
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
    },[supplier,token])

    useEffect(() => {
      if(token){
          if(product != null){
            const getData = async()=>{
                const response = await axios.post('/api/purchase/idwiseproductdata',
                {product},
                {headers: {Authorization: token} });
                setPurchaserate(response.data['purchaserate']);
                setUnit(response.data['unit']);
               }
               getData();
          }else{
            setPurchaserate('');
            setQuantity('');
            setUnit('');
          }
      }
    },[token,product])

    useEffect(() =>{
        const tot = purchaserate * quantity;
        setPrice(tot);
    },[quantity,purchaserate])

   

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
    return (
      <div className="row">
        <div className="col-lg-12" style={{ marginBottom: "-20px" }}>
          <div className="card">
            <div className="card-header">
              <div className="row">
              <div className="col-sm-2">
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
                  <div className="col-sm-7">
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
                        style={{ width: '40%' }}
                        renderInput={(params) => (
                        <TextField {...params} label="Purchased by" variant="outlined" />
                        )}
                    />
                  </div>
                  <div className="col-sm-3">
                      <TextField
                        value={purchasedate}
                        id="date"
                        label="Purchase Date"
                        type="date"
                        onChange={(e) => setPurchasedate(e.target.value)}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-xl-8">
          <div className="card">
            <div className="card-header">
              <h5><strong>Purchase Module</strong> (Supplier & product information)</h5>
            </div>
            <div className="card-block">
              <form className={classes.root} autoComplete="off" onSubmit={addToCart}>
                <div className="row form-group">
                  <div className="col-sm-6">
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
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <TextField
                      readOnly 
                      style={{ width: "100%", marginBottom: "13px" }}
                      id="outlined-basic"
                      label="Supplier mobile"
                      variant="outlined"
                      value={mobile}
                      size="small"
                    />
                  </div>
                  <div className="col-sm-3">
                    <TextField
                      style={{ width: "100%", marginBottom: "13px" }}
                      id="outlined-basic"
                      label="Purchase rate"
                      type="Number"
                      variant="outlined"
                      onChange={(e) =>setPurchaserate(e.target.value)}
                      value={purchaserate}
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
                      label="Supplier address"
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
                          <th>Purchase Rate</th>
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
                        <td>{itemm['purchase_rate']}</td>
                        <td>{itemm['qty'] +' '+ itemm['unit']}</td>
                        <td>{itemm['price']}</td>
                        <td>
                          <DeleteIcon
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => {
                              return swal("okkkk");
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

export default Purchaseentry
