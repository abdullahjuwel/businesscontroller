import axios from 'axios';
import { useEffect, useState } from 'react';

function UsersAPI(token) {
    const [users, setUsers] = useState([]);
    const [callback, setCallback] = useState(false);
    const [isLogged, setIsLogged] = useState(false)

    useEffect(() =>{
        if(token){
            try{
                const getUsers = async () =>{
                    const res = await axios.get('/api/infor',{
                        headers: {Authorization: token}
                    });
                    setUsers(res.data.user);
                    setIsLogged(true);
                }
        
                getUsers();
            }catch(err){
                alert(err.response.data.msg)
            }
        }
       
    },[callback,token])
    return {
        users: [users, setUsers],
        callback: [callback, setCallback],
        isLogged : [isLogged, setIsLogged]
    }
}

export default UsersAPI;
