import axios from "axios";

const REST_API_URL = "http://localhost:2003/api/giay";

export const getGiay = () => axios.get(REST_API_URL);

export const addGiay = (giay) => axios.post(`${REST_API_URL}/add`, giay);

export const deleteGiay = (id) => axios.delete(`${REST_API_URL}/delete/${id}`);

export const updateGiay = (id, giay) => axios.put(`${REST_API_URL}/update/${id}`, giay);

export const getGiayDetail = (id) => axios.get(`${REST_API_URL}/detail/${id}`);