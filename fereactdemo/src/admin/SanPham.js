import React, { useEffect, useState } from 'react'
import { addGiay, deleteGiay, getGiay, getGiayDetail, updateGiay } from '../service/GiayService';
import { Button, Form, Input, Modal, Radio, Select, Space, Table, message } from 'antd';
import './Sanpham.css';
import { getThuongHieu } from '../service/ThuongHieuService';
import { getChatLieu } from '../service/ChatLieuService';
import { getDeGiay } from '../service/DeGiayService';
import { getKieuDang } from '../service/KieuDangService';
import { getMauSac } from '../service/MauSacService';
import { getXuatXu } from '../service/XuatXuService';
import TextArea from 'antd/es/input/TextArea';
import { Option } from 'antd/es/mentions';
import { getSizes } from '../service/KichCoService';
import { getAnhGiay } from '../service/AnhGiayService';

const SanPham = () => {
    const [giay, setGiay] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [value, setValue] = useState(1);
    const [ma, setMa] = useState("");
    const [ten, setTen] = useState("");
    const [moTa, setMoTa] = useState("");
    const [giaNhap, setGiaNhap] = useState("");
    const [giaBan, setGiaBan] = useState("");
    const [giaSauKhuyenMai, setGiaSauKhuyenMai] = useState("");
    const [doHot, setDoHot] = useState("");
    const [thuongHieuList, setThuongHieuList] = useState([]);
    const [chatLieuList, setChatLieuList] = useState([]);
    const [deGiayList, setDeGiayList] = useState([]);
    const [xuatXuList, setXuatXuList] = useState([]);
    const [kieuDangList, setKieuDangList] = useState([]);
    const [mauSacList, setMauSacList] = useState([]);
    const [kichCoList, setKichCoList] = useState([]);
    const [anhGiayList, setAnhGiayList] = useState([]);
    const [selectedThuongHieu, setSelectedThuongHieu] = useState(null);
    const [selectedChatLieu, setSelectedChatLieu] = useState(null);
    const [selectedDeGiay, setSelectedDeGiay] = useState(null);
    const [selectedXuatXu, setSelectedXuatXu] = useState(null);
    const [selectedKieuDang, setSelectedKieuDang] = useState(null);
    const [selectedMauSac, setSelectedMauSac] = useState(null);
    const [selectdKichCo, setSelectedKichCo] = useState(null);
    const [selectedAnhGiay, setSelectedAnhGiay] = useState(null);
    const [editingGiay, setEditingGiay] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
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
        getAllGiay();
        getThuongHieuList();
        getChatLieuList();
        getDeGiayList();
        getKieuDangList();
        getMauSacList();
        getXuatXuList();
        getKichCoList();
        getAnhGiayList();
    }, []);

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
            DOHOT: item.doHot,
            TRANG_THAI: item.trangThai,
            THUONG_HIEU: item.thuongHieu ? item.thuongHieu.ten : null,
            CHAT_LIEU: item.chatLieu ? item.chatLieu.ten : null,
            DE_GIAY: item.deGiay ? item.deGiay.ten : null,
            XUAT_XU: item.xuatXu ? item.xuatXu.ten : null,
            KIEU_DANG: item.kieuDang ? item.kieuDang.ten : null,
            MAU_SAC: item.mauSac ? item.mauSac.ten : null,
            ANH_GIAY: item.anhGiay ? item.anhGiay.tenUrl : null,
            KICH_CO: item.kichCo ? item.kichCo.ten : null,
        }));
        setGiay(dataGiay);
    };
    //viết hàm get để map lên select
    const getThuongHieuList = async () => {
        const result = await getThuongHieu();
        setThuongHieuList(result.data)
    };

    const getChatLieuList = async () => {
        const result = await getChatLieu();
        setChatLieuList(result.data);
    };

    const getDeGiayList = async () => {
        const result = await getDeGiay();
        setDeGiayList(result.data);
    };

    const getXuatXuList = async () => {
        const result = await getXuatXu();
        setXuatXuList(result.data);
    };

    const getKieuDangList = async () => {
        const result = await getKieuDang();
        setKieuDangList(result.data);
    };

    const getMauSacList = async () => {
        const result = await getMauSac();
        setMauSacList(result.data);
    };

    const getKichCoList = async () => {
        const result = await getSizes();
        setKichCoList(result.data);
    };

    const getAnhGiayList = async () => {
        const result = await getAnhGiay();
        setAnhGiayList(result.data);
    };
    //viết handle để chạy vào state khi thay đổi trong select
    const handleThuongHieuChange = (value) => {
        console.log(value);
        setSelectedThuongHieu(value);
    };

    const handleChatLieuChange = (value) => {
        console.log(value);
        setSelectedChatLieu(value);
    };

    const handleDeGiayChange = (value) => {
        console.log(value);
        setSelectedDeGiay(value);
    };

    const handleXuatXuChange = (value) => {
        console.log(value);
        setSelectedXuatXu(value);
    };

    const handleKieuDangChange = (value) => {
        console.log(value);
        setSelectedKieuDang(value);
    };

    const handleMauSacChange = (value) => {
        console.log(value);
        setSelectedMauSac(value);
    };

    const handleKichCoChange = (value) => {
        console.log(value);
        setSelectedKichCo(value);
    };

    const handleAnhGiayChange = (value) => {
        console.log(value);
        setSelectedAnhGiay(value);
    };

    const creatGiay = async () => {
        if (!ma || !ten || !moTa || !giaBan || !giaNhap || !giaSauKhuyenMai || !doHot) {
            message.error("Không được để trống ! ");
            return;
        };

        const newTrangThai = value === 1 ? 1 : 0;

        const newDataGiay = {
            ma: ma,
            ten: ten,
            moTa: moTa,
            giaBan: parseFloat(giaBan),
            giaNhap: parseFloat(giaNhap),
            giaSauKhuyenMai: parseFloat(giaSauKhuyenMai),
            doHot: parseInt(doHot, 10),
            trangThai: newTrangThai,
            //id được chọn từ danh sách nếu không có giá trị sẽ là null
            thuongHieu: selectedThuongHieu ? { id: selectedThuongHieu } : null,
            chatLieu: selectedChatLieu ? { id: selectedChatLieu } : null,
            deGiay: selectedDeGiay ? { id: selectedDeGiay } : null,
            xuatXu: selectedXuatXu ? { id: selectedXuatXu } : null,
            kieuDang: selectedKieuDang ? { id: selectedKieuDang } : null,
            mauSac: selectedMauSac ? { id: selectedMauSac } : null,
            kichCo: selectdKichCo ? { id: selectdKichCo } : null,
            anhGiay: selectedAnhGiay ? { id: selectedAnhGiay } : null,

        };
        try {
            await addGiay(newDataGiay);
            message.success("Thêm sản phẩm thành công !");
            getAllGiay();
            setMa("");
            setTen("");
            setMoTa("");
            setGiaBan("");
            setGiaNhap("");
            setGiaSauKhuyenMai("");
            setDoHot("");
            setValue(null);
            setSelectedChatLieu(null);
            setSelectedThuongHieu(null);
            setSelectedDeGiay(null);
            setSelectedKieuDang(null);
            setSelectedXuatXu(null);
            setSelectedMauSac(null);
            setSelectedKichCo(null);
            setSelectedAnhGiay(null);
        } catch (error) {
            message.error("Lỗi thêm sản phẩm " + error.message);
        }
    };
    const removeGiay = async (record) => {
        try {
            await deleteGiay(record.ID);
            message.success("Xóa sản phẩm thành công");
            getAllGiay();
        } catch (error) {
            message.error("Lỗi xóa sản phẩm " + error.message);
        }
    };

    const detailGiay = async (record) => {
        console.log("ID giày là :", record.ID);
        try {
            const response = await getGiayDetail(record.ID);
            const giay = response.data;
            setEditingGiay(giay);
            setMa(giay.ma);
            setTen(giay.ten);
            setMoTa(giay.moTa);
            setGiaNhap(giay.giaNhap);
            setGiaBan(giay.giaBan);
            setGiaSauKhuyenMai(giay.giaSauKhuyenMai);
            setDoHot(giay.doHot);
            setValue(giay.trangThai === 0 ? 2 : 1);
            setSelectedThuongHieu(giay.thuongHieu ? giay.thuongHieu.id : null);
            setSelectedChatLieu(giay.chatLieu ? giay.chatLieu.id : null);
            setSelectedDeGiay(giay.deGiay ? giay.deGiay.id : null);
            setSelectedKieuDang(giay.kieuDang ? giay.kieuDang.id : null);
            setSelectedXuatXu(giay.xuatXu ? giay.xuatXu.id : null);
            setSelectedMauSac(giay.mauSac ? giay.mauSac.id : null);
            setSelectedKichCo(giay.kichCo ? giay.kichCo.id : null);
            setSelectedAnhGiay(giay.anhGiay ? giay.anhGiay.id : null);
            setIsModalVisible(true);

            console.log(giay);
        } catch (error) {
            message.error("Lỗi khi lấy chi tiết giày: " + error.message);
        }
    };

    const editGiayButton = async () => {
        console.log("ID của editingGiay:", editingGiay.id);

        const newTrangThai = value === 1 ? 1 : 0;
        const newDataGiay = {
            ma: ma,
            ten: ten,
            moTa: moTa,
            giaBan: parseFloat(giaBan),
            giaNhap: parseFloat(giaNhap),
            giaSauKhuyenMai: parseFloat(giaSauKhuyenMai),
            doHot: parseInt(doHot, 10),
            trangThai: newTrangThai,
            thuongHieu: selectedThuongHieu ? { id: selectedThuongHieu } : null,
            chatLieu: selectedChatLieu ? { id: selectedChatLieu } : null,
            deGiay: selectedDeGiay ? { id: selectedDeGiay } : null,
            xuatXu: selectedXuatXu ? { id: selectedXuatXu } : null,
            kieuDang: selectedKieuDang ? { id: selectedKieuDang } : null,
            mauSac: selectedMauSac ? { id: selectedMauSac } : null,
            kichCo: selectdKichCo ? { id: selectdKichCo } : null,
            anhGiay: selectedAnhGiay ? { id: selectedAnhGiay } : null,
        };
        try {
            await updateGiay(editingGiay.id, newDataGiay);
            message.success("Cập nhật sản phẩm thành công!");
            getAllGiay();
            resetForm();
            setIsModalVisible(false);
        } catch (error) {
            message.error("Lỗi cập nhật sản phẩm: " + (error.response?.data?.message || error.message));
        }
    };

    const resetForm = () => {
        setMa("");
        setTen("");
        setMoTa("");
        setGiaBan("");
        setGiaNhap("");
        setGiaSauKhuyenMai("");
        setDoHot("");
        setValue(null);
        setSelectedChatLieu(null);
        setSelectedThuongHieu(null);
        setSelectedDeGiay(null);
        setSelectedKieuDang(null);
        setSelectedXuatXu(null);
        setSelectedMauSac(null);
        setSelectedKichCo(null);
        setSelectedAnhGiay(null);
        setEditingGiay(null);
    };
    return (
        <div className="sanpham-container" scroll={{ x: 5000 }}>
            <div>
                <Select placeholder='Chọn Thương Hiệu' value={selectedThuongHieu} onChange={handleThuongHieuChange}>
                    {Array.isArray(thuongHieuList) && thuongHieuList.map(th => (
                        <Option key={th.id} value={th.id}>
                            {th.ten}
                        </Option>
                    ))}
                </Select>
                <Select placeholder='Chọn Chất Liệu' value={selectedChatLieu} onChange={handleChatLieuChange}>
                    {Array.isArray(chatLieuList) && chatLieuList.map(cl => (
                        <Option key={cl.id} value={cl.id}>
                            {cl.ten}
                        </Option>
                    ))}
                </Select>
                <Select placeholder='Chọn Đế Giày' value={selectedDeGiay} onChange={handleDeGiayChange}>
                    {Array.isArray(deGiayList) && deGiayList.map(deg => (
                        <Option key={deg.id} value={deg.id}>
                            {deg.ten}
                        </Option>
                    ))}
                </Select>
                <Select placeholder='Chọn Xuất Xứ' value={selectedXuatXu} onChange={handleXuatXuChange}>
                    {Array.isArray(xuatXuList) && xuatXuList.map(xx => (
                        <Option key={xx.id} value={xx.id}>
                            {xx.ten}
                        </Option>
                    ))}
                </Select>
                <Select placeholder='Chọn Kiểu Dáng' value={selectedKieuDang} onChange={handleKieuDangChange}>
                    {Array.isArray(kieuDangList) && kieuDangList.map(kd => (
                        <Option key={kd.id} value={kd.id}>
                            {kd.ten}
                        </Option>
                    ))}
                </Select>
                <Select placeholder='Chọn Màu Sắc' value={selectedMauSac} onChange={handleMauSacChange}>
                    {Array.isArray(mauSacList) && mauSacList.map(ms => (
                        <Option key={ms.id} value={ms.id}>
                            {ms.ten}
                        </Option>
                    ))}
                </Select>
                <Select placeholder='Chọn Kích Cỡ' value={selectdKichCo} onChange={handleKichCoChange}>
                    {Array.isArray(kichCoList) && kichCoList.map(kc => (
                        <Option key={kc.id} value={kc.id}>
                            {kc.ten}
                        </Option>
                    ))}
                </Select>
                <Select placeholder='Chọn Ảnh Giày' value={selectedAnhGiay} onChange={handleAnhGiayChange}>
                    {Array.isArray(anhGiayList) && anhGiayList.map(ag => (
                        <Option key={ag.id} value={ag.id}>
                            {ag.tenUrl}
                        </Option>
                    ))}
                </Select>
            </div>
            <br></br>
            <Input placeholder='Mã Giày' value={ma} onChange={(e) => setMa(e.target.value)} />
            <br /><br />
            <Input placeholder='Tên Giày' value={ten} onChange={(e) => setTen(e.target.value)} />
            <br /><br />
            <TextArea rows={4} placeholder='Mô Tả' value={moTa} onChange={(e) => setMoTa(e.target.value)} />
            <br />
            <br />
            <Input placeholder='Giá Nhập ($)' value={giaNhap} onChange={(e) => setGiaNhap(e.target.value)} />
            <br /><br />
            <Input placeholder='Giá Bán ($)' value={giaBan} onChange={(e) => setGiaBan(e.target.value)} />
            <br /><br />
            <Input placeholder='Giá Sau Khuyến Mãi ($)' value={giaSauKhuyenMai} onChange={(e) => setGiaSauKhuyenMai(e.target.value)} />
            <br /><br />
            <Input placeholder='Đo HOt' value={doHot} onChange={(e) => setDoHot(e.target.value)} />
            <br /><br />
            <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>Còn</Radio>
                <Radio value={2}>Hết</Radio>
            </Radio.Group>
            <br /><br />
            <Button type="primary" onClick={creatGiay}>
                Add
            </Button>
            <br /><br />
            <Table
                pagination={{ pageSize: 5, defaultPageSize: 5 }}
                rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
                columns={[
                    {
                        title: 'MA',
                        dataIndex: 'MA',
                        width: 100,
                    },
                    {
                        title: 'TEN',
                        dataIndex: 'TEN',
                        width: 150,
                    },
                    {
                        title: 'MOTA',
                        dataIndex: 'MOTA',
                        width: 200,
                    },
                    {
                        title: 'GIANHAP',
                        dataIndex: 'GIANHAP',
                        width: 100,
                    },
                    {
                        title: 'GIABAN',
                        dataIndex: 'GIABAN',
                        width: 100,
                    },
                    {
                        title: 'GIASAUKHUYENMAI',
                        dataIndex: 'GIASAUKHUYENMAI',
                        width: 100,
                    },
                    {
                        title: 'DOHOT',
                        dataIndex: 'DOHOT',
                        width: 100,
                    },
                    {
                        title: 'TRANG THAI',
                        dataIndex: 'trang_thai',
                        width: 150,
                        render: (text, record) => trangThai(record.TRANG_THAI)
                    },
                    {
                        title: 'THUONG_HIEU',
                        dataIndex: 'THUONG_HIEU',
                        width: 150,
                    },
                    {
                        title: 'CHAT_LIEU',
                        dataIndex: 'CHAT_LIEU',
                        width: 150,
                    },
                    {
                        title: 'DE_GIAY',
                        dataIndex: 'DE_GIAY',
                        width: 150,
                    },
                    {
                        title: 'XUAT_XU',
                        dataIndex: 'XUAT_XU',
                        width: 150,
                    },
                    {
                        title: 'KIEU_DANG',
                        dataIndex: 'KIEU_DANG',
                        width: 150,
                    },
                    {
                        title: 'MAU_SAC',
                        dataIndex: 'MAU_SAC',
                        width: 150,
                    },
                    {
                        title: 'ANH_GIAY',
                        dataIndex: 'ANH_GIAY',
                        width: 150,
                        render: (tenUrl) => <img src={`http://localhost:2003/upload/${tenUrl}`} alt={tenUrl} style={{ maxWidth: '100px' }} />,
                    },
                    {
                        title: 'KICH_CO',
                        dataIndex: 'KICH_CO',
                        width: 150,
                    },
                    {
                        title: 'ACTION',
                        key: 'action',
                        width: 150,
                        render: (text, record) => (
                            <Space size="middle">
                                <Button onClick={() => detailGiay(record)}>Detail</Button>
                                <Button onClick={() => removeGiay(record)}>Delete</Button>
                            </Space>
                        ),
                    },
                ]} dataSource={giay} />
            <Modal
                title="Update Sản Phẩm"
                onOk={editGiayButton}
                onCancel={() => setIsModalVisible(false)}
                visible={isModalVisible}
            >
                <Form>
                    <Form.Item label="Mã Giày">
                        <Input value={ma} onChange={(e) => setMa(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Tên Giày">
                        <Input value={ten} onChange={(e) => setTen(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Mô Tả">
                        <TextArea rows={4} value={moTa} onChange={(e) => setMoTa(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Giá Nhập">
                        <Input value={giaNhap} onChange={(e) => setGiaNhap(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Giá Bán">
                        <Input value={giaBan} onChange={(e) => setGiaBan(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Giá Sau Khuyến Mãi">
                        <Input value={giaSauKhuyenMai} onChange={(e) => setGiaSauKhuyenMai(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Độ Hot">
                        <Input value={doHot} onChange={(e) => setDoHot(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Trạng Thái">
                        <Radio.Group onChange={onChange} value={value}>
                            <Radio value={1}>Còn</Radio>
                            <Radio value={2}>Hết</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Thương Hiệu">
                        <Select value={selectedThuongHieu} onChange={handleThuongHieuChange}>
                            {Array.isArray(thuongHieuList) &&
                                thuongHieuList.map((th) => (
                                    <Option key={th.id} value={th.id}>
                                        {th.ten}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Chất Liệu">
                        <Select value={selectedChatLieu} onChange={handleChatLieuChange}>
                            {Array.isArray(chatLieuList) &&
                                chatLieuList.map((cl) => (
                                    <Option key={cl.id} value={cl.id}>
                                        {cl.ten}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Đế Giày">
                        <Select value={selectedDeGiay} onChange={handleDeGiayChange}>
                            {Array.isArray(deGiayList) &&
                                deGiayList.map((deg) => (
                                    <Option key={deg.id} value={deg.id}>
                                        {deg.ten}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Xuất Xứ">
                        <Select value={selectedXuatXu} onChange={handleXuatXuChange}>
                            {Array.isArray(xuatXuList) &&
                                xuatXuList.map((xx) => (
                                    <Option key={xx.id} value={xx.id}>
                                        {xx.ten}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Kiểu Dáng">
                        <Select value={selectedKieuDang} onChange={handleKieuDangChange}>
                            {Array.isArray(kieuDangList) &&
                                kieuDangList.map((kd) => (
                                    <Option key={kd.id} value={kd.id}>
                                        {kd.ten}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Màu Sắc">
                        <Select value={selectedMauSac} onChange={handleMauSacChange}>
                            {Array.isArray(mauSacList) &&
                                mauSacList.map((ms) => (
                                    <Option key={ms.id} value={ms.id}>
                                        {ms.ten}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Kích Cỡ">
                        <Select value={selectdKichCo} onChange={handleKichCoChange}>
                            {Array.isArray(kichCoList) &&
                                kichCoList.map((kc) => (
                                    <Option key={kc.id} value={kc.id}>
                                        {kc.ten}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Ảnh Giày">
                        <Select value={selectedAnhGiay} onChange={handleAnhGiayChange}>
                            {Array.isArray(anhGiayList) &&
                                anhGiayList.map((ag) => (
                                    <Option key={ag.id} value={ag.id}>
                                        {ag.tenUrl}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default SanPham