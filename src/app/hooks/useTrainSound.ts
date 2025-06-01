"use client";

import { useEffect, useRef } from "react";

export const useTrainSound = (isPlaying: boolean) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to create a single "ガタン" or "ゴトン" sound
  const playTrainSound = (isGatan: boolean) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || 
        (window as any).webkitAudioContext)();
    }

    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    // Set up oscillator
    oscillator.type = "triangle"; // More mellow sound for train
    
    // Different frequencies for "ガタン" and "ゴトン"
    if (isGatan) {
      oscillator.frequency.setValueAtTime(120, context.currentTime); // Lower pitch for "ガタン"
    } else {
      oscillator.frequency.setValueAtTime(100, context.currentTime); // Even lower for "ゴトン"
    }
    
    oscillator.connect(gainNode);
    
    // Set up gain node for volume control
    gainNode.connect(context.destination);
    gainNode.gain.setValueAtTime(0.2, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.2);

    // Play the sound
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.2);
  };

  useEffect(() => {
    // Clean up any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Start playing the sound at regular intervals if isPlaying is true
    if (isPlaying) {
      let isGatan = true; // Alternates between "ガタン" and "ゴトン"
      
      // Play immediately
      playTrainSound(isGatan);
      
      // Then play at regular intervals, alternating between "ガタン" and "ゴトン"
      intervalRef.current = setInterval(() => {
        isGatan = !isGatan;
        playTrainSound(isGatan);
      }, 400); // Play every 400ms for a "ガタンゴトン" rhythm
    }

    // Clean up function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);
};
