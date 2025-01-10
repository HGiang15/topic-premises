import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode để giải mã token
import manage from "../../assets/icons/manage.svg";
import care from "../../assets/icons/care.svg";
import donation from "../../assets/icons/donation.svg";
import online from "../../assets/icons/online.svg";
import information from "../../assets/icons/information.svg";
import user from "../../assets/img/user.svg";
import QR from '../../assets/img/QR.jpg'
import "./Overview.css";

const Overview = () => {
  const [favoriteCount, setFavoriteCount] = useState(0); // Số người quan tâm bài viết
  const [postCount, setPostCount] = useState(0); // Tổng số bài viết đã đăng
  const [error, setError] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Bạn cần đăng nhập để xem thông tin tổng quan.");
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    setIsLoading(true);
    // Gọi API để lấy số lượng người quan tâm và số bài viết đã đăng
    const fetchOverviewData = async () => {
      try {
       
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const favoriteResponse = await axios.get(
          `http://localhost:8080/api/v1/post-favorite/count-user/${userId}`,
          { headers }
        );

        if (favoriteResponse.data.status === 200) {
          setFavoriteCount(favoriteResponse.data.data);
        } else {
          setError("Không thể lấy số người quan tâm bài viết.");
        }

        // Lấy tổng số bài viết đã đăng
        const postResponse = await axios.get(
          `http://localhost:8080/api/v1/posts/user/${userId}`,
          { headers }
        );

        if (postResponse.data.status === 200 && postResponse.data.data) {
          setPostCount(postResponse.data.data.content.length);
        } else {
          setError("Không thể lấy số lượng bài viết đã đăng.");
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải dữ liệu.");
        console.error("Error fetching overview data: ", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  const handlePopupClose = () => setIsPopupVisible(false); // Đóng popup
  const handleDonateClick = (e) => {
    e.preventDefault();
    console.log("Donate button clicked");

    setIsPopupVisible(true); // Hiển thị popup
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="overview">
      <h1 className="overview-title">Tổng quan</h1>
      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="overview-summary">
            {/* Tổng số bài đăng */}
            <div className="summary-item">
              <div className="summary-item-wrapper">
                <img
                  src={manage}
                  alt="Quản lý tin đăng"
                  className="overview-icon"
                />
                <h2 className="summary-item-title">Tin đăng</h2>
              </div>
              <p className="summary-item-news">{postCount} tin</p>
              <a href="/managepost" className="summary-item-link">
                Quản lý tin
              </a>
            </div>

            {/* Tổng số người quan tâm */}
            <div className="summary-item">
              <div className="summary-item-wrapper">
                <img
                  src={care}
                  alt="Số người quan tâm"
                  className="overview-icon"
                />
                <h2 className="summary-item-title">Số người quan tâm</h2>
              </div>
              <p className="summary-item-news">{favoriteCount} người</p>
              <a href="/#" className="summary-item-link">
                + 1 mới vào hôm nay
              </a>
            </div>

            {/* Donate */}
            <div className="summary-item">
              <div className="summary-item-wrapper">
                <img
                  src={donation}
                  alt="Ủng hộ nhà phát triển"
                  className="overview-icon"
                />
                <h2 className="summary-item-title">Ủng hộ nhà phát triển</h2>
              </div>
              <p className="summary-item-donated">
                Hỗ trợ nhà phát triển để thêm nhiều tính năng hữu ích hơn
              </p>
              <a href="#/" className="summary-item-link" onClick={handleDonateClick}>
                Donate
              </a>
            </div>
          </div>
          <h2 className="section-title">Thông tin dành riêng cho bạn</h2>
          <div className="overview-details">
            {/* Interaction */}
            <div className="details-interaction">
              <h3 className="details-interaction-heading">🔥 Tương tác</h3>
              <div className="details-interaction-box">
                <div className="details-interaction-wrapper">
                  <img src={online} alt="Tương tác" className="detail-icon" />
                  <p className="details-interaction-subtitle">Tin đăng</p>
                </div>
                <p className="details-interaction-care">
                  Có {favoriteCount} người quan tâm đến tin đăng của bạn
                </p>
                <ul className="details-interaction-list">
                  <li className="details-interaction-item">
                    <img
                      src={user}
                      alt="User"
                      className="details-interaction-icon"
                    />{" "}
                    Phạm Nhật Minh đã quan tâm đến tin đăng của bạn
                  </li>
                  <li className="details-interaction-item">
                    <img
                      src={user}
                      alt="User"
                      className="details-interaction-icon"
                    />{" "}
                    Bùi Quang Đạo đã quan tâm đến tin đăng của bạn
                  </li>
                </ul>
              </div>
            </div>

            {/* Notifications */}
            <div className="details-notifications">
              <h3 className="details-notifications-heading">🔔 Thông báo</h3>
              <div className="details-notifications-wrapper">
                <img src={information} alt="" className="notification-icon" />
                <p className="details-notifications-subtile">
                  Tin{" "}
                  <a href="#/" className="details-notifications-link">
                    #678910
                  </a>{" "}
                  sắp hết hạn
                </p>
              </div>
            </div>
          </div>

          {/* Popup */}
          {isPopupVisible && (
            <div className="popup-overlay-overview">
              <div className="popup-content-overview">
                <h2 className="popup-overview-heading">Chúng tôi rất cảm ơn đến các bạn khi đã ủng hộ đội ngũ phát triển bọn tôi</h2>
                <img src={QR} alt="QR Code" className="popup-qr" />
                <button onClick={handlePopupClose} className="popup-close-overview">
                  &times;
                </button>
              </div>
            </div>
          )}

        </>
      )}
    </div>
  );
};

export default Overview;
