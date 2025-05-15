import React from 'react'
import Header from './layout/header'
import { Outlet } from 'react-router-dom'
import "../../assets/Client_Css/style.css"
import Footer from './layout/footer'
import ScrollToTopButton from './Orther/ScrollToTopButton'
function ClientLayout() {
    console.log(window.scrollY)
    return (
        <div>
            <Header />
            <div className='container'>
                <Outlet />
            </div>
            <Footer />
            <ScrollToTopButton />
        </div>
    )
}

export default ClientLayout