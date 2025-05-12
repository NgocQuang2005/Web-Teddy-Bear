import React, { useEffect, useState } from 'react'
import { notification } from 'antd';
import { getAllRoles } from '../../../services/role.services';
import RoleForm from '../roles/role.form';
import RoleTable from '../roles/role.table';

function Role() {
    const [dataRoles, setDataRoles] = useState([])
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        loadRole();
    }, [])
    const loadRole = async () => {
        const res = await getAllRoles()
        setDataRoles(res.data)
    }

    return (
        <div className='p-6'>
            {contextHolder}
            <RoleForm loadRole={loadRole} api={api} />
            <RoleTable dataRoles={dataRoles} api={api} loadRole={loadRole} />
        </div>
    )
}

export default Role
