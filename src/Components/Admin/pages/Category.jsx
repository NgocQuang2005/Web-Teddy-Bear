import React, { useEffect, useState } from 'react'
import { notification } from 'antd';
import { getAllCategories } from '../../../services/category.services';
import CategoryForm from '../categories/category.form';
import CategoryTable from '../categories/category.table';

function Category() {
    const [dataCategories, setDataCategories] = useState([])
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        loadCategories();
    }, [])
    const loadCategories = async () => {
        const res = await getAllCategories()
        setDataCategories(res.data)
    }

    return (
        <div className='p-6'>
            {contextHolder}
            <CategoryForm loadCategories={loadCategories} api={api} />
            <CategoryTable dataCategories={dataCategories} api={api} loadCategories={loadCategories} />
        </div>
    )
}

export default Category
