"use client";

import { useState, useEffect } from "react";
import GateButton from "./components/GateButton";
import TrainAnimation from "./components/TrainAnimation";
import { useRailwaySound } from "./hooks/useRailwaySound";

export default function Home() {
  const [isRaised, setIsRaised] = useState(true);
  
  // Use the custom hook to play the sound when the gate is lowered
  useRailwaySound(!isRaised);

  const handleRaiseGate = () => {
    if (!isRaised) {
      setIsRaised(true);
    }
  };

  const handleLowerGate = () => {
    if (isRaised) {
      setIsRaised(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      
      <div className="w-[300px] h-[150px] mb-4 relative overflow-hidden">
        {/* Sound indicator */}
        {!isRaised && (
          <div className="absolute top-[30px] right-[30px] flex items-center">
            <span className="text-sm mr-2">カンカンカン</span>
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        )}
        {/* 道路 */}
        <div className="w-full h-[40px] bg-gray-800 absolute top-[80px]"></div>
        
        {/* 踏切の支柱 */}
        <div className="w-[10px] h-[80px] bg-gray-500 absolute border top-0 left-[90px]"></div>
        
        {/* 踏切の棒 */}
        <div 
          className={`
            border border-gray-500
            w-[140px] h-[10px] bg-red-500 absolute top-[70px] left-[95px] 
            origin-[0_5px] z-10 transition-transform duration-[3000ms] ease-in-out
            before:content-[''] before:absolute before:w-[140px] before:h-[10px] 
            before:bg-[repeating-linear-gradient(90deg,#f00,#f00_10px,#fff_10px,#fff_20px)] 
            before:top-0 before:left-0
            ${isRaised ? 'transform rotate-[-90deg]' : 'transform rotate-0'}
          `}
        ></div>
        
        {/* Train animation */}
        <TrainAnimation isGateLowered={!isRaised} />
      </div>
      
      <div className="flex gap-4">
        <GateButton
          text="A: 踏切を上げる"
          onClick={handleRaiseGate}
          bgColor="bg-blue-500"
          hoverColor="hover:bg-blue-600"
        />
        <GateButton
          text="B: 踏切を下げる"
          onClick={handleLowerGate}
          bgColor="bg-red-500"
          hoverColor="hover:bg-red-600"
        />
      </div>
    </div>
  );
}
