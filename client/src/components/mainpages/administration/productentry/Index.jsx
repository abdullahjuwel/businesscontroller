import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import EditAttributesSharpIcon from '@material-ui/icons/EditAttributesSharp';
import SaveIcon from "@material-ui/icons/Save";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import React, { useContext, useState } from "react";
import swal from "sweetalert";
import { GlobalState } from "../../../GlobalState";

function Index() {

  const state = useContext(GlobalState);
  const [token] = state.token;
  const [category, setCategory] = useState(null);
  const [productname, setProductname] = useState(null);
  const [productunit, setProductunit] = useState(null);
  const [product, setProduct] = useState({
    productcode: 0,
    salerate: 0,
    wholesalerate: 0,
    reorderlevel: 0,
    purchaserate : 0
  });

  const [categories] = state.categoriesAPI.categories;
  const [productnames] = state.productnameAPI.productnames;
  const [productunits] = state.productunitAPI.productunits;
  const [callback, setCallback] = state.productAPI.callback;
  const [products] = state.productAPI.products;

  const dropdownCategories = [];
  categories.map((category, i) => {
    const ob = {
      categoryname: category["categoryname"],
      categoryid: category["_id"],
    };
    dropdownCategories.push(ob);
    return true;
  });

  const dropdownProdNames = [];
  productnames.map((productname, i) => {
    const ob = {
      productname: productname["productname"],
      productid: productname["_id"],
    };
    dropdownProdNames.push(ob);
    return true;
  });

  const dropdownProdUnits = [];
  productunits.map((productunit, i) => {
    const ob = {
      productunit: productunit["unitname"],
      unitid: productunit["_id"],
    };
    dropdownProdUnits.push(ob);
    return true;
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const formData = [];
    formData["category"] = category;
    formData["productname"] = productname;
    formData["product"] = { ...product, ...productname };
    formData["productunit"] = productunit;
    // console.log(formData);

    const response = await axios.post(
      '/api/administration/products',
      { ...formData },
      { headers: { Authorization: token }, });

      setProduct({
        productcode: 0,
        salerate: 0,
        wholesalerate: 0,
        reorderlevel: 0,
        purchaserate : 0
      });
      setCategory(null);
      setProductname(null);
      setProductunit(null);

      setCallback(!callback);
      
      swal(response.data.msg);
    //   console.log(response.data)
    }catch(err){
        swal(err.response.data.msg, '', "warning");
    }
  };


  return (
    <div className="row">
      <div className="col-lg-12" style={{ marginBottom: "-20px" }}>
        <div className="card">
          <div className="card-header">
            <h5>Add New Product</h5>
          </div>
          <div className="card-block">
            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-3">
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Product code"
                    value={product.productcode}
                    onChange={onChangeInput}
                    name="productcode"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className="col-sm-3">
                  <Autocomplete
                    value={category}
                    getOptionSelected={(option, value) => option.categoryname === value.categoryname}
                    id="combo-box-demo"
                    options={dropdownCategories}
                    size="small"
                    getOptionLabel={(option) => (option ? option.categoryname : null)}
                    onChange={(event, value) => setCategory(value)}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select product category"
                        variant="outlined"
                      />
                    )}
                  />
                </div>
                <div className="col-sm-3">
                  <Autocomplete
                    value={productname}
                    getOptionSelected={(option, value) => option.productname === value.productname}
                    id="combo-box-demo"
                    options={dropdownProdNames}
                    onChange={(event, value) => setProductname(value)}
                    size="small"
                    getOptionLabel={(option) => (option ? option.productname : null)}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select product name"
                        variant="outlined"
                      />
                    )}
                  />
                </div>
                <div className="col-sm-3">
                  <Autocomplete
                    value={productunit}
                    getOptionSelected={(option, value) => option.productunit === value.productunit}
                    id="combo-box-demo"
                    options={dropdownProdUnits}
                    onChange={(event, value) => setProductunit(value)}
                    size="small"
                    getOptionLabel={(option) => (option ? option.productunit : null)}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select product unit"
                        variant="outlined"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="row" style={{ marginTop: "10px" }}>
                <div className="col-sm-3">
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Sale rate"
                    variant="outlined"
                    size="small"
                    value={product.salerate}
                    onChange={onChangeInput}
                    name="salerate"
                    type="number"
                  />
                </div>
                <div className="col-sm-3">
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Whole Sale rate"
                    variant="outlined"
                    size="small"
                    value={product.wholesalerate}
                    onChange={onChangeInput}
                    name="wholesalerate"
                    type="number"
                  />
                </div>
                <div className="col-sm-2">
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Re-order level"
                    variant="outlined"
                    size="small"
                    value={product.reorderlevel}
                    onChange={onChangeInput}
                    name="reorderlevel"
                    type="number"
                  />
                </div>
                <div className="col-sm-2">
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Purchase rate"
                    variant="outlined"
                    size="small"
                    value={product.purchaserate}
                    onChange={onChangeInput}
                    name="purchaserate"
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
                    ADD PRODUCT
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
                    <th>Product Code</th>
                    <th>Category name</th>
                    <th>Product name</th>
                    <th>Unit name</th>
                    <th>Sale rate</th>
                    <th>Purchase rate</th>
                    <th>Whole Sale rate</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, i) => {
                    return (
                      <tr key={i}>
                        <td>{product['product']['productcode']}</td>
                        <td>{product['category']['categoryname']}</td>
                        <td>{product['product']['productname']}</td>
                        <td>{product['productunit']['productunit']}</td>
                        <td>{product['product']['salerate']}</td>
                        <td>{product['product']['purchaserate']}</td>
                        <td>{product['product']['wholesalerate']}</td>
                        <td>
                          <DeleteIcon
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => {
                              return swal("okkkk");
                            }}
                          />
                          <EditAttributesSharpIcon
                            color="primary"
                            style={{ cursor: "pointer" }}
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

export default Index;
