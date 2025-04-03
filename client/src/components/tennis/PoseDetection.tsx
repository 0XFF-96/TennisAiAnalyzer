import React, { useEffect, useRef } from "react";
import { PoseKeypointsProps } from "@/lib/types";

interface PoseDetectionProps {
  imageUrl: string;
  keypoints: PoseKeypointsProps;
  actionStage: string;
}

export default function PoseDetection({ imageUrl, keypoints, actionStage }: PoseDetectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Draw pose keypoints and connections on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const image = new Image();
    image.src = imageUrl;
    
    image.onload = () => {
      // Set canvas dimensions to match image
      canvas.width = image.width;
      canvas.height = image.height;
      
      // Draw the image
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      
      // Draw connections first (so they appear behind the keypoints)
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(255, 235, 59, 0.6)';
      
      keypoints.connections.forEach(([from, to]) => {
        const fromPoint = keypoints.keypoints.find(kp => kp.part === from);
        const toPoint = keypoints.keypoints.find(kp => kp.part === to);
        
        if (fromPoint && toPoint) {
          const fromX = fromPoint.position.x * (canvas.width / 100);
          const fromY = fromPoint.position.y * (canvas.height / 100);
          const toX = toPoint.position.x * (canvas.width / 100);
          const toY = toPoint.position.y * (canvas.height / 100);
          
          ctx.beginPath();
          ctx.moveTo(fromX, fromY);
          ctx.lineTo(toX, toY);
          ctx.stroke();
        }
      });
      
      // Draw keypoints
      keypoints.keypoints.forEach(keypoint => {
        const x = keypoint.position.x * (canvas.width / 100);
        const y = keypoint.position.y * (canvas.height / 100);
        
        // Draw keypoint circle
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = '#FFEB3B';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
      });
    };
  }, [imageUrl, keypoints]);

  return (
    <div className="relative rounded-lg overflow-hidden bg-gray-800 h-80 mb-4">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full object-contain"
      />
      
      {/* Action Stage Label */}
      <div className="absolute top-4 left-4 bg-[#FFEB3B]/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
        {actionStage}
      </div>
      
      {/* Frame Controls (for demo - non-functional) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white rounded-full px-4 py-2 flex items-center space-x-4">
        <button className="hover:text-[#FFEB3B]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="11 17 6 12 11 7"></polyline>
            <polyline points="18 17 13 12 18 7"></polyline>
          </svg>
        </button>
        <button className="hover:text-[#FFEB3B]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </button>
        <button className="hover:text-[#FFEB3B]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </button>
        <div className="w-24 h-1 bg-white/30 rounded-full">
          <div className="h-full w-1/2 bg-[#FFEB3B] rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
