import React from 'react';
import { Drawer } from 'antd';
function GetDetalRole(props) {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props

    return (
        <>
            <Drawer title="List Role Detail" onClose={() => {
                setIsDetailOpen(false);
                setDataDetail(null);
            }} open={isDetailOpen}>
                {
                    dataDetail ? <>
                        <p><b>Id :</b> {dataDetail.id}</p>
                        <p><b>Name :</b> {dataDetail.name}</p>
                        <p><b>Description :</b> {dataDetail.description}</p>
                    </> : <p>Không có dữ liệu</p>
                }
            </Drawer>
        </>
    )
}

export default GetDetalRole