import axios from 'axios';
import { useEffect, useState } from 'react';


function DepartmentAPI(token) {
    const [department,setDepartment] = useState([]);

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

    return {
        department : [department,setDepartment],
    }
}
export default DepartmentAPI;