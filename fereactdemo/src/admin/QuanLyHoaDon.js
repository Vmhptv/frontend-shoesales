import React, { useState, useRef } from "react";
import {
  DatePicker,
  Input,
  Select,
  Space,
  Button,
  Table,
  Modal,
  Form,
  message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "./quanlyhoadon.css";

const QuanLyHoaDon = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null); // Khai báo searchInput
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [data, setData] = useState([
    {
      key: "1",
      order_id: "id cua order",
      user: "nguyen van a",
      user_phone: "111111",
      order_on: "2022-01-01",
      status: "Placed",
    },
    {
      key: "2",
      order_id: "id cua order 2",
      user: "nguyen van b",
      user_phone: "222222",
      order_on: "2022-02-01",
      status: "Packed",
    },
    {
      key: "3",
      order_id: "id cua order 3",
      user: "nguyen van c",
      user_phone: "333333",
      order_on: "2022-03-01",
      status: "Shipper",
    },
    {
      key: "4",
      order_id: "id cua order 4",
      user: "nguyen van d",
      user_phone: "444444",
      order_on: "2022-04-01",
      status: "Cancelled",
    },
    {
      key: "5",
      order_id: "id cua order 5",
      user: "nguyen van e",
      user_phone: "555555",
      order_on: "2022-05-01",
      status: "Cancelled",
    },
    {
        key: "5",
        order_id: "id cua order 5",
        user: "nguyen van e",
        user_phone: "555555",
        order_on: "2022-05-01",
        status: "Cancelled",
      },
  ]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput} // Đảm bảo searchInput được tham chiếu đúng
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue({ status: record.status });
    setIsModalVisible(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const newData = data.map((item) => {
        if (item.key === editingRecord.key) {
          return { ...item, status: values.status };
        }
        return item;
      });
      setData(newData);
      setIsModalVisible(false);
    });
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete these orders?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        const newData = data.filter(
          (item) => !selectedRowKeys.includes(item.key)
        );
        setData(newData);
        setSelectedRowKeys([]); // Bỏ chọn tất cả các checkbox sau khi xóa
        setSelectAll(false); // Bỏ chọn checkbox chọn tất cả
        message.success("Orders deleted successfully!");
      },
    });
  };

  const handleDeleteSingle = (key) => {
    Modal.confirm({
      title: "Are you sure you want to delete this order?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
        // Nếu hàng bị xóa là một trong những hàng đã chọn, cập nhật trạng thái của selectedRowKeys
        if (selectedRowKeys.includes(key)) {
          setSelectedRowKeys(selectedRowKeys.filter((item) => item !== key));
          setSelectAll(false);
        }
        message.success("Order deleted successfully!");
      },
    });
  };

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectedRowKeys(checked ? data.map((item) => item.key) : []);
    setSelectAll(checked);
  };

  const columns = [
    // {
    //   title: (
    //     <input
    //       type="checkbox"
    //       onChange={handleSelectAll}
    //       checked={selectAll}
    //     />
    //   ),
    //   key: "selection",
    //   render: (_, record) => (
    //     <input
    //       type="checkbox"
    //       checked={selectedRowKeys.includes(record.key)}
    //       onChange={() => handleRowSelect(record.key)}
    //     />
    //   ),
    //   width: "10%",
    // },
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
      width: "30%",
      ...getColumnSearchProps("order_id"),
    },
    {
      title: "User Name",
      dataIndex: "user",
      key: "user",
      width: "20%",
      ...getColumnSearchProps("user"),
    },
    {
      title: "User Phone",
      dataIndex: "user_phone",
      key: "user_phone",
      ...getColumnSearchProps("user_phone"),
    },
    {
      title: "Ordered On",
      dataIndex: "order_on",
      key: "order_on",
      ...getColumnSearchProps("order_on"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Button type="danger" onClick={() => handleDeleteSingle(record.key)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const handleRowSelect = (key) => {
    const newSelectedRowKeys = selectedRowKeys.includes(key)
      ? selectedRowKeys.filter((item) => item !== key)
      : [...selectedRowKeys, key];
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectAll(newSelectedRowKeys.length === data.length);
  };

  return (
    <div>
      <div className="hd_content">
        <p style={{ fontSize: "20px" }}>QuanLyHoaDon</p>
      </div>
      <div className="action_hoadon">
        <div style={{ display: "flex", gap: "30px" }}>
          <div className="filter">
            <p>Filter by Status</p>
            <Select
              defaultValue="---All---"
              style={{ width: 120 }}
              onChange={(value) => console.log(`selected ${value}`)}
              options={[
                { value: "Placed", label: "Placed" },
                { value: "Packed", label: "Packed" },
                { value: "Shipper", label: "Shipper" },
                { value: "Cancelled", label: "Cancelled" },
              ]}
            />
          </div>
          <div className="filter">
            <p>Filter by Date</p>
            <DatePicker
              onChange={(date) => {
                if (date && date.isValid()) {
                  console.log("Valid Date:", date.format("YYYY-MM-DD"));
                } else {
                  console.log("Invalid Date");
                }
              }}
            />
          </div>
        </div>
        <div className="filter_right">
          <Button type="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
      <div className="order_container">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="key"
          rowSelection={{
            selectedRowKeys,
            onChange: (keys) => {
              setSelectedRowKeys(keys);
              setSelectAll(keys.length === data.length);
            },
          }}
          pagination={{ pageSize: 5 }} // Thay đổi số lượng hàng trên mỗi trang
        />
      </div>

      <Modal
        title="Edit Status"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="status" label="Status">
            <Select
              options={[
                { value: "Placed", label: "Placed" },
                { value: "Packed", label: "Packed" },
                { value: "Shipper", label: "Shipper" },
                { value: "Cancelled", label: "Cancelled" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default QuanLyHoaDon;
