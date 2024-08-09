import axios from 'axios'

const apiURL = 'http://localhost:5000/api/order'

export async function addOrder(orderData) {
    try {
      const response = await axios.post(`${apiURL}/addOrder`, orderData);
      return response.data;
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  }