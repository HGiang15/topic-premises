import React, { useState } from "react";

import "./Post.css";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";
import Step3Form from "./Step3Form";

const Post = () => {
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

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <div className="post-container">
      <div className="progress-bar">
        <div
          className={`progress-step`}
          style={{ backgroundColor: step >= 1 ? "#4CAF50" : "rgba(217, 217, 217, 1)" }}
        ></div>
        <div
          className={`progress-step`}
          style={{ backgroundColor: step >= 2 ? "#4CAF50" : "rgba(217, 217, 217, 1)" }}
        ></div>
        <div
          className={`progress-step`}
          style={{ backgroundColor: step >= 3 ? "#4CAF50" : "rgba(217, 217, 217, 1)" }}
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
        />
      )}

      {step === 2 && (
        <Step2Form
          images={images}
          setImages={setImages}
          handleFileChange={handleFileChange}
          onNext={handleNextStep}
        />
      )}

      {step === 3 && (
        <Step3Form
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
          onNext={handleNextStep}
        />
      )}
    </div>
  );
};

export default Post;
