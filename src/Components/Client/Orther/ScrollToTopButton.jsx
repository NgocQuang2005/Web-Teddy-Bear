import React, { useEffect, useState } from 'react';
import { ArrowUpOutlined } from '@ant-design/icons'; // icon từ Ant Design (có thể thay bằng icon khác)
import "../../../assets/Client_Css/style.css"

function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        visible && (
            <div className="scroll-to-top" onClick={scrollToTop}>
                <ArrowUpOutlined />
            </div>
        )
    );
}

export default ScrollToTopButton;
