import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet/dist/leaflet.css";
import location from "../../assets/icons/location.svg";
import money from "../../assets/icons/money.svg";
import home from "../../assets/icons/home.svg";
import time from "../../assets/icons/time.svg";
import product1 from "../../assets/img/product_1.jpg";
import product2 from "../../assets/img/product_2.jpg";
import product3 from "../../assets/img/product_3.jpg";
import product4 from "../../assets/img/product_4.jpg";
import product5 from "../../assets/img/product_5.jpg";
import "./Detail.css";

const Detail = () => {
    const [showFullContact, setShowFullContact] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupImage, setPopupImage] = useState(null);

    const handleToggleContact = () => {
        setShowFullContact(!showFullContact);
    };

    const propertyDetails = {
        title: "Chính chủ cho thuê nhà 279 Phố Huế - 5 tầng, view đẹp, có thang máy, hợp làm VP/Showroom",
        address: "270 Đường Trần Khát Chân, Phường Thanh Nhàn, Hai Bà Trưng, Hà Nội",
        price: "23 triệu/tháng",
        area: "80 m²",
        timePosted: "3 ngày trước",
        description: `
        Cho thuê cửa hàng trong tòa văn phòng Số 157 Phạm Văn Đồng, Mai Dịch, Cầu Giấy. 200m², 7 tầng, 1 hầm, mặt tiền 11 mét,
        thông sàn, chuẩn văn phòng, điều hòa âm trần, hệ thống PCCC đầy đủ, hệ thống chiếu sáng thiết bị vệ sinh cao cấp.
        Vị trí tập trung nhiều văn phòng nhất Quận Cầu Giấy. Phù hợp làm showroom, ngân hàng, spa, thẩm mỹ... Diện tích tầng 1: 
        180m² xây dựng: Giá 80 tr/tháng. Diện tích tầng 2 - 7 200m² xây dựng: Giá 40 triệu/tháng. Khách hàng có nhu cầu vui lòng liên hệ trực tiếp.`,
        contactNumber: "0398162123",
        listingInfo: [
            { label: "Ngày đăng", value: "24/12/2024" },
            { label: "Ngày hết hạn", value: "10/01/2025" },
            { label: "Loại tin", value: "Trả phí" },
            { label: "Mã tin", value: "#678910" },
        ],
        images: [product1, product2, product3, product4, product5],
    };

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? propertyDetails.images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === propertyDetails.images.length - 1 ? 0 : prevIndex + 1));
    };

    const handleImageClick = (image) => {
        setPopupImage(image);
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
                    <div className="large-image">
                        <img src={propertyDetails.images[currentImageIndex]} alt="Nhà 279 Phố Huế" />
                    </div>
                    <div className="thumbnail-row">
                        <button className="prev-button" onClick={handlePrev}>
                            &#8249;
                        </button>
                        <div className="thumbnails">
                            {propertyDetails.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Thumbnail ${index}`}
                                    className={currentImageIndex === index ? "active" : ""}
                                    onClick={() => handleImageClick(image)}
                                />
                            ))}
                        </div>
                        <button className="next-button" onClick={handleNext}>
                            &#8250;
                        </button>
                    </div>
                </div>

                {/* Popup */}
                {isPopupOpen && (
                    <div className="image-popup">
                        <div className="overlay" onClick={closePopup}></div>
                        <div className="popup-content">
                            <img src={popupImage} alt="Popup" />
                            <button className="close-button" onClick={closePopup}>
                                &times;
                            </button>
                        </div>
                    </div>
                )}

                {/* Detail */}
                <div className="property-info">
                    <h1>{propertyDetails.title}</h1>
                    <div className="address-row">
                        <img src={location} alt="Location Icon" className="icon" />
                        <p className="address">{propertyDetails.address}</p>
                    </div>
                    <div className="details-row">
                        <span className="detail-item detail-item-red">
                            <img src={money} alt="Money Icon" className="icon" />
                            {propertyDetails.price}
                        </span>
                        <span className="detail-item">
                            <img src={home} alt="Home Icon" className="icon" />
                            {propertyDetails.area}
                        </span>
                        <span className="detail-item">
                            <img src={time} alt="Time Icon" className="icon" />
                            {propertyDetails.timePosted}
                        </span>
                    </div>

                    {/* Desc */}
                    <div className="description">
                        <h2>Thông tin mô tả</h2>
                        <p>{propertyDetails.description}</p>
                    </div>

                    {/* Contact Info */}
                    <div className="contact-info">
                        <span>
                            Liên hệ:{" "}
                            {showFullContact
                                ? propertyDetails.contactNumber
                                : `${propertyDetails.contactNumber.slice(0, 7)}***`}
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
                            đăng này không đúng hoặc có dấu hiệu lừa đảo, <a href="#/">Hãy liên hệ với chúng tôi</a>.
                        </p>
                    </div>
                    <table className="info-table">
                        <tbody>
                            {propertyDetails.listingInfo.map((info, index) => (
                                <tr key={index}>
                                    <td>{info.label}</td>
                                    <td>{info.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Detail;
