import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import axios from 'axios';
import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import { GlobalState } from "../../GlobalState";

function Supplierentry() {

  const state = useContext(GlobalState);
  const [token] = state.token;
  const [callback, setCallback] = state.supplierAPI.callback;
  const [suppliers] = state.supplierAPI.suppliers;

  const [supplier, setSupplier] = useState({
    code : '',
    name : '',
    institute : '',
    address : '',
    mobile : '',
    previous_due : 0
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const formData = [];
      formData["supplier"] = supplier;
  
      const response = await axios.post(
        '/api/purchase/suppliers',
        { ...formData },
        { headers: { Authorization: token }, });

        setSupplier({
          code : '',
          name : '',
          institute : '',
          address : '',
          mobile : '',
          previous_due : 0,
        });
        setCallback(!callback);
        swal(response.data.msg);
    }catch(err){
        swal(err.response.data.msg, '', "warning");
    }
  };
  return (
    <div className="row">
      <div className="col-lg-12" style={{ marginBottom: "-20px" }}>
        <div className="card">
          <div className="card-header">
            <h5>Add New Supplier</h5>
          </div>
          <div className="card-block">
            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-3">
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Supplier code"
                    value={supplier.code}
                    onChange={onChangeInput}
                    name="code"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className="col-sm-3">
                <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Supplier name"
                    value={supplier.name}
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
                    value={supplier.institute}
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
                    label="Supplier address"
                    value={supplier.address}
                    onChange={onChangeInput}
                    name="address"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>
              <div className="row" style={{ marginTop: "10px" }}>
                <div className="col-sm-3">
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Mobile no"
                    variant="outlined"
                    size="small"
                    value={supplier.mobile}
                    onChange={onChangeInput}
                    name="mobile"
                    type="number"
                  />
                </div>
                <div className="col-sm-3">
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Previous due"
                    variant="outlined"
                    size="small"
                    value={supplier.previous_due}
                    onChange={onChangeInput}
                    name="previous_due"
                    type="number"
                  />
                </div>
                <div className="col-sm-3">
                  <Button
                    style={{ width: "100%" }}
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<SaveIcon />}
                  >
                    ADD SUPPLIER
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
                    <th>Supplier Code</th>
                    <th>Supplier name</th>
                    <th>Mobile</th>
                    <th>Opening Balance</th>
                    <th>Previous due</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {suppliers.map((supplier, i) => {
                    return (
                      <tr key={i}>
                        <td>{supplier['code']}</td>
                        <td>{supplier['name']}</td>
                        <td>{supplier['mobile']}</td>
                        <td>{supplier['opening_balance']}</td>
                        <td>{supplier['previous_due']}</td>
                        <td>
                          <Link to={`/product/purchase/`} >
                          <DeleteIcon
                            style={{ color: "red", cursor: "pointer" }}
                            // onClick={() => {
                            //   return swal("okkkk");
                            // }}
                          />
                          </Link>
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

export default Supplierentry;
