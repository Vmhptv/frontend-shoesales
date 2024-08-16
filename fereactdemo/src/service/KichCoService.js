import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:2003/api/KichCo";

export const getSizes = () => axios.get(REST_API_BASE_URL);

export const createSize = (size) => axios.post(`${REST_API_BASE_URL}/add`, size);

export const deleteSize = (id) => axios.delete(`${REST_API_BASE_URL}/delete/${id}`);

export const updateSize = (id, size) => axios.put(`${REST_API_BASE_URL}/update/${id}`, size);

