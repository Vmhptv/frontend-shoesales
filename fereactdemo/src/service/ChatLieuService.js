import axios from "axios";

const REST_API_BASE_URL = "http://localhost:2003/api/chatlieu";

export const getChatLieu = () => axios.get(REST_API_BASE_URL);

export const addChatLieu = (chatLieu) => axios.post(`${REST_API_BASE_URL}/add`, chatLieu);

export const deleteChatLieu = (id) => axios.delete(`${REST_API_BASE_URL}/delete/${id}`);

export const updateChatLieu = (id, chatLieu) => axios.put(`${REST_API_BASE_URL}/update/${id}`, chatLieu);