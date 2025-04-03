import React from "react";

interface Keypoint {
  x: number;
  y: number;
  part: string;
  score?: number;
}

interface PoseVisualizationProps {
  keypoints: Keypoint[];
}

// Define the connections between keypoints
const connections = [
  ["head", "neck"],
  ["neck", "leftShoulder"],
  ["neck", "rightShoulder"],
  ["leftShoulder", "leftElbow"],
  ["rightShoulder", "rightElbow"],
  ["leftElbow", "leftWrist"],
  ["rightElbow", "rightWrist"],
  ["neck", "hipCenter"],
  ["hipCenter", "leftHip"],
  ["hipCenter", "rightHip"],
  ["leftHip", "leftKnee"],
  ["rightHip", "rightKnee"],
  ["leftKnee", "leftAnkle"],
  ["rightKnee", "rightAnkle"]
];

export default function PoseVisualization({ keypoints }: PoseVisualizationProps) {
  if (!keypoints || keypoints.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">No pose data available</p>
      </div>
    );
  }

  // Create map of keypoints by part name for easy lookup
  const keypointMap = keypoints.reduce((map, point) => {
    map[point.part] = point;
    return map;
  }, {} as Record<string, Keypoint>);
  
  // Canvas dimensions
  const width = 800;
  const height = 450;

  return (
    <div className="relative w-full h-full">
      <img 
        src="https://images.unsplash.com/photo-1594623274890-b340cce0943b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
        alt="Tennis player analysis" 
        className="w-full h-full object-cover absolute inset-0"
      />
      
      <svg 
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Draw connections (lines) between keypoints */}
        {connections.map(([startPart, endPart], index) => {
          const start = keypointMap[startPart];
          const end = keypointMap[endPart];
          
          if (!start || !end) return null;
          
          return (
            <line
              key={`line-${index}`}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="#3B82F6"
              strokeWidth="3"
            />
          );
        })}
        
        {/* Draw keypoints */}
        {keypoints.map((point, index) => (
          <circle
            key={`point-${index}`}
            cx={point.x}
            cy={point.y}
            r="8"
            fill="#3B82F6"
          />
        ))}
        
        {/* Example of analysis elements */}
        {keypointMap.rightElbow && keypointMap.rightShoulder && (
          <>
            {/* Angle measurement for right elbow */}
            <path 
              d="M 500 200 A 20 20 0 0 1 520 180" 
              stroke="#FFEB3B" 
              strokeWidth="2" 
              fill="none" 
            />
            <text 
              x="505" 
              y="190" 
              fill="#FFEB3B" 
              fontSize="12" 
              fontWeight="bold"
            >
              135°
            </text>
          </>
        )}
        
        {keypointMap.rightWrist && (
          <>
            {/* Tennis racket highlight */}
            <circle 
              cx="600" 
              cy="130" 
              r="25" 
              stroke="#FFEB3B" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="5,5" 
            />
            <text 
              x="590" 
              y="110" 
              fill="#FFEB3B" 
              fontSize="12" 
              fontWeight="bold"
            >
              Racket Position
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
