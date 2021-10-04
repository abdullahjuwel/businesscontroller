import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from 'axios';
import React, { useContext, useEffect, useState } from "react";
import swal from "sweetalert";
import { GlobalState } from "../../GlobalState";
import Loader from '../utils/loading/Loading';

function Customerentry() {

  // for loader 
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 500)
  }, []);

  const state = useContext(GlobalState);
  const [token] = state.token;
  const [callback, setCallback] = state.customerAPI.callback;
  const [customers] = state.customerAPI.customers;

  const [customer, setCustomer] = useState({
    cust_code : '',
    name : '',
    institute : '',
    address : '',
    mobile : '',
    previous_due : 0,
    credit_limit : 0
  });
  const [area, setArea] = useState(null);

  const dropdownAreas = [
      {area : 'Dhaka', _id : '65488dfbgdfgetdfgvdf'},
      {area : 'Mohammadpur', _id : '43488ddfgetdfg6gf'},
      {area : 'Gulshan', _id : '891488dfbgdfgetdfgvgvnh'},
      {area : 'Banani', _id : 'h8488dfbdfgetdfgv5ds'},
  ];

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const formData = [];
      formData["area"] = area;
      formData["customer"] = customer;
  
      const response = await axios.post(
        '/api/sales/customers',
        { ...formData },
        { headers: { Authorization: token }, });

        setCustomer({
          cust_code : '',
          name : '',
          institute : '',
          address : '',
          mobile : '',
          previous_due : 0,
          credit_limit : 0
        });
        setArea(null);
        setCallback(!callback);
        swal(response.data.msg);
    }catch(err){
        swal(err.response.data.msg, '', "warning");
    }
  };
  if(loading) return <div><Loader /></div>
  return (
    <div className="row">
      <div className="col-lg-12" style={{ marginBottom: "-20px" }}>
        <div className="card">
          <div className="card-header">
            <h5>Add New Customer</h5>
          </div>
          <div className="card-block">
            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-3">
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Customer code"
                    value={customer.cust_code}
                    onChange={onChangeInput}
                    name="cust_code"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className="col-sm-3">
                <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Customer name"
                    value={customer.name}
                    onChange={onChangeInput}
                    name="name"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className="col-sm-3">
                <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Institute name"
                    value={customer.institute}
                    onChange={onChangeInput}
                    name="institute"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className="col-sm-3">
                <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Customer address"
                    value={customer.address}
                    onChange={onChangeInput}
                    name="address"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>
              <div className="row" style={{ marginTop: "10px" }}>
                <div className="col-sm-3">
                <Autocomplete
                    value={area}
                    getOptionSelected={(option, value) => option.area === value.area}
                    id="combo-box-demo"
                    options={dropdownAreas}
                    size="small"
                    getOptionLabel={(option) => (option ? option.area : null)}
                    onChange={(event, value) => setArea(value)}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select area"
                        variant="outlined"
                      />
                    )}
                  />
                </div>
                <div className="col-sm-3">
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Mobile no"
                    variant="outlined"
                    size="small"
                    value={customer.mobile}
                    onChange={onChangeInput}
                    name="mobile"
                    type="number"
                  />
                </div>
                <div className="col-sm-2">
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Previous due"
                    variant="outlined"
                    size="small"
                    value={customer.previous_due}
                    onChange={onChangeInput}
                    name="previous_due"
                    type="number"
                  />
                </div>
                <div className="col-sm-2">
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Credit limit"
                    variant="outlined"
                    size="small"
                    value={customer.credit_limit}
                    onChange={onChangeInput}
                    name="credit_limit"
                    type="number"
                  />
                </div>
                <div className="col-sm-2">
                  <Button
                    style={{ width: "100%" }}
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<SaveIcon />}
                  >
                    ADD CUSTOMER
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
            <h5>Customer List</h5>
          </div>
          <div className="card-block">
            <div className="dt-responsive table-responsive">
              <table
                id="simpletable"
                className="table table-striped table-bordered nowrap"
              >
                <thead>
                  <tr>
                    <th>Customer Code</th>
                    <th>Customer name</th>
                    <th>Mobile</th>
                    <th>Previous due</th>
                    <th>Credit Limit</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {customers.map((customer, i) => {
                    return (
                      <tr key={i}>
                        <td>{customer['cust_code']}</td>
                        <td>{customer['name']}</td>
                        <td>{customer['mobile']}</td>
                        <td>{customer['previous_due']}</td>
                        <td>{customer['credit_limit']}</td>
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
    </div>
  );
}

export default Customerentry;
