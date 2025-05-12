import { Drawer } from 'antd';
import React from 'react';

function GetDetailCartItem(props) {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props;

    const formatCurrency = (value) => {
        return `${new Intl.NumberFormat('vi-VN').format(value)} VND`;
    };

    return (
        <>
            <Drawer
                title="Chi tiết đơn hàng"
                onClose={() => {
                    setIsDetailOpen(false);
                    setDataDetail(null);
                }}
                open={isDetailOpen}
            >
                {
                    dataDetail ? (
                        <>
                            <p><b>Id :</b> {dataDetail.id}</p>
                            <p><b>Người dùng :</b> {dataDetail.userName}</p>
                            <p><b>Sản phẩm :</b> {dataDetail.productName}</p>
                            <p><b>Số lượng :</b> {dataDetail.quantity}</p>
                            <p><b>Tổng tiền :</b> {formatCurrency(dataDetail.totalPrice)}</p> {/* ✅ Đã định dạng */}
                        </>
                    ) : <p>Không có dữ liệu</p>
                }
            </Drawer>
        </>
    );
}

export default GetDetailCartItem;
