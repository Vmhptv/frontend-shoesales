import React, { useState, useEffect } from "react";
import "./bill.css";
import { fetchCustomerId } from '../service/LoginService.js';
import { Header } from "../header/Header";
import { addHoaDon } from '../service/HoaDonService.js';
import LoadThongTinKhachHangHoaDon from "../components/LoadThongTinKhachHangHoaDon.js";
import LoadThongTinDiaChiHoaDon from "../components/LoadThongTinDiaChiHoaDon.js";
import HoaDonCart from "../components/HoaDonCart.js";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const Bill = () => {
  const [khachHangId, setKhachHangId] = useState(null);
  const [order, setOrder] = useState({
    email: "",
    moTa: "KHONG",
    tenNguoiNhan: "",
    sdtNguoiNhan: "",
    diaChi: "",
    tongTien: 163500,
    hinhThucMua: 1,
    hinhThucThanhToan: 0,
    hinhThucNhanHang: 1,
    soTienGiam: 6850,
    phiShip: 57600,
    soDiemSuDung: 10,
    soTienQuyDoi: 10000,
    trangThai: 1,
  });

  useEffect(() => {
    const getCustomerId = async () => {   
      const id = await fetchCustomerId();
      console.log("customerId:", id);
      if (id) {
        setKhachHangId(id);
      } else {
        alert("Không thể lấy ID khách hàng. Vui lòng thử lại.");
      }
    };
    getCustomerId();
  }, []);

  const handleCustomerDataChange = (data) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      email: data.email,
      tenNguoiNhan: data.hoTen,
      sdtNguoiNhan: data.soDienThoai,
    }));
  };

  const handleDiaChiChange = (diaChi) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      diaChi: diaChi,
    }));
  };

  const setTongTienHang = (data) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      tongTien: data,
     
    }));
  };

  const handlePaymentChange = (event) => {
    const selectedMethod = event.target.id;
    setOrder((prevOrder) => ({
      ...prevOrder,
      hinhThucThanhToan: selectedMethod,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!khachHangId) {
      console.error('Khach hang ID is not available');
      return;
    }
    try {
      const response = await addHoaDon(khachHangId, order);
      console.log(response.data);
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng", error);
    }
  };

  const exportToExcel = () => {
    const exportData = [{
      "Địa chỉ": order.diaChi,
      "Email": order.email,
      "Mô tả": order.moTa,
      "Tên người nhận": order.tenNguoiNhan,
      "Số điện thoại người nhận": order.sdtNguoiNhan,
      "Tổng tiền hàng": `₫${order.tongTien.toLocaleString()}`,
      "Hình thức mua": order.hinhThucMua === 1 ? "Online" : "Offline",
      "Hình thức thanh toán": order.hinhThucThanhToan === '0' ? "Chuyển khoản" : "Thu hộ (COD)",
      "Hình thức nhận hàng": order.hinhThucNhanHang === 1 ? "Giao tận nơi" : "Nhận tại cửa hàng",
      "Số tiền giảm": `₫${order.soTienGiam.toLocaleString()}`,
      "Phí ship": `₫${order.phiShip.toLocaleString()}`,
      "Số điểm sử dụng": order.soDiemSuDung,
      "Số tiền quy đổi": `₫${order.soTienQuyDoi.toLocaleString()}`,
      "Tổng thanh toán": `₫${(order.tongTien + order.phiShip - order.soTienGiam).toLocaleString()}`,
      "Trạng thái": order.trangThai === 1 ? "Đã đặt" : "Chưa đặt",
    }];

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hóa Đơn");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "hoa_don.xlsx");
  };

  const tongThanhToan = order.tongTien + order.phiShip - order.soTienGiam;

  return (
    <div className="bill_container">
      <Header />
      <form onSubmit={handleSubmit}>
        <div className="bill_left">
          <div className="left">
            <h3>Thông tin nhận hàng</h3>
            <div className="section">
              {khachHangId ? (
                <>
                  <LoadThongTinKhachHangHoaDon customerId={khachHangId} onCustomerDataChange={handleCustomerDataChange} />
                  <LoadThongTinDiaChiHoaDon customerId={khachHangId} onDiaChiChange={handleDiaChiChange} />
                </>
              ) : (
                <p>Đang tải thông tin khách hàng...</p>
              )}
            </div>
          </div>
          <div className="right">
            <div className="ship">
              <h3>Phí Vận Chuyển</h3>
              <input type="text" value={order.phiShip} readOnly />
            </div>
            <h3>Thanh Toán</h3>
            <div className="right_cod">
              <div className="cod_item">
                <input
                  type="radio"
                  name="payment"
                  id="0"
                  checked={order.hinhThucThanhToan === '0'}
                  onChange={handlePaymentChange}
                />
                Chuyển khoản
              </div>
              <div className="cod_item">
                <input
                  type="radio"
                  name="payment"
                  id="1"
                  checked={order.hinhThucThanhToan === '1'}
                  onChange={handlePaymentChange}
                />
                Thu hộ (COD)
              </div>
            </div>
            <div className="order_summary">
              <div>Tổng tiền hàng: <span>₫{order.tongTien.toLocaleString()}</span></div>
              <div>Phí vận chuyển: <span>₫{order.phiShip.toLocaleString()}</span></div>
              <div>Tổng cộng Voucher giảm giá: <span>-₫{order.soTienGiam.toLocaleString()}</span></div>
              <div><strong>Tổng thanh toán: <span>₫{tongThanhToan.toLocaleString()}</span></strong></div>
            </div>
            <button type="submit">Đặt hàng</button>
            <button type="button" onClick={exportToExcel}>Xuất Excel</button>
          </div>
        </div>
      </form>
      <HoaDonCart customerId={khachHangId} onSetTongTienHang={setTongTienHang} /> 
    </div>
  );
};
