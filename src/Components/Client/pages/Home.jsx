import React, { useEffect, useState } from 'react'
import { Carousel } from 'antd';
import "../../../assets/Client_Css/home.css"
import "../../../assets/Client_Css/product.css"
import slider1 from "../../../assets/image/slider1.jpg"
import slider2 from "../../../assets/image/slider2.jpg"
import slider3 from "../../../assets/image/slider3.jpg"
import slider4 from "../../../assets/image/slider4.webp"
import icon1 from "../../../assets/image/iconcar.png"
import icon2 from "../../../assets/image/iconcart.png"
import icon3 from "../../../assets/image/iconhck.png"
import icon4 from "../../../assets/image/iconmg.png"
import { getAllProducts } from '../../../services/products.services';
import { NavLink } from 'react-router-dom';

function Home() {
    const [dataProduct, setDataProduct] = useState([]);
    useEffect(() => {
        loadProducts();
    }, [])
    const loadProducts = async () => {
        const res = await getAllProducts()
        setDataProduct(res.data)
    }
    const formatCurrency = (value) => {
        return `${new Intl.NumberFormat('vi-VN').format(value)} VND`;
    };

    const imgList = [slider1, slider2, slider3, slider4]
    const iconList = [
        {
            id: 1,
            icon: icon1,
            message: "Giao hàng siêu tốc"
        },
        {
            id: 2,
            icon: icon2,
            message: "Chất lượng siêu tốt"
        },
        {
            id: 3,
            icon: icon3,
            message: "Giặt gấu bông"
        },
        {
            id: 4,
            icon: icon4,
            message: "Hút chân không làm nhỏ gấu"
        },
    ]
    return (
        <>
            <div className='mt-8'>
                <Carousel autoplay>
                    {
                        imgList.map((value) => {
                            return (
                                <div key={value}>
                                    <img className='slider' src={value} alt="" />
                                </div>
                            )
                        })
                    }

                </Carousel>
            </div>
            <div className='site-content my-5'>
                {
                    iconList.map((value) => {
                        return (
                            <div key={value.id} className="content_arrus"><img src={value.icon} alt="" className='img-icon' />{value.message}</div>
                        )
                    })
                }
            </div>
            <h3 className='text-center my-9 text-3xl font-bold'>Các sản phẩm hot</h3>
            <div className="product">
                {
                    dataProduct.slice(0, 8).map((product) => {
                        return (
                            <NavLink to={`/client/product/${product.id}`}>
                                <div key={product.id} className="product__item">
                                    <img src={`https://localhost:7229/${product.imageUrl}`} alt="" className="product__item-img" />
                                    <span className="product__item-title">{product.name}</span>
                                    <span className="product__item-price">{formatCurrency(product.price)}</span>
                                </div>
                            </NavLink>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Home