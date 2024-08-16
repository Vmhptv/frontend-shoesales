import { Button, Form, Input, Modal, Radio, Space, Table, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { addXuatXu, deleteXuatXu, getXuatXu, updateXuatXu } from '../service/XuatXuService';

const XuatXu = () => {
    const [xuatXu, setXuatXu] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [value, setValue] = useState(1);
    const [ma, setMa] = useState('');
    const [ten, setTen] = useState('');
    const [editingXuatXu, setEditingXuatXu] = useState(null);
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
        getAllXuatXu();
    }, []);
    const getAllXuatXu = async () => {
        try {
            const result = await getXuatXu();
            const xuatXuData = result.data.map((item, index) => ({
                key: index,
                ID: item.id,
                MA: item.ma,
                TEN: item.ten,
                TRANG_THAI: item.trangThai,
            }));
            setXuatXu(xuatXuData);
        } catch (error) {
            message.error("Lỗi hiển thị table xuất xứ !");
        }

    };

    const creatXuatXu = async () => {
        if (!ma || !ten) {
            message.error("Không được để trống mã và tên xuất xứ");
            return;
        };
        const newTrangThai = value === 1 ? 1 : 0;
        
        const newXuatXu = {
            ma: ma,
            ten: ten,
            trangThai: newTrangThai,
        };
        try {
            await addXuatXu(newXuatXu);
            message.success("Thêm xuất xứ thành công !");
            getAllXuatXu();
            setMa("");
            setTen("");
            setValue(1);
        } catch (error) {
            message.error("Thêm xuất xứ thất bại ");
        }
    };
    const removeXuatXu = async (record) => {
        await deleteXuatXu(record.ID);
        message.success("Xóa thành công !");
        getAllXuatXu();
    };

    const handleUpdateXuatXu = (record) => {
        setEditingXuatXu(record);
        setMa(record.MA);
        setTen(record.TEN);
        setValue(record.TRANG_THAI === 0 ? 2 : 1);
        setIsModalVisible(true);
    };
    const handleUpdateXuatXuButton = async () => {
        const updatedTrangThai = value === 1 ? 1 : 0;

        const editXuatXu = {
            ma: ma,
            ten: ten,
            trangThai: updatedTrangThai,
        };
        try {
            await updateXuatXu(editingXuatXu.ID, editXuatXu);
            message.success("Update xuất xứ thành công");
            getAllXuatXu();
            setIsModalVisible(false);
            setMa("");
            setTen("");
        } catch (error) {
            message.error("Lỗi khi cập nhật xuất xứ");
        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', marginLeft: '200px' }}>
                <Input placeholder='Mã Xuất Xứ' value={ma} onChange={(e) => setMa(e.target.value)} />
                <br /><br />
                <Input placeholder='Tên Xuất Xứ' value={ten} onChange={(e) => setTen(e.target.value)} />
                <br /><br />
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>Còn</Radio>
                    <Radio value={2}>Hết</Radio>
                </Radio.Group>
                <br /><br />
                <Button type="primary" onClick={creatXuatXu}>
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
                                <Button onClick={() => handleUpdateXuatXu(record)}>Update</Button>
                                <Button onClick={() => removeXuatXu(record)} >Delete</Button>
                            </Space>
                        ),
                    },
                ]} dataSource={xuatXu} />
            </div>
            <Modal title="Update Kích Cỡ" open={isModalVisible} onOk={handleUpdateXuatXuButton} onCancel={() => setIsModalVisible(false)}>
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
    )
}

export default XuatXu