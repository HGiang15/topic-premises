import React, { useState, useEffect } from "react";
import search from "../../assets/icons/search.svg";
import edit from "../../assets/icons/edit.svg";
import "./ManagePost.css";

const ManagePost = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState("Tất cả");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);

    const [posts, setPosts] = useState([]);

    const postsPerPage = 4;

    // Fetch posts from API
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/api/v1/posts/user/1?pageNumber=${currentPage - 1}&size=${postsPerPage}`
                );
                const result = await response.json();
                if (result.status === 200) {
                    setPosts(result.data.content);
                } else {
                    console.error("Failed to fetch posts:", result.message);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, [currentPage]);

    // Tính tổng bài đăng theo trạng thái
    const countByStatus = {
        "Tất cả": posts.length,
        "Sắp hết hạn": posts.filter((post) => new Date(post.expiredDate) - new Date() < 7 * 24 * 60 * 60 * 1000).length,
        "Đang hiển thị": posts.filter((post) => new Date(post.expiredDate) >= new Date()).length,
    };

    const filteredPosts =
        activeTab === "Tất cả"
            ? posts
            : posts.filter((post) => {
                  if (activeTab === "Sắp hết hạn") {
                      return new Date(post.expiredDate) - new Date() < 7 * 24 * 60 * 60 * 1000;
                  }
                  if (activeTab === "Đang hiển thị") {
                      return new Date(post.expiredDate) >= new Date();
                  }
                  return false;
              });

    // Tính ngày còn lại hết hạn
    const calculateRemainingDays = (expirationDate) => {
        const now = new Date();
        const expiration = new Date(expirationDate);
        const timeDiff = expiration - now;
        return Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
    };

    // Tính trạng thái dựa trên ngày hết hạn
    const getStatusClassAndText = (expiredDate) => {
        const now = new Date();
        const expiration = new Date(expiredDate);
        const diffDays = Math.ceil((expiration - now) / (1000 * 3600 * 24));

        if (diffDays <= 7) {
            return { className: "expiring", text: "Sắp hết hạn" };
        } else {
            return { className: "", text: "Đang hiển thị" };
        }
    };

    // Pagination
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Modal
    // Logic edit img and base64
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setEditingPost((prev) => ({ ...prev, newImage: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = (post) => {
        setEditingPost(post);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        setPosts((prevPosts) => prevPosts.map((post) => (post.id === editingPost.id ? editingPost : post)));
        setIsModalOpen(false);
    };

    return (
        <div className="manage-post">
            <h1 className="manage-post-title">Danh sách tin</h1>

            {/* search */}
            <div className="manage-post-search-bar">
                <input type="text" placeholder="Tìm kiếm..." />
                <button className="manage-post-search">
                    <img src={search} alt="Search icon" />
                </button>
            </div>

            {/* Tabs filter */}
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
                        <span className="filter-tabs-item">({countByStatus[tab] || 0})</span>
                    </div>
                ))}
            </div>

            {/* Post list */}
            <div className="post-list">
                {filteredPosts.map((post, index) => (
                    <div key={index} className={`post-item`}>
                        {/* img */}
                        <div className="post-image">
                            {post.media.length > 0 && (
                                <img src={post.media[0].url} alt={`Thumbnail for post ${post.id}`} />
                            )}
                        </div>

                        <div className="post-content">
                            {/* Status */}
                            <div className={`post-status ${getStatusClassAndText(post.expiredDate).className}`}>
                                <span className="status-label">{getStatusClassAndText(post.expiredDate).text}</span>
                            </div>

                            {/* Detail */}
                            <p className="post-description">{post.title}</p>
                            <div className="post-details">
                                <span className="post-details-item">Mã tin: {post.id}</span>
                                <span className="post-details-item">Ngày đăng: {post.createAt}</span>
                                <span className="post-details-item">
                                    Ngày hết hạn: {post.expiredDate} (còn {calculateRemainingDays(post.expiredDate)}{" "}
                                    ngày)
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="post-actions">
                            <span>Xem tin: {post.views}</span>
                            <button onClick={() => handleEdit(post)} className="edit-btn">
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

            {/* Modal edit post */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-edit" onClick={(e) => e.stopPropagation()}>
                        <h2 className="modal-edit-heading">Sửa tin</h2>
                        <div className="modal-edit-content">
                            {/* Left */}
                            <div className="modal-left">
                                {/* img */}
                                <label className="modal-edit-label">
                                    Ảnh
                                    <img
                                        className="modal-edit-img"
                                        src={
                                            editingPost.newImage ||
                                            (editingPost.media && editingPost.media.length > 0
                                                ? editingPost.media[0].url
                                                : "../../assets/img/user.svg")
                                        }
                                        alt={`Thumbnail for post ${editingPost.id}`}
                                        onError={(e) => {
                                            e.target.onerror = null; // Ngăn lặp vô hạn
                                            e.target.src = "../../assets/img/user.svg"; // Ảnh mặc định nếu xảy ra lỗi
                                        }}
                                    />
                                    <input
                                        type="file"
                                        className="modal-edit-input"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </label>

                                {/* id */}
                                <label className="modal-edit-label">
                                    Mã tin
                                    <input className="modal-edit-input" type="text" value={editingPost.id} readOnly />
                                </label>

                                {/* title */}
                                <label className="modal-edit-label">
                                    Tiêu đề
                                    <input className="modal-edit-input" type="text" value={editingPost.title} />
                                </label>

                                {/* Status */}
                                <label className="modal-edit-label">
                                    Trạng thái
                                    <select
                                        className="modal-edit-input"
                                        value={editingPost.status}
                                        onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value })}
                                    >
                                        <option value="Đang hiển thị">Đang hiển thị</option>
                                        <option value="Sắp hết hạn">Sắp hết hạn</option>
                                    </select>
                                </label>

                                {/* category */}
                                <label className="modal-edit-label">
                                    Loại
                                    <input className="modal-edit-input" type="text" value={editingPost.category} />
                                </label>

                                {/* Description */}
                                <label className="modal-edit-label">
                                    Mô tả
                                    <textarea
                                        className="modal-edit-input"
                                        rows="3"
                                        cols="30"
                                        value={editingPost.description}
                                        onChange={(e) =>
                                            setEditingPost({ ...editingPost, description: e.target.value })
                                        }
                                    />
                                </label>
                            </div>

                            {/* Right */}
                            <div className="modal-right">
                                {/* roomsize */}
                                <label className="modal-edit-label">
                                    Kích thước
                                    <input className="modal-edit-input" type="text" value={editingPost.roomSize} />
                                </label>

                                {/* price */}
                                <label className="modal-edit-label">
                                    Giá
                                    <input className="modal-edit-input" type="number" value={editingPost.price} />
                                </label>

                                {/* address */}
                                <label className="modal-edit-label">
                                    Địa chỉ
                                    <input className="modal-edit-input" type="text" value={editingPost.address} />
                                </label>

                                {/* contactPhone */}
                                <label className="modal-edit-label">
                                    Số điện thoại
                                    <input className="modal-edit-input" type="number" value={editingPost.contactPhone} />
                                </label>

                                {/* contactEmail */}
                                <label className="modal-edit-label">
                                    Email
                                    <input className="modal-edit-input" type="text" value={editingPost.contactEmail} />
                                </label>

                                {/* Start date */}
                                <label className="modal-edit-label">
                                    Ngày đăng
                                    <input
                                        className="modal-edit-input"
                                        type="date"
                                        value={editingPost.createAt}
                                        onChange={(e) => setEditingPost({ ...editingPost, createAt: e.target.value })}
                                    />
                                </label>

                                {/* Modify date */}
                                <label className="modal-edit-label">
                                    Ngày sửa đổi
                                    <input
                                        className="modal-edit-input"
                                        type="date"
                                        value={editingPost.modifyAt}
                                        onChange={(e) => setEditingPost({ ...editingPost, modifyAt: e.target.value })}
                                    />
                                </label>

                                {/* Expiration date */}
                                <label className="modal-edit-label">
                                    Ngày hết hạn
                                    <input
                                        className="modal-edit-input"
                                        type="date"
                                        value={editingPost.expiredDate}
                                        onChange={(e) =>
                                            setEditingPost({ ...editingPost, expiredDate: e.target.value })
                                        }
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="modal-edit-actions">
                            <button className="modal-edit-actions__cancel" onClick={() => setIsModalOpen(false)}>
                                Hủy
                            </button>
                            <button className="modal-edit-actions__save" onClick={handleSave}>
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManagePost;
