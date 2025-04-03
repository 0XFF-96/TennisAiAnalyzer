import React from "react";
import { type ActionStage } from "@shared/schema";

interface ActionStageProps {
  stage?: ActionStage;
}

export default function ActionStage({ stage }: ActionStageProps) {
  const stages = ["preparation", "backswing", "forward_swing", "impact", "follow_through"];
  const currentIndex = stage ? stages.indexOf(stage) : -1;
  
  // Format the stage name for display
  const formatStageName = (name: string) => {
    return name.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };
  
  // Calculate progress for each stage
  const getProgress = (index: number) => {
    if (currentIndex === -1) return 0;
    if (index < currentIndex) return 100; // Completed stages
    if (index === currentIndex) return 75; // Current stage (in progress)
    return 0; // Future stages
  };
  
  return (
    <div className="mb-4">
      <h4 className="text-sm font-medium text-gray-500 mb-2">Detected Action Stage</h4>
      <div className="relative pt-1">
        <div className="flex space-x-2 mb-2">
          {stages.map((stageName, index) => (
            <div key={stageName} className="flex-1 text-center">
              <div className="h-2 bg-gray-100 rounded-full">
                <div 
                  className="h-2 bg-green-500 rounded-full" 
                  style={{ width: `${getProgress(index)}%` }}
                />
              </div>
              <span className={`text-xs mt-1 inline-block ${currentIndex === index ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                {formatStageName(stageName)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
