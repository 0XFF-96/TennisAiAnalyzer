import React from "react";
import { Progress } from "@/components/ui/progress";
import { getScoreColor } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import { PerformanceScoresProps } from "@/lib/types";

export default function PerformanceScores({ 
  preparationScore,
  swingPathScore,
  bodyPositionScore,
  followThroughScore,
  overallScore
}: PerformanceScoresProps) {
  // Calculate star rating (1-5)
  const starRating = Math.round(overallScore / 20);
  
  return (
    <div>
      <h3 className="font-bold text-xl text-gray-800 mb-4">Technique Quality Scores</h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="font-medium text-sm text-gray-700">Preparation</span>
            <span className="font-medium text-sm text-gray-700">{preparationScore}%</span>
          </div>
          <Progress 
            value={preparationScore} 
            className="h-2.5"
            indicatorClassName={getScoreColor(preparationScore)}
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="font-medium text-sm text-gray-700">Swing Path</span>
            <span className="font-medium text-sm text-gray-700">{swingPathScore}%</span>
          </div>
          <Progress 
            value={swingPathScore} 
            className="h-2.5"
            indicatorClassName={getScoreColor(swingPathScore)}
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="font-medium text-sm text-gray-700">Body Position</span>
            <span className="font-medium text-sm text-gray-700">{bodyPositionScore}%</span>
          </div>
          <Progress 
            value={bodyPositionScore} 
            className="h-2.5"
            indicatorClassName={getScoreColor(bodyPositionScore)}
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="font-medium text-sm text-gray-700">Follow Through</span>
            <span className="font-medium text-sm text-gray-700">{followThroughScore}%</span>
          </div>
          <Progress 
            value={followThroughScore} 
            className="h-2.5"
            indicatorClassName={getScoreColor(followThroughScore)}
          />
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-gray-800">{overallScore}</div>
          <div className="ml-2 text-sm text-gray-500">Overall<br/>Score</div>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <StarIcon 
              key={i} 
              className={`h-5 w-5 ${i < starRating ? 'text-[#FFEB3B] fill-[#FFEB3B]' : 'text-[#FFEB3B]'}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
