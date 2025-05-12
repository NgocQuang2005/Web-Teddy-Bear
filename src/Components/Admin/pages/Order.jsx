import React, { useEffect, useState } from 'react'
import OrderTable from '../order/order.table';
import { getAllCombinedOrders } from '../../../services/order.services';
import { notification } from 'antd';
import OrderForm from '../order/order.form';

function Order() {
    const [dataOrder, setDataOrder] = useState([])
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        loadOrder();
    }, [])
    const loadOrder = async () => {
        const res = await getAllCombinedOrders()
        setDataOrder(res.data)
    }

    return (
        <div className='p-6'>
            {contextHolder}
            <OrderForm loadOrder={loadOrder} api={api} />
            <OrderTable dataOrder={dataOrder} api={api} loadOrder={loadOrder} />
        </div>
    )
}

export default Order