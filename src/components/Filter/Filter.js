import React, { useState } from "react";
import searchIcon from "../../assets/icons/search.svg";
import arrowDown from "../../assets/icons/arrowDown.svg";
import "./Filter.css";

const Filter = ({ onSearch, setIsLoadingSearch }) => {
    const [keyword, setKeyword] = useState("");

    const handleSearch = async () => {
        try {
            setIsLoadingSearch(true);
            const response = await fetch(
                `http://localhost:8080/api/v1/posts/search?keyword=${keyword}&pageNumber=0&size=10`
            );
            const result = await response.json();
            if (result.status === 200) {
                onSearch(result.data.content); 
            } else {
                console.error("Error searching:", result.message);
            }
        } catch (error) {
            console.error("Error searching:", error);
        }
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
                    <div className="custom-select">
                        <select className="filter-select">
                            <option value="">Loại hình</option>
                            <option value="1">Chung cư</option>
                            <option value="2">Nhà đất</option>
                        </select>
                        <img src={arrowDown} alt="Arrow Down" className="dropdown-icon" />
                    </div>
                    <div className="custom-select">
                        <select className="filter-select">
                            <option value="">Mức giá</option>
                            <option value="1">Dưới 1 tỷ</option>
                            <option value="2">1-2 tỷ</option>
                            <option value="3">3-4 tỷ</option>
                            <option value="4">5-6 tỷ</option>
                            <option value="5">7-8 tỷ</option>
                        </select>
                        <img src={arrowDown} alt="Arrow Down" className="dropdown-icon" />
                    </div>
                    <div className="custom-select">
                        <select className="filter-select">
                            <option value="">Tỉnh/TP</option>
                            <option value="HCM">Hồ Chí Minh</option>
                            <option value="HN">Hà Nội</option>
                            <option value="HP">Hải Phòng</option>
                            <option value="ND">Nam Định</option>
                            <option value="HY">Hưng Yên</option>
                        </select>
                        <img src={arrowDown} alt="Arrow Down" className="dropdown-icon" />
                    </div>
                    <div className="custom-select">
                        <select className="filter-select">
                            <option value="">Quận/Huyện</option>
                            <option value="1">Quận Long Biên</option>
                            <option value="2">Quận Đống Đa</option>
                            <option value="3">Quận Thanh Xuân</option>
                            <option value="4">Quận Tây Hồ</option>
                            <option value="5">Huyện Thanh Trì</option>
                        </select>
                        <img src={arrowDown} alt="Arrow Down" className="dropdown-icon" />
                    </div>
                    <div className="custom-select">
                        <select className="filter-select">
                            <option value="">Diện tích</option>
                            <option value="1">Dưới 50m²</option>
                            <option value="2">50-100m²</option>
                            <option value="3">100-200m²</option>
                            <option value="4">100-200m²</option>
                            <option value="5">200-300m²</option>
                        </select>
                        <img src={arrowDown} alt="Arrow Down" className="dropdown-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
