import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

import "./AddressMap.css"; // Import tệp CSS mới
import AddressRedIcons from "../../assets/icons/address-icon.webp";
import product1 from "../../assets/img/product_1.png";
// Fix icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: AddressRedIcons,
});

// Tạo icon mũi tên đỏ
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const AddressMap = () => {
  const [addresses, setAddresses] = useState([]); 
  const [positions, setPositions] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const fetchAddressAndCoordinates = async () => {
      try {
        // Gọi API để lấy danh sách địa chỉ
        const response = await fetch(
          `http://localhost:8080/api/v1/posts/search-map?keyword=`
        );
        const result = await response.json();
  
        if (response.ok && result.status === 200) {
          setAddresses(result.data); 
          console.log("address: ", result.data);
          const newPositions = [];
          for (const item of result.data) {
            try {
              const geoResponse = await axios.get(
                "https://nominatim.openstreetmap.org/search",
                {
                  params: {
                    q: item.address,
                    format: "json",
                    addressdetails: 1,
                  },
                }
              );
              if (geoResponse.data && geoResponse.data.length > 0) {
                const { lat, lon } = geoResponse.data[0];
                newPositions.push({
                  id: item.id,
                  title: item.title,
                  address: item.address,
                  coords: [parseFloat(lat), parseFloat(lon)],
                  icon: defaultIcon,
                  imgUrl: item.imgUrl
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
          console.error("Error fetching address:", result.message);
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };
  
    fetchAddressAndCoordinates();
  }, []);
  

  const handleSearch = () => {
    if (address.trim() === "") {
      alert("Vui lòng nhập địa chỉ để tìm kiếm.");
      return;
    }

    setLoading(true); // Đặt loading là true khi bắt đầu tìm kiếm

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

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : (
        <MapContainer
          center={[21.015, 105.83]}
          zoom={15}
          className="leaflet-container"
        >
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
                  }} // Đảm bảo kích thước ảnh phù hợp
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
      )}
    </div>
  );
};

export default AddressMap;
