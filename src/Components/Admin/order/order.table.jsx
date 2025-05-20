import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Select, Space, Table, Tooltip } from 'antd';
import React, { useState } from 'react';
import { deleteCombinedOrders, updateCombinedOrders } from '../../../services/order.services';
import GetDetailOrder from './getdetail.order';

const OrderTable = ({ dataOrder, loadOrder, api }) => {
    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const statusOptions = [
        "Đang chờ xác nhận",
        "Đã xác nhận",
        "Đã đi đơn",
        "Đã nhận được hàng"
    ];

    const handleStatusChange = async (value, record) => {
        const res = await updateCombinedOrders(record.id, record.userId, value, record.orderDetails);
        if (res.data) {
            api["success"]({
                message: 'Cập nhật trạng thái',
                description: 'Trạng thái đơn hàng đã được cập nhật',
            });
            await loadOrder();
        } else {
            api["error"]({
                message: 'Lỗi',
                description: 'Cập nhật trạng thái thất bại',
            });
        }
    };

    const handleDeleteOrder = async (id) => {
        const res = await deleteCombinedOrders(id);
        if (res.data) {
            api["success"]({
                message: 'Delete order',
                description: 'Xóa order thành công',
            });
            await loadOrder();
        } else {
            api["error"]({
                message: "Error delete order",
                description: JSON.stringify(res.message)
            });
        }
    };

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => (
                <a onClick={() => {
                    setDataDetail(record);
                    setIsDetailOpen(true);
                }}>{record.id}</a>
            )
        },
        {
            title: 'Người dùng',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'orderDate',
            key: 'orderDate',
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
            render: (text, record) => (
                <Select
                    value={record.status}
                    onChange={(value) => handleStatusChange(value, record)}
                    style={{ width: 180 }}
                >
                    {statusOptions.map(status => (
                        <Select.Option key={status} value={status}>
                            {status}
                        </Select.Option>
                    ))}
                </Select>
            )
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title="Xóa đơn order"
                    description="Bạn có chắc chắn muốn xóa đơn hàng này không?"
                    onConfirm={() => handleDeleteOrder(record.id)}
                    okText="Yes"
                    cancelText="No"
                    placement='left'
                >
                    <Button type="primary" danger ghost><DeleteOutlined /></Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <>
            <Table
                rowKey={"id"}
                columns={columns}
                dataSource={dataOrder}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50'],
                    showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} đơn đặt hàng`,
                }}
            />
            <GetDetailOrder
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
            />
        </>
    );
};

export default OrderTable;
