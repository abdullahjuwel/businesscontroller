import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import swal from 'sweetalert';
import { GlobalState } from '../../../GlobalState';

function Index() {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [productname,setProductname] = useState('');
    const [productnames] = state.productnameAPI.productnames;
    const [callback, setCallback] = state.productnameAPI.callback;

    const createProductname = async (e) => {
      e.preventDefault();
      try{
        const res = await axios.post('/api/administration/productname', {productname: productname}, {
            headers: {Authorization: token}
        });
        // swal(res.data.msg);
        swal(res.data.msg+'!','', "success");
        setProductname('');
        setCallback(!callback);
      }catch(err){
        // swal(err.response.data.msg, "success");
        swal(err.response.data.msg, '', "warning");
      }
    }

    
    return (
      <div className="row">
        <div className="col-lg-12" style={{ marginBottom: "-20px" }}>
          <div className="card">
            <div className="card-header">
              <h5>Add Product Name</h5>
            </div>
            <div className="card-block">
              <form autoComplete="off" onSubmit={createProductname}>
                <div className="row">
                  <div className="col-sm-4">
                    <TextField
                      style={{ width: "100%" }}
                      id="outlined-basic"
                      label="Product name"
                      variant="outlined"
                      size="small"
                      name="productname"
                      value={productname}
                      onChange={e => setProductname(e.target.value)}
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
                      ADD PRODUCT NAME
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
              <h5>Product Name List</h5>
            </div>
            <div className="card-block">
              <div className="dt-responsive table-responsive">
                <table
                  id="simpletable"
                  className="table table-striped table-bordered nowrap"
                >
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Status</th>
                      <th>Created Time</th>
                      <th>Updated Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productnames.map((productname, i) => {
                      return (
                        <tr key={i}>
                          <td>{productname["productname"]}</td>
                          <td>
                            {productname["status"] === 1 ? (
                              <label className="label label-success">Active</label>
                            ) : (
                              <label className="label label-danger">Inactive</label>
                            )}
                          </td>
                          <td>{productname["createdAt"]}</td>
                          <td>{productname["updatedAt"]}</td>
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

export default Index
