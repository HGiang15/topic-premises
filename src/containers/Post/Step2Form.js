import React from "react";

const Step2Form = ({ images, setImages, handleFileChange, onNext }) => {
  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files);
    
    if (images.length + newImages.length <= 3) {
      const fileReaders = [];
      newImages.forEach((file) => {
        const reader = new FileReader();
        
        reader.onloadend = () => {
          const base64Image = reader.result; // Lấy giá trị base64
          console.log("Base64 Image:", base64Image); // Log base64 image
          
          // Cập nhật mảng images với ảnh đã chuyển đổi thành base64
          setImages((prevImages) => [...prevImages, base64Image]);
        };
        
        reader.readAsDataURL(file); // Đọc file thành base64
        fileReaders.push(reader);
      });
    } else {
      alert("Bạn chỉ có thể tải tối đa 3 ảnh.");
    }
  };

  return (
    <div className="post-form-container">
      <h3 className="post-h3">Hình ảnh</h3>
      <form>
        {/* Chọn ảnh */}
        <div className="post-form-group">
          <label htmlFor="file-upload" className="custom-file-upload">
            Tải ảnh lên
          </label>
          <input
            id="file-upload"
            type="file"
            className="post-upload"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>

        {/* Ảnh đã tải lên */}
        <div className="uploaded-images">
          {/* Tạo 3 khung cho ảnh */}
          {[...Array(3)].map((_, index) => (
            <div key={index} className="uploaded-image">
              {/* Hiển thị ảnh đã tải lên vào khung */}
              {images[index] ? (
                <img
                  src={images[index]} // Sử dụng ảnh base64
                  alt={`Image ${index + 1}`}
                  className="uploaded-image-img"
                />
              ) : (
                <div className="image-placeholder">
                  <p>Chưa có ảnh</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Video review */}
        <div className="post-form-group">
          <label className="post-label">Nhập link video review</label>
          <input
            type="text"
            className="post-input"
            placeholder="Nhập link video review"
          />
        </div>
      </form>

      <button type="button" onClick={onNext} className="post-submit-btn">
        Tiếp
      </button>
    </div>
  );
};

export default Step2Form;
