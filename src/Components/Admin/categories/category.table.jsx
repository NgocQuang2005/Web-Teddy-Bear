import React, { useState } from 'react';
import { Button, Popconfirm, Space, Table } from 'antd';
import { DeleteOutlined, EditFilled } from '@ant-design/icons';
import { deleteCategories } from '../../../services/category.services';
import UpdateCategoryModal from './update.category';
import GetDetalCategory from './getdetail.category';

const CategoryTable = (props) => {
    const { dataCategories, loadCategories, api } = props
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
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
                        description="Bạn có chắc chắn muốn xóa hãng gấu bông này không?"
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
        const res = await deleteCategories(id);
        console.log(">>>>", res.data)
        if (res.data) {
            api["success"]({
                message: 'Delete category',
                description:
                    'Xóa category thành công',
            });
            // dùng await vì bên kia loadRole dùng asyn
            await loadCategories();
        } else {
            api["error"]({
                message: "Error delete category",
                description: JSON.stringify(res.message)
            });
        }
    }
    return (
        <>
            <Table rowKey={"id"} columns={columns} dataSource={dataCategories} pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50'],
                showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} hãng gấu bông`, // hiển thị tổng số
            }} />
            <UpdateCategoryModal api={api} loadCategories={loadCategories} dataUpdate={dataUpdate} setDataUpdate={setDataUpdate} isModalUpdate={isModalUpdate} setIsModalUpdate={setIsModalUpdate} />
            <GetDetalCategory dataDetail={dataDetail} setDataDetail={setDataDetail} isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} />
        </>
    );
}
export default CategoryTable;