import axios from 'axios';
import { useEffect, useState } from 'react';

function CategoriesAPI(token) {
    const [categories, setCategories] = useState([]);
    const [callback, setCallback] = useState(false);
    const [isLogged, setIsLogged] = useState(false)

    useEffect(() =>{
        if(token){
            try{
                const getCategories = async () =>{
                    const res = await axios.get('/api/administration/category',{
                        headers: {Authorization: token}
                    });
                    setCategories(res.data);
                    setIsLogged(true);
                }
        
                getCategories();
            }catch(err){
                alert(err.response.data.msg)
            }
        }
       
    },[callback,token])
    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback],
        isLogged : [isLogged, setIsLogged]
    }
}

export default CategoriesAPI;
