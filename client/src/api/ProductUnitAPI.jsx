import axios from 'axios';
import { useEffect, useState } from 'react';

function ProductUnitAPI(token) {
    const [productunits, setProductunits] = useState([]);
    const [callback, setCallback] = useState(false);

    useEffect(() =>{
        if(token){
            try{
                const getProductunits = async () =>{
                    const res = await axios.get('/api/administration/productunit',{
                        headers: {Authorization: token}
                    });
                    setProductunits(res.data);
                }
        
                getProductunits();
            }catch(err){
                alert(err.response.data.msg)
            }
        }
       
    },[callback,token])
    return {
        productunits: [productunits, setProductunits],
        callback: [callback, setCallback]
    }
}

export default ProductUnitAPI;
