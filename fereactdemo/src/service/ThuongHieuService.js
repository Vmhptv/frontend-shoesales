import axios from "axios";

const REST_API_URL = "http://localhost:2003/api/thuonghieu";

export const getThuongHieu = () => axios.get(REST_API_URL);

export const addThuongHieu = (thuongHieu) => axios.post(`${REST_API_URL}/add`, thuongHieu);

export const deleteThuongHieu = (id) => axios.delete(`${REST_API_URL}/delete/${id}`);

export const updateThuongHieu = (id, thuongHieu) => axios.put(`${REST_API_URL}/update/${id}`, thuongHieu);