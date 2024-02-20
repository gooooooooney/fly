"use client"

import React from "react";

export const GooneyFlyLogo: React.FC = () => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <circle cx="50" cy="50" r="50" fill="#1e90ff" />

      {/* Abstract shapes */}
      <path
        d="M20 50 Q50 10 80 50"
        stroke="#ffffff"
        strokeWidth="2"
        fill="transparent"
      />
      <circle cx="30" cy="70" r="10" fill="#ffffff" />
      <circle cx="70" cy="70" r="10" fill="#ffffff" />
    </svg>
  );
};




