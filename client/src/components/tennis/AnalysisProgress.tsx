import React from "react";
import { AnalysisStatus } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { CheckIcon, LoaderIcon } from "lucide-react";

interface AnalysisProgressProps {
  status: AnalysisStatus;
}

export default function AnalysisProgress({ status }: AnalysisProgressProps) {
  // Don't show for idle or complete states
  if (status === 'idle' || status === 'complete') {
    return null;
  }

  let progressPercentage = 0;
  let statusText = "";
  
  // Determine progress percentage and status text based on current status
  switch (status) {
    case 'uploading':
      progressPercentage = 25;
      statusText = "Uploading file...";
      break;
    case 'processing':
      progressPercentage = 50;
      statusText = "Processing file...";
      break;
    case 'analyzing':
      progressPercentage = 75;
      statusText = "Analyzing tennis technique...";
      break;
    case 'error':
      statusText = "Error processing file";
      break;
    default:
      break;
  }

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{statusText}</span>
        <span className="text-sm font-medium text-gray-700">{progressPercentage}%</span>
      </div>
      <Progress value={progressPercentage} className="h-2.5 mb-4" />
      <div className="flex flex-col">
        <div className="grid grid-cols-4 mb-2">
          <div className="text-center">
            <div className="w-6 h-6 rounded-full bg-[#4CAF50] flex items-center justify-center mx-auto">
              <CheckIcon className="h-3 w-3 text-white" />
            </div>
            <span className="text-xs text-gray-500 mt-1 block">Upload</span>
          </div>
          <div className="text-center">
            <div className={`w-6 h-6 rounded-full ${status === 'processing' || status === 'analyzing' || status === 'complete' ? 'bg-[#4CAF50]' : 'bg-gray-200'} flex items-center justify-center mx-auto`}>
              {status === 'processing' ? (
                <LoaderIcon className="h-3 w-3 text-white animate-spin" />
              ) : status === 'analyzing' || status === 'complete' ? (
                <CheckIcon className="h-3 w-3 text-white" />
              ) : (
                <span className="text-xs text-gray-500">2</span>
              )}
            </div>
            <span className="text-xs text-gray-500 mt-1 block">Processing</span>
          </div>
          <div className="text-center">
            <div className={`w-6 h-6 rounded-full ${status === 'analyzing' ? 'bg-blue-500' : status === 'complete' ? 'bg-[#4CAF50]' : 'bg-gray-200'} flex items-center justify-center mx-auto`}>
              {status === 'analyzing' ? (
                <LoaderIcon className="h-3 w-3 text-white animate-spin" />
              ) : status === 'complete' ? (
                <CheckIcon className="h-3 w-3 text-white" />
              ) : (
                <span className="text-xs text-gray-500">3</span>
              )}
            </div>
            <span className="text-xs text-gray-500 mt-1 block">Analyzing</span>
          </div>
          <div className="text-center">
            <div className={`w-6 h-6 rounded-full ${status === 'complete' ? 'bg-[#4CAF50]' : 'bg-gray-200'} flex items-center justify-center mx-auto`}>
              <span className="text-xs text-gray-500">4</span>
            </div>
            <span className="text-xs text-gray-500 mt-1 block">Results</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center">
          {status === 'analyzing' && "Detecting player pose and analyzing technique..."}
          {status === 'processing' && "Preparing image for AI analysis..."}
          {status === 'uploading' && "Uploading your tennis media..."}
          {status === 'error' && "An error occurred during analysis. Please try again."}
        </p>
      </div>
    </div>
  );
}
