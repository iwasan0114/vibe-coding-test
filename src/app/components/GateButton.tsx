"use client";

import React from "react";

interface GateButtonProps {
  text: string;
  onClick: () => void;
  bgColor: string;
  hoverColor: string;
}

const GateButton: React.FC<GateButtonProps> = ({
  text,
  onClick,
  bgColor,
  hoverColor,
}) => {
  return (
    <button
      className={`px-6 py-3 text-white ${bgColor} rounded-md ${hoverColor}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default GateButton;
