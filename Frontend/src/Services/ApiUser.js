import axios from 'axios';

const apiURL = 'http://localhost:5000/api/user';

export async function getAllUsers() {
    return await axios.get(`${apiURL}/getall`);
}

export async function getById(id) {
    return await axios.get(`${apiURL}/get/${id}`);
}

export async function updateUser(id, formData) {
    return await axios.put(`${apiURL}/updateUser/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

export async function deleteUser(id) {
    return await axios.delete(`${apiURL}/deleteUser/${id}`);
}
