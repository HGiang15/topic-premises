import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet/dist/leaflet.css";
import { jwtDecode } from "jwt-decode";
import like from "../../assets/icons/like.svg";
import liked from "../../assets/icons/liked.svg";
import location from "../../assets/icons/location.svg";
import money from "../../assets/icons/money.svg";
import home from "../../assets/icons/home.svg";
import time from "../../assets/icons/time.svg";
import "./Detail.css";
import BASE_URL from "../../config";
const Detail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [postDetail, setPostDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullContact, setShowFullContact] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupImage, setPopupImage] = useState(null);
  const mapRef = useRef();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  /////
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    const fetchPostDetail = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}api/v1/posts/${id}`);
        const result = await response.json();
        if (response.ok) {
          setPostDetail(result.data.post);
          setComments(
            Array.isArray(result.data.commentPostDetaiDTOList)
              ? result.data.commentPostDetaiDTOList
              : []
          ); // Đảm bảo comments luôn là mảng
          console.log("comments", comments);
          const address = result.data.post.address;
          fetchCoordinates(address);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError("Failed to fetch post details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]);
  const handleCreateComment = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found in localStorage");
        throw new Error("Vui lòng đăng nhập để thực hiện chức năng này.");
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const bodyData = {
        comment: newComment,
        userId: userId,
        postId: postDetail.id,
      };

      const response = await fetch(`${BASE_URL}api/v1/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });
    } catch (error) {
      console.error("Error during API call:", error);
      throw error; 
    }
  };
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const newId =
        comments.length > 0 ? comments[comments.length - 1].id + 1 : 1;
      setComments([
        ...comments,
        {
          id: newId,
          fullNameUserComment: "Bạn",
          comment: newComment,
          commentDate: new Date().toLocaleString(), // Lấy ngày giờ hiện tại
        },
      ]);
      setNewComment("");
      handleCreateComment();
    }
  };
  const [favoritePosts, setFavoritePosts] = useState([]); // Lưu danh sách các bài viết được yêu thích
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoritePosts");
    if (savedFavorites) {
      setFavoritePosts(JSON.parse(savedFavorites));
    }
  }, []);

  const handleFavoritePost = async (postId) => {
    // Cập nhật trạng thái yêu thích ngay lập tức
    setFavoritePosts((prevFavorites) => {
      const isFavorite = prevFavorites.includes(postId);
      const updatedFavorites = isFavorite
        ? prevFavorites.filter((id) => id !== postId) // Xóa khỏi danh sách yêu thích
        : [...prevFavorites, postId]; // Thêm vào danh sách yêu thích

      // Lưu lại trạng thái mới vào localStorage
      localStorage.setItem("favoritePosts", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Bạn cần đăng nhập để thực hiện thao tác này.");
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const isFavorite = favoritePosts.includes(postId); // Kiểm tra bài viết có trong danh sách yêu thích không
      const method = isFavorite ? "DELETE" : "POST"; // DELETE nếu đã có trong yêu thích, POST nếu chưa có

      let url = `${BASE_URL}api/v1/post-favorite/${postId}`; // URL không cần userId nếu xóa
      if (!isFavorite) {
        // Nếu bài viết chưa có trong yêu thích, thêm vào
        url = `${BASE_URL}api/v1/post-favorite/${postId}/user/${userId}`;
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.status !== 200) {
        console.error(`Lỗi khi xử lý bài viết yêu thích: ${result.message}`);
        setFavoritePosts((prevFavorites) => {
          const updatedFavorites = isFavorite
            ? [...prevFavorites, postId]
            : prevFavorites.filter((id) => id !== postId);
          localStorage.setItem(
            "favoritePosts",
            JSON.stringify(updatedFavorites)
          );
          return updatedFavorites;
        });
      }
    } catch (error) {
      console.error("Lỗi khi xử lý bài viết yêu thích:", error);
      setFavoritePosts((prevFavorites) => {
        const isFavorite = !prevFavorites.includes(postId);
        const updatedFavorites = isFavorite
          ? prevFavorites.filter((id) => id !== postId)
          : [...prevFavorites, postId];
        localStorage.setItem("favoritePosts", JSON.stringify(updatedFavorites));
        return updatedFavorites;
      });
    }
  };

  const [position, setPosition] = useState([]);
  const fetchCoordinates = async (address) => {
    setLoading(true);
    const newPositions = [];
    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: address,
            format: "json",
            addressdetails: 1,
          },
        }
      );
      if (response.data[0]) {
        const { lat, lon } = response.data[0]; // Lấy lat lon từ phần tử đầu tiên
        if (lat && lon) {
          newPositions.push({
            title: address,
            coords: [parseFloat(lat), parseFloat(lon)],
            address: address,
          });
        } else {
          console.warn(`Không tìm thấy tọa độ cho địa chỉ: ${address}`);
        }
      } else {
        console.warn(`Không tìm thấy dữ liệu cho địa chỉ: ${address}`);
      }
    } catch (error) {
      console.error(`Lỗi khi tìm tọa độ cho: ${address}`, error);
    }
    setPosition(newPositions);
    setLoading(false);
  };

  // Sử dụng ref để di chuyển bản đồ sau khi có tọa độ
  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      if (position.length > 0) {
        map.setView(position[0].coords, 15);
      }
    }, [position, map]);

    return null;
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const decodeBase64Image = (base64String) => {
    try {
      if (
        typeof base64String === "string" &&
        base64String.startsWith("data:image")
      ) {
        return base64String; // Trả về nguyên chuỗi nếu đã hợp lệ
      }

      if (typeof base64String === "string") {
        const base64Data = base64String.split(",")[1];
        if (!base64Data) {
          throw new Error("Chuỗi không chứa dữ liệu hợp lệ sau dấu phẩy.");
        }

        const decodedData = atob(base64Data);
        return decodedData;
      }

      // Trường hợp không phải là chuỗi hợp lệ
      throw new Error("Đầu vào không phải là một chuỗi hợp lệ.");
    } catch (error) {
      console.error("Lỗi giải mã Base64:", error.message);
      return null;
    }
  };

  const handleToggleContact = () => {
    setShowFullContact(!showFullContact);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? postDetail.media.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === postDetail.media.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleImageClick = (imageUrl) => {
    setPopupImage(imageUrl);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleMapButtonClick = () => {
    navigate("/addressMap"); // Chuyển đến đường dẫn /addressMap
  };

  return (
    <div className="detail">
      {isLoading ? (
        <div className="product-loading-spinner">
          <div className="product-spinner"></div>
          <p>Đang tải...</p>
        </div>
      ) : (
        <div className="detail-container">
          {/* Image Gallery */}
          <div className="image-gallery">
            {postDetail?.media && postDetail.media.length > 0 ? (
              <>
                <div className="large-image">
                  <img
                    src={decodeBase64Image(
                      postDetail.media[currentImageIndex]?.url
                    )}
                    alt={postDetail.title}
                  />
                </div>
                <div className="thumbnail-row">
                  <button className="prev-button" onClick={handlePrev}>
                    &#8249;
                  </button>
                  <div className="thumbnails">
                    {postDetail.media.map((image, index) => (
                      <img
                        key={index}
                        src={decodeBase64Image(image.url)}
                        alt={`Thumbnail ${index}`}
                        className={currentImageIndex === index ? "active" : ""}
                        onClick={() => handleImageClick(image.url)}
                      />
                    ))}
                  </div>
                  <button className="next-button" onClick={handleNext}>
                    &#8250;
                  </button>
                </div>
              </>
            ) : (
              <p>Không có hình ảnh để hiển thị.</p>
            )}
          </div>

          {/* Popup */}
          {isPopupOpen && (
            <div className="image-popup">
              <div className="overlay" onClick={closePopup}></div>
              <div className="popup-content">
                <img src={decodeBase64Image(popupImage)} alt="Popup" />
                <button className="close-button" onClick={closePopup}>
                  &times;
                </button>
              </div>
            </div>
          )}

          {/* Detail */}
          <div className="property-info">
            <h1>{postDetail.title}</h1>
            <div className="address-row">
              <img src={location} alt="Location Icon" className="icon" />
              <p className="address">{postDetail.address}</p>
            </div>
            <div className="details-row">
              <span className="detail-item detail-item-red">
                <img src={money} alt="Money Icon" className="icon" />
                {postDetail.price.toLocaleString("vi-VN")} VNĐ
              </span>
              <span className="detail-item">
                <img src={home} alt="Home Icon" className="icon" />
                {postDetail.category}
              </span>
              <span className="detail-item">
                <img src={home} alt="Home Icon" className="icon" />
                {postDetail.roomSize} m²
              </span>
              <span className="detail-item">
                <img src={time} alt="Time Icon" className="icon" />
                {new Date(postDetail.createAt).toLocaleDateString()}
              </span>
              {/* Like */}
              <button
                className={`favorite-button favorite-button-like ${
                  favoritePosts.includes(postDetail.id) ? "active" : ""
                }`}
                onClick={() => handleFavoritePost(postDetail.id)}
              >
                <img
                  src={favoritePosts.includes(postDetail.id) ? liked : like}
                  alt="Favorite"
                  className="favorite-icon"
                />
                <span>
                  {favoritePosts.includes(postDetail.id)
                    ? "Đã yêu thích"
                    : "Yêu thích"}
                </span>
              </button>
            </div>

            {/* Desc */}
            <div className="description">
              <h2>Thông tin mô tả</h2>
              <p>{postDetail.description}</p>
            </div>

            {/* Contact Info */}
            <div className="contact-info">
              <span>
                Liên hệ:{" "}
                {showFullContact
                  ? postDetail.contactPhone
                  : `${postDetail.contactPhone.slice(0, 7)}***`}
              </span>
              <button
                onClick={handleToggleContact}
                className="show-contact-button"
              >
                {showFullContact ? "Ẩn số" : "Hiện số"}
              </button>
            </div>
          </div>

          {/* Map */}
          <h2 className="map-heading">Xem trên bản đồ</h2>
          <div className="map-container">
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
            ) : (
              <MapContainer
                center={[21.015, 105.83]} // Vị trí mặc định
                zoom={15}
                className="leaflet-container"
                whenCreated={(mapInstance) => (mapRef.current = mapInstance)} // Gán mapRef khi bản đồ đã tạo
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {position.length > 0 && (
                  <Marker position={position[0].coords}>
                    <Popup>
                      {position[0].title} <br />
                      {position[0].address} <br />
                      <a target="_blank" href={`/detail/${position[0].id}`}>
                        Xem chi tiết
                      </a>
                      <br />
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          position[0].address
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Xem trên Google Maps
                      </a>
                    </Popup>
                  </Marker>
                )}
                <MapUpdater />
              </MapContainer>
            )}
          </div>

          {/* Note */}
          <div className="note-container">
            <div className="note">
              <p>
                <strong>Lưu ý:</strong> Chỉ đặt cọc xác định được chủ nhà và có
                thỏa thuận biên nhận rõ ràng. Kiểm tra mọi điều khoản và yêu cầu
                liệt kê tất cả chi phí hàng tháng vào hợp đồng.{" "}
                <a href="#/">Xem thêm</a>
              </p>
              <p>
                Mọi thông tin liên quan đến tin đăng này chỉ mang tính chất tham
                khảo. Nếu bạn thấy rằng tin đăng này không đúng hoặc có dấu hiệu
                lừa đảo, Hãy liên hệ với chúng tôi{" "}
                <a href="mailto:contact@example.com">
                  {" "}
                  {postDetail.contactEmail}
                </a>
                .
              </p>
            </div>
            <table className="info-table">
              <tbody>
                <tr>
                  <td>Diện tích</td>
                  <td>{postDetail.roomSize} m²</td>
                </tr>
                <tr>
                  <td>Giá</td>
                  <td>{postDetail.price.toLocaleString("vi-VN")} VND</td>
                </tr>
                <tr>
                  <td>Địa chỉ</td>
                  <td>{postDetail.address}</td>
                </tr>
                <tr>
                  <td>Ngày đăng</td>
                  <td>{new Date(postDetail.createAt).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td>Ngày hết hạn</td>
                  <td>
                    {new Date(postDetail.expiredDate).toLocaleDateString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="comments-section">
            <h2 className="comments-title">Bình luận</h2>
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <strong className="comment-author">
                    {comment.fullNameUserComment}:
                  </strong>
                  <p className="comment-content">{comment.comment}</p>
                  <span className="comment-timestamp">
                    {comment.commentDate}
                  </span>{" "}
                  {/* Hiển thị thời gian */}
                </div>
              ))}
            </div>

            {/* Input thêm bình luận */}
            {token ? (
              <div className="add-comment">
                <textarea
                  placeholder="Nhập bình luận của bạn..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="comment-input"
                />
                <button
                  onClick={handleAddComment}
                  className="add-comment-button"
                >
                  Thêm bình luận
                </button>
              </div>
            ) : (
              <p>Đăng nhập để thêm bình luận</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
