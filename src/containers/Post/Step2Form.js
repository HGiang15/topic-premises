// Step2Form.js
import React from "react";

const Step2Form = ({ images, setImages, handleFileChange }) => {
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
            onChange={handleFileChange}
          />
        </div>
        <div className="uploaded-images">
          {images.length > 0 &&
            images.map((image, index) => (
              <div key={index} className="uploaded-image">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index + 1}`}
                  className="uploaded-image-img"
                />
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
    </div>
  );
};

export default Step2Form;
