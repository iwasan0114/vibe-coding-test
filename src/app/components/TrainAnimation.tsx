"use client";

import { useState, useEffect } from "react";

interface TrainAnimationProps {
  isGateLowered: boolean;
}

const TrainAnimation: React.FC<TrainAnimationProps> = ({ isGateLowered }) => {
  const [showTrain, setShowTrain] = useState(false);
  const [trainPosition, setTrainPosition] = useState(-150); // Start off-screen to the left

  useEffect(() => {
    let trainTimer: NodeJS.Timeout | null = null;
    let animationTimer: NodeJS.Timeout | null = null;
    
    // Reset state when gate is raised
    if (!isGateLowered) {
      setShowTrain(false);
      setTrainPosition(-150);
      
      if (trainTimer) clearTimeout(trainTimer);
      if (animationTimer) clearTimeout(animationTimer);
      
      return;
    }
    
    // Set timer to show train 10 seconds after gate is lowered
    trainTimer = setTimeout(() => {
      setShowTrain(true);
      
      // Animate train movement
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const newPosition = -150 + (elapsed / 4); // Increased speed (smaller divisor = faster)
        
        if (newPosition < 450) { // End position (off-screen to the right)
          setTrainPosition(newPosition);
          animationTimer = setTimeout(animate, 16); // ~60fps
        } else {
          setShowTrain(false);
          setTrainPosition(-150); // Reset position
        }
      };
      
      animate();
    }, 5000); // 10 seconds delay
    
    // Cleanup function
    return () => {
      if (trainTimer) clearTimeout(trainTimer);
      if (animationTimer) clearTimeout(animationTimer);
    };
  }, [isGateLowered]);
  
  if (!showTrain) return null;
  
  return (
    <div 
      className="absolute top-[20px] z-20"
      style={{ left: `${trainPosition}px` }}
    >
      <svg width="180" height="90" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Train Engine */}
        <rect x="80" y="10" width="40" height="20" rx="5" fill="#4B5563" />
        <rect x="90" y="5" width="20" height="5" rx="2" fill="#4B5563" />
        <rect x="110" y="7" width="5" height="10" rx="1" fill="#374151" /> {/* Chimney */}
        <circle cx="90" cy="30" r="5" fill="#1F2937" /> {/* Wheel */}
        <circle cx="110" cy="30" r="5" fill="#1F2937" /> {/* Wheel */}
        
        {/* Train Car */}
        <rect x="40" y="15" width="35" height="15" rx="3" fill="#3B82F6" />
        <rect x="45" y="20" width="8" height="5" fill="#93C5FD" /> {/* Window */}
        <rect x="60" y="20" width="8" height="5" fill="#93C5FD" /> {/* Window */}
        <circle cx="50" cy="30" r="4" fill="#1F2937" /> {/* Wheel */}
        <circle cx="65" cy="30" r="4" fill="#1F2937" /> {/* Wheel */}
        
        {/* Train Car 2 */}
        <rect x="0" y="15" width="35" height="15" rx="3" fill="#EF4444" />
        <rect x="5" y="20" width="8" height="5" fill="#FCA5A5" /> {/* Window */}
        <rect x="20" y="20" width="8" height="5" fill="#FCA5A5" /> {/* Window */}
        <circle cx="10" cy="30" r="4" fill="#1F2937" /> {/* Wheel */}
        <circle cx="25" cy="30" r="4" fill="#1F2937" /> {/* Wheel */}
        
        {/* Connectors */}
        <rect x="35" y="22" width="5" height="2" fill="#6B7280" />
        <rect x="75" y="22" width="5" height="2" fill="#6B7280" />
      </svg>
    </div>
  );
};

export default TrainAnimation;
