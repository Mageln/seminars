import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:3001',
})

export const fetchSeminars = async () => {
    const response = await api.get("/seminars");
    return response.data
}

export const deleteSeminar = async(id) => {
    await api.delete(`/seminars/${id}`);
}

export const updateSeminar = async(id,updateData) => {
    await api.put(`/seminars/${id}`, updateData);
    
}