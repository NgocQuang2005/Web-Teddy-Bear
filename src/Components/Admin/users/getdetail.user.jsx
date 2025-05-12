import React from 'react';
import { Drawer } from 'antd';
function GetDetalUsers(props) {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props

    return (
        <>
            <Drawer title="List User Detail" onClose={() => {
                setIsDetailOpen(false);
                setDataDetail(null);
            }} open={isDetailOpen}>
                {
                    dataDetail ? <>
                        <p><b>Id :</b> {dataDetail.id}</p>
                        <p><b>Full Name :</b> {dataDetail.fullName}</p>
                        <p><b>Phone :</b> {dataDetail.phone}</p>
                        <p><b>Address :</b> {dataDetail.address}</p>
                        <p><b>Email :</b> {dataDetail.email}</p>
                    </> : <p>Không có dữ liệu</p>
                }
            </Drawer>
        </>
    )
}

export default GetDetalUsers