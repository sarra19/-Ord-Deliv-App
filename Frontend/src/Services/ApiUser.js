import axios from 'axios'

const apiURL = 'http://localhost:5000/api/user'

export async function getAllUsers(){
    return await axios.get(`${apiURL}/getall`)
}

