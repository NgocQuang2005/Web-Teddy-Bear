import React from 'react'
import Header from './layout/header'
import { Outlet } from 'react-router-dom'

function ClientLayout() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default ClientLayout