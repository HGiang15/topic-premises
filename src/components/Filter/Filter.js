import React from "react";
import searchIcon from '../../assets/icons/search.svg'
import "./Filter.css";

const Filter = () => {
    return (
        <div className="filter-container">
            <div className="search-bar">
                <input type="text" className="search-input" placeholder="Nhập địa chỉ, giá tiền hoặc từ khóa" />
                <button className="search-button">
                    <img src={searchIcon} alt="Search icon" />
                    Tìm kiếm
                </button>
            </div>
            <div className="filter-bar">
                <div className="filter-options">
                    <select className="filter-select">
                        <option value="">Loại hình</option>
                        <option value="1">Chung cư</option>
                        <option value="2">Nhà đất</option>
                    </select>
                    <select className="filter-select">
                        <option value="">Mức giá</option>
                        <option value="1">Dưới 1 tỷ</option>
                        <option value="2">1-2 tỷ</option>
                    </select>
                    <select className="filter-select">
                        <option value="">Tỉnh/TP</option>
                        <option value="HCM">Hồ Chí Minh</option>
                        <option value="HN">Hà Nội</option>
                    </select>
                    <select className="filter-select">
                        <option value="">Quận/Huyện</option>
                        <option value="1">Quận Long Biên</option>
                        <option value="2">Quận Đống Đa</option>
                        <option value="3">Huyện Thanh Trì</option>
                    </select>
                    <select className="filter-select">
                        <option value="">Diện tích</option>
                        <option value="1">Dưới 50m²</option>
                        <option value="2">50-100m²</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Filter;
