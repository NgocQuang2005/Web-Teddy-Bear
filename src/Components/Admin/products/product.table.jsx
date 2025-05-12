import React, { useState } from 'react'
import UpdateProducts from './update.product';
import GetDetailProducts from './getdetail.product';
import { Button, Popconfirm, Space, Table } from 'antd';
import { DeleteOutlined, EditFilled } from '@ant-design/icons';
import { deleteProducts } from '../../../services/products.services';

const ProductsTable = (props) => {
    const { dataProducts, loadProducts, api } = props
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [dataDetail, setDataDetail] = useState(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
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
            title: 'Tên Gấu',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Miêu tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantityInStock',
            key: 'quantityInStock',
        },
        {
            title: 'Hãng gấu',
            dataIndex: 'categoryName',
            key: 'categoryName',
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
                        description="Bạn có chắc chắn muốn xóa gấu bông này không?"
                        onConfirm={() => handleDeleteCategory(record.id)}
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
    const handleDeleteCategory = async (id) => {
        const res = await deleteProducts(id);
        console.log(">>>>", res.data)
        if (res.data) {
            api["success"]({
                message: 'Delete product',
                description:
                    'Xóa product thành công',
            });
            // dùng await vì bên kia loadRole dùng asyn
            await loadProducts();
        } else {
            api["error"]({
                message: "Error delete product",
                description: JSON.stringify(res.message)
            });
        }
    }
    return (
        <>
            <Table rowKey={"id"} columns={columns} dataSource={dataProducts} pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50'],
                showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} gấu bông`, // hiển thị tổng số
            }} />
            <UpdateProducts api={api} loadProducts={loadProducts} dataUpdate={dataUpdate} setDataUpdate={setDataUpdate} isModalUpdate={isModalUpdate} setIsModalUpdate={setIsModalUpdate} />
            <GetDetailProducts dataDetail={dataDetail} setDataDetail={setDataDetail} isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} />
        </>
    );
}

export default ProductsTable