import React, { useState, useEffect } from "react";
import "./Post.css";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";
import Step3Form from "./Step3Form";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config";
const Post = () => {
  const navigate = useNavigate();
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);
  const [selectedDays, setSelectedDays] = useState(null);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const [formData, setFormData] = useState({
    title: "",
    address: "",
    link: "",
    price: 0,
    roomSize: 0,
    description: "",
    amountExpiredDays: 0,
    feeToPost: 0,
    userId: 1,
    category: "",
    mediaUrls: images,
    phone: "",
    email: "",
  });

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  const handleNextStep = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      mediaUrls: images,
    }));
    setStep((prevStep) => prevStep + 1);
    console.log("media:", images); // Logs the images correctly
  };

  const handleCreatePost = async () => {
    try {
      // Token cứng đã cho
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      // Dữ liệu body cứng
      const bodyData = {
        title: formData.title,
        address: formData.address,
        price: formData.price,
        roomSize: formData.roomSize,
        description: formData.description,
        amountExpiredDays: formData.amountExpiredDays,
        feeToPost: formData.feeToPost,
        userId: userId,
        category: formData.category,
        contactPhone: formData.phone,
        contactEmail: formData.email,
        link: formData.link,
        mediaUrls: formData.mediaUrls,
      };

      const response = await fetch(`${BASE_URL}api/v1/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(bodyData), 
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Post created successfully:", data);
      } else {
        console.error("Error creating post:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <div className="post-container">
      <div className="progress-bar">
        <div
          className={`progress-step`}
          style={{
            backgroundColor: step >= 1 ? "#4CAF50" : "rgba(217, 217, 217, 1)",
          }}
        ></div>
        <div
          className={`progress-step`}
          style={{
            backgroundColor: step >= 2 ? "#4CAF50" : "rgba(217, 217, 217, 1)",
          }}
        ></div>
        <div
          className={`progress-step`}
          style={{
            backgroundColor: step >= 3 ? "#4CAF50" : "rgba(217, 217, 217, 1)",
          }}
        ></div>
      </div>

      {step === 1 && (
        <Step1Form
          selectedProvince={selectedProvince}
          setSelectedProvince={setSelectedProvince}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          selectedWard={selectedWard}
          setSelectedWard={setSelectedWard}
          onNext={handleNextStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {step === 2 && (
        <Step2Form
          images={images}
          setImages={setImages}
          handleFileChange={handleFileChange}
          onNext={handleNextStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {step === 3 && (
        <Step3Form
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
          onNext={handleNextStep}
          formData={formData}
          setFormData={setFormData}
          handleCreatePost={handleCreatePost} // Pass handleCreatePost as a prop to Step3Form
        />
      )}
    </div>
  );
};

export default Post;
