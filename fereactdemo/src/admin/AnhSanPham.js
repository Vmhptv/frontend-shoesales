import React, { useEffect, useState } from 'react'
import { addAnhGiay, deleteAnhGiay, getAnhGiay, updateAnhGiay } from '../service/AnhGiayService';
import { Button, Form, Modal, Radio, Space, Table, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const AnhSanPham = () => {
    const [anhGiay, setAnhGiay] = useState([]);
    const [value, setValue] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(null);
    const [editAnhGiay, setEditingAnhGiay] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [file, setFile] = useState(null);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };


    const trangThai = (status) => {
        return status === 0 ? "Đang sử dụng" : "Không sử dụng";
    };

    // hàm này được gọi khi file thay đổi để cập nhật trong state 'file'
    const handleUploadChange = ({ file }) => {
        setFile(file.originFileObj);
    };

    useEffect(() => {
        getAllAnhGiay();
    }, []);

    const getAllAnhGiay = async () => {
        const result = await getAnhGiay();
        const anhGiayData = result.data.map((item, index) => ({
            key: index,
            ID: item.id,
            TENURL: item.tenUrl,
            TRANG_THAI: item.trangThai,
        }));
        setAnhGiay(anhGiayData);
    };

    const creatAnhGiay = async () => {
        if (!file) {
            message.error("Lỗi chưa chọn file ảnh");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('trangThai', value);

        try {
            await addAnhGiay(formData);
            message.success("Thêm ảnh giày thành công!");
            getAllAnhGiay();
            setFile(null);
            setValue(1);
        } catch (error) {
            message.error("Có lỗi xảy ra!");
        }
    };

    const removeAnhGiay = async (record) => {
        await deleteAnhGiay(record.ID);
        message.success("Xóa thành công !");
        getAllAnhGiay();
    };

    const detailAnhGiay = (record) => {
        setEditingAnhGiay(record);
        setFile(record.file);
        setValue(record.TRANG_THAI === 0 ? 1 : 2);
        setIsModalVisible(true);
    };
    const updateAnhGiayButton = async () => {
        const formData = new FormData();
        if (file) {
            formData.append('file', file);
        }
        formData.append('trangThai', value === 1 ? 0 : 1);
        try {
            await updateAnhGiay(editAnhGiay.ID, formData);
            message.success("Update ảnh giày thành công!");
            getAllAnhGiay();
            setFile(null);
            setIsModalVisible(false);
            setEditingAnhGiay(null);
        } catch (error) {
            message.error("Có lỗi xảy ra!");
        }
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', marginLeft: '200px' }}>
                <Upload onChange={handleUploadChange}>
                    <Button icon={<UploadOutlined />}>Click to Upload TENURL</Button>
                </Upload>
                <br /><br />
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>Còn</Radio>
                    <Radio value={2}>Hết</Radio>
                </Radio.Group>
                <br /><br />
                <Button type="primary" onClick={creatAnhGiay}>
                    Add
                </Button>
                <br /><br />
                <Table pagination={{ pageSize: 5, defaultPageSize: 5 }} rowSelection={{ selectedRowKeys, onChange: onSelectChange }} columns={[
                    {
                        title: 'ID',
                        dataIndex: 'ID',
                    },
                    {
                        title: 'Ảnh',
                        dataIndex: 'TENURL',
                        render: (TENURL) => <img src={`http://localhost:2003/upload/${TENURL}`} alt={TENURL} style={{ maxWidth: '100px' }} />,
                    },
                    {
                        title: 'TRANG THAI',
                        dataIndex: 'TRANG_THAI',
                        render: (text, record) => trangThai(record.TRANG_THAI)
                    },
                    {
                        title: 'ACTION',
                        key: 'action',
                        render: (text, record) => (
                            <Space size="middle">
                                <Button onClick={() => detailAnhGiay(record)}>Update</Button>
                                <Button onClick={() => removeAnhGiay(record)}>Delete</Button>
                            </Space>
                        ),
                    },
                ]} dataSource={anhGiay} />
            </div>
            <Modal title="Update Ảnh Giày" open={isModalVisible} onOk={updateAnhGiayButton} onCancel={() => setIsModalVisible(false)}>
                <Form>
                    <Form.Item label="TênURL Giày">
                        <Upload onChange={handleUploadChange}>
                            <Button icon={<UploadOutlined />}>Click to Upload TENURL</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Trạng Thái">
                        <Radio.Group onChange={onChange} value={value}>
                            <Radio value={1}>Đang sử dụng</Radio>
                            <Radio value={2}>Không sử dụng</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AnhSanPham