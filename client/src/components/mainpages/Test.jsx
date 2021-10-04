import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';


const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(-0.7),
        
      },
    },
  }));



  const submitt = (e) => {
    e.preventDefault();
     alert('clicked')
  }

  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
  ];

function Test() {
    // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    // const handleDateChange = (date) => {
    //   setSelectedDate(date);
    // };
    const classes = useStyles();
    return (
      <div className="row">
        <div className="col-lg-12" style={{ marginBottom: "-20px" }}>
          <div className="card">
            <div className="card-header">
              {/* <Autocomplete
                id="combo-box-demo"
                options={top100Films}
                size="small"
                getOptionLabel={(option) => option.title}
                
                renderInput={(params) => (
                  <TextField {...params} label="Combo box" variant="outlined" />
                )}
              /> */}
              <div className="row">
              <div className="col-sm-2">
                    <TextField
                      style={{ width: "100%"}}
                      id="outlined-basic"
                      label="Invoice no"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                  <div className="col-sm-6">
                    <Autocomplete
                        id="combo-box-demo"
                        options={top100Films}
                        size="small"
                        getOptionLabel={(option) => option.title}
                        style={{ width: '40%' }}
                        renderInput={(params) => (
                        <TextField {...params} label="Combo box" variant="outlined" />
                        )}
                    />
                  </div>
                  <div className="col-sm-4">
                  {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                        </MuiPickersUtilsProvider> */}
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-xl-8">
          <div className="card">
            <div className="card-header">
              <h5>Supplier & product information</h5>
            </div>
            <div className="card-block">
              <form className={classes.root} autoComplete="off" onSubmit={submitt}>
                <div className="row form-group">
                  <div className="col-sm-6">
                    <Autocomplete
                        id="combo-box-demo"
                        options={top100Films}
                        size="small"
                        getOptionLabel={(option) => option.title}
                        style={{ width: '100%' }}
                        renderInput={(params) => (
                        <TextField {...params} label="Choose a supplier" variant="outlined" />
                        )}
                    />
                  </div>
                  <div className="col-sm-6">
                  <Autocomplete
                        id="combo-box-demo"
                        options={top100Films}
                        size="small"
                        getOptionLabel={(option) => option.title}
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
                      style={{ width: "100%", marginBottom: "13px" }}
                      id="outlined-basic"
                      label="Supplier mobile"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                  <div className="col-sm-3">
                    <TextField
                      style={{ width: "100%", marginBottom: "13px" }}
                      id="outlined-basic"
                      label="Purchase rate"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                  <div className="col-sm-3">
                    <TextField
                      style={{ width: "100%", marginBottom: "13px" }}
                      id="outlined-basic"
                      label="Quantity"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <TextField
                      style={{ width: "100%", marginBottom: "10px" }}
                      id="outlined-basic"
                      label="Supplier address"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                  <div className="col-sm-3">
                    <TextField
                      style={{ width: "100%", marginBottom: "10px" }}
                      id="outlined-basic"
                      label="Total"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                  <div className="col-sm-3">
                    <Button
                      style={{ width: "97%" }}
                      variant="contained"
                      color="primary"
                      size="small"
                      type="submit"
                      startIcon={<SaveIcon />}
                    >
                      ADD TO CART
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
                          <th>Name</th>
                          <th>Position</th>
                          <th>Office</th>
                          <th>Age</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>fdgdfgd</td>
                          <td>dfgdf</td>
                          <td>fdgbdf</td>
                          <td>
                            <button
                              style={{
                                width: "20px",
                                height: "20px",
                                fontSize: "10px",
                                justifyContent: "center",
                              }}
                              type="button"
                              className="tabledit-edit-button btn btn-primary waves-effect waves-light"
                            ></button>
                          </td>
                        </tr>
                        <tr>
                          <td>fdgdfgd</td>
                          <td>dfgdf</td>
                          <td>fdgbdf</td>
                          <td>
                            <button
                              style={{
                                width: "20px",
                                height: "20px",
                                fontSize: "10px",
                                justifyContent: "center",
                              }}
                              type="button"
                              className="tabledit-edit-button btn btn-primary waves-effect waves-light"
                            ></button>
                          </td>
                        </tr>
                        <tr>
                          <td>fdgdfgd</td>
                          <td>dfgdf</td>
                          <td>fdgbdf</td>
                          <td>
                            <button
                              style={{
                                width: "20px",
                                height: "20px",
                                fontSize: "10px",
                                justifyContent: "center",
                              }}
                              type="button"
                              className="tabledit-edit-button btn btn-primary waves-effect waves-light"
                            ></button>
                          </td>
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
              <form className={classes.root} autoComplete="off">
                <div className="row form-group">
                  <div className="col-sm-6">
                    <TextField
                      style={{ width: "100%" }}
                      id="outlined-basic"
                      label="Subtotal"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                  <div className="col-sm-6">
                    <TextField
                      style={{ width: "100%" }}
                      id="outlined-basic"
                      label="Current due"
                      variant="outlined"
                      size="small"
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
                    />
                  </div>
                  <div className="col-sm-6">
                    <TextField
                      style={{ width: "100%", marginBottom: "10px" }}
                      id="outlined-basic"
                      label="Vat(%)"
                      variant="outlined"
                      size="small"
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
                    />
                  </div>
                  <div className="col-sm-6">
                    <TextField
                      style={{ width: "100%", marginBottom: "10px" }}
                      id="outlined-basic"
                      label="Discount(%)"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <TextField
                      style={{ width: "100%", marginBottom: "10px" }}
                      id="outlined-basic"
                      label="Total"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                  <div className="col-sm-6">
                    <TextField
                      style={{ width: "100%", marginBottom: "10px" }}
                      id="outlined-basic"
                      label="Transport cost"
                      variant="outlined"
                      size="small"
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
                    />
                  </div>
                  <div className="col-sm-6">
                    <TextField
                      style={{ width: "100%", marginBottom: "10px" }}
                      id="outlined-basic"
                      label="Due"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Test
