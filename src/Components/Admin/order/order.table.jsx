import { DeleteOutlined, EditFilled } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table } from 'antd';
import React, { useState } from 'react'
import { deleteCombinedOrders } from '../../../services/order.services';
import GetDetailOrder from './getdetail.order';

const OrderTable = (props) => {
    const { dataOrder, loadOrder, api } = props
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [dataDetail, setDataDetail] = useState(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const flattenDataOrder = dataOrder.flatMap(order =>
        order.orderDetails.map(detail => ({
            ...detail,
            orderId: order.id,
            userName: order.userName,
            status: order.status,
            totalAmount: order.totalAmount,
            orderDate: order.orderDate
        }))
    );

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'orderId',
            key: 'orderId',
            render: (text, record) => (
                <a href="#" onClick={() => {
                    setDataDetail(record);
                    setIsDetailOpen(true);
                }}>{record.orderId}</a>
            )
        },
        {
            title: 'Người dùng',
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
            title: 'Đơn giá',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
        },
        {
            title: 'Tổng đơn',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Xóa đơn order"
                        description="Bạn có chắc chắn muốn xóa đơn order này không?"
                        onConfirm={() => handleDeleteOrder(record.orderId)}
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

    const handleDeleteOrder = async (id) => {
        const res = await deleteCombinedOrders(id);
        console.log(">>>>", res.data)
        if (res.data) {
            api["success"]({
                message: 'Delete order',
                description:
                    'Xóa order thành công',
            });
            // dùng await vì bên kia loadUser dùng asyn
            await loadOrder();
        } else {
            api["error"]({
                message: "Error delete order",
                description: JSON.stringify(res.message)
            });
        }
    }
    return (
        <>

            <Table rowKey={"id"} columns={columns} dataSource={flattenDataOrder} pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50'],
                showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} đơn đặt hàng`, // hiển thị tổng số
            }} />
            <GetDetailOrder dataDetail={dataDetail} setDataDetail={setDataDetail} isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} />
        </>
    );
}

export default OrderTable