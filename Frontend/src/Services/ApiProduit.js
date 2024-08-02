import axios from 'axios'

const apiURL = 'http://localhost:5000/api/produit'

export async function getAllProduits(){
    return await axios.get(`${apiURL}/getall`)
}

export async function deleteProduit(id) {
    return await axios.delete(`${apiURL}/deleteProduit/${id}`);
}