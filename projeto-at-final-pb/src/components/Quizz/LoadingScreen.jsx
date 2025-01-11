import React from "react";
import "/src/css/QuizzCSS/LoadingScreen.css";

const LoadingScreen = ({ imageSrc }) => {
  return (
    <div className="loading-container">
      <img src={imageSrc} alt="Loading" className="loading-image" />
    </div>
  );
};

export default LoadingScreen;
