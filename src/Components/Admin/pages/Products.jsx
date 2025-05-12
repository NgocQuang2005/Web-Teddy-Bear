import React, { useEffect, useState } from 'react'
import ProductForm from '../products/product.form';
import ProductsTable from '../products/product.table';
import { getAllProducts } from '../../../services/products.services';
import { notification } from 'antd';

function Products() {
    const [dataProducts, setDataProducts] = useState([])
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        loadProducts();
    }, [])
    const loadProducts = async () => {
        const res = await getAllProducts()
        setDataProducts(res.data)
    }
    return (
        <div className='p-6'>
            {contextHolder}
            <ProductForm loadProducts={loadProducts} api={api} />
            <ProductsTable dataProducts={dataProducts} api={api} loadProducts={loadProducts} />
        </div>
    )
}

export default Products