import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';

function Login() {
    const [user, setUser] = useState({
        email:'', password: '',showPassword:false
    });

    const handleClickShowPassword = () => {
      setUser({ ...user, showPassword: !user.showPassword });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const loginSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/api/login', {...user})

            localStorage.setItem('firstLogin', true)
            
            window.location.href = "/dashboard";
            // alert('okkk');
        } catch (err) {
            // alert(err.response.data.msg)
            swal(err.response.data.msg);
        }
    }

    return (
      <section className="login-block">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <form
                className="md-float-material form-material"
                onSubmit={loginSubmit}
                autoComplete="off"
              >
                <div className="text-center">
                  <img src="/files/assets/images/logo.png" alt="true" />
                </div>
                <div className="auth-box card">
                  <div className="card-block">
                    <div className="row m-b-20">
                      <div className="col-md-12">
                        <h3 className="text-center">Sign In</h3>
                      </div>
                    </div>
                    <div className="form-group form-primary">
                      <TextField
                        style={{ width: "100%", marginBottom: "10px" }}
                        onChange={onChangeInput}
                        value={user.email}
                        id="outlined-basic"
                        label="Email"
                        name="email"
                        variant="outlined"
                      />
                      <span className="form-bar" />
                    </div>
                    <div className="form-group form-primary">
                      <FormControl variant="outlined" style={{ width: "100%" }}>
                        <InputLabel
                          style={{ marginTop: "-15px" }}
                          htmlFor="outlined-adornment-password"
                        >
                          Password
                        </InputLabel>
                        <OutlinedInput
                          style={{ marginTop: "-15px" }}
                          id="outlined-adornment-password"
                          type={user.showPassword ? "text" : "password"}
                          value={user.password}
                          name="password"
                          onChange={onChangeInput}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {user.showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          labelWidth={70}
                        />
                      </FormControl>

                      <span className="form-bar" />
                    </div>
                    <div className="row m-t-25 text-left">
                      <div className="col-12">
                        <div className="checkbox-fade fade-in-primary d-">
                          <label>
                            <input type="checkbox" defaultValue />
                            <span className="cr">
                              <i className="cr-icon icofont icofont-ui-check txt-primary" />
                            </span>
                            <span className="text-inverse">Remember me</span>
                          </label>
                        </div>
                        <div className="forgot-phone text-right f-right">
                          <a
                            href="#!"
                            className="text-right f-w-600"
                          >
                            {" "}
                            Forgot Password?
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="row m-t-30">
                      <div className="col-md-12">
                        <button
                          type="submit"
                          className="btn btn-primary btn-md btn-block waves-effect waves-light text-center m-b-20"
                        >
                          Sign in
                        </button>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-md-10">
                        <p className="text-inverse text-left m-b-0">
                          Thank you.
                        </p>
                        <p className="text-inverse text-left">
                          <a href="#!">
                            <b className="f-w-600">Back to website</b>
                          </a>
                        </p>
                      </div>
                      <div className="col-md-2">
                        <img
                          src="/files/assets/images/auth/Logo-small-bottom.png"
                          alt="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
}

export default Login
