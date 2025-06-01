"use client";

import { useEffect, useRef } from "react";

export const useRailwaySound = (isPlaying: boolean) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to create a single "カン" sound
  const playKanSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || 
        (window as  Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
    }
    // Type-safe way to handle webkit audio context
    const AudioContextConstructor = window.AudioContext || 
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    
    if (!AudioContextConstructor) {
      console.warn('AudioContext not supported');
      return;
    }
    
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextConstructor();
    }
    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    // Set up oscillator
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(800, context.currentTime);
    oscillator.connect(gainNode);
    
    // Set up gain node for volume control
    gainNode.connect(context.destination);
    gainNode.gain.setValueAtTime(0.3, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);

    // Play the sound
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.1);
  };

  useEffect(() => {
    // Clean up any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Start playing the sound at regular intervals if isPlaying is true
    if (isPlaying) {
      // Play immediately
      playKanSound();
      
      // Then play at regular intervals
      intervalRef.current = setInterval(() => {
        playKanSound();
      }, 800); // Play every 800ms for a "カンカンカン" rhythm
    }

    // Clean up function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);
};
