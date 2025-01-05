import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Để lấy `id` từ URL
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet/dist/leaflet.css";
import location from "../../assets/icons/location.svg";
import money from "../../assets/icons/money.svg";
import home from "../../assets/icons/home.svg";
import time from "../../assets/icons/time.svg";
import "./Detail.css";

const Detail = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [postDetail, setPostDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showFullContact, setShowFullContact] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupImage, setPopupImage] = useState(null);

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/posts/${id}`);
                const result = await response.json();
                if (result.status === 200) {
                    setPostDetail(result.data);
                } else {
                    setError(result.message);
                }
            } catch (error) {
                setError("Failed to fetch post details");
            } finally {
                setLoading(false);
            }
        };

        fetchPostDetail();
    }, [id]); // Chạy lại khi `id` thay đổi

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const decodeBase64Image = (base64String) => {
        if (base64String.startsWith("data:image")) {
            return base64String;
        } else {
            const base64Data = base64String.split(",")[1];
            const decodedUrl = atob(base64Data);
            return decodedUrl;
        }
    };
    

    const handleToggleContact = () => {
        setShowFullContact(!showFullContact);
    };

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? postDetail.media.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === postDetail.media.length - 1 ? 0 : prevIndex + 1));
    };

    const handleImageClick = (imageUrl) => {
        setPopupImage(imageUrl);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="detail">
            <div className="detail-container">
                {/* Image Gallery */}
                <div className="image-gallery">
                    {postDetail?.media && postDetail.media.length > 0 ? (
                        <>
                            <div className="large-image">
                                <img
                                    src={decodeBase64Image(postDetail.media[currentImageIndex]?.url)}
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
                            {showFullContact ? postDetail.contactPhone : `${postDetail.contactPhone.slice(0, 7)}***`}
                        </span>
                        <button onClick={handleToggleContact} className="show-contact-button">
                            {showFullContact ? "Ẩn số" : "Hiện số"}
                        </button>
                    </div>
                </div>

                {/* Map */}
                <h2 className="map-heading">Xem trên bản đồ</h2>
                <div className="map-container">
                    <MapContainer center={[21.0114, 105.8473]} zoom={20} className="map">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[21.0114, 105.8473]}>
                            <Popup>Chính chủ cho thuê nhà 279 Phố Huế.</Popup>
                        </Marker>
                    </MapContainer>
                </div>

                {/* Note */}
                <div className="note-container">
                    <div className="note">
                        <p>
                            <strong>Lưu ý:</strong> Chỉ đặt cọc xác định được chủ nhà và có thỏa thuận biên nhận rõ
                            ràng. Kiểm tra mọi điều khoản và yêu cầu liệt kê tất cả chi phí hàng tháng vào hợp đồng.{" "}
                            <a href="#/">Xem thêm</a>
                        </p>
                        <p>
                            Mọi thông tin liên quan đến tin đăng này chỉ mang tính chất tham khảo. Nếu bạn thấy rằng tin
                            đăng này không đúng hoặc có dấu hiệu lừa đảo, Hãy liên hệ với chúng tôi <a href="mailto:contact@example.com"> {postDetail.contactEmail}</a>.
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
                                <td>{new Date(postDetail.expiredDate).toLocaleDateString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Detail;
