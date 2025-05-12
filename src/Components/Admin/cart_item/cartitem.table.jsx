import { DeleteOutlined, EditFilled } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table } from 'antd';
import React, { useState } from 'react'
import GetDetailCartItem from './getdetail.cartitem';
import UpdateCartItem from './update.cartitem';

const CartItemTable = (props) => {
    const { dataCart, loadCartItem, api } = props
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [dataDetail, setDataDetail] = useState(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const formatCurrency = (value) => {
        return `${new Intl.NumberFormat('vi-VN').format(value)} VND`;
    };
    const columns = [
        {
            title: 'Id',
            dataIndex: 'Id',
            key: 'Id',
            render: (_, record) => (
                <a href="#" onClick={() => {
                    setDataDetail(record);
                    setIsDetailOpen(true);
                }}>{record.id}</a>
            )
        },

        {
            title: 'Người dùng ',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (value) => formatCurrency(value)
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => {
                        setDataUpdate(record)
                        setIsModalUpdate(true)
                    }} type="primary" ghost><EditFilled /></Button>
                    <Popconfirm
                        title="Xóa người dùng"
                        description="Bạn có chắc chắn muốn xóa người dùng này không?"
                        onConfirm={() => handleDeleteUser(record.id)}
                        okText="Yes"
                        cancelText="No"
                        placement='left'
                    >
                        <Button type="primary" danger ghost><DeleteOutlined /></Button>
                    </Popconfirm>

                </Space>
            ),
        },
    ];
    const handleDeleteUser = async (id) => {
        const res = await deleteUser(id);
        console.log(">>>>", res.data)
        if (res.data) {
            api["success"]({
                message: 'Delete user',
                description:
                    'Xóa user thành công',
            });
            // dùng await vì bên kia loadUser dùng asyn
            await loadUser();
        } else {
            api["error"]({
                message: "Error delete user",
                description: JSON.stringify(res.message)
            });
        }
    }
    return (
        <>

            <Table rowKey={"id"} columns={columns} dataSource={dataCart} pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50'],
                showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} đơn hàng`, // hiển thị tổng số
            }} />
            <UpdateCartItem api={api} loadCartItem={loadCartItem} dataUpdate={dataUpdate} setDataUpdate={setDataUpdate} isModalUpdate={isModalUpdate} setIsModalUpdate={setIsModalUpdate} />
            <GetDetailCartItem dataDetail={dataDetail} setDataDetail={setDataDetail} isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} />
        </>
    );
}

export default CartItemTable