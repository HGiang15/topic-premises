import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
    const priceRanges = [
        "3-5 triệu",
        "5-7 triệu",
        "7-10 triệu",
        "10-15 triệu",
        "15-20 triệu",
        "20-30 triệu",
        "30-50 triệu",
        "50-100 triệu",
    ];

    const areaRanges = [
        "Dưới 30m²",
        "30-50m²",
        "50-80m²",
        "80-150m²",
        "100-150m²",
        "120-150m²",
        "150-180m²",
        "200-250m²",
    ];

    const locations = [
        "Hà Nội",
        "TP Hồ Chí Minh",
        "Đà Nẵng",
        "Hải Phòng",
        "Quảng Ninh",
        "Cần Thơ",
        "Thanh Hóa",
        "Nam Định",
        "Vĩnh Phúc",
        "Hải Dương",
        "Bắc Giang",
        "Hưng Yên",
        "Long An",
        "Điện Biên",
        "Lào Cai",
        "Bà Rịa - Vũng Tàu",
    ];

    const [searchPrice, setSearchPrice] = useState("");
    const [filteredPriceRanges, setFilteredPriceRanges] = useState(priceRanges);

    const [searchArea, setSearchArea] = useState("");
    const [filteredAreaRanges, setFilteredAreaRanges] = useState(areaRanges);

    const [searchLocation, setSearchLocation] = useState("");
    const [filteredLocations, setFilteredLocations] = useState(locations);

    const handleSearch = (searchTerm, data, setFilteredData) => {
        setFilteredData(
            data.filter((item) =>
                item.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    return (
        <div className="sidebar">
            {/* giá */}
            <h3 className="sidebar-title">Lọc theo khoảng giá</h3>
            <input
                type="text"
                value={searchPrice}
                onChange={(e) => {
                    setSearchPrice(e.target.value);
                    handleSearch(e.target.value, priceRanges, setFilteredPriceRanges);
                }}
                placeholder="3-5 triệu..."
                className="autocomplete-input"
            />
            <ul className="sidebar-list">
                {filteredPriceRanges.map((range, index) => (
                    <li key={index} className="sidebar-item">
                        {range}
                    </li>
                ))}
            </ul>

            {/* diện tích */}
            <h3 className="sidebar-title">Lọc theo diện tích</h3>
            <input
                type="text"
                value={searchArea}
                onChange={(e) => {
                    setSearchArea(e.target.value);
                    handleSearch(e.target.value, areaRanges, setFilteredAreaRanges);
                }}
                placeholder="30-50m²"
                className="autocomplete-input"
            />
            <ul className="sidebar-list">
                {filteredAreaRanges.map((range, index) => (
                    <li key={index} className="sidebar-item">
                        {range}
                    </li>
                ))}
            </ul>

            {/* vị trí */}
            <h3 className="sidebar-title">Lọc theo vị trí</h3>
            <input
                type="text"
                value={searchLocation}
                onChange={(e) => {
                    setSearchLocation(e.target.value);
                    handleSearch(e.target.value, locations, setFilteredLocations);
                }}
                placeholder="Hà Nội"
                className="autocomplete-input"
            />
            <ul className="sidebar-list">
                {filteredLocations.map((location, index) => (
                    <li key={index} className="sidebar-item">
                        {location}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
