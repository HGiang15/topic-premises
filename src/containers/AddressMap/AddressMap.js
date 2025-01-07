import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./AddressMap.css";
import AddressRedIcons from "../../assets/icons/address-icon.webp";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: AddressRedIcons,
});

const defaultIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const AddressMap = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [addresses, setAddresses] = useState([]);
    const [positions, setPositions] = useState([]);
    const [searchResult, setSearchResult] = useState(null);
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        fetchAddressAndCoordinates("");
    }, []);

    const fetchAddressAndCoordinates = async (searchKeyword) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/api/v1/posts/search-map?keyword=${searchKeyword}`);
            const result = response.data;

            if (response.status === 200 && result.status === 200) {
                const newPositions = [];
                for (const item of result.data) {
                    try {
                        const geoResponse = await axios.get("https://nominatim.openstreetmap.org/search", {
                            params: {
                                q: item.address,
                                format: "json",
                                addressdetails: 1,
                            },
                        });
                        if (geoResponse.data && geoResponse.data.length > 0) {
                            const { lat, lon } = geoResponse.data[0];
                            newPositions.push({
                                id: item.id,
                                title: item.title,
                                address: item.address,
                                coords: [parseFloat(lat), parseFloat(lon)],
                                icon: defaultIcon,
                                imgUrl: item.imgUrl,
                            });
                        } else {
                            console.warn(`Không tìm thấy tọa độ cho địa chỉ: ${item.address}`);
                        }
                    } catch (error) {
                        console.error(`Lỗi khi tìm tọa độ cho: ${item.title}`, error);
                    }
                }
                setPositions(newPositions);
            } else {
                console.error("Lỗi khi lấy dữ liệu địa chỉ:", result.message);
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu API:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchKeyWord = () => {
        if (keyword.trim() === "") {
            alert("Vui lòng nhập từ khóa để tìm kiếm.");
            return;
        }
        fetchAddressAndCoordinates(keyword); // Gửi yêu cầu tìm kiếm theo từ khóa
    };

    const handleSearch = () => {
        // if (address.trim() === "") {
        //   alert("Vui lòng nhập địa chỉ để tìm kiếm.");
        //   return;
        // }

        setLoading(true);
        axios
            .get(`https://nominatim.openstreetmap.org/search`, {
                params: {
                    q: address,
                    format: "json",
                    addressdetails: 1,
                },
            })
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    const { lat, lon } = response.data[0];
                    setSearchResult([parseFloat(lat), parseFloat(lon)]);
                } else {
                    alert("Không tìm thấy địa chỉ!");
                }
            })
            .catch((error) => {
                console.error(error);
                alert("Đã có lỗi xảy ra khi tìm kiếm.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const MapViewUpdater = () => {
        const map = useMap();

        if (searchResult) {
            map.flyTo(searchResult, 15);
        }

        return null;
    };

    return (
        <div className="address-map-container">
            {/* Form nhập địa chỉ và nút tìm kiếm */}
            <div className="search-container-wrapper">
                <div className="search-container">
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Nhập địa chỉ"
                        className="search-input"
                    />
                    <button onClick={handleSearch} className="search-button">
                        Tìm kiếm
                    </button>
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Nhập từ khóa tìm kiếm"
                        className="search-input"
                    />
                    <button onClick={handleSearchKeyWord} className="search-button">
                        Tìm kiếm
                    </button>
                </div>
            </div>

            {/* Nút mở modal */}

            {loading ? (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
            ) : (
                <>
                    <button onClick={() => setIsModalOpen(true)} className="open-modal-button">
                        Mở bản đồ lớn
                    </button>

                    <MapContainer center={[21.015, 105.83]} zoom={15} className="leaflet-container">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <MapViewUpdater />

                        {positions.map((position, index) => (
                            <Marker key={index} position={position.coords} icon={position.icon}>
                                <Popup>
                                    {position.title} <br />
                                    {position.address} <br />
                                    <a target="_blank" href={`/detail/${position.id}`}>
                                        Xem chi tiết
                                    </a>
                                    <img
                                        src={position.imgUrl}
                                        alt={position.address}
                                        className="popup-image"
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                            objectFit: "contain",
                                        }}
                                    />
                                    <br />
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                            position.address
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Xem trên Google Maps
                                    </a>
                                </Popup>
                            </Marker>
                        ))}
                        {searchResult && (
                            <Marker position={searchResult}>
                                <Popup>Vị trí tìm thấy!</Popup>
                            </Marker>
                        )}
                    </MapContainer>
                </>
            )}

            {/* Modal hiển thị bản đồ lớn */}
            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} fullscreen centered>
                <Modal.Body style={{ padding: 0 }}>
                    <MapContainer
                        center={[21.015, 105.83]}
                        zoom={15}
                        className="leaflet-container-large"
                        style={{ width: "100%", height: "100%" }} // Chiếm toàn bộ chiều rộng và chiều cao modal
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {positions.map((position, index) => (
                            <Marker key={index} position={position.coords} icon={position.icon}>
                                <Popup>
                                    {position.title} <br />
                                    {position.address} <br />
                                    <a target="_blank" href={`/detail/${position.id}`}>
                                        Xem chi tiết
                                    </a>
                                    <img
                                        src={position.imgUrl}
                                        alt={position.address}
                                        className="popup-image"
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                            objectFit: "contain",
                                        }}
                                    />
                                    <br />
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                            position.address
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Xem trên Google Maps
                                    </a>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AddressMap;
