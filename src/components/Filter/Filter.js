import React, { useState } from "react";
import searchIcon from "../../assets/icons/search.svg";
import arrowDown from "../../assets/icons/arrowDown.svg";
import "./Filter.css";
import BASE_URL from "../../config";

const Filter = ({ onSearch, setIsLoadingSearch, pageNumber, size }) => {
    const [keyword, setKeyword] = useState("");
    const [filters, setFilters] = useState({
        title: null,
        address: null,
        minPrice: null,
        maxPrice: null,
        minRoomSize: null,
        maxRoomSize: null,
        category: null,
        sortBy: "createdAt",
        sortDirection: "DESC",
    });

    const handleSearch = async () => {
        setIsLoadingSearch(true);
        try {
            let response, result;
            if (keyword.trim()) {
                // Nếu có từ khóa, gọi API search
                response = await fetch(
                    `${BASE_URL}api/v1/posts/search?keyword=${keyword}&pageNumber=${pageNumber}&size=${size}`
                );
            } else {
                // Nếu không có từ khóa, gọi API filter với pageNumber và size hợp lý
                response = await fetch(`${BASE_URL}api/v1/posts/search-filter`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...filters,
                        page: pageNumber,  // Chỉnh sửa đây để gửi đúng pageNumber
                        size: size,         // Đảm bảo size là số sản phẩm trên mỗi trang
                    }),
                });
            }
    
            result = await response.json();
            if (result && result.data && Array.isArray(result.data.content)) {
                onSearch(result.data.content, result.data.totalElements, result.data.totalPages);
            } else {
                console.error("Invalid API response:", result);
            }
        } catch (error) {
            console.error("Search API error:", error);
        } finally {
            setIsLoadingSearch(false);
        }
    };
    
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="filter-container">
            <div className="filter-search-bar">
                <input
                    type="text"
                    className="filter-search-input"
                    placeholder="Nhập tiêu đề địa chỉ, mô tả hoặc loại hình"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="filter-search-button" onClick={handleSearch}>
                    <img src={searchIcon} alt="Search icon" />
                    Tìm kiếm
                </button>
            </div>

            <div className="filter-bar">
                <div className="filter-options">
                    {/* Category Filter */}
                    <div className="custom-select">
                        <select
                            className="filter-select"
                            name="category"
                            value={filters.category}
                            onChange={handleFilterChange}
                        >
                            <option value="">Loại hình</option>
                            <option value="Phòng trọ">Phòng trọ</option>
                            <option value="Căn hộ">Căn hộ</option>
                            <option value="Nhà nguyên căn">Nhà nguyên căn</option>
                            <option value="Văn phòng">Văn phòng</option>
                            <option value="Chung cư">Chung cư</option>
                            <option value="Nhà mặt đất">Nhà mặt đất</option>
                        </select>
                        <img src={arrowDown} alt="Arrow Down" className="dropdown-icon" />
                    </div>

                    {/* Address Filter */}
                    <div className="custom-select">
                        <select
                            className="filter-select"
                            name="address"
                            value={filters.address}
                            onChange={handleFilterChange}
                        >
                            <option value="">Địa chỉ</option>
                            <option value="Hà Nội">Hà Nội</option>
                            <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                            <option value="Đà Nẵng">Đà Nẵng</option>
                            <option value="Hải Phòng">Hải Phòng</option>
                            <option value="Cần Thơ">Cần Thơ</option>
                            <option value="Nha Trang">Nha Trang</option>
                            <option value="Huế">Huế</option>
                            <option value="Quảng Ninh">Quảng Ninh</option>
                            <option value="Bắc Ninh">Bắc Ninh</option>
                            <option value="Vũng Tàu">Vũng Tàu</option>
                            <option value="Bình Dương">Bình Dương</option>
                            <option value="Đồng Nai">Đồng Nai</option>
                            <option value="Hải Dương">Hải Dương</option>
                            <option value="Lào Cai">Lào Cai</option>
                            <option value="Thanh Hóa">Thanh Hóa</option>
                            <option value="Nghệ An">Nghệ An</option>
                            <option value="Thái Nguyên">Thái Nguyên</option>
                            <option value="Quảng Nam">Quảng Nam</option>
                            <option value="Long An">Long An</option>
                            <option value="Hà Tĩnh">Hà Tĩnh</option>
                        </select>
                        <img src={arrowDown} alt="Arrow Down" className="dropdown-icon" />
                    </div>

                    {/* Price Filters */}
                    <div className="custom-select">
                        <select
                            className="filter-select"
                            name="minPrice"
                            value={filters.minPrice}
                            onChange={handleFilterChange}
                        >
                            <option value="">Giá tối thiểu</option>
                            <option value="1000000">10 triệu</option>
                            <option value="2000000">20 triệu</option>
                            <option value="5000000">50 triệu</option>
                            <option value="10000000">100 triệu</option>
                            <option value="200000000">200 triệu</option>
                        </select>
                        <img src={arrowDown} alt="Arrow Down" className="dropdown-icon" />
                    </div>

                    <div className="custom-select">
                        <select
                            className="filter-select"
                            name="maxPrice"
                            value={filters.maxPrice}
                            onChange={handleFilterChange}
                        >
                            <option value="">Giá tối đa</option>
                            <option value="50000000">50 triệu</option>
                            <option value="60000000">60 triệu</option>
                            <option value="70000000">70 triệu</option>
                            <option value="80000000">80 triệu</option>
                            <option value="100000000">100 triệu</option>
                        </select>
                        <img src={arrowDown} alt="Arrow Down" className="dropdown-icon" />
                    </div>

                    {/* Room Size Filters */}
                    <div className="custom-select">
                        <select
                            className="filter-select"
                            name="minRoomSize"
                            value={filters.minRoomSize}
                            onChange={handleFilterChange}
                        >
                            <option value="">Diện tích min</option>
                            <option value="10">10 m²</option>
                            <option value="20">20 m²</option>
                            <option value="50">50 m²</option>
                            <option value="100">100 m²</option>
                            <option value="200">200 m²</option>
                        </select>
                        <img src={arrowDown} alt="Arrow Down" className="dropdown-icon" />
                    </div>

                    {/* Room Size Filters */}
                    <div className="custom-select">
                        <select
                            className="filter-select"
                            name="maxRoomSize"
                            value={filters.maxRoomSize}
                            onChange={handleFilterChange}
                        >
                            <option value="">Diện tích max</option>
                            <option value="50">50 m²</option>
                            <option value="100">100 m²</option>
                            <option value="200">200 m²</option>
                            <option value="500">500 m²</option>
                        </select>
                        <img src={arrowDown} alt="Arrow Down" className="dropdown-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
