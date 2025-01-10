import React, { useState, useEffect } from "react";
import axios from "axios"; // Thêm axios nếu chưa cài
import "./Favorite.css";

const Favorite = () => {
    const [favoritePosts, setFavoritePosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Gọi API để lấy danh sách bài viết yêu thích
        const fetchFavoritePosts = async () => {
            try {
                const userId = 43; // Sử dụng ID người dùng thực tế từ đăng nhập
                const response = await axios.get(`http://localhost:8080/api/v1/post-favorite/user/${userId}`);
                if (response.data.status === 200) {
                    setFavoritePosts(response.data.data); // Lưu dữ liệu vào state
                } else {
                    setError("Không thể lấy dữ liệu bài viết yêu thích.");
                }
            } catch (err) {
                setError("Đã xảy ra lỗi khi tải dữ liệu.");
                console.error("Error fetching favorite posts: ", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFavoritePosts();
    }, []); // Chạy 1 lần khi component được mount

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="favorite">
            <h1>Danh sách bài viết yêu thích</h1>
            {favoritePosts.length > 0 ? (
                <div className="favorite-posts-list">
                    {favoritePosts.map((post) => (
                        <div key={post.id} className="favorite-post">
                            <h3>{post.title}</h3>
                            <p>{post.address}</p>
                            <p>Giá: {post.price.toLocaleString("vi-VN")} VNĐ</p>
                            <p>Diện tích: {post.roomSize} m²</p>
                            <p>{post.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Chưa có bài viết yêu thích nào.</p>
            )}
        </div>
    );
};

export default Favorite;
