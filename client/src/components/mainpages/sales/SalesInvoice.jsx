import TextField from "@material-ui/core/TextField";
import PrintIcon from "@material-ui/icons/Print";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from 'axios';
import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
function SalesInvoice() {
    // ---------------------------------------
//         from GlobalState
// ---------------------------------------
    const state = useContext(GlobalState);
    const [token] = state.token;
    const params = useParams();

    const [data,setData] = useState('');
    const [codes,setCodes] = useState([]);
    const [code,setCode] = useState(null);
    const [loading,setLoading] = useState(false);
    const [previous_due,setPrevious_due] = useState(0);

    useEffect(() =>{
        if(token){
            if(code != null){
                try{
                    const getData = async()=>{
                     setLoading(true);
                     const response = await axios.post('/api/sales/salesinvoicedata',
                     {invoiceNo : code.invoiceno},
                     {headers: {Authorization: token} });
                     setPrevious_due(response.data.previous_due)
                     setData(response.data.data);
                     setLoading(false);
                    }
                    getData();
                 }catch(err){
                     alert(err.response.data.msg)
                 }
            }
        }
    },[code,token]);
    
    useEffect(() =>{
        if(token){
            if(params.invoiceNo === undefined){
                try{
                    const getSalesCodes = async()=>{
                     const response = await axios.get('/api/sales/allsalescode',
                     {headers: {Authorization: token} });
                    //  console.log(response.data);
                    setCodes(response.data);
                    setCode(response.data[0]);
                    }
                    getSalesCodes();
                 }catch(err){
                     alert(err.response.data.msg)
                 }
            }
            else{
                try{
                     const getData = async()=>{
                      const response = await axios.post('/api/sales/salesinvoicedata',
                      {invoiceNo : params.invoiceNo},
                      {headers: {Authorization: token} });
                    //   console.log(response.data);
                        setPrevious_due(response.data.previous_due)
                        setData(response.data.data);
                     }
                     getData();
                  }catch(err){
                      alert(err.response.data.msg)
                  }
            }
        }
    },[params.invoiceNo,token]);
    if(loading) return <div><b>Loading...</b></div>
  return (
    <div>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-2">
          <PrintIcon style={{ cursor: "pointer" }} />
        </div>
        <div className="col-md-3">
        <Autocomplete
          value={code}
          getOptionSelected={(option, value) => option.invoiceno === value.invoiceno}
          id="combo-box-demo"
          options={codes}
          size="small"
          onChange={(event, newValue) => {
            setCode(newValue);
          }}
          getOptionLabel={(option) => (option ? option.invoiceno : "")}
          style={{ width: "100%" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose Sales Invoice"
              variant="outlined"
            />
          )}
        />
      </div>
        <div className="col-md-4"></div>
      </div>
      <hr />
      <h6 className="text-center">
        <b>Product Sales Invoice</b>
      </h6>
      <hr />
      <table className="offset-md-1" width="100%" cellPadding="0">
            <thead>
                <td><b>Customer ID :</b> {data ? data['customer']['customerid'] : ''}</td>
                <td><b>Sold By :</b> {data ? data['user']['username'] : ''}</td>
            </thead>
            <tbody>
                <tr>
                    <td><b>Customer Name :</b> {data ? data['customer']['customername'] : ''}</td>
                    <td><b>Invoice No :</b> {data ? data['invoiceno'] : ''}</td>
                </tr>
                
                <tr>
                    <td><b>Customer Address :</b> {data ? data['customer']['address'] : ''}</td>
                    <td><b>Sold Date : </b>{data ? data['created_at'].split('T')[0] : ''}</td>
                </tr>
                <tr>
                    <td><b>Customer Mobile :</b> {data ? data['customer']['mobile'] : ''}</td>
                    <td></td>
                </tr>
            </tbody>
        </table> <br />
        <table className="offset-md-1 table-bordered" width="80%" cellPadding="4">
            <thead style={{ fontWeight : "bold" }}>
                <td>SL</td>
                <td>Description</td>   
                <td>Qty</td>   
                <td>Rate</td>   
                <td>Total</td>   
            </thead>
            <tbody>
            {data && data['cart'].map((cart, i) => {
                        return(
                          <tr key={i}>
                            <td>{++i}</td>
                            <td>{cart['prod_name']}</td>
                            <td>{cart['qty']}</td>
                            <td>{cart['sale_rate']}</td>
                            <td>{cart['price']}</td>
                          </tr>
                        );
                      })}
            </tbody>
        </table>
        <div className="row">
            <div className="offset-md-1 col-md-6" style={{ display: "flex",flexDirection: "column",marginTop:"20px" }}>
                <span>Previous Due : {previous_due ? previous_due : 0} </span>
                <span>Invoice due : {data ? data['due'] : ''} </span>
                <span>Current due : {data ? parseFloat(data['due'])+parseFloat(previous_due ? previous_due : 0) : ''}  </span>
            </div>
            <div className="col-md-5">
                <div className="row">
                    <div className="col-md-6" style={{display:"flex",flexDirection:"column"}}>
                        <span>Subtotal : </span>
                        <span>Transport Cost : </span>
                        <span>Vat : </span>
                        <span>Discount : </span>
                        <span>Total : </span>
                        <span>Paid : </span>
                        <span>Due : </span>
                    </div>
                    <div className="col-md-6" style={{display:"flex",flexDirection:"column"}}>
                        <span>{data ? data['subtotal'] : ''}</span>
                        <span>{data ? data['transportcost'] : ''}</span>
                        <span>{data ? data['vat'] : ''}</span>
                        <span>{data ? data['discount'] : ''}</span>
                        <span>{data ? data['grandtotal'] : ''}</span>
                        <span>{data ? data['paid'] : ''}</span>
                        <span>{data ? data['due'] : ''}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
export default SalesInvoice;
