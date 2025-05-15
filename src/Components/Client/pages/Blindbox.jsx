import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../../services/products.services';
import { Pagination } from 'antd';
import { NavLink } from 'react-router-dom';
import "../../../assets/Client_Css/product.css";

function Blindbox() {
    const [blindboxProducts, setBlindboxProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 24;

    useEffect(() => {
        loadBlindboxProducts();
    }, []);

    const loadBlindboxProducts = async () => {
        const res = await getAllProducts();
        const filtered = res.data.filter(product => product.categoryId === 8);
        setBlindboxProducts(filtered);
    };

    const formatCurrency = (value) => {
        return `${new Intl.NumberFormat('vi-VN').format(value)} VND`;
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedProducts = blindboxProducts.slice(startIndex, endIndex);

    const onPageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div className="product mt-6">
                {displayedProducts.map((product) => (
                    <NavLink
                        to={`/client/product/${product.id}`}
                        key={product.id}
                        className="product__item"
                    >
                        <img
                            src={`https://localhost:7229/${product.imageUrl}`}
                            alt={product.name}
                            className="product__item-img"
                        />
                        <span className="product__item-title">{product.name}</span>
                        <span className="product__item-price">{formatCurrency(product.price)}</span>
                    </NavLink>
                ))}
            </div>

            {blindboxProducts.length > pageSize && (
                <div className="pagination-container" style={{ textAlign: 'center', marginTop: 24 }}>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={blindboxProducts.length}
                        onChange={onPageChange}
                        showSizeChanger={false}
                    />
                </div>
            )}
        </>
    );
}

export default Blindbox;
