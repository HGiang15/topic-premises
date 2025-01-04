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
  iconUrl: AddressRedIcons, // Sử dụng URL đã import
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
  const addresses = [
    {
      name: "vincom",
      address: "Phạm ngọc thạch, đống đa, hà nội",
      image: product1, // Thêm trường ảnh
    },
    {
      name: "Trường Đại học Thủy Lợi",
      address: "175 Tây Sơn, Hà Nội",
      image: product1, // Thêm trường ảnh
    },
    {
      name: "Đại học Công Đoàn",
      address: "169 Tây Sơn, Hà Nội",
      image: product1, // Thêm trường ảnh
    },
    {
      name: "Học viện Ngân hàng",
      address: "12 Chùa Bộc, Hà Nội",
      image: product1, // Thêm trường ảnh
    },
    {
      name: "Đại học Y Hà Nội",
      address: "1 Tôn Thất Tùng, Đống Đa, Hà Nội",
      image: product1, // Thêm trường ảnh
    },
    {
      name: "Đại học công nghệ",
      address: "Nhà E3, 144 Xuân Thủy, quận Cầu Giấy, Hà Nội, Hà Nội, Việt Nam",
      image: product1, // Thêm trường ảnh
    },
    {
      name: "Nhà Đạo",
      address: "Liên Bảo, Vĩnh yên",
      image: product1, // Thêm trường ảnh
    },
  ];

  const [positions, setPositions] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false); // Thêm state loading

  useEffect(() => {
    // Tra cứu tọa độ từ danh sách địa chỉ
    const fetchCoordinates = async () => {
      setLoading(true); // Đặt loading là true khi bắt đầu tải
      const newPositions = [];
      for (const item of addresses) {
        try {
          const response = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
              params: {
                q: item.address,
                format: "json",
                addressdetails: 1,
              },
            }
          );
          if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            newPositions.push({
              name: item.name,
              coords: [parseFloat(lat), parseFloat(lon)],
              icon: defaultIcon,
            });
          } else {
            console.warn(`Không tìm thấy tọa độ cho địa chỉ: ${item.address}`);
          }
        } catch (error) {
          console.error(`Lỗi khi tìm tọa độ cho: ${item.name}`, error);
        }
      }
      setPositions(newPositions);
      setLoading(false); // Đặt loading là false khi tải xong
    };

    fetchCoordinates();
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
        setLoading(false); // Đặt loading là false khi tìm kiếm xong
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
                {position.name} <br />
                <a target="_blank" href="/detail">
                  Xem chi tiết
                </a>
                <img
                  src={product1}
                  alt={position.name}
                  className="popup-image"
                  style={{ width: "100%", height: "auto", objectFit: "contain", }} // Đảm bảo kích thước ảnh phù hợp
                />
                <br />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    position.name
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
