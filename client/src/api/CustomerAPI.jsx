import axios from 'axios';
import { useEffect, useState } from 'react';

function CustomerAPI(token) {
    const [customers, setCustomers] = useState([]);
    const [callback, setCallback] = useState(false);

    useEffect(() =>{
        if(token){
            try{
                const getCustomers = async () =>{
                    const res = await axios.get('/api/sales/customers',{
                        headers: {Authorization: token}
                    });
                    setCustomers(res.data);
                }
        
                getCustomers();
            }catch(err){
                alert(err.response.data.msg)
            }
        }
       
    },[callback,token])
    return {
        customers: [customers, setCustomers],
        callback: [callback, setCallback]
    }
}

export default CustomerAPI;
