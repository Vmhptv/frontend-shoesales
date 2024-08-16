import axios from "axios";

const REST_API_BASE_URL = "http://localhost:2003/api/giohangchitiet";

export const getByKhachHangId = (khachHangId) => axios.get(`${REST_API_BASE_URL}/khachhang/${khachHangId}`);
