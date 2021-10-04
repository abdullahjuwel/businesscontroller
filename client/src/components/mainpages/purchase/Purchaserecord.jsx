import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import swal from 'sweetalert';
import { GlobalState } from '../../GlobalState';


function Purchaserecord() {
    // ---------------------------------------
    //         from GlobalState
    // ---------------------------------------
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [suppliers] = state.supplierAPI.suppliers;
    const [products] = state.productAPI.products;
    const [users] = state.usersAPI.users;
    const [callback, setCallback] = state.categoriesAPI.callback;

    // ---------------------------------------
    //         Local State
    // ---------------------------------------
    const [searchtype,setSearchtype] = useState(null);
    const [supplier,setSupplier] = useState(null);
    const [product,setProduct] = useState(null);
    const [user,setUser] = useState(null);
    const [purchaselist,setPurchaselist] = useState([]);
    const [fromdate,setFromdate] = useState('');
    const [todate,setTodate] = useState('');
    var Anonymous,TableBody;

    const dropdownSuppliers = [];
  suppliers.map((supplier, i) => {
    const ob = {
      suppliername: supplier["name"]+' - '+supplier["mobile"],
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
    
        if(searchtype && searchtype != null){
            if(searchtype.typeId === 'S'){
               Anonymous = () =>{
                return (
                        <div className="col-sm-2">
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
                    )
                }
            }
            else if(searchtype.typeId === 'P'){
                  Anonymous = () =>{
                    return (
                        <div className="col-sm-2">
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
                            <TextField {...params} label="Select Product" variant="outlined" />
                            )}
                          />
                        </div>
                    )
                }
            }
            else if(searchtype.typeId === 'U'){
                Anonymous = () =>{
                    return (
                        <div className="col-sm-2">
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
                            <TextField {...params} label="Select User" variant="outlined" />
                            )}
                          />
                        </div>
                    )
                }
              }
            else if(searchtype.typeId === 'A'){
                Anonymous = () =>{
                return (<div></div>)
                }
              }
            }
            else{
            Anonymous = () =>{
                return (<div></div>)
            }
        }

    const dropdownSearchTypes = [
        { type : "All", typeId : 'A' },
        { type : "By Supplier", typeId : 'S' },
        { type : "By Product", typeId : 'P' },
        { type : "By User", typeId : 'U' },
    ];

    const data = {
        searchtype : searchtype,
        supplier : supplier,
        product : product,
        user : user,
        fromdate : fromdate,
        todate : todate
    };

    useEffect(() =>{
        if(searchtype === null){
            setPurchaselist([]);
            return false;
          }
    },[searchtype])

    const purchaseList = async (e) => {
      e.preventDefault();
      try{
          if(searchtype === null){
            swal('Search type is missing!');
            setPurchaselist([]);
            return false;
          }
        const res = await axios.post('/api/purchase/list', {data: data}, {
            headers: {Authorization: token}
        });
        // swal(res.data.msg);
        // console.log(res.data);
        setPurchaselist(res.data);
        
        // swal(res.data.msg+'!','', "success");
        setCallback(!callback);
      }catch(err){
        // swal(err.response.data.msg, "success");
        swal(err.response.data.msg, '', "warning");
      }
    }

    if(purchaselist.length >0){
        TableBody = () =>{
           return (
            <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Product List</h5>
              </div>
              <div className="card-block">
                <div className="dt-responsive table-responsive">
                  <table
                    id="simpletable"
                    className="table table-striped table-bordered nowrap"
                  >
                    <thead>
                      <tr>
                        <th>Invoice No</th>
                        <th>Supplier</th>
                        <th>Product</th>
                        <th>Purchased By</th>
                        <th>Sub Total</th>
                        <th>Vat</th>
                        <th>Discount</th>
                        <th>Transport Cost</th>
                        <th>Grand Total</th>
                        <th>Paid</th>
                        <th>Due</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchaselist.map((purchase, i) => {
                        return (
                          <tr key={i}>
                            <td>{purchase["invoiceno"]}</td>
                            <td>{purchase["supplier"]['suppliername']}</td>
                            <td>
                                {purchase["cart"].map((product,i) =>{
                                    return(
                                      <span key={i}>
                                          <span>{product['prod_name']}</span>&nbsp;&nbsp;&nbsp;
                                          <span>({product['qty']+' '+product['unit']} X {product['purchase_rate']} = {product['price']})</span><br/>
                                      </span>
                                    )
                                })}
                            </td>
                            <td>{purchase["user"]['username']}</td>
                            <td>{purchase["subtotal"]}</td>
                            <td>{purchase["vat"]}</td>
                            <td>{purchase["discount"]}</td>
                            <td>{purchase["transportcost"]}</td>
                            <td>{purchase["grandtotal"]}</td>
                            <td>{purchase["paid"]}</td>
                            <td>{purchase["due"]}</td>
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
              <h5>Product Purchase Record</h5>
            </div>
            <div className="card-block">
              <form autoComplete="off" onSubmit={purchaseList}>
                <div className="row">
                  <div className="col-sm-2">
                  <Autocomplete
                        value={searchtype}
                        getOptionSelected={(option, value) => option.type === value.type}
                        id="combo-box-demo"
                        options={dropdownSearchTypes}
                        size="small"
                        onChange={(event, newValue) => {
                            setSearchtype(newValue);
                        }}
                        getOptionLabel={(option) => (option ? option.type : "")}
                        style={{ width: '100%' }}
                        renderInput={(params) => (
                        <TextField {...params} label="Search Type" variant="outlined" />
                        )}
                    />
                  </div>
            
                  <Anonymous />
                  
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

export default Purchaserecord;
