import axios from 'axios';

const Base_URL = 'https://localhost:7103/api/User';

//add a new user to the database
const addUser = async (user) => {
    try{
        const response = await axios.post(`${Base_URL}`, user);
        return response.data;
    }catch(error){
        console.error(error);
    }
}

//get all the users from the database
const getAllUsers = async () => {
    try{
        const response = await axios.get(`${Base_URL}`);
        return response;
    }catch(error){
        console.error(error);
    }
}

//update a user in the database
const updateUser = async (user) =>{
    try{
        const response = await axios.put(`$Base_URL/${user.id}`, user);
        if(response.status === 200){
            return response.data;
        }else{
            console.log('Error updating user');
        }
    }catch(error){
        console.error(error);
    }
}

//delete a user in the database
const deleteUser = async (id) =>{
    try{
        const response = await axios.delete(`${Base_URL}/${id}`);
        if(response.status === 200){
            return response.data;
        }else{
            console.log('Error deleting user');
        }
    }catch(error){
        console.error(error);
    }
}


export { addUser, getAllUsers, updateUser, deleteUser };