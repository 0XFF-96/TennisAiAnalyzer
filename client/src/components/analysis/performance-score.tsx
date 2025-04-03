import React from "react";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface Observation {
  text: string;
  type: "positive" | "warning" | "negative";
}

interface PerformanceScoreProps {
  preparationScore: number;
  swingScore: number;
  followThroughScore: number;
  observations?: Observation[];
}

export default function PerformanceScore({
  preparationScore,
  swingScore,
  followThroughScore,
  observations = []
}: PerformanceScoreProps) {
  
  // Helper function to get the appropriate icon by observation type
  const getObservationIcon = (type: string) => {
    switch (type) {
      case "positive":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "negative":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };
  
  // Helper function to get the card color based on score
  const getScoreColor = (score: number) => {
    if (score >= 85) return "bg-green-100 text-green-600";
    if (score >= 70) return "bg-yellow-100 text-yellow-600";
    return "bg-red-100 text-red-600";
  };
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className={`inline-flex items-center justify-center h-12 w-12 rounded-full ${getScoreColor(preparationScore)} mb-2`}>
            <CheckCircle className="h-6 w-6" />
          </div>
          <h4 className="text-sm font-medium text-gray-500">Preparation</h4>
          <div className="mt-1 text-2xl font-semibold text-gray-900">{preparationScore}%</div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className={`inline-flex items-center justify-center h-12 w-12 rounded-full ${getScoreColor(swingScore)} mb-2`}>
            {swingScore >= 85 ? (
              <CheckCircle className="h-6 w-6" />
            ) : swingScore >= 70 ? (
              <AlertTriangle className="h-6 w-6" />
            ) : (
              <XCircle className="h-6 w-6" />
            )}
          </div>
          <h4 className="text-sm font-medium text-gray-500">Swing</h4>
          <div className="mt-1 text-2xl font-semibold text-gray-900">{swingScore}%</div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className={`inline-flex items-center justify-center h-12 w-12 rounded-full ${getScoreColor(followThroughScore)} mb-2`}>
            {followThroughScore >= 85 ? (
              <CheckCircle className="h-6 w-6" />
            ) : followThroughScore >= 70 ? (
              <AlertTriangle className="h-6 w-6" />
            ) : (
              <XCircle className="h-6 w-6" />
            )}
          </div>
          <h4 className="text-sm font-medium text-gray-500">Follow-Through</h4>
          <div className="mt-1 text-2xl font-semibold text-gray-900">{followThroughScore}%</div>
        </div>
      </div>
      
      {observations && observations.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Key Observations</h4>
          <ul className="space-y-2 text-sm">
            {observations.map((obs, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5">
                  {getObservationIcon(obs.type)}
                </div>
                <p className="ml-2 text-gray-600">{obs.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
