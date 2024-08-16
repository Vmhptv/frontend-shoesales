import axios from "axios";

const REST_API_BASE_URL = "http://localhost:2003/api/xuatxu";

export const getXuatXu = () => axios.get(REST_API_BASE_URL);

export const addXuatXu = (xuatXu) => axios.post(`${REST_API_BASE_URL}/add`, xuatXu);

export const deleteXuatXu = (id) => axios.delete(`${REST_API_BASE_URL}/delete/${id}`);

export const updateXuatXu = (id, xuatXu) => axios.put(`${REST_API_BASE_URL}/update/${id}`, xuatXu);