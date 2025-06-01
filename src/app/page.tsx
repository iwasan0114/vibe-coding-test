"use client";

import { useState } from "react";

export default function Home() {
  const [isRaised, setIsRaised] = useState(false);

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
      <h1 className="text-2xl font-bold">踏切制御アプリ</h1>
      
      <div className="w-[300px] h-[200px] mb-8 relative">
        {/* 道路 */}
        <div className="w-full h-[40px] bg-gray-800 absolute top-[80px]"></div>
        
        {/* 踏切の支柱 */}
        <div className="w-[10px] h-[80px] bg-gray-500 absolute top-0 left-[90px]"></div>
        
        {/* 踏切の棒 */}
        <div 
          className={`
            w-[120px] h-[10px] bg-red-500 absolute top-[70px] left-[90px] 
            origin-[0_5px] z-10 transition-transform duration-[3000ms] ease-in-out
            before:content-[''] before:absolute before:w-[120px] before:h-[10px] 
            before:bg-[repeating-linear-gradient(90deg,#f00,#f00_10px,#fff_10px,#fff_20px)] 
            before:top-0 before:left-0
            ${isRaised ? 'transform rotate-[-90deg]' : 'transform rotate-0'}
          `}
        ></div>
      </div>
      
      <div className="flex gap-4">
        <button
          className="px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          onClick={handleRaiseGate}
        >
          A: 踏切を上げる
        </button>
        <button
          className="px-6 py-3 text-white bg-red-500 rounded-md hover:bg-red-600"
          onClick={handleLowerGate}
        >
          B: 踏切を下げる
        </button>
      </div>
    </div>
  );
}
