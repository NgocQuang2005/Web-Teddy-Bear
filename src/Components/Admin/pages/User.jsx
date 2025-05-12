import React, { useEffect, useState } from 'react'
import { notification } from 'antd';
import UserForm from '../users/user.form';
import Usertable from '../users/user.table';
import { fetchAllUser } from '../../../services/api.services';

function User() {
    const [dataUsers, setDataUsers] = useState([])
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        loadUser();
    }, [])
    const loadUser = async () => {
        const res = await fetchAllUser()
        setDataUsers(res.data)
    }

    return (
        <div className='p-6'>
            {contextHolder}
            <UserForm loadUser={loadUser} api={api} />
            <Usertable dataUsers={dataUsers} api={api} loadUser={loadUser} />
        </div>
    )
}

export default User
