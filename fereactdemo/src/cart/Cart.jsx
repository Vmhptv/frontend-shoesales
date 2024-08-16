import React, { useContext } from "react";
import "./cart.css";
import { Header } from "../header/Header";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";

export const Cart = () => {
  const { cart, increment, decrement, removeProduct } = useContext(CartContext);

  const totalAmount = cart.reduce(
    (total, product) => total + (product.price || 0) * (product.count || 1),
    0
  );

  return (
    <div>
      <Header />
      <div className="container_cart">
        <div className="cart">
          <div className="cart_content">
            <p>Thông tin sản phẩm</p>
            <p>Đơn giá</p>
            <p>Số lượng</p>
            <p>Thành tiền</p>
          </div>
          {cart.map((product, index) => (
            <div className="prouduct_cart" key={index}>
              <div className="prouduct_cart_name">
                <img src={product.ANH_GIAY} alt={product.name} />
                <div style={{ marginTop: "20px" }}>
                  <p>{product.TEN}</p>
                  <button onClick={() => removeProduct(index)}>Xóa</button>
                </div>
              </div>
              <div className="prouduct_cart_price">
                <p>{(product.price || 0).toLocaleString()}đ</p>
              </div>
              <div className="prouduct_cart_count">
                <div className="prouduct_cart_count_count">
                  <button onClick={() => decrement(index)}>-</button>
                  <p>{product.count}</p>
                  <button onClick={() => increment(index)}>+</button>
                </div>
              </div>
              <div className="prouduct_cart_discount">
                <p>
                  {(
                    (product.price || 0) * (product.count || 1)
                  ).toLocaleString()}
                  đ
                </p>
              </div>
            </div>
          ))}
          <div className="total">
            <div className="total_value">
              <div className="total_value_total">
                Tổng tiền : <p>{totalAmount.toLocaleString()}đ </p>
              </div>

              <button>
                <Link to={"/bill"}>Thanh toán</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
