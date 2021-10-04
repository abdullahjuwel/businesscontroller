import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../GlobalState';

function Index() {
    const state = useContext(GlobalState);
    const [token] = state.token;
    // const dept = state.DepartmentAPI.department;
    const [department,setDepartment] = useState([]);

    // useEffect(() => {
    //     const getDepartment = async()=>{
    //         setDepartment(dept);
    //     }
    //     getDepartment();
    // },[dept,department])


    useEffect(() => {
        if(token){
            const getDepartment = async () =>{
                const dept = await axios.get('/api/department',{
                     headers : {Authorization : token}
                 });
                 setDepartment(dept.data.users);
             }
             getDepartment();
        }
       
    },[token]);
    
    return (
      <div className="row">
        <div className="col-sm-12">
          {/* Zero config.table start */}
          <div className="card">
            <div className="card-header">
              <h5>Department List</h5>
              <span>
                DataTables has most features enabled by default, so all you need
                to do to use it with your own ables is to call the construction
                function: $().DataTable();.
              </span>
            </div>
            <div className="card-block">
              <div className="dt-responsive table-responsive">
                <table
                  id="simpletable"
                  className="table table-striped table-bordered nowrap">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Start date</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {department.map((dept,i) => {
                        return (
                            <tr key={i}>
                            <td>{dept['name']}</td>
                            <td>{dept['email']}</td>
                            <td>London</td>
                            <td>19</td>
                            <td>2010/03/17</td>
                            <td>
                            {/* <a href="#!" style={{marginRight:"10px"}}>
                            <span className="icofont icofont-ui-edit"></span>
                            </a>
                            <a href="#!" style={{marginRight:"10px"}}>
                            <span className="icofont icofont-eye-alt"></span>
                            </a>
                            <a href="#!">
                            <span className="icofont icofont-ui-delete"></span>
                            </a> */}
                              <button style={{width:"20px",height:"20px",fontSize:"10px",justifyContent:"center"}} type="button" className="tabledit-edit-button btn btn-primary waves-effect waves-light"></button>


                              {/* <button type="button" className="btn btn-primary btn-outline-primary waves-effect md-trigger"data-modal="modal-13">3D Slit</button> */}
                              </td>
                          </tr>
                        )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Zero config.table end */}
        </div>
      </div>
    );
}

export default Index
