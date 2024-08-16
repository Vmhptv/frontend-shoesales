import axios from "axios";

const REST_API_BASE_URL = "http://localhost:2003/api/kieudang";

export const getKieuDang = () => axios.get(REST_API_BASE_URL);

export const addKieuDang = (kieuDang) => axios.post(`${REST_API_BASE_URL}/add`, kieuDang);

export const deleteKieuDang = (id) => axios.delete(`${REST_API_BASE_URL}/delete/${id}`, id);

export const updateKieuDang = (id, kieuDang) => axios.put(`${REST_API_BASE_URL}/update/${id}`, kieuDang);