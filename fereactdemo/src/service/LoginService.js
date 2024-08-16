import axios from '../axiosConfig';

const REST_API_BASE_URL = "http://localhost:2003/api/auth";

export const loginCustomer = async (email, matKhau) => {
    try {
        const response = await axios.post(`${REST_API_BASE_URL}/login`, { email, matKhau });
        if (response.data && response.data.token) {
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        console.error('Login API error:', error);
        let errorMessage = 'Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.';
        let status = 500;

        if (error.response) {
            status = error.response.status;

            switch (status) {
                case 400:
                    errorMessage = 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại email và mật khẩu.';
                    break;
                case 401:
                    errorMessage = 'Email hoặc mật khẩu không chính xác.';
                    break;
                case 404:
                    errorMessage = 'Tài khoản không tồn tại. Vui lòng đăng ký.';
                    break;
                case 500:
                    errorMessage = 'Lỗi server. Vui lòng thử lại sau.';
                    break;
                default:
                    errorMessage = error.response.data.message || errorMessage;
            }
        }

        throw new Error(JSON.stringify({ status, message: errorMessage }));
    }
};

export const fetchCustomerId = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get('http://localhost:2003/api/auth/customer/id', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data
    } catch (error) {
      console.error('There was a problem fetching customer ID:', error);
    }
  };