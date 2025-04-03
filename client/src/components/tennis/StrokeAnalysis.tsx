import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { CheckIcon, XIcon, AlertTriangleIcon, LightbulbIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  ActionStage,
  StageScore,
  StrokeObservation,
  DetailedAnalysis,
  PhaseAnalysis
} from "@/lib/types";

interface StrokeAnalysisProps {
  analysis: DetailedAnalysis;
}

export default function StrokeAnalysis({ analysis }: StrokeAnalysisProps) {
  const [activeStage, setActiveStage] = useState<ActionStage>(analysis.activeStage);
  
  // Get the current active phase analysis
  const currentPhase = analysis.phaseAnalyses[activeStage];
  
  // Get the stage index for styling
  const getStageIndex = (stageName: ActionStage): number => {
    return analysis.stageScores.findIndex(score => score.name === stageName);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Stroke Analysis</h2>
      
      {/* Stage cards grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {analysis.stageScores.map((stage, index) => (
          <Card 
            key={index}
            className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${stage.name === activeStage ? 'border-green-500 border-b-4' : 'border-gray-200'}`}
            onClick={() => setActiveStage(stage.name)}
          >
            <div className="text-green-500 text-sm font-medium mb-1">Stage {index + 1}</div>
            <div className="font-bold text-gray-800">{stage.label}</div>
            <div className="text-gray-500 text-sm mt-1">{stage.score.toFixed(1)} / {stage.maxScore}</div>
          </Card>
        ))}
      </div>
      
      {/* Selected stage detailed analysis */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-700">{currentPhase.stageLabel} Phase Analysis</h3>
          <div className="flex items-center">
            <span className="text-3xl font-bold text-gray-800 mr-3">{currentPhase.score.toFixed(1)}</span>
            <div className="w-16 h-16 relative">
              <Progress 
                value={currentPhase.score * 10} 
                className="h-16 w-16 rounded-full [&>div]:bg-green-500" 
              />
            </div>
          </div>
        </div>
        
        {/* Observations */}
        <div className="space-y-4">
          {currentPhase.observations.map((observation, index) => (
            <div 
              key={index}
              className="flex items-start space-x-3 p-3 rounded-md"
              style={{ 
                backgroundColor: observation.type === 'positive' 
                  ? 'rgba(132, 204, 22, 0.1)' 
                  : observation.type === 'warning' 
                    ? 'rgba(250, 204, 21, 0.1)' 
                    : 'rgba(239, 68, 68, 0.1)' 
              }}
            >
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                observation.type === 'positive' 
                  ? 'bg-green-100 text-green-500' 
                  : observation.type === 'warning' 
                    ? 'bg-yellow-100 text-yellow-500' 
                    : 'bg-red-100 text-red-500'
              }`}>
                {observation.type === 'positive' ? (
                  <CheckIcon className="w-4 h-4" />
                ) : observation.type === 'warning' ? (
                  <AlertTriangleIcon className="w-4 h-4" />
                ) : (
                  <XIcon className="w-4 h-4" />
                )}
              </div>
              <div>
                <div className={`font-medium ${
                  observation.type === 'positive' 
                    ? 'text-green-800' 
                    : observation.type === 'warning' 
                      ? 'text-yellow-800' 
                      : 'text-red-800'
                }`}>
                  {observation.text.split(':')[0]}
                </div>
                <div className="text-gray-600 text-sm mt-1">
                  {observation.text.split(':')[1] || ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Improvement suggestion */}
      {currentPhase.improvementSuggestion && (
        <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
          <div className="flex items-center mb-2">
            <LightbulbIcon className="h-5 w-5 text-blue-500 mr-2" />
            <span className="font-medium text-blue-800">Improvement Suggestion</span>
          </div>
          <p className="text-blue-700">{currentPhase.improvementSuggestion}</p>
        </div>
      )}
    </div>
  );
}