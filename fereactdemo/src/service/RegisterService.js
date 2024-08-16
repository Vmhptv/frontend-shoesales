import axios from "axios";

const REST_API_BASE_URL = "http://localhost:2003/api/auth";

export const signupCustomer = (signupData) => axios.post(`${REST_API_BASE_URL}/signup`, signupData);