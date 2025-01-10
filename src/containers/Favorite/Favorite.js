import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./Favorite.css";

const Favorite = () => {
    const [favoritePosts, setFavoritePosts] = useState([]);
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6); 

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Bạn cần đăng nhập để xem bài viết yêu thích.");
            setLoading(false);
            return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const fetchFavoritePosts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/post-favorite/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.status === 200) {
                    const posts = response.data.data;
                    setFavoritePosts(posts);
                    setFavoriteCount(posts.length);
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
    }, []);

    // Lấy các bài viết trên trang hiện tại
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = favoritePosts.slice(indexOfFirstPost, indexOfLastPost);

    // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return (
            <div className="favorite">
                <h1 className="favorite-heading">Danh sách bài viết yêu thích</h1>
                <div className="loading-spinner-favorite">
                    <div className="spinner-favorite"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="favorite">
                <h1 className="favorite-heading">Danh sách bài viết yêu thích</h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="favorite">
            <h1 className="favorite-heading">Danh sách bài viết yêu thích</h1>
            <p className="favorite-text favorite-count">Số bài viết yêu thích: {favoriteCount}</p>
            {currentPosts.length > 0 ? (
                <div className="favorite-posts-list">
                    {currentPosts.map((post) => (
                        <div key={post.id} className="favorite-card">
                            <div className="favorite-card-image">
                                <img src={post.mediaUrls ? post.mediaUrls[0] : "/default-image.jpg"} alt={post.title} />
                            </div>
                            <div className="favorite-card-content">
                                <h3 className="favorite-title">{post.title}</h3>
                                <p className="favorite-text">{post.address}</p>
                            </div>
                            <button className="favorite-button-liked">
                                <a href={`/detail/${post.id}`} className="favorite-link">
                                    Xem chi tiết
                                </a>
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="favorite-text">Chưa có bài viết yêu thích nào.</p>
            )}

            {/* Pagination */}
            <div className="favorite-pagination">
                {Array.from({ length: Math.ceil(favoriteCount / postsPerPage) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`pagination-button-favorite ${currentPage === index + 1 ? "favorite-active" : "favorite-inactive"}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Favorite;
