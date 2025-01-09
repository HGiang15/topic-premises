import React from "react";

const Step2Form = ({
  images,
  setImages,
  handleFileChange,
  onNext,
  formData,
  setFormData,
}) => {
  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files);

    newImages.forEach((file) => {
      if (file.size > 200 * 1024) {
        alert("Ảnh phải có kích thước nhỏ hơn 200KB.");
      } else if (images.length < 3) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64Image = reader.result; // Lấy giá trị base64
          console.log("Base64 Image:", base64Image); // Log base64 image
          setImages((prevImages) => [...prevImages, base64Image]);
        };

        reader.readAsDataURL(file); // Đọc file thành base64
      } else {
        alert("Bạn chỉ có thể tải tối đa 3 ảnh.");
      }
    });
  };

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
        <div className="uploaded-images">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="uploaded-image">
              {images[index] ? (
                <div className="image-wrapper">
                  <img
                    src={images[index]}
                    alt={`Image ${index + 1}`}
                    className="uploaded-image-img"
                  />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => handleImageRemove(index)}
                  >
                    ✖
                  </button>
                </div>
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
            onChange={(e) => handleInputChange("link", e.target.value)}
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
