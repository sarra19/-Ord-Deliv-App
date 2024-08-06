import axios from 'axios'

const apiURL = 'http://localhost:5000/api/order'

export async function addOrder(){
    return await axios.post(`${apiURL}/addOrder`)
}