import React from "react";
import imageLoading from "../../assets/cargando.gif";
import "./Loading.css";

export function Loading() {
  return (
    <div className="loader-container">
      <img className="loading-img" src={imageLoading} alt="loaging" />
    </div>
  );
}
