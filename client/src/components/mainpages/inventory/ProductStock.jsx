import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import swal from 'sweetalert';
import { GlobalState } from '../../GlobalState';


function ProductStock() {
    // ---------------------------------------
    //         from GlobalState
    // ---------------------------------------
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [products] = state.productAPI.products;

    // ---------------------------------------
    //         Local State
    // ---------------------------------------
    const [stocktype,setStocktype] = useState(null);
    const [product,setProduct] = useState(null);
    const [stocklist,setStocklist] = useState([]);
    const [loading,setLoading] = useState(false);
    var Anonymous, TableBody;

    const dropdownProducts = [];
    products.map((product, i) => {
    const ob = {
      productname: product['product'].productname,
      productid: product["_id"],
    };
        dropdownProducts.push(ob);
        return true;
    });

    if(stocktype && stocktype != null){
        if(stocktype.typeId === 'P'){
           Anonymous = () =>{
            return (
                    <div className="col-sm-3">
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
        else{
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

    const dropdownStockTypes = [
        { type : "Total Stock", typeId : 'T' },
        { type : "Product Stock", typeId : 'P' },
        // { type : "By Product", typeId : 'P' },
        // { type : "By User", typeId : 'U' },
    ];

    const data = {
        stocktype : stocktype,
        product : product
    };

    useEffect(() =>{
        if(stocktype === null){
            setStocklist([]);
            return false;
          }
    },[stocktype])

    const stockList = async (e) => {
      e.preventDefault();
      try{
          if(stocktype === null){
            swal('Stock type is missing!');
            setStocklist([]);
            return false;
          }
          setLoading(true);
        const res = await axios.post('/api/inventory/product/stock', {data: data}, {
            headers: {Authorization: token}
        });
        // console.log(res.data);
        if(res.data.length <= 0){
            swal('Product not available in Stock!');
            setStocklist([]);
            return false;
        }
        setStocklist(res.data);
        setLoading(false);
      }catch(err){
        swal(err.response.data.msg, '', "warning");
      }
    }
    if(loading) return <div><b>Loading...</b></div>
    if(stocklist.length >0){
        TableBody = () =>{
           return (
            <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Product Stock</h5>
              </div>
              <div className="card-block">
                <div className="dt-responsive table-responsive">
                  <table
                    id="simpletable"
                    className="table table-striped table-bordered nowrap"
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Purchased</th>
                        <th>P.Returned</th>
                        <th>Production</th>
                        <th>Damaged</th>
                        <th>Sold</th>
                        <th>S.Returned</th>
                        <th>Transferred</th>
                        <th>Received</th>
                        <th>AVG. Rate</th>
                        <th className="label-danger">Current Qty</th>
                        <th>Stock Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stocklist.map((stock, i) => {
                        return (
                          <tr key={i}>
                            <td>{stock["prod_name"]}</td>
                            <td>{stock["purchased"] + ' ' + stock["unit"]}</td>
                            <td>{stock["p_return"]}</td>
                            <td>{stock["production"]}</td>
                            <td>{stock["damaged"]}</td>
                            <td>{stock["sold"]}</td>
                            <td>{stock["s_return"]}</td>
                            <td>{stock["transferred"]}</td>
                            <td>{stock["received"]}</td>
                            <td>{stock["avg_rate"]}</td>
                            <td className="pcoded-badge label label-danger"><span style={{fontWeight: "bolder",color: "#F0FFF0",fontSize:"15px"}}>{stock["current_qty"]  + ' ' + stock["unit"]}</span></td>
                            <td>{stock["stock_value"]}</td>
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
              <h5>Product Stock</h5>
            </div>
            <div className="card-block">
              <form autoComplete="off" onSubmit={stockList}>
                <div className="row">
                  <div className="col-sm-3">
                  <Autocomplete
                        value={stocktype}
                        getOptionSelected={(option, value) => option.type === value.type}
                        id="combo-box-demo"
                        options={dropdownStockTypes}
                        size="small"
                        onChange={(event, newValue) => {
                            setStocktype(newValue);
                        }}
                        getOptionLabel={(option) => (option ? option.type : "")}
                        style={{ width: '100%' }}
                        renderInput={(params) => (
                        <TextField {...params} label="Stock Type" variant="outlined" />
                        )}
                    />
                  </div>

                  <Anonymous />
                  
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

export default ProductStock;
