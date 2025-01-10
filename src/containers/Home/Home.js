import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { jwtDecode } from "jwt-decode";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet/dist/leaflet.css";

import Filter from "../../components/Filter/Filter";
import avatar from "../../assets/img/user.svg";
import phone from "../../assets/icons/phone.svg";

import "./Home.css";
import BASE_URL from "../../config";

const Home = () => {
    const [products, setProducts] = useState([]); // Dữ liệu sản phẩm
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const navigate = useNavigate();
    const itemsPerPage = 3;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}api/v1/posts?pageNumber=${currentPage}&size=${itemsPerPage}`);
                const result = await response.json();
                if (result.status === 200) {
                    setProducts(result.data.content);
                    setTotalPages(result.data.totalPages);
                    setTotalResults(result.data.totalElements);
                } else {
                    console.error("Error fetching products:", result.message);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage]);

    const handleSearchResults = (searchResults) => {
        setIsLoadingSearch(false);
        setProducts(searchResults);
        setCurrentPage(0);
        setTotalPages(1);
    };

    // base64
    const decodeBase64Image = (base64String) => {
        try {
            if (typeof base64String === "string" && base64String.startsWith("data:image")) {
                return base64String;
            }
            if (typeof base64String === "string") {
                const base64Data = base64String.split(",")[1];
                if (!base64Data) {
                    throw new Error("Chuỗi không chứa dữ liệu hợp lệ sau dấu phẩy.");
                }
                const decodedData = atob(base64Data);
                return decodedData;
            }
            throw new Error("Đầu vào không phải là một chuỗi hợp lệ.");
        } catch (error) {
            console.error("Lỗi giải mã Base64:", error.message);
            return null;
        }
    };

    const paginate = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < totalPages) {
            setCurrentPage(pageNumber);
            window.scrollTo(0, 0);
        }
    };

    const handleMapButtonClick = () => {
        navigate("/addressMap");
    };

    return (
        <div className="home">
            <div className="home-container">
                <Filter onSearch={handleSearchResults} setIsLoadingSearch={setIsLoadingSearch} />

                <div className="map-container-home" onClick={handleMapButtonClick}>
                    <h2 className="map-home-heading">Bấm vào đây để tìm kiếm chi tiết trên bản đồ</h2>
                    <MapContainer center={[21.0114, 105.8473]} zoom={20} className="map">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[21.0114, 105.8473]}>
                            <Popup>Chính chủ cho thuê nhà 279 Phố Huế.</Popup>
                        </Marker>
                    </MapContainer>
                </div>

                <div className="results-header">
                    <h2>Cho thuê mặt bằng kinh doanh Hà Nội</h2>
                    <p>
                        Hiện có <strong>{totalResults}</strong> kết quả trên tổng số <strong>{totalPages}</strong>{" "}
                        trang.
                    </p>
                </div>

                <div className="product-list">
                    {isLoading || isLoadingSearch ? (
                        <div className="product-loading-spinner">
                            <div className="product-spinner"></div>
                            <p>Đang tải...</p>
                        </div>
                    ) : (
                        products.map((product) => {
                            return (
                                <div key={product.id} className="product-card">
                                    <div className="product-images">
                                        {/* Img */}
                                        <div className="product-images__wrapper">
                                            <img
                                                src={decodeBase64Image(product.media[0]?.url)}
                                                alt="Main"
                                                className="product-images-main"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                }}
                                            />
                                            <div className="sub-images">
                                                {product.media.slice(1, 4).map((media, index) => (
                                                    <img
                                                        key={index}
                                                        src={decodeBase64Image(media.url)}
                                                        alt={`Sub ${index}`}
                                                        className="small-image"
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* contact email */}
                                        <div className="product-owner">
                                            <img src={avatar} alt="Avatar" className="owner-avatar" />
                                            <a
                                                href={product.contactEmail ? `mailto:${product.contactEmail}` : "#/"}
                                                className="owner-name"
                                            >
                                                {product.contactEmail || "N/A"}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Detail */}
                                    <div className="product-details">
                                        <h3 className="product-title">{product.title}</h3>
                                        <p className="product-price">
                                            {product.price.toLocaleString("vi-VN")} triệu/tháng
                                        </p>
                                        <div className="product-location-area">
                                            <p className="product-area">{product.roomSize} m²</p>
                                            <p className="product-location">{product.address}</p>
                                        </div>

                                        <div className="button-container">
                                            <button className="contact-button">
                                                <a href={`tel:${product.contactPhone}`} className="contact-link">
                                                    <img src={phone} alt="Phone Icon" className="phone-icon" />
                                                    {product.contactPhone}
                                                </a>
                                            </button>
                                            <button className="details-button">
                                                <a href={`/detail/${product.id}`} className="details-link">
                                                    Xem chi tiết
                                                </a>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Pagination */}
                <div className="pagination-home">
                    <button
                        className="pagination-home-item"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 0}
                    >
                        &lt;
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => index).map((pageNumber) => (
                        <button
                            key={pageNumber}
                            className={`pagination-page-home-item ${pageNumber === currentPage ? "active" : ""}`}
                            onClick={() => paginate(pageNumber)}
                        >
                            {pageNumber + 1}
                        </button>
                    ))}
                    <button
                        className="pagination-home-item"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
