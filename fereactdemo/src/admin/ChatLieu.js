import React, { useEffect, useState } from 'react'
import { addChatLieu, deleteChatLieu, getChatLieu, updateChatLieu } from '../service/ChatLieuService';
import { Button, Form, Input, Modal, Radio, Space, Table, message } from 'antd';

const ChatLieu = () => {
    const [chatLieu, setChatLieu] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [value, setValue] = useState(1);
    const [ma, setMa] = useState('');
    const [ten, setTen] = useState('');
    const [updattingChatLieu, setUpdateChatLieu] = useState(null);
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
        return status === 0 ? "Đang sử dụng" : "Không sử dụng";
    }
    useEffect(() => {
        getAllChatLieu();
    }, []);

    const getAllChatLieu = async () => {
        try {
            const result = await getChatLieu();
            const chatLieuData = result.data.map((item, index) => ({
                key: index,
                ID: item.id,
                MA: item.ma,
                TEN: item.ten,
                TRANG_THAI: item.trangThai,
            }));
            setChatLieu(chatLieuData);
        } catch (error) {
            message.error("Lỗi khi tải dữ liệu chất liệu", error);
        }
    };

    const handleAddChatLieu = async () => {
        if (!ma || !ten) {
            message.error("Mã hoặc Tên không được để trống !");
            return;
        }
        const newTrangThai = value === 1 ? 0 : 1;
        const newChatLieu = {
            ma: ma,
            ten: ten,
            trangThai: newTrangThai,
        };
        try {
            await addChatLieu(newChatLieu);
            message.success("Thêm chất liệu thành công");
            getAllChatLieu();
            setMa("");
            setTen("");
            setValue(1);
        } catch (error) {
            message.error('Lỗi khi thêm chất liệu!');
            console.error("Lỗi khi thêm chất liệu:", error);
        }
    };

    const handDeleteChatLieu = async (record) => {
        try {
            await deleteChatLieu(record.ID);
            message.success("Xoa Chat Lieu thanh cong");
            getAllChatLieu();
        } catch (error) {
            message.error("Lỗi khi xóa kích cỡ");
        }
    };

    const handleUpdateChatLieu = (record) => {
        setUpdateChatLieu(record);
        setMa(record.MA);
        setTen(record.TEN);
        setValue(record.TRANG_THAI === 0 ? 1 : 2);
        setIsModalVisible(true);
    };

    const handleUpdateChatLieuButton = async () => {
        if (!ma || !ten) {
            message.error("Không được để trống mã và tên");
            return;
        }

        const updateTRangThai = value === 1 ? 0 : 1;

        const editChatLieu = {
            ma: ma,
            ten: ten,
            trangThai: updateTRangThai
        };
        try {
            await updateChatLieu(updattingChatLieu.ID, editChatLieu);
            message.success("Cập nhật thành công");
            getAllChatLieu();
            setIsModalVisible(false);
            setUpdateChatLieu(null);
            setMa("");
            setTen("");

        } catch (error) {
            message.error("Lỗi khi cập nhật chat lieu");
            console.error("Lỗi khi cập nhật chat lieu", error);
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', marginLeft: '200px' }}>
                <Input placeholder='Mã Chất Liệu' value={ma} onChange={(e) => setMa(e.target.value)} />
                <br /><br />
                <Input placeholder='Tên Chất Liệu' value={ten} onChange={(e) => setTen(e.target.value)} />
                <br /><br />
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>Còn</Radio>
                    <Radio value={2}>Hết</Radio>
                </Radio.Group>
                <br /><br />
                <Button type="primary" onClick={handleAddChatLieu}>
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
                                <Button onClick={() => handleUpdateChatLieu(record)}>Update</Button>
                                <Button onClick={() => handDeleteChatLieu(record)}>Delete</Button>
                            </Space>
                        ),
                    },
                ]} dataSource={chatLieu} />
            </div>
            <Modal title="Update Kích Cỡ" open={isModalVisible} onOk={handleUpdateChatLieuButton} onCancel={() => setIsModalVisible(false)}>
                <Form>
                    <Form.Item label="Mã Chất Liệu">
                        <Input value={ma} onChange={(e) => setMa(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Tên Chất Liệu">
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

export default ChatLieu