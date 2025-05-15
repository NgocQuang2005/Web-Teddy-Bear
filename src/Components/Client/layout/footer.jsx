import React from 'react'
import "../../../assets/Client_Css/style.css"
import { NavLink } from 'react-router-dom'
import logo from "../../../assets/image/logo.png"
function Footer() {
    const address = [
        "K543/H40/3 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng",
        "K52/3 Ông Cao Thắng, Hải Châu, Đà Nẵng",
        "K423/11 Đống Đa, Hà Nội",
        "K11/15 Cầu Giấy, Hà Nội"
    ]
    const info = [
        {
            id: 1,
            icon: <ion-icon name="call"></ion-icon>,
            content: "0356730855"
        },
        {
            id: 2,
            icon: <ion-icon name="mail"></ion-icon>,
            content: "gaubongtmaii@gmail.com"
        },
        {
            id: 3,
            icon: <ion-icon name="logo-tiktok"></ion-icon>,
            content: "Shop_nha_gau_23"
        },
        {
            id: 4,
            icon: <ion-icon name="logo-instagram"></ion-icon>,
            content: "Shop_nha_gau_23"
        },
    ]
    const suppot = [
        "Chính sách bán Buôn – Sỉ",
        "Chính sách chung",
        "Chính sách bảo mật thông tin",
        "Bảo hành đổi trả",
        "Chính sách thông tin bảo mật"
    ]
    return (
        <footer className="mt-3 container">
            <div className="footer-logo">
                <div className="logo-ft"><NavLink to={"/home"}><img className='logo-icon' src={logo} alt="" /></NavLink></div>
                <p className="footer-logo__description">
                    Gấu Bông Tmaii – Shop gấu bông uy tín, luôn đồng hành cùng những khoảnh khắc hạnh phúc của bạn.
                </p>
                <div className="footer-logo__link">
                    <a href="#" className="link">
                        <ion-icon name="logo-twitter"></ion-icon>
                    </a>
                    <a href="#" className="link">
                        <ion-icon name="logo-facebook"></ion-icon>
                    </a>
                    <a href="#" className="link">
                        <ion-icon name="logo-instagram"></ion-icon>
                    </a>
                    <a href="#" className="link">
                        <ion-icon name="logo-github"></ion-icon>
                    </a>
                </div>
            </div>
            <div className="footer-contact">
                <div className="contacts">
                    <span className="contact-title">Địa chỉ</span>
                    <ul className="contact-list">
                        {address.map((value) => {
                            return (
                                <li key={value} className="list-item"><ion-icon name="navigate"></ion-icon> {value}</li>
                            )
                        })}
                    </ul>
                </div>
                <div className="contacts">
                    <span className="contact-title">Thông tin liên hệ</span>
                    <ul className="contact-list">
                        {info.map((value) => {
                            return (<li key={value.id} className="list-item">{value.icon} {value.content}</li>)
                        })}
                    </ul>
                </div>
                <div className="contacts">
                    <span className="contact-title">Hỗ trợ khách hàng</span>
                    <ul className="contact-list">
                        {suppot.map((value) => {
                            return (<li key={value} className="list-item">{value}</li>)
                        })}
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer