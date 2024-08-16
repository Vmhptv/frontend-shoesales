import axios from "axios";

const REST_API_BASE_URL = "http://localhost:2003/api/hoadonchitiet";

export const getHoaDonChiTiet = () => axios.get(REST_API_BASE_URL);

export const addHoaDonChiTiet = (hoaDonChiTiet) => axios.post(`${REST_API_BASE_URL}/add`, hoaDonChiTiet);

export const deleteHoaDonChiTiet = (id) => axios.delete(`${REST_API_BASE_URL}/delete/${id}`);

export const updateHoaDonChiTiet = (id, hoaDonChiTiet) => axios.put(`${REST_API_BASE_URL}/update/${id}`, hoaDonChiTiet);