import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Input, Radio, message, Modal, Form } from 'antd';
import { getSizes, createSize, deleteSize, updateSize } from '../service/KichCoService';

const KichCo = () => {
    const [value, setValue] = useState(1);
    const [ma, setMa] = useState('');
    const [ten, setTen] = useState('');
    const [size, setSize] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [editingSize, setEditingSize] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(null);

    const convertTrangThai = (status) => {
        return status === 0 ? "Còn" : "Hết";
    };

    useEffect(() => {
        loadSize();
    }, []);

    const loadSize = async () => {
        try {
            const result = await getSizes();
            const sizeData = result.data.map((item, index) => ({
                key: index,
                ID: item.id,
                MA: item.ma,
                TEN: item.ten,
                TRANG_THAI: item.trangThai,
            }));
            setSize(sizeData);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu kích cỡ:", error);
        }
    };

    const handleAdd = async () => {
        if (!ma || !ten) {
            message.error('Mã và Tên kích cỡ không được bỏ trống!');
            return;
        }

        const newTrangThai = value === 1 ? 0 : 1;

        const newSize = {
            ma: ma,
            ten: ten,
            trangThai: newTrangThai
        };

        try {
            await createSize(newSize);
            message.success('Thêm kích cỡ thành công!');
            loadSize();
            setMa("");
            setTen("");
            setValue(1);
        } catch (error) {
            message.error('Lỗi khi thêm kích cỡ!');
            console.error("Lỗi khi thêm kích cỡ:", error);
        }
    };

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const handleUpdate = (record) => {
        setEditingSize(record);
        setMa(record.MA);
        setTen(record.TEN);
        setValue(record.TRANG_THAI === 0 ? 1 : 2);
        setIsModalVisible(true);
    };

    const handleUpdateSubmit = async () => {
        if (!ma || !ten) {
            message.error("Mã và tên không được để trống");
            return;
        }

        const updatedTrangThai = value === 1 ? 0 : 1;

        const updatedSize = {
            ma: ma,
            ten: ten,
            trangThai: updatedTrangThai
        };

        try {
            await updateSize(editingSize.ID, updatedSize);
            message.success("Cập nhật thành công");
            loadSize();
            setIsModalVisible(false);
            setEditingSize(null);
            setMa("");
            setTen("");
        } catch (error) {
            message.error("Lỗi khi cập nhật kích cỡ");
            console.error("Lỗi khi cập nhật kích cỡ:", error);
        }
    };

    const handleDelete = async (record) => {
        try {
            await deleteSize(record.ID);
            message.success("Xóa kích cỡ thành công ");
            loadSize();
        } catch (error) {
            message.error("Lỗi khi xóa kích cỡ");
        }
    };

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };


    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', marginLeft: '200px' }}>
                <Input placeholder='Mã Kích Cỡ' value={ma} onChange={(e) => setMa(e.target.value)} />
                <br /><br />
                <Input placeholder='Tên Kích Cỡ' value={ten} onChange={(e) => setTen(e.target.value)} />
                <br /><br />
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>Còn</Radio> 
                    <Radio value={2}>Hết</Radio>
                </Radio.Group>
                <br /><br />
                <Button type="primary" onClick={handleAdd}>
                    Add
                </Button>
                <br /><br />
                <Table pagination={{ pageSize: 5, defaultPageSize: 5 }} rowSelection={{ selectedRowKeys, onChange: onSelectChange }} columns={[
                    {
                        title: 'Id',
                        dataIndex: 'ID',
                    },
                    {
                        title: 'Ma',
                        dataIndex: 'MA',
                    },
                    {
                        title: 'Ten',
                        dataIndex: 'TEN',
                    },
                    {
                        title: 'TRANG THAI',
                        dataIndex: 'TRANG_THAI',
                        render: (text, record) => convertTrangThai(record.TRANG_THAI),
                    },
                    {
                        title: 'ACTION',
                        key: 'action',
                        render: (text, record) => (
                            <Space size="middle">
                                <Button onClick={() => handleUpdate(record)}>Update</Button>
                                <Button onClick={() => handleDelete(record)}>Delete</Button>
                            </Space>
                        ),
                    },
                ]} dataSource={size} />
            </div>
            <Modal title="Update Kích Cỡ" open={isModalVisible} onOk={handleUpdateSubmit} onCancel={() => setIsModalVisible(false)}>
                <Form>
                    <Form.Item label="Mã Kích Cỡ">
                        <Input value={ma} onChange={(e) => setMa(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Tên Kích Cỡ">
                        <Input value={ten} onChange={(e) => setTen(e.target.value)} />
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
    );
};

export default KichCo;