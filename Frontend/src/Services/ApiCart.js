import axios from 'axios'

const apiURL = 'http://localhost:5000/api/cart'

export async function getCartItems(id){
    return await axios.get(`${apiURL}/get-cart-items/${id}`)
}
export async function removeItem(userId, produitId) {
    return await axios.delete(`${apiURL}/remove-item`, {
        data: { userId, produitId }
    });
}
export async function addToCart(userId, produitId, quantity) {
    return await axios.post(`${apiURL}/add-to-cart`, { userId, produitId, quantity });
}
