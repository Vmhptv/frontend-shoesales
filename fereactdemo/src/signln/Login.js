import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomerInput from "../signln/CustomerInput";
import { loginCustomer } from "../service/LoginService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const roles = JSON.parse(localStorage.getItem("roles") || "[]");
    if (roles.length === 0) {
      setIsAuthorized(true);
    } else if (
      roles.includes("ROLE_QUAN_LY") ||
      roles.includes("ROLE_NHAN_VIEN") ||
      roles.includes("ROLE_KHACH_HANG")
    ) {
      setIsAuthorized(true);
    } else {
      navigate("/unauthorized");
    }
  }, [navigate]);

  if (!isAuthorized) {
    return null;
  }

  const loginButton = async (e) => {
    e.preventDefault();
    setError("");
    setRole(""); // Reset role
    if (!email.trim() || !matKhau.trim()) {
      setError("Vui lòng nhập email và mật khẩu");
      return;
    }

    console.log("Attempting login with:", { email, matKhau });

    try {
      const response = await loginCustomer(email, matKhau);
      console.log("Login successful:", response);

      sessionStorage.setItem("token", response.jwt);
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          username: response.username,
          email: response.email,
          hoTen: response.hoTen,
          roles: response.roles,
        })
      );

      console.log("User roles:", response.roles);
      setRole(response.roles.join(", ")); // Hiển thị tất cả các roles

      window.dispatchEvent(new Event("loginChange"));

      // Điều hướng dựa trên vai trò
      if (
        response.roles.includes("ROLE_QUAN_LY") ||
        response.roles.includes("ROLE_NHAN_VIEN")
      ) {
        setTimeout(() => navigate("/admin/ban-hang-tai-quay"), 2000);
      } else if (response.roles.includes("ROLE_KHACH_HANG")) {
        setTimeout(() => navigate("/home"), 2000);
      } else {
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.";
      try {
        const errorData = JSON.parse(error.message);
        errorMessage = errorData.message;
      } catch (e) {
        console.error("Error parsing error message:", e);
      }
      setError(errorMessage);
    }
  };

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Login</h3>
        <p className="text-center">Login to your account to continue.</p>
        {error && <div className="alert alert-danger">{error}</div>}
        {role && (
          <div className="alert alert-success">Đăng nhập thành công</div>
        )}
        <form onSubmit={loginButton}>
          <CustomerInput
            type="email"
            label="Email Address"
            i_id="email"
            i_class=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomerInput
            type="password"
            label="Password"
            i_id="matKhau"
            i_class=""
            value={matKhau}
            onChange={(e) => setMatKhau(e.target.value)}
          />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 mt-3"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="mt-3 text-center">
          <span>Don't have an account? </span>
          <Link
            to="/register"
            style={{ color: "#ffd333", textDecoration: "none" }}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
