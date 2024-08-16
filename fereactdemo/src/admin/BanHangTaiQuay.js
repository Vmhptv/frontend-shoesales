import React from "react";
import "./banhangtaiquay.css";
import { getGiay } from "../service/GiayService";
import { useState, useEffect } from "react";
import { Input, message } from "antd";

const BanHangTaiQuay = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [customerMoney, setCustomerMoney] = useState("");
    const [giay, setGiay] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [changeAmount, setChangeAmount] = useState(0);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setCustomerMoney(inputValue);

        // Calculate and update change amount
        const parsedMoney = parseFloat(inputValue) || 0;
        const total = getTotalAmount();
        if (parsedMoney >= total) {
            setChangeAmount(parsedMoney - total);
        } else {
            setChangeAmount(0);
        }
    };

    const handleProductClick = (product) => {
        setSelectedProducts((prevSelectedProducts) => {
            const updatedProducts = prevSelectedProducts.some(
                (p) => p.ID === product.ID
            )
                ? prevSelectedProducts.filter((p) => p.ID !== product.ID)
                : [...prevSelectedProducts, product];
            localStorage.setItem("selectedProducts", JSON.stringify(updatedProducts));
            return updatedProducts;
        });
    };

    const handleRemoveProduct = (productId) => {
        setSelectedProducts((prevSelectedProducts) => {
            const updatedProducts = prevSelectedProducts.filter(
                (product) => product.ID !== productId
            );
            localStorage.setItem("selectedProducts", JSON.stringify(updatedProducts));
            return updatedProducts;
        });
    };

    const handleQuantityChange = (productId, delta) => {
        setSelectedProducts((prevSelectedProducts) => {
            const updatedProducts = prevSelectedProducts.map((product) => {
                if (product.ID === productId) {
                    return { ...product, SOLUONG: product.SOLUONG + delta };
                }
                return product;
            });
            localStorage.setItem("selectedProducts", JSON.stringify(updatedProducts));
            return updatedProducts;
        });
    };

    const calculateTotal = (product) => {
        return product.GIASAUKHUYENMAI * product.SOLUONG;
    };

    const getTotalAmount = () => {
        return selectedProducts.reduce((total, product) => total + calculateTotal(product), 0);
    };

    useEffect(() => {
        getAllGiay();
        const storedSelectedProducts = JSON.parse(
            localStorage.getItem("selectedProducts")
        );
        if (storedSelectedProducts) {
            setSelectedProducts(storedSelectedProducts);
        }
    }, []);

    useEffect(() => {
        setTotalAmount(getTotalAmount());
    }, [selectedProducts]);

    const getAllGiay = async () => {
        const result = await getGiay();
        const dataGiay = result.data.map((item, index) => ({
            key: index,
            ID: item.id,
            MA: item.ma,
            TEN: item.ten,
            MOTA: item.moTa,
            GIANHAP: item.giaNhap,
            GIABAN: item.giaBan,
            GIASAUKHUYENMAI: item.giaSauKhuyenMai,
            ANH_GIAY: item.anhGiay ? item.anhGiay.tenUrl : null,
            SOLUONG: item.soLuong || 0,
        }));
        setGiay(dataGiay);
    };

    const handlePayment = () => {
        const parsedMoney = parseFloat(customerMoney) || 0;
        if (parsedMoney < totalAmount) {
            message.error("Tiền khách đưa không đủ!");
        } else {
            // Xử lý thanh toán thành công ở đây
            message.success("Thanh toán thành công!");
        }
    };

    return (
        <div className="quay_container">
            <div className="left">
                <div className="product_list_hd">
                    Danh Sách Sản Phẩm
                    <div className="selected_products">
                        {selectedProducts.map((product) => (
                            <div key={product.ID} className="selected_product">
                                <div>{product.TEN}</div>
                                {product.ANH_GIAY && (
                                    <img
                                        src={`http://localhost:2003/upload/${product.ANH_GIAY}`}
                                        alt={product.TEN}
                                    />
                                )}
                                <div>{product.GIASAUKHUYENMAI}</div>
                                <div className="quantity_controls">
                                    <button
                                        onClick={() => handleQuantityChange(product.ID, -1)}
                                        disabled={product.SOLUONG <= 0}
                                    >
                                        -
                                    </button>
                                    <span>{product.SOLUONG}</span>
                                    <button onClick={() => handleQuantityChange(product.ID, 1)}>
                                        +
                                    </button>
                                </div>
                                <div className="total_price">{calculateTotal(product)}</div>
                                <button
                                    className="remove_button"
                                    onClick={() => handleRemoveProduct(product.ID)}
                                >
                                    Xóa
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="product_list_tt">
                    <table className="product_table">
                        <thead>
                            <tr>
                                <th>Mã</th>
                                <th>Ảnh</th>
                                <th>Tên</th>
                                <th>Giá Bán</th>
                                <th>Giá Sau Khuyến Mãi</th>
                                <th>Số Lượng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {giay.map((item) => (
                                <tr
                                    key={item.key}
                                    onClick={() => handleProductClick(item)}
                                    style={{
                                        backgroundColor: selectedProducts.some(
                                            (product) => product.ID === item.ID
                                        )
                                            ? "#e0f7fa"
                                            : "transparent",
                                    }}
                                >
                                    <td>{item.MA}</td>
                                    <td>
                                        {item.ANH_GIAY ? (
                                            <img
                                                src={`http://localhost:2003/upload/${item.ANH_GIAY}`}
                                                width={50}
                                                height={50}
                                                alt={item.TEN}
                                            />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>
                                    <td>{item.TEN}</td>
                                    <td>{item.GIABAN}</td>
                                    <td>{item.GIASAUKHUYENMAI}</td>
                                    <td>{item.SOLUONG}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="right">
                <p>Tiền Khách Phải Trả: {totalAmount.toFixed(2)} VND</p>
                Tiền khách đưa
                <Input
                    type="number"
                    value={customerMoney}
                    onChange={handleInputChange}
                    placeholder="Nhập số tiền khách đưa"
                />
                <hr />
                <p>Tiền thừa: {changeAmount.toFixed(2)}</p>
                <hr />
                <div className="check_tt">
                    <label>
                        <input
                            type="checkbox"
                            value="option1"
                            checked={selectedOption === "option1"}
                            onChange={handleChange}
                        />
                        Tiền mặt
                    </label>
                    <br />
                    <label>
                        <input
                            type="checkbox"
                            value="option2"
                            checked={selectedOption === "option2"}
                            onChange={handleChange}
                        />
                        Thẻ
                    </label>
                    <br />
                    <label>
                        <input
                            type="checkbox"
                            value="option3"
                            checked={selectedOption === "option3"}
                            onChange={handleChange}
                        />
                        Chuyển Khoản
                    </label>
                </div>
                <p style={{ paddingTop: "300px" }}>Tổng Tiền: {totalAmount.toFixed(2)}</p>
                <button className="btn-tt" onClick={handlePayment}>Thanh Toán</button>
            </div>
        </div>
    );
};

export default BanHangTaiQuay;