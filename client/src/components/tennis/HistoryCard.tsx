import React from "react";
import { Card } from "@/components/ui/card";
import { formatDate, formatFileSize } from "@/lib/utils";
import { useLocation } from "wouter";
import { TennisAnalysisWithPreview } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { MoreVerticalIcon, DownloadIcon, StarIcon, VideoIcon, ImageIcon } from "lucide-react";

interface HistoryCardProps {
  analysis: TennisAnalysisWithPreview;
  onDelete: (id: number) => void;
}

export default function HistoryCard({ analysis, onDelete }: HistoryCardProps) {
  const [, setLocation] = useLocation();
  
  // Generate placeholder image if no preview URL
  const imageUrl = analysis.previewUrl || "https://images.unsplash.com/photo-1594141376010-27de812c1a12?q=80&w=2070";
  
  const goToAnalysis = () => {
    setLocation(`/result/${analysis.id}`);
  };
  
  return (
    <Card className="overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img 
          src={imageUrl} 
          alt={`Tennis ${analysis.actionType} analysis`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-[#FFEB3B]/90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
            {analysis.actionType}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex space-x-1">
          <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <StarIcon className="h-3 w-3 mr-1 text-[#FFEB3B] fill-[#FFEB3B]" /> 
            {(analysis.overallScore / 20).toFixed(1)}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium text-gray-800">{analysis.actionType}</h3>
            <p className="text-gray-500 text-sm">{formatDate(analysis.createdAt)}</p>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <DownloadIcon className="h-4 w-4 text-gray-500 hover:text-gray-700" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => onDelete(analysis.id)}
            >
              <MoreVerticalIcon className="h-4 w-4 text-gray-500 hover:text-gray-700" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            {analysis.fileType.includes('video') ? (
              <VideoIcon className="h-4 w-4 text-gray-500 mr-1" />
            ) : (
              <ImageIcon className="h-4 w-4 text-gray-500 mr-1" />
            )}
            <span className="text-gray-500">{formatFileSize(analysis.fileSize)}</span>
          </div>
          <Button 
            variant="link" 
            className="text-blue-600 p-0 font-medium"
            onClick={goToAnalysis}
          >
            View Analysis
          </Button>
        </div>
      </div>
    </Card>
  );
}
