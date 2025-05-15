import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../../services/products.services';
import { Pagination } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import "../../../assets/Client_Css/product.css";

function Product() {
    const [dataProduct, setDataProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 24;

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const searchText = query.get('search')?.toLowerCase() || '';

    useEffect(() => {
        loadProduct();
    }, [searchText]);

    const loadProduct = async () => {
        const res = await getAllProducts();
        const allProducts = res.data || [];

        // Lọc theo tên chứa từ khóa tìm kiếm
        const filteredProducts = searchText
            ? allProducts.filter(product =>
                product.name.toLowerCase().includes(searchText)
            )
            : allProducts;

        setDataProduct(filteredProducts);
        setCurrentPage(1); // reset lại trang khi tìm kiếm
    };

    const formatCurrency = (value) => {
        return `${new Intl.NumberFormat('vi-VN').format(value)} VND`;
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedProducts = dataProduct.slice(startIndex, endIndex);

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

            {dataProduct.length > pageSize && (
                <div className="pagination-container" style={{ textAlign: 'center', marginTop: 24 }}>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={dataProduct.length}
                        onChange={onPageChange}
                        showSizeChanger={false}
                    />
                </div>
            )}
        </>
    );
}

export default Product;
