import React, { useState, useEffect, useContext } from "react";
import { Header } from "../header/Header";
import { getGiay } from "../service/GiayService";
import "./productall.css";
import { CartContext } from "../cart/CartContext";

export const ProductAll = () => {
  const [giay, setGiay] = useState([]);
  const [filteredGiay, setFilteredGiay] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // Trạng thái sắp xếp
  const { addToCart } = useContext(CartContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    getAllGiay();
  }, []);

  useEffect(() => {
    filterAndSortGiay();
  }, [priceRange, giay, sortOrder]);

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
    }));
    setGiay(dataGiay);
    setFilteredGiay(dataGiay); // Initialize filteredGiay
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Tính toán các sản phẩm sẽ hiển thị dựa trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredGiay.slice(indexOfFirstItem, indexOfLastItem);

  const handlePriceRangeChange = (event) => {
    const value = event.target.value;
    setPriceRange((prevRanges) =>
      prevRanges.includes(value)
        ? prevRanges.filter((range) => range !== value)
        : [...prevRanges, value]
    );
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const filterAndSortGiay = () => {
    let filtered = giay;

    // Lọc theo mức giá
    if (priceRange.length > 0) {
      filtered = filtered.filter((item) => {
        const price = item.GIABAN;
        return priceRange.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return price >= min && price <= max;
        });
      });
    }

    // Sắp xếp theo giá
    filtered = filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.GIABAN - b.GIABAN;
      } else {
        return b.GIABAN - a.GIABAN;
      }
    });

    setFilteredGiay(filtered);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredGiay.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`page-number ${number === currentPage ? "active" : ""}`}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="productAll_container">
      <Header />
      <div className="banner_productAll">
        <img src="banner_3.jpg" alt="" />
      </div>
      <div className="aside_container">
        <div className="aside_left">
          {/* Danh mục sản phẩm */}
          <div className="product-portfolio">
            <div
              className="background"
              style={{
                color: "black",
                fontSize: "25px",
                fontWeight: "500",
                paddingLeft: "20px",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  marginTop: "10px",
                }}
              >
                Danh mục sản phẩm
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "27px",
                marginLeft: "20px",
                marginTop: "20px",
              }}
            >
              <div>
                <p>giày thể thao</p>
              </div>
              <div>
                <p>giày thể thao</p>
              </div>
              <div>
                <p>giày thể thao</p>
              </div>
              <div>
                <p>giày thể thao</p>
              </div>
              <div>
                <p>giày thể thao</p>
              </div>
              <div>
                <p>giày thể thao</p>
              </div>
            </div>
          </div>
          {/* Bộ lọc sản phẩm */}
          <div className="product-portfolio" style={{ marginTop: "30px" }}>
            <div
              className="background"
              style={{
                color: "black",
                fontSize: "25px",
                fontWeight: "500",
                paddingLeft: "20px",
              }}
            >
              <p>Bộ lọc sản phẩm</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "27px",
                marginLeft: "20px",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  marginTop: "10px",
                }}
              >
                Chọn mức giá
              </p>

              <div>
                <input
                  type="checkbox"
                  value="100000-200000"
                  onChange={handlePriceRangeChange}
                />
                Từ 100k - 200k
              </div>
              <div>
                <input
                  type="checkbox"
                  value="300000-500000"
                  onChange={handlePriceRangeChange}
                />
                Từ 300k - 500k
              </div>
              <div>
                <input
                  type="checkbox"
                  value="500000-1000000"
                  onChange={handlePriceRangeChange}
                />
                Từ 500k - 1 triệu
              </div>
              <div>
                <input
                  type="checkbox"
                  value="1000000-2000000"
                  onChange={handlePriceRangeChange}
                />
                Từ 1 triệu - 2 triệu
              </div>
              <div>
                <input
                  type="checkbox"
                  value="1500000-3000000"
                  onChange={handlePriceRangeChange}
                />
                Từ 1,5 triệu - 3 triệu
              </div>
              <div>
                <input
                  type="checkbox"
                  value="3000000-4000000"
                  onChange={handlePriceRangeChange}
                />
                Từ 3 triệu - 4 triệu
              </div>
              <div>
                <input
                  type="checkbox"
                  value="4000000-5000000"
                  onChange={handlePriceRangeChange}
                />
                Từ 4 triệu - 5 triệu
              </div>
            </div>
          </div>
        </div>

        {/* Phần hiển thị sản phẩm */}
        <div className="aside_right">
          <div className="aside_right_content">
            <img src="icongiay.jpg" alt="" />
            <div style={{ marginLeft: "20px" }}>
              <p>Tất cả sản phẩm</p>
              <span>
                Chúng tôi luôn cam kết mang đến những sản phẩm chất lượng cao,
                được chọn lọc kỹ lưỡng từ các nhà sản xuất uy tín trên thế giới.
                Qua sự kết hợp giữa chất lượng và sự đa dạng, Dola Tool mang đến
                cho khách hàng lựa chọn tối ưu cho các công việc cơ khí của
                mình.
              </span>
            </div>
          </div>
          <div className="sort">
            <img src="sapxep.png" alt="" />
            <p>Sắp xếp theo:</p>
            <button onClick={() => handleSortChange("asc")}>
              Giá cao đến thấp
            </button>
            <button onClick={() => handleSortChange("desc")}>
              Giá thấp đến cao
            </button>
          </div>

          {/* Không gian hiển thị sản phẩm */}
          <div className="show_product">
            {currentItems.map((item) => (
              <div key={item.key} className="product">
                <img
                
                  src={`http://localhost:2003/upload/${item.ANH_GIAY}`}
                  alt={item.TEN}
                  style={{ maxWidth: "100px" }}
                />
                <span>{item.TEN}</span>
                <p>{item.GIABAN} VND</p>
                <button
                  className="hover-btn"
                  onClick={() => addToCart({ ...item, price: item.GIABAN })}
                >
                  Thêm
                </button>
              </div>
            ))}
          </div>

          {/* Điều hướng phân trang */}
          {renderPagination()}
        </div>
      </div>
    </div>
  );
};
