import axios from "axios";

const REST_API_BASE_URL = "http://localhost:2003/api/hoadon";

export const getHoaDon = () => axios.get(REST_API_BASE_URL);

export const getHoaDonByKhachHangId = (khachHangId) => axios.get(`${REST_API_BASE_URL}/khachHang/${khachHangId}`);

export const getHoaDonById = (hoaDonId) => axios.get(`${REST_API_BASE_URL}/${hoaDonId}`);

export const addHoaDon = (khachHangId,hoaDon) => axios.post(`${REST_API_BASE_URL}/add/khachhang/${khachHangId}`, hoaDon);

export const updateHoaDon = (id, hoaDon) => axios.put(`${REST_API_BASE_URL}/update/${id}`, hoaDon);

export const deleteHoaDon = (id) => axios.delete(`${REST_API_BASE_URL}/delete/${id}`);

