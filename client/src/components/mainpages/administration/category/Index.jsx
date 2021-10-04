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
    const [category,setCategory] = useState('');
    const [categories] = state.categoriesAPI.categories;
    const [callback, setCallback] = state.categoriesAPI.callback;

    const createCategory = async (e) => {
      e.preventDefault();
      try{
        const res = await axios.post('/api/administration/category', {categoryname: category}, {
            headers: {Authorization: token}
        });
        // swal(res.data.msg);
        swal(res.data.msg+'!','', "success");
        setCategory('');
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
              <h5>Add Product Category</h5>
            </div>
            <div className="card-block">
              <form autoComplete="off" onSubmit={createCategory}>
                <div className="row">
                  <div className="col-sm-4">
                    <TextField
                      style={{ width: "100%" }}
                      id="outlined-basic"
                      label="Category name"
                      variant="outlined"
                      size="small"
                      name="categoryname"
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-4">
                    <Button
                      style={{ width: "100%" }}
                      variant="contained"
                      color="primary"
                      type="submit"
                      startIcon={<SaveIcon />}
                    >
                      <b>ADD CATEGORY</b>
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
              <h5>Product Category List</h5>
            </div>
            <div className="card-block">
              <div className="dt-responsive table-responsive">
                <table
                  id="simpletable"
                  className="table table-striped table-bordered nowrap"
                >
                  <thead>
                    <tr>
                      <th>Category Name</th>
                      <th>Status</th>
                      <th>Created Time</th>
                      <th>Updated Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category, i) => {
                      return (
                        <tr key={i}>
                          <td>{category["categoryname"]}</td>
                          <td>
                            {category["status"] === 1 ? (
                              <label className="label label-success">Active</label>
                            ) : (
                              <label className="label label-danger">Inactive</label>
                            )}
                          </td>
                          <td>{category["createdAt"].split('T')[0]}</td>
                          <td>{category["updatedAt"].split('T')[0]}</td>
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
