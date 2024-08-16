import axios from "axios";

const REST_API_URL = "http://localhost:2003/api/mausac";

export const getMauSac = () => axios.get(REST_API_URL);

export const addMauSac = (mauSac) => axios.post(`${REST_API_URL}/add`, mauSac);

export const deleteMauSac = (id) => axios.delete(`${REST_API_URL}/delete/${id}`);

export const updateMauSac = (id, mauSac) => axios.put(`${REST_API_URL}/update/${id}`, mauSac);