import axios from "axios";

const REST_API_BASE_URL = "http://localhost:2003/api/degiay";

export const getDeGiay = () => axios.get(REST_API_BASE_URL);

export const addDeGiay = (deGiay) => axios.post(`${REST_API_BASE_URL}/add`, deGiay);

export const deleteDeGiay = (id) => axios.delete(`${REST_API_BASE_URL}/delete/${id}`, id);

export const updateDeGiay = (id, deGiay) => axios.put(`${REST_API_BASE_URL}/update/${id}`, deGiay);