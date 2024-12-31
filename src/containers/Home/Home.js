import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet/dist/leaflet.css";
import avatar from "../../assets/img/user.svg";
import phone from "../../assets/icons/phone.svg";
import product1 from "../../assets/img/product_1.png";
import product2 from "../../assets/img/product_2.png";
import product3 from "../../assets/img/product_3.png";
import product4 from "../../assets/img/product_4.png";
import product5 from "../../assets/img/product_1.jpg";
import product6 from "../../assets/img/product_2.jpg";
import product7 from "../../assets/img/product_3.jpg";
import product8 from "../../assets/img/product_4.jpg";
import product9 from "../../assets/img/product_5.jpg";
import "./Home.css";

const Home = () => {
    const products = [
        {
            images: [product1, product2, product3, product4],
            title: "Chính chủ cho thuê nhà 279 Phố Huế - 5 tầng, view đẹp, có thang máy, hợp làm VP/Showroom",
            price: "23 triệu/tháng",
            area: "80 m²",
            location: "Hai Bà Trưng, Hà Nội",
            contact: "0398162589",
            owner: "Nguyễn Đăng Hoàng Giang",
        },
        {
            images: [product5, product6, product7, product8],
            title: "Mặt bằng kinh doanh tại Trần Khát Chân, vị trí đắc địa, tiện mở showroom",
            price: "35 triệu/tháng",
            area: "120 m²",
            location: "Hai Bà Trưng, Hà Nội",
            contact: "0978432656",
            owner: "Đàm Khắc Thái",
        },
        {
            images: [product9, product2, product3, product4],
            title: "Cho thuê nhà nguyên căn Nguyễn Lương Bằng, thuận tiện giao thông",
            price: "18 triệu/tháng",
            area: "60 m²",
            location: "Đống Đa, Hà Nội",
            contact: "0912345123",
            owner: "Bùi Quang Đạo",
        },
        {
            images: [product5, product2, product8, product9],
            title: "Cho thuê căn hộ cao cấp Vinhomes Times City, đầy đủ nội thất",
            price: "50 triệu/tháng",
            area: "150 m²",
            location: "Hai Bà Trưng, Hà Nội",
            contact: "0987654333",
            owner: "Nguyễn Nhật Minh",
        },
        {
            images: [product6, product5, product8, product4],
            title: "Cho thuê căn hộ cao cấp Vinhomes Times City, đầy đủ nội thất",
            price: "50 triệu/tháng",
            area: "150 m²",
            location: "Hai Bà Trưng, Hà Nội",
            contact: "0987654333",
            owner: "Nguyễn Nhật Minh",
        },
        {
            images: [product3, product7, product8, product9],
            title: "Cho thuê căn hộ cao cấp Vinhomes Times City, đầy đủ nội thất",
            price: "50 triệu/tháng",
            area: "150 m²",
            location: "Hai Bà Trưng, Hà Nội",
            contact: "0987654333",
            owner: "Nguyễn Nhật Minh",
        },
        {
            images: [product7, product8, product3, product6],
            title: "Cho thuê căn hộ cao cấp Vinhomes Times City, đầy đủ nội thất",
            price: "50 triệu/tháng",
            area: "150 m²",
            location: "Hai Bà Trưng, Hà Nội",
            contact: "0987654333",
            owner: "Nguyễn Nhật Minh",
        },
        {
            images: [product1, product2, product3, product4],
            title: "Cho thuê căn hộ cao cấp Vinhomes Times City, đầy đủ nội thất",
            price: "50 triệu/tháng",
            area: "150 m²",
            location: "Hai Bà Trưng, Hà Nội",
            contact: "0987654333",
            owner: "Nguyễn Nhật Minh",
        },
    ];

    // Pagination
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageFeatured, setCurrentPageFeatured] = useState(1);

    // pagination product
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // pagination featured products
    const itemsPerPageFeatured = 3;
    const indexOfLastItemFeatured = currentPageFeatured * itemsPerPageFeatured;
    const indexOfFirstItemFeatured = indexOfLastItemFeatured - itemsPerPageFeatured;
    const totalPagesFeatured = Math.ceil(products.length / itemsPerPageFeatured);

    const paginateFeatured = (pageNumber) => setCurrentPageFeatured(pageNumber);

    return (
        <div className="home">
            <div className="home-container">
                {/* Map */}
                <div className="map-container">
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
                        Hiện có <strong>{products.length}</strong> kết quả
                    </p>
                </div>

                {/* Products */}
                <div className="product-list">
                    {currentProducts.map((product, index) => (
                        <div key={index} className="product-card">
                            <div className="product-images">
                                <div className="product-images__wrapper">
                                    <img src={product.images[0]} alt="Main" className="main-image" />
                                    <div className="sub-images">
                                        <img src={product.images[1]} alt="Top Right" className="top-image" />
                                        <div className="bottom-images">
                                            <img src={product.images[2]} alt="Bottom Left" className="small-image" />
                                            <img src={product.images[3]} alt="Bottom Right" className="small-image" />
                                        </div>
                                    </div>
                                </div>
                                <div className="product-owner">
                                    <img src={avatar} alt="Avatar" className="owner-avatar" />
                                    <p className="owner-name">{product.owner}</p>
                                </div>
                            </div>

                            {/* Chi tiết sản phẩm */}
                            <div className="product-details">
                                <h3 className="product-title">{product.title}</h3>
                                <p className="product-price">{product.price}</p>
                                <div className="product-location-area">
                                    <p className="product-area">{product.area}</p>
                                    <p className="product-location">{product.location}</p>
                                </div>
                                <div className="button-container">
                                    <button className="contact-button">
                                        <a href={`tel:${product.contact}`} className="contact-link">
                                            <img src={phone} alt="Phone Icon" className="phone-icon" />
                                            {product.contact}
                                        </a>
                                    </button>
                                    <button className="details-button">
                                        {
                                            // <a href={`/detail/${index}`} className="details-link">
                                            //     Xem chi tiết
                                            // </a>
                                        }
                                        <a href="/detail" className="details-link">
                                            Xem chi tiết
                                        </a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="pagination">
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>{currentPage}</span>
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>

                {/* Các mặt bằng tiêu biểu */}
                <div className="featured-products">
                    <h2>Mặt bằng tiêu biểu</h2>

                    <div className="featured-pagination">
                        <button
                            onClick={() => paginateFeatured(currentPageFeatured - 1)}
                            disabled={currentPageFeatured === 1}
                        >
                            &lt;
                        </button>
                        <button
                            onClick={() => paginateFeatured(currentPageFeatured + 1)}
                            disabled={currentPageFeatured === totalPagesFeatured}
                        >
                            &gt;
                        </button>
                    </div>

                    <div className="featured-product-list">
                        {products.slice(indexOfFirstItemFeatured, indexOfLastItemFeatured).map((product, index) => (
                            <div key={index} className="featured-product-card">
                                <img src={product.images[0]} alt="Product" className="featured-product-image" />
                                <h3 className="featured-product-title">{product.title}</h3>

                                <div className="button-container">
                                    <button className="details-button-featured">
                                        <a href="/detail" className="details-link-featured">
                                            Xem chi tiết
                                        </a>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
