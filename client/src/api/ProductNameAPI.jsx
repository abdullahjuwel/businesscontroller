import axios from 'axios';
import { useEffect, useState } from 'react';

function ProductNameAPI(token) {
    const [productnames, setProductnames] = useState([]);
    const [callback, setCallback] = useState(false);

    useEffect(() =>{
        if(token){
            try{
                const getProductnames = async () =>{
                    const res = await axios.get('/api/administration/productname',{
                        headers: {Authorization: token}
                    });
                    setProductnames(res.data);
                }
        
                getProductnames();
            }catch(err){
                alert(err.response.data.msg)
            }
        }
       
    },[callback,token])
    return {
        productnames: [productnames, setProductnames],
        callback: [callback, setCallback]
    }
}

export default ProductNameAPI;
