import { notification } from 'antd';
import React, { useEffect, useState } from 'react'
import { getAllCartItems } from '../../../services/cartItem.services';
import CartForm from '../cart_item/cartitem.form';
import CartItemTable from '../cart_item/cartitem.table';

function CartItem() {
    const [dataCart, setDataCart] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {
        loadCartItem();
    }, [])
    const loadCartItem = async () => {
        const res = await getAllCartItems();
        setDataCart(res.data)
    }
    return (
        <>
            {contextHolder}
            <CartForm loadCartItem={loadCartItem} api={api} />
            <CartItemTable dataCart={dataCart} api={api} loadCartItem={loadCartItem} />
        </>
    )
}

export default CartItem