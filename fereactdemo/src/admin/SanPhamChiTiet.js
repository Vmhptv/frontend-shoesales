import React, { useEffect, useState } from 'react'
import { addGiayChiTiet, detailGiayChiTiet, getAllGiayChiTiet, removeGiayChiTiet, updateGiayChiTiet } from '../service/GiayChiTietService';
import { getGiay } from '../service/GiayService';
import { Button, Form, Input, Modal, Radio, Select, Space, Table, message } from 'antd';
import { Option } from 'antd/es/mentions';

const SanPhamChiTiet = () => {
    const [giayChiTiet, setGiayChiTiet] = useState([]);
    const [giayList, setGiayList] = useState([]);
    const [value, setValue] = useState(1);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [soLuongTon, setSoLuongTon] = useState(null);
    const [selectedGiay, setSelectedGiay] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(null);
    const [editingGiayChiTiet, setEditingGiayChiTiet] = useState(null);

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const trangThai = (status) => {
        return status === 0 ? "Không sử dụng" : "Đang sử dụng";
    };

    useEffect(() => {
        getGiayData();
        getDataGiayChiTiet();
    }, []);

    const getGiayData = async () => {
        const result = await getGiay();
        setGiayList(result.data);
    };

    const getDataGiayChiTiet = async () => {
        const result = await getAllGiayChiTiet();
        const dataGiayChiTiet = result.data.map((item, index) => ({
            key: index,
            ID: item.id,
            SOLUONGTON: item.soLuongTon,
            GIAY: item.giay ? item.giay.ten : null,
            TRANG_THAI: item.trangThai,
        }));
        setGiayChiTiet(dataGiayChiTiet);
    };
    const handleGiayChange = (value) => {
        console.log(value);
        setSelectedGiay(value);
    }
    const creatGiayChiTiet = async () => {
        const newTrangThai = value === 1 ? 1 : 0;
        const newData = {
            soLuongTon: soLuongTon,
            giay: selectedGiay ? { id: selectedGiay } : null,
            trangThai: newTrangThai,
        };
        try {
            await addGiayChiTiet(newData);
            message.success("Thêm giày chi tiết thành công !");
            getDataGiayChiTiet();
            setSoLuongTon("");
            setSelectedGiay(null);
            setValue(1);
        } catch (error) {
            message.error("Lỗi khi thêm sản phẩm chi tiết");
        }
    };

    const deleteGiayChiTiet = async (record) => {
        try {
            await removeGiayChiTiet(record.ID);
            message.success("Xóa sản phẩm chi tiết thành công ");
            getDataGiayChiTiet();
        } catch (error) {
            message.error("Xóa sản phẩm chi tiết thất bại");
        }
    };

    const detail = async (record) => {
        console.log(record.ID);
        try {
            const response = await detailGiayChiTiet(record.ID);
            const giayChiTiet = response.data;
            setEditingGiayChiTiet(giayChiTiet);
            setSoLuongTon(giayChiTiet.soLuongTon);
            setValue(giayChiTiet.trangThai === 0 ? 2 : 1);
            setSelectedGiay(giayChiTiet.giay ? giayChiTiet.giay.id : null);
            setIsModalVisible(true);
            console.log(giayChiTiet);
        } catch (error) {
            message.error("Lỗi khi detail giày chi tiết");
        }
    };

    const editGiayChiTietButton = async () => {
        const newTrangThai = value === 1 ? 1 : 0;
        const newDataGiayChiTiet = {
            soLuongTon: soLuongTon,
            giay: selectedGiay ? { id: selectedGiay } : null,
            trangThai: newTrangThai
        };
        try {
            await updateGiayChiTiet(editingGiayChiTiet.id, newDataGiayChiTiet);
            message.success("Sửa thành công sản phẩm chi tiết");
            getDataGiayChiTiet();
            setIsModalVisible(false);
            setSoLuongTon("");
            setValue("");
            setSelectedGiay(null);
            setEditingGiayChiTiet(null);
        } catch (error) {
            message.error("Lỗi cập nhật sản phẩm chi tiết: " + (error.response?.data?.message || error.message));
        }
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', marginLeft: '200px' }}>
                <Select placeholder='Chọn Tên Giày' value={selectedGiay} onChange={handleGiayChange}>
                    {Array.isArray(giayList) && giayList.map(ag => (
                        <Option key={ag.id} value={ag.id}>
                            {ag.ten}
                        </Option>
                    ))}
                </Select>
                <br /><br />
                <Input placeholder='Số Lượng Tồn' value={soLuongTon} onChange={(e) => setSoLuongTon(e.target.value)} />
                <br /><br />
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>Còn</Radio>
                    <Radio value={2}>Hết</Radio>
                </Radio.Group>
                <br /><br />
                <Button type="primary" onClick={creatGiayChiTiet}>
                    Add
                </Button>
                <br /><br />
                <Table pagination={{ pageSize: 5, defaultPageSize: 5 }} rowSelection={{ selectedRowKeys, onChange: onSelectChange }} columns={[
                    {
                        title: 'SOLUONGTON',
                        dataIndex: 'SOLUONGTON',
                    },
                    {
                        title: 'GIAY',
                        dataIndex: 'GIAY',
                    },
                    {
                        title: 'TRANG THAI',
                        dataIndex: 'trang_thai',
                        render: (text, record) => trangThai(record.TRANG_THAI)
                    },
                    {
                        title: 'ACTION',
                        key: 'action',
                        render: (text, record) => (
                            <Space size="middle">
                                <Button onClick={() => detail(record)}>Detail</Button>
                                <Button onClick={() => deleteGiayChiTiet(record)}>Delete</Button>
                            </Space>
                        ),
                    },
                ]} dataSource={giayChiTiet} />
            </div>
            <Modal
                title="Update"
                onOk={editGiayChiTietButton}
                onCancel={() => setIsModalVisible(false)}
                visible={isModalVisible}
            >
                <Form>
                    <Form.Item label="Thương Hiệu">
                        <Select placeholder='Chọn Tên Giày' value={selectedGiay} onChange={handleGiayChange}>
                            {Array.isArray(giayList) && giayList.map(ag => (
                                <Option key={ag.id} value={ag.id}>
                                    {ag.ten}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Số Lượng Tồn">
                        <Input value={soLuongTon} onChange={(e) => setSoLuongTon(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Trạng Thái">
                        <Radio.Group onChange={onChange} value={value}>
                            <Radio value={1}>Còn</Radio>
                            <Radio value={2}>Hết</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default SanPhamChiTiet