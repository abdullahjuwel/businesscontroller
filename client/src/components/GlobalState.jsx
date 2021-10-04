import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import CategoriesAPI from '../api/CategoriesAPI';
import CustomerAPI from '../api/CustomerAPI';
import DepartmentAPI from '../api/DepartmentAPI';
import ProductAPI from '../api/ProductAPI';
import ProductNameAPI from '../api/ProductNameAPI';
import ProductUnitAPI from '../api/ProductUnitAPI';
import SupplierAPI from '../api/SupplierAPI';
import UsersAPI from '../api/UsersAPI';


export const GlobalState = createContext();


export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false);


    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin');
        console.log(firstLogin)
        if(firstLogin){
            const refreshToken = async () =>{
                const res = await axios.get('/api/refresh_token');
                console.log(res.data.accesstoken);
        
                setToken(res.data.accesstoken);
    
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000);
            }
            refreshToken();
        }
    },[])


    
    const state = {
        token          : [token, setToken],
        DepartmentAPI  : DepartmentAPI(token),
        categoriesAPI  : CategoriesAPI(token),
        productnameAPI : ProductNameAPI(token),
        productunitAPI : ProductUnitAPI(token),
        productAPI     : ProductAPI(token),
        customerAPI    : CustomerAPI(token),
        supplierAPI    : SupplierAPI(token),
        usersAPI       : UsersAPI(token)
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}