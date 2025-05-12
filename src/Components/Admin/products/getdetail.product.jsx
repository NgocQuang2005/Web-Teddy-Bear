import { Drawer } from 'antd';
import React from 'react'

function GetDetailProducts(props) {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props

    return (
        <>
            <Drawer title="List Category Detail" onClose={() => {
                setIsDetailOpen(false);
                setDataDetail(null);
            }} open={isDetailOpen}>
                {
                    dataDetail ? <>
                        <p><b>Id :</b> {dataDetail.id}</p>
                        <p><b>Tên gấu :</b> {dataDetail.name}</p>
                        <p><b>Miêu tả :</b> {dataDetail.description}</p>
                        <p><b>Tiền :</b> {dataDetail.price}</p>
                        <p><b>Số lượng :</b> {dataDetail.quantityInStock}</p>
                        <p><b>Hãng gấu :</b> {dataDetail.categoryName}</p>
                    </> : <p>Không có dữ liệu</p>
                }
            </Drawer>
        </>
    )
}

export default GetDetailProducts