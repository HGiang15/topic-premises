import React, { useState } from "react";
import product1 from "../../assets/img/product_1.jpg";
import product2 from "../../assets/img/product_2.jpg";
import product3 from "../../assets/img/product_3.jpg";
import product4 from "../../assets/img/product_4.jpg";
import product5 from "../../assets/img/product_5.jpg";

import product6 from "../../assets/img/product_1.png";
import product7 from "../../assets/img/product_2.png";
import product8 from "../../assets/img/product_3.png";
import product9 from "../../assets/img/product_4.png";
import search from "../../assets/icons/search.svg";
import edit from "../../assets/icons/edit.svg";
import "./ManagePost.css";

const ManagePost = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState("Tất cả");
    const postsPerPage = 4;

    const posts = [
        {
            id: "#123456",
            datePosted: "25/12/2024",
            expirationDate: "5/1/2025",
            views: 15,
            description: "Nhà mặt tiền Nguyễn Trãi, diện tích lớn, thích hợp làm cửa hàng hoặc văn phòng.",
            status: "Không hiển thị",
            image: product1,
        },
        {
            id: "#654321",
            datePosted: "26/12/2024",
            expirationDate: "6/1/2025",
            views: 10,
            description: "Căn hộ cao cấp tại Vinhome Central Park, đầy đủ tiện nghi, view sông thoáng mát.",
            status: "Sắp hết hạn",
            image: product2,
        },
        {
            id: "#789123",
            datePosted: "27/12/2024",
            expirationDate: "7/1/2025",
            views: 8,
            description: "Cho thuê phòng trọ giá rẻ tại Gò Vấp, gần trường học, chợ và siêu thị.",
            status: "Đang hiển thị",
            image: product3,
        },
        {
            id: "#987654",
            datePosted: "28/12/2024",
            expirationDate: "8/1/2025",
            views: 5,
            description: "Đất thổ cư khu vực Thủ Đức, gần trung tâm thương mại, pháp lý rõ ràng.",
            status: "Đang hiển thị",
            image: product4,
        },
        {
            id: "#112233",
            datePosted: "29/12/2024",
            expirationDate: "9/1/2025",
            views: 20,
            description: "Căn hộ studio trung tâm quận 1, nội thất hiện đại, giá cả hợp lý.",
            status: "Sắp hết hạn",
            image: product5,
        },
        {
            id: "#445566",
            datePosted: "30/12/2024",
            expirationDate: "10/1/2025",
            views: 12,
            description: "Nhà cấp 4 tại Bình Tân, diện tích 60m2, gần chợ và trường học.",
            status: "Không hiển thị",
            image: product6,
        },
        {
            id: "#778899",
            datePosted: "31/12/2024",
            expirationDate: "11/1/2025",
            views: 7,
            description: "Biệt thự biển Phú Quốc, tiện ích đầy đủ, view biển tuyệt đẹp.",
            status: "Đang hiển thị",
            image: product7,
        },
        {
            id: "#778899",
            datePosted: "31/12/2024",
            expirationDate: "11/1/2025",
            views: 7,
            description: "Biệt thự biển Phú Quốc, tiện ích đầy đủ, view biển tuyệt đẹp.",
            status: "Không hiển thị",
            image: product8,
        },
        {
            id: "#778899",
            datePosted: "31/12/2024",
            expirationDate: "11/1/2025",
            views: 7,
            description: "Biệt thự biển Phú Quốc, tiện ích đầy đủ, view biển tuyệt đẹp.",
            status: "Sắp hết hạn",
            image: product9,
        },
    ];

    // active tab
    const countByStatus = {
        "Tất cả": posts.length,
        "Sắp hết hạn": posts.filter((post) => post.status === "Sắp hết hạn").length,
        "Đang hiển thị": posts.filter((post) => post.status === "Đang hiển thị").length,
    };

    const filteredPosts = activeTab === "Tất cả" ? posts : posts.filter((post) => post.status === activeTab);

    // pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(posts.length / postsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="manage-post">
            <h1 className="manage-post-title">Danh sách tin</h1>
            <div className="manage-post-search-bar">
                <input type="text" placeholder="Tìm kiếm..." />
                <button className="manage-post-search">
                    <img src={search} alt="Search icon" />
                </button>
            </div>

            {/* Filter tab */}
            <div className="filter-tabs">
                {["Tất cả", "Sắp hết hạn", "Đang hiển thị"].map((tab) => (
                    <div
                        key={tab}
                        className={`filter-tabs-wrap ${activeTab === tab ? "active-tab" : ""}`}
                        onClick={() => {
                            setActiveTab(tab);
                            setCurrentPage(1);
                        }}
                    >
                        <span className="filter-tabs-item">{tab}</span>
                        <span className="filter-tabs-item">({countByStatus[tab]})</span>
                    </div>
                ))}
            </div>

            {/* Post item  */}
            <div className="post-list">
                {currentPosts.map((post, index) => (
                    <div key={index} className={`post-item ${post.status === "Không hiển thị" ? "inactive" : ""}`}>
                        <div className="post-image">
                            <img src={post.image} alt={`Thumbnail for post ${post.id}`} />
                        </div>

                        <div className="post-content">
                            <div
                                className={`post-status ${
                                    post.status === "Không hiển thị"
                                        ? "inactive"
                                        : post.status === "Sắp hết hạn"
                                        ? "expiring"
                                        : ""
                                }`}
                            >
                                <span className="status-label">{post.status}</span>
                            </div>

                            <p className="post-description">{post.description}</p>
                            <div className="post-details">
                                <span className="post-details-item">Mã tin: {post.id}</span>
                                <span className="post-details-item">Ngày đăng: {post.datePosted}</span>
                                <span className="post-details-item">
                                    Ngày hết hạn: {post.expirationDate} (còn 10 ngày)
                                </span>
                            </div>
                        </div>
                        <div className="post-actions">
                            <span>Xem tin: {post.views}</span>
                            <button className="edit-btn">
                                <img src={edit} alt="Edit icon" /> Sửa tin
                            </button>
                            <button className="extend-btn">Gia hạn tin</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
                <button
                    className="pagination-post-item"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`pagination-post-item ${currentPage === index + 1 ? "active" : ""}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className="pagination-post-item"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default ManagePost;
