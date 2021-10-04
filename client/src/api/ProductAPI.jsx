import axios from 'axios';
import { useEffect, useState } from 'react';

function ProductAPI(token) {
    const [products, setProducts] = useState([]);
    const [callback, setCallback] = useState(false);

    useEffect(() =>{
        if(token){
            try{
                const getProducts = async () =>{
                    const res = await axios.get('/api/administration/products',{
                        headers: {Authorization: token}
                    });
                    setProducts(res.data);
                }
        
                getProducts();
            }catch(err){
                alert(err.response.data.msg)
            }
        }
       
    },[callback,token])
    return {
        products: [products, setProducts],
        callback: [callback, setCallback]
    }
}

export default ProductAPI;
