import React from "react";
import "./home.css";
import { Product } from "../product/Product";

import { Header } from "../header/Header";

export default function Home() {
  const list_product = [
    {
      imgSrc: "../anhgiay/anh1.jpg",
      description: "Demo sản phẩm thuộc tính 1",
      price: "50.000",
      buttonText: "Thêm vào giỏ hàng",
      saleText: "Sale",
    },
    {
      imgSrc: "../anhgiay/anh2.jpg",
      altText: "Sản phẩm 2",
      description: "Demo sản phẩm thuộc tính 2",
      price: "500.000",
      buttonText: "Thêm vào giỏ hàng",
      saleText: "Sale",
    },
    {
      imgSrc: "../anhgiay/anh3.jpg",
      altText: "Sản phẩm 2",
      description: "Demo sản phẩm thuộc tính 2",
      price: "500.000",
      buttonText: "Thêm vào giỏ hàng",
      saleText: "Sale",
    },
    {
      imgSrc: "../anhgiay/anh4.jpg",
      altText: "Sản phẩm 2",
      description: "Demo sản phẩm thuộc tính 2",
      price: "500.000",
      buttonText: "Thêm vào giỏ hàng",
      saleText: "Sale",
    },
    {
      imgSrc: "../anhgiay/anh5.jpg",
      altText: "Sản phẩm 2",
      description: "Demo sản phẩm thuộc tính 2",
      price: "500.000",
      buttonText: "Thêm vào giỏ hàng",
      saleText: "Sale",
    },
  ];
  const feedbacks = [
    {
      imgSrc: "avatar1.jpg",
      name: "Nguyen A",
      title: "Nhân viên văn phòng",
      content:
        "Không chỉ tập trung vào việc cung cấp sản phẩm chất lượng, Dola Tool còn cam kết đảm bảo dịch vụ sau bán hàng tốt nhất. Đội ngũ nhân viên nhiệt tình và chuyên nghiệp luôn sẵn lòng giải đáp mọi thắc mắc và mong muốn của khách hàng. Tôi sẽ luôn ủng hộ.",
    },
    {
      imgSrc: "avatar1.jpg",
      name: "Tran B",
      title: "Nhân viên kinh doanh",
      content:
        "Sản phẩm rất tốt và dịch vụ hỗ trợ sau bán hàng cũng rất tuyệt vời. Tôi rất hài lòng và sẽ tiếp tục ủng hộ Dola Tool.",
    },
    {
      imgSrc: "avatar1.jpg",
      name: "Le C",
      title: "Kỹ sư phần mềm",
      content:
        "Chất lượng sản phẩm vượt trội, dịch vụ khách hàng nhanh chóng và hiệu quả. Tôi đã giới thiệu Dola Tool cho nhiều bạn bè và đồng nghiệp.",
    },
  ];
  const FeedbackCard = ({ imgSrc, name, title, content }) => (
    <div>
      <div className="feedback_content">
        <div className="feedback_avatar">
          <img src={imgSrc} alt="" />
          <div className="feedback_avatar_nd">
            <p style={{ color: "black", fontSize: "20px", marginLeft: "40px" }}>
              {name}
            </p>
            <p style={{ marginLeft: "100px" }}>{title}</p>
          </div>
        </div>
        <p>{content}</p>
      </div>
    </div>
  );

  return (
    <div className="home_container">
      {/* header */}
      <Header />

      {/* banner */}
      <div className="banner">
        <img src="slider_1.webp" alt="" />
      </div>
      {/* khuyến mãi */}
      <div className="product_sale">
        <div className="product_sale_list">
          <img style={{ width: "70%" }} src="tachnen1.png" alt="" />
          <div className="product_sale_list_content">
            <span>500.000d</span>
            <p>Khuyến mãi</p>
            <p>Giay nam </p>
            <button>Xem ngay</button>
          </div>
        </div>
        <div
          className="product_sale_list"
          style={{ backgroundColor: "#726b6b" }}
        >
          <img style={{ width: "50%" }} src="tachnen2.png" alt="" />
          <div className="product_sale_list_content">
            <span>500.000d</span>
            <p>Khuyến mãi</p>
            <p>Giay nam </p>
            <button>Xem ngay</button>
          </div>
        </div>
        <div
          className="product_sale_list"
          style={{ backgroundColor: "#c21818" }}
        >
          <img
            style={{ width: "60%", marginTop: "50px" }}
            src="tachnen3.png"
            alt=""
          />
          <div className="product_sale_list_content">
            <span>500.000d</span>
            <p>Khuyến mãi</p>
            <p>Giay nam </p>
            <button>Xem ngay</button>
          </div>
        </div>
      </div>
      {/* Sản Phẩm */}
      <h3
        style={{
          color: "black",
          textAlign: "center",
          fontWeight: "6008",
          marginTop: "35px",
        }}
      >
        DEAL CỰC HẤP DẪN
      </h3>

      <div className="product_deal">
        <div class="count-down">
          <span class="title-timer" style={{ textAlign: "center" }}>
            Thời gian chỉ còn
          </span>
          <div
            class="timer-view"
            data-countdown="countdown"
            data-date="2024-06-20-00-00-00"
          >
            <div class="lof-labelexpired">
              {" "}
              Chương trình đã kết thúc, hẹn gặp lại trong thời gian sớm nhất!
            </div>
          </div>
        </div>
        <div className="product_list">
          {list_product.map((product, index) => (
            <Product
              key={index}
              imgSrc={product.imgSrc}
              altText={product.altText}
              description={product.description}
              price={product.price}
              buttonText={product.buttonText}
              saleText={product.saleText}
            />
          ))}
        </div>
      </div>

      {/* san pham noi bat */}
      <div className="product_container">
        <h3>Sản Phẩm Nổi Bật</h3>
        <div className="product_list">
          {list_product.map((product, index) => (
            <Product
              key={index}
              imgSrc={product.imgSrc}
              altText={product.altText}
              description={product.description}
              price={product.price}
              buttonText={product.buttonText}
              saleText={product.saleText}
            />
          ))}
        </div>
      </div>
      {/* san pham ban chay */}
      <div className="product_container">
        <h3>Sản Phẩm Bán Chạy</h3>
        <div className="product_list">
          {list_product.map((product, index) => (
            <Product
              key={index}
              imgSrc={product.imgSrc}
              altText={product.altText}
              description={product.description}
              price={product.price}
              buttonText={product.buttonText}
              saleText={product.saleText}
            />
          ))}
        </div>
      </div>
      {/* feedback tu khach hang */}
      <div className="feedback">
        {feedbacks.map((feedback, index) => (
          <FeedbackCard
            key={index}
            imgSrc={feedback.imgSrc}
            name={feedback.name}
            title={feedback.title}
            content={feedback.content}
          />
        ))}
      </div>
      {/* footer */}
      {/* <Footer /> */}
    </div>
  );
}
