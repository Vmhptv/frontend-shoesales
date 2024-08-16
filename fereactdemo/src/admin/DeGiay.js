import { Button, Form, Input, Modal, Radio, Space, Table, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { addDeGiay, deleteDeGiay, getDeGiay, updateDeGiay } from '../service/DeGiayService';


const DeGiay = () => {
    const [deGiay, setDeGiay] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [value, setValue] = useState(1);
    const [ma, setMa] = useState('');
    const [ten, setTen] = useState('');
    const [updattingDeGiay, setUpdattingDeGiay] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(null);
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
    }

    useEffect(() => {
        getAllDeGiay();
    }, []);
    const getAllDeGiay = async () => {
        try {
            const result = await getDeGiay();
            const deGiayData = result.data.map((item, index) => ({
                key: index,
                ID: item.id,
                MA: item.ma,
                TEN: item.ten,
                TRANG_THAI: item.trangThai,
            }));
            setDeGiay(deGiayData);
        } catch (error) {
            message.error("Lỗi hiển thị load table đế giày ");
        }
    };

    const createDeGiay = async () => {
        if (!ma || !ten) {
            message.error("Không được để trống mã hoặc tên");
            return;
        };
        const newTrangThai = value === 1 ? 1 : 0;
        const newDeGiay = {
            ma: ma,
            ten: ten,
            trangThai: newTrangThai,
        };
        try {
            await addDeGiay(newDeGiay);
            message.success("Thêm đế giày mới thành công");
            getAllDeGiay();
            setMa("");
            setTen("");
            setValue(1);
        } catch (error) {
            message.error('Lỗi khi thêm đế giày');
            console.error("Lỗi khi thêm đế giày", error);
        }
    };

    const handledeleteDeGiay = async (record) => {
        try {
            await deleteDeGiay(record.ID);
            message.success("Xóa đế giày thành công !");
            getAllDeGiay();
        } catch (error) {
            message.error("Xóa đế giày thất bại ");
        }
    };

    const handleUpdateDeGiay = (record) => {
        setUpdattingDeGiay(record);
        setMa(record.MA);
        setTen(record.TEN);
        setValue(record.TRANG_THAI === 0 ? 2 : 1);
        setIsModalVisible(true);
    };

    const handleUpdateDeGiayButton = async () => {
        const newTrangThai = value === 1 ? 1 : 0;
        const editingDeGiay = {
            ma: ma,
            ten: ten,
            trangThai: newTrangThai,
        };
        try {
            await updateDeGiay(updattingDeGiay.ID, editingDeGiay);
            message.success("Cập nhật thành công");
            getAllDeGiay();
            setIsModalVisible(false);
            setMa("");
            setTen("");
        } catch (error) {
            message.error("Cập nhật đế giày lỗi");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', marginLeft: '200px' }}>
                <Input placeholder='Mã Đế Giày' value={ma} onChange={(e) => setMa(e.target.value)} />
                <br /><br />
                <Input placeholder='Tên Đế Giày' value={ten} onChange={(e) => setTen(e.target.value)} />
                <br /><br />
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>Còn</Radio>
                    <Radio value={2}>Hết</Radio>
                </Radio.Group>
                <br /><br />
                <Button type="primary" onClick={createDeGiay}>
                    Add
                </Button>
                <br /><br />
                <Table pagination={{ pageSize: 5, defaultPageSize: 5 }} rowSelection={{ selectedRowKeys, onChange: onSelectChange }} columns={[
                    {
                        title: 'ID',
                        dataIndex: 'ID',
                    },
                    {
                        title: 'MA',
                        dataIndex: 'MA',
                    },
                    {
                        title: 'TEN',
                        dataIndex: 'TEN',
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
                                <Button onClick={() => handleUpdateDeGiay(record)}>Update</Button>
                                <Button onClick={() => handledeleteDeGiay(record)}>Delete</Button>
                            </Space>
                        ),
                    },
                ]} dataSource={deGiay} />
            </div>
            <Modal title="Update Kích Cỡ" open={isModalVisible} onOk={handleUpdateDeGiayButton} onCancel={() => setIsModalVisible(false)}>
                <Form>
                    <Form.Item label="Mã Kích Cỡ">
                        <Input value={ma} onChange={(e) => setMa(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Tên Kích Cỡ">
                        <Input value={ten} onChange={(e) => setTen(e.target.value)} />
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
    )
}

export default DeGiay