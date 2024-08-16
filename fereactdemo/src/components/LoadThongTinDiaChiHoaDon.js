import React, { useState, useEffect } from 'react';
import { getDiaChiByKhachHangId } from '../service/DiaChiService.js';

const DataCustomerInfo = ({ customerId, onDiaChiChange }) => {
  const [customerData, setCustomerData] = useState([]);

  const [xa, setXa] = useState("");
  const [huyen, setHuyen] = useState("");
  const [tinh, setTinh] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await getDiaChiByKhachHangId(customerId);
        // Kiểm tra dữ liệu trả về
        console.log(response.data);
        // Kiểm tra xem dữ liệu có phải là mảng không, nếu không thì đưa nó vào mảng
        const data = Array.isArray(response.data) ? response.data : [response.data];
        setCustomerData(data);
        if (data.length > 0) {
          setTinh(data[0].thanhPho);
          setHuyen(data[0].huyen);
          setXa(data[0].xa);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [customerId]);

  useEffect(() => {
    const newDiaChi = `${xa}_${huyen}_${tinh}`;
    onDiaChiChange(newDiaChi);
    // console.log(newDiaChi);
  }, [xa, huyen, tinh]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {customerData.length > 0 ? (
        customerData.map((data, index) => (
          <div className="section" key={index}>
            <div className="section_item">
              <input
                name="thanhPho"
                id="thanhPho"
                type="text"
                placeholder="Tỉnh thành"
                value={data.thanhPho || ""}
                readOnly
              />
            </div>
            <div className="section_item">
              <input
                name="huyen"
                id="huyen"
                type="text"
                placeholder="Quận Huyện"
                value={data.huyen || ""}
                readOnly
              />
            </div>
            <div className="section_item">
              <input
                name="xa"
                id="xa"
                type="text"
                placeholder="Phường Xã"
                value={data.xa || ""}
                readOnly
              />
            </div>
            <div className="section_item">
              <input
                name="moTa"
                id="moTa"
                type="text"
                placeholder="Ghi chú (tùy chọn)"
                value={data.moTa || ""}
                readOnly
              />
            </div>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default DataCustomerInfo;
