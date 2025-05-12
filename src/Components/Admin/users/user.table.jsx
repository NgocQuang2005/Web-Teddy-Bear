import React, { useState } from 'react';
import { Button, Popconfirm, Space, Table } from 'antd';
import { DeleteOutlined, EditFilled } from '@ant-design/icons';
import { deleteUser } from '../../../services/api.services';
import UpdateUserModal from './update.user';
import GetDetalUsers from './getdetail.user';

const UserTable = (props) => {
    const { dataUsers, loadUser, api } = props
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
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone ',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
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

            <Table rowKey={"id"} columns={columns} dataSource={dataUsers} pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50'],
                showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} người dùng`, // hiển thị tổng số
            }} />
            <UpdateUserModal api={api} loadUser={loadUser} dataUpdate={dataUpdate} setDataUpdate={setDataUpdate} isModalUpdate={isModalUpdate} setIsModalUpdate={setIsModalUpdate} />
            <GetDetalUsers dataDetail={dataDetail} setDataDetail={setDataDetail} isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} />
        </>
    );
}
export default UserTable;