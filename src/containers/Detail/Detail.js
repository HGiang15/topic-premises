import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom"; // Để lấy `id` từ URL
import { MapContainer, TileLayer, Marker, Popup , useMap} from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet/dist/leaflet.css";
import location from "../../assets/icons/location.svg";
import money from "../../assets/icons/money.svg";
import home from "../../assets/icons/home.svg";
import time from "../../assets/icons/time.svg";
import "./Detail.css";
import L from "leaflet";
import axios from "axios";

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
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/posts/${id}`
        );
        const result = await response.json();
        if (result.status === 200) {
          setPostDetail(result.data);
          const address = result.data.address;
          fetchCoordinates(address);
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
    setLoading(false); // Đặt loading là false khi tải xong
  };

  // Sử dụng ref để di chuyển bản đồ sau khi có tọa độ
  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      if (position.length > 0) {
        map.setView(position[0].coords, 15); // Di chuyển đến vị trí mới với zoom level là 15
      }
    }, [position, map]);

    return null;
  };
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

  return (
    <div className="detail">
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
              <MapUpdater /> {/* Cập nhật vị trí bản đồ */}
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
