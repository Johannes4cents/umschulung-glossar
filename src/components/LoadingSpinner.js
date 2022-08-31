import React from "react";

export default function LoadingSpinner({ size = 20 }) {
  return (
    <div
      className="divRow"
      style={{ width: "100%", height: "100%", justifyContent: "center" }}
    >
      <div
        className="loading-spinner"
        style={{ width: `${size}px`, height: `${size}px` }}
      ></div>
    </div>
  );
}
