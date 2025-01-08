import React from "react";
import sidebarRight1 from '../../assets/img/sidebaRight_1.jpg'
import sidebarRight2 from '../../assets/img/sidebaRight_2.webp'
import sidebarRight3 from '../../assets/img/sidebaRight_3.webp'
import sidebarRight4 from '../../assets/img/sidebaRight_4.jpg'
import sidebarRight5 from '../../assets/img/sidebaRight_5.webp'
import "./SidebarRight.css";

const SidebarRight = () => {
    return (
        <div className="sidebar-right">
            <h3 className="sidebar-title">Nổi bật</h3>
            <div className="ad-item">
                <a href="#/" className="ad-item-link">
                    <img 
                        src={sidebarRight1} 
                        alt="Ad 1" 
                        className="ad-image"
                    />
                    <p className="ad-text">Đất Đấu Giá Hà Nội: Sôi Nổi Nguồn Cung Đầu Năm 2025</p>
                </a>
            </div>
            <div className="ad-item">
                <a href="#/" className="ad-item-link">
                    <img 
                        src={sidebarRight2} 
                        alt="Ad 2" 
                        className="ad-image"
                    />
                    <p className="ad-text">Realty Holdings Ra Mắt Văn Phòng Bán Hàng Khu Đô Thị Quy Nhơn Iconic</p>
                </a>
            </div>
            <div className="ad-item">
                <a href="#/" className="ad-item-link">
                    <img 
                        src={sidebarRight3} 
                        alt="Ad 3" 
                        className="ad-image"
                    />
                    <p className="ad-text">Nhà Ở Xã Hội Hà Nội Tiếp Tục Được Bổ Sung</p>
                </a>
            </div>
            <div className="ad-item">
                <a href="#/" className="ad-item-link">
                    <img 
                        src={sidebarRight4} 
                        alt="Ad 3" 
                        className="ad-image"
                    />
                    <p className="ad-text">Hải Phòng Là Điểm Sáng Về Môi Trường Kinh Doanh Bất Động Sản</p>
                </a>
            </div>
            <div className="ad-item">
                <a href="#/" className="ad-item-link">
                    <img 
                        src={sidebarRight5} 
                        alt="Ad 3" 
                        className="ad-image"
                    />
                    <p className="ad-text">Liên hệ để biết thêm chi tiết.</p>
                </a>
            </div>
        </div>
    );
};

export default SidebarRight;
