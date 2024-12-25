import axios from 'axios';

const Base_URL = 'https://localhost:7113/api/userDetails';

const addUser = async (user) => {
    try{
        const response = await axios.post(`${Base_URL}`, user);
        return response.data;
    }catch(error){
        console.error(error);
    }
}

export  {addUser};