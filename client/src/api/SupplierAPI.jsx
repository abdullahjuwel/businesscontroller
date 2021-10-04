import axios from 'axios';
import { useEffect, useState } from 'react';

function SupplierAPI(token) {
    const [suppliers, setSuppliers] = useState([]);
    const [callback, setCallback] = useState(false);

    useEffect(() =>{
        if(token){
            try{
                const getSuppliers = async () =>{
                    const res = await axios.get('/api/purchase/suppliers',{
                        headers: {Authorization: token}
                    });
                    setSuppliers(res.data);
                }
        
                getSuppliers();
            }catch(err){
                alert(err.response.data.msg)
            }
        }
       
    },[callback,token])
    return {
        suppliers: [suppliers, setSuppliers],
        callback: [callback, setCallback]
    }
}

export default SupplierAPI;
