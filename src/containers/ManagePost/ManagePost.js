import React, { useState, useEffect } from "react";
import search from "../../assets/icons/search.svg";
import edit from "../../assets/icons/edit.svg";
import "./ManagePost.css";
import { jwtDecode } from "jwt-decode";
import BASE_URL from "../../config";
import ExtendPostModal from "./ExtendPostModal";
const ManagePost = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const postsPerPage = 10;
  const token = localStorage.getItem("token");
  // Fetch posts from API

    const [totalPages, setTotalPages] = useState(0);
  const fetchPosts = async () => {
    try {
      const decoded = jwtDecode(token);
      setIsLoading(true); // Bắt đầu tải
      const response = await fetch(
        `${BASE_URL}api/v1/posts/user/${decoded?.id}?pageNumber=${
          currentPage - 1
        }&size=${postsPerPage}`
      );
      const result = await response.json();
      if (result.status === 200) {
        setPosts(result.data.content);
        setTotalPages(Math.ceil(result.data.totalElements / postsPerPage)); // Cập nhật tổng số trang
      } else {
        console.error("Failed to fetch posts:", result.message);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false); // Kết thúc tải
    }
  };



  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  // Tính tổng bài đăng theo trạng thái
  const countByStatus = {
    "Tất cả": posts.length,
    "Sắp hết hạn": posts.filter(
      (post) =>
        new Date(post.expiredDate) - new Date() < 7 * 24 * 60 * 60 * 1000
    ).length,
    "Đang hiển thị": posts.filter(
      (post) => new Date(post.expiredDate) >= new Date()
    ).length,
  };

  const filteredPosts =
    activeTab === "Tất cả"
      ? posts
      : posts.filter((post) => {
          if (activeTab === "Sắp hết hạn") {
            return (
              new Date(post.expiredDate) - new Date() < 7 * 24 * 60 * 60 * 1000
            );
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
  // const totalPages = Math.ceil(posts.length / postsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Modal
  // Logic edit img and base64
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setEditingPost((prev) => ({ ...prev, newImage: reader.result }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleEdit = (post) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    console.log("edit: ", editingPost);

    editPost();
  };
  const editPost = async () => {
    try {
      setIsLoadingEdit(true); // Bắt đầu trạng thái đang tải
      const decoded = jwtDecode(token);
      const id = editingPost?.id;
      console.log("edit", editingPost);
      const body = {
        title: editingPost?.title,
        address: editingPost?.address,
        price: editingPost?.price,
        roomSize: editingPost?.roomSize,
        description: editingPost?.description,
        expiredDate: editingPost?.expiredDate,
        contactPhone: editingPost?.contactPhone,
        contactEmail: editingPost?.contactEmail,
        category: editingPost?.category,
        link: editingPost?.link,
        mediaUrls: editingPost?.media?.map((item) => item.url),
      };

      const response = await fetch(`${BASE_URL}api/v1/posts/${id}`, {
        method: "PUT", // Sử dụng PUT thay vì GET
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (result.status === 200) {
        console.log("Post updated successfully");
        fetchPosts();
      } else {
        console.error("Failed to update post:", result.message);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setIsLoadingEdit(false); // Đặt trạng thái isLoadingEdit về false khi kết thúc
      setIsModalOpen(false);
    }
  };

  const handleDeleteImage = (index) => {
    const updatedMedia = editingPost.media.filter((_, i) => i !== index);
    // Update the editingPost state with the modified media array
    setEditingPost((prevPost) => ({
      ...prevPost,
      media: updatedMedia,
    }));
  };
  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);

    newFiles.forEach((file) => {
      if (file.size > 500 * 1024) {
        alert("Ảnh phải có kích thước nhỏ hơn 500KB.");
      } else if (editingPost.media.length < 3) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64Image = reader.result; // Lấy giá trị base64
          console.log("Base64 Image:", base64Image); // Log giá trị Base64
          setEditingPost((prev) => {
            const updatedMedia = [...prev.media];
            const emptyIndex = updatedMedia.findIndex((img) => !img);
            const imageObject = { url: base64Image }; // Đóng gói base64 thành đối tượng
            if (emptyIndex !== -1) {
              updatedMedia[emptyIndex] = imageObject; // Chèn đối tượng vào vị trí trống
            } else {
              updatedMedia.push(imageObject); // Hoặc thêm đối tượng mới
            }
            return { ...prev, media: updatedMedia };
          });
        };

        reader.readAsDataURL(file); // Đọc file thành Base64
      } else {
        alert("Bạn chỉ có thể tải tối đa 3 ảnh.");
      }
    });
  };
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleExtendPost = (selectedDays) => {
    // Gọi API hoặc xử lý gia hạn cho bài đăng được chọn
    console.log(
      `Gia hạn bài đăng với ID: ${selectedPostId} và gói: ${selectedDays}`
    );

    // Sau khi xử lý xong, đóng modal
    setSelectedPostId(null); // Đặt lại trạng thái để đóng modal
    setShowExtendModal(false);
  };

  return (
    <div className="manage-post">
      <h1 className="manage-post-title">Danh sách tin</h1>

      {/* search */}
      <div className="manage-post-search-bar">
        <input
          className="manage-post-search-input"
          type="text"
          placeholder="Tìm kiếm..."
        />
        <button className="manage-post-search">
          <img src={search} alt="Search icon" />
        </button>
      </div>

      {/* Tabs filter */}
      <div className="filter-tabs">
        {["Tất cả", "Sắp hết hạn", "Đang hiển thị"].map((tab) => (
          <div
            key={tab}
            className={`filter-tabs-wrap ${
              activeTab === tab ? "active-tab" : ""
            }`}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1);
            }}
          >
            <span className="filter-tabs-item">{tab}</span>
            <span className="filter-tabs-item">
              ({countByStatus[tab] || 0})
            </span>
          </div>
        ))}
      </div>

      {/* Post list */}
      {isLoading ? (
        <div className="product-loading-spinner">
          <div className="product-spinner"></div>
          <p>Đang tải...</p>
        </div>
      ) : (
        <div className="post-list">
          {filteredPosts.map((post, index) => (
            <div key={index} className={`post-item`}>
              {/* img */}
              <div className="post-image">
                {post.media.length > 0 && (
                  <img
                    src={post.media[0].url}
                    alt={`Thumbnail for post ${post.id}`}
                  />
                )}
              </div>

              <div className="post-content">
                {/* Status */}
                <div
                  className={`post-status ${
                    getStatusClassAndText(post.expiredDate).className
                  }`}
                >
                  <span className="status-label">
                    {getStatusClassAndText(post.expiredDate).text}
                  </span>
                </div>

                {/* Detail */}
                <p className="post-description">{post.title}</p>
                <div className="post-details">
                  <span className="post-details-item">Mã tin: {post.id}</span>
                  <span className="post-details-item">
                    Ngày đăng: {post.createAt}
                  </span>
                  <span className="post-details-item">
                    Ngày hết hạn: {post.expiredDate} (còn{" "}
                    {calculateRemainingDays(post.expiredDate)} ngày)
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="post-actions">
                <a href={`/detail/${post.id}`} className="details-link">
                  Xem
                </a>
                <button onClick={() => handleEdit(post)} className="edit-btn">
                  <img src={edit} alt="Edit icon" /> Sửa tin
                </button>
                <button
                  className="extend-btn"
                  onClick={() => setSelectedPostId(post.id)}
                >
                  Gia hạn tin
                </button>

                {selectedPostId === post.id && (
                  <ExtendPostModal
                    onClose={() => setSelectedPostId(null)}
                    onSubmit={handleExtendPost}
                    id={post.id}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

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
            className={`pagination-post-item ${
              currentPage === index + 1 ? "active" : ""
            }`}
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

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-edit" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-edit-heading">Sửa tin</h2>
            {isLoadingEdit ? (
              <div className="product-loading-spinner">
                <div className="product-spinner"></div>
                <p>Đang tải...</p>
              </div>
            ) : (
              <>
                <div className="modal-edit-content">
                  {/* Left */}
                  <div className="modal-left">
                    <div className="modal-edit-img-container">
                      {[...Array(3)].map((_, index) => {
                        const image = editingPost.media[index];
                        return (
                          <div key={index} className="modal-edit-img-cell">
                            {image ? (
                              <>
                                <button
                                  className="modal-edit-img-delete-btn"
                                  onClick={() => handleDeleteImage(index)} // Gọi hàm xóa ảnh
                                >
                                  X
                                </button>
                                <img
                                  className="modal-edit-img"
                                  src={image.url || image} // Dùng Base64 hoặc URL
                                  alt={`Thumbnail ${index + 1} for post ${
                                    editingPost.id
                                  }`}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                  }}
                                />
                              </>
                            ) : (
                              <div className="modal-edit-img-placeholder">
                                <p>Chưa có ảnh</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <input
                      type="file"
                      className="modal-edit-input"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {/* id */}
                    <label className="modal-edit-label">
                      Mã tin
                      <input
                        className="modal-edit-input"
                        type="text"
                        value={editingPost.id}
                        readOnly
                      />
                    </label>

                    {/* title */}
                    <label className="modal-edit-label">
                      Tiêu đề
                      <input
                        className="modal-edit-input"
                        type="text"
                        value={editingPost.title}
                        onChange={(e) =>
                          setEditingPost({
                            ...editingPost,
                            title: e.target.value,
                          })
                        }
                      />
                    </label>

                    {/* Status */}
                    <label className="modal-edit-label">
                      Trạng thái
                      <select
                        className="modal-edit-input"
                        value={editingPost.status}
                        onChange={(e) =>
                          setEditingPost({
                            ...editingPost,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value="Đang hiển thị">Đang hiển thị</option>
                        <option value="Sắp hết hạn">Sắp hết hạn</option>
                      </select>
                    </label>

                    {/* category */}
                    <label className="modal-edit-label">
                      Loại
                      <input
                        className="modal-edit-input"
                        type="text"
                        value={editingPost.category}
                        onChange={(e) =>
                          setEditingPost({
                            ...editingPost,
                            category: e.target.value,
                          })
                        }
                      />
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
                          setEditingPost({
                            ...editingPost,
                            description: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>

                  {/* Right */}
                  <div className="modal-right">
                    {/* roomsize */}
                    <label className="modal-edit-label">
                      Kích thước
                      <input
                        className="modal-edit-input"
                        type="text"
                        value={editingPost.roomSize}
                        onChange={(e) =>
                          setEditingPost({
                            ...editingPost,
                            roomSize: e.target.value,
                          })
                        }
                      />
                    </label>

                    {/* price */}
                    <label className="modal-edit-label">
                      Giá
                      <input
                        className="modal-edit-input"
                        type="number"
                        value={editingPost.price}
                        onChange={(e) =>
                          setEditingPost({
                            ...editingPost,
                            price: e.target.value,
                          })
                        }
                      />
                    </label>

                    {/* address */}
                    <label className="modal-edit-label">
                      Địa chỉ
                      <input
                        className="modal-edit-input"
                        type="text"
                        value={editingPost.address}
                        onChange={(e) =>
                          setEditingPost({
                            ...editingPost,
                            address: e.target.value,
                          })
                        }
                      />
                    </label>

                    {/* contactPhone */}
                    <label className="modal-edit-label">
                      Số điện thoại
                      <input
                        className="modal-edit-input"
                        type="number"
                        value={editingPost.contactPhone}
                        onChange={(e) =>
                          setEditingPost({
                            ...editingPost,
                            contactPhone: e.target.value,
                          })
                        }
                      />
                    </label>

                    {/* contactEmail */}
                    <label className="modal-edit-label">
                      Email
                      <input
                        className="modal-edit-input"
                        type="text"
                        value={editingPost.contactEmail}
                        onChange={(e) =>
                          setEditingPost({
                            ...editingPost,
                            contactEmail: e.target.value,
                          })
                        }
                      />
                    </label>

                    {/* Start date */}
                    <label className="modal-edit-label">
                      Ngày đăng
                      <input
                        className="modal-edit-input"
                        type="date"
                        value={editingPost.createAt}
                        onChange={(e) =>
                          setEditingPost({
                            ...editingPost,
                            createAt: e.target.value,
                          })
                        }
                        readOnly
                      />
                    </label>

                    {/* Modify date */}
                    <label className="modal-edit-label">
                      Ngày sửa đổi
                      <input
                        className="modal-edit-input"
                        type="date"
                        value={editingPost.modifyAt}
                        onChange={(e) =>
                          setEditingPost({
                            ...editingPost,
                            modifyAt: e.target.value,
                          })
                        }
                        readOnly
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
                          setEditingPost({
                            ...editingPost,
                            expiredDate: e.target.value,
                          })
                        }
                        readOnly
                      />
                    </label>
                  </div>
                </div>

                {/* Actions */}
                <div className="modal-edit-actions">
                  <button
                    className="modal-edit-actions__cancel"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Hủy
                  </button>
                  <button
                    className="modal-edit-actions__save"
                    onClick={handleSave}
                  >
                    Lưu
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePost;
