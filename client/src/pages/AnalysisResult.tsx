import React, { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PoseDetection from "@/components/tennis/PoseDetection";
import PerformanceScores from "@/components/tennis/PerformanceScores";
import AnalysisReport from "@/components/tennis/AnalysisReport";
import StrokeAnalysis from "@/components/tennis/StrokeAnalysis";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ShareIcon, DownloadIcon } from "lucide-react";
import { sampleStrokeAnalysis } from "@/lib/mock-data";

export default function AnalysisResult() {
  const [, params] = useRoute<{ id: string }>("/result/:id");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const analysisId = params?.id ? parseInt(params.id) : null;
  
  // Placeholder image URL (in a real app, this would come from the server)
  const [imageUrl, setImageUrl] = useState<string>("https://images.unsplash.com/photo-1613903614039-62b4b49a13b1?q=80&w=2070");
  
  // Fetch analysis data
  const { data: analysis, isLoading, error } = useQuery({
    queryKey: [`/api/analyses/${analysisId}`],
    enabled: !!analysisId,
  });
  
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load analysis data. Please try again.",
        variant: "destructive"
      });
      navigate("/analysis");
    }
  }, [error, toast, navigate]);
  
  // Handle image errors
  const handleImageError = () => {
    setImageUrl("https://images.unsplash.com/photo-1613903614039-62b4b49a13b1?q=80&w=2070");
  };
  
  if (isLoading || !analysis) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="rounded-xl overflow-hidden shadow-md mb-12">
            <div className="bg-gradient-to-r from-[#4CAF50] to-[#388E3C] text-white p-6">
              <Skeleton className="h-8 w-64 bg-white/20" />
              <Skeleton className="h-4 w-48 mt-2 bg-white/20" />
            </div>
            
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 p-6">
                <Skeleton className="h-80 w-full mb-4" />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-8 w-36" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
              <div className="w-full md:w-1/2 p-6 bg-gray-50">
                <Skeleton className="h-8 w-full mb-6" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-6" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-6" />
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="rounded-xl overflow-hidden shadow-md mb-12">
          <div className="bg-gradient-to-r from-[#4CAF50] to-[#388E3C] text-white p-6">
            <h2 className="font-bold text-2xl">Analysis Results</h2>
            <p className="text-white/80">Tennis {analysis.actionType} analysis completed on {new Date(analysis.createdAt).toLocaleDateString()}</p>
          </div>
          
          <div className="flex flex-col md:flex-row">
            {/* Left Column - Image with Analysis */}
            <div className="w-full md:w-1/2 p-6">
              {/* AI Analysis Overlay */}
              <PoseDetection 
                imageUrl={imageUrl} 
                keypoints={analysis.poseKeypoints} 
                actionStage={analysis.actionStage}
              />
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Card className="bg-gray-50 p-4 shadow-sm">
                  <h3 className="font-medium text-sm text-gray-500 mb-2">Detected Action</h3>
                  <p className="font-bold text-gray-800">{analysis.actionType}</p>
                </Card>
                <Card className="bg-gray-50 p-4 shadow-sm">
                  <h3 className="font-medium text-sm text-gray-500 mb-2">Action Stage</h3>
                  <p className="font-bold text-gray-800">{analysis.actionStage}</p>
                </Card>
              </div>
              
              <div className="flex justify-between mb-2 items-center">
                <a href="#" className="text-blue-600 text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  About this analysis
                </a>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ShareIcon className="h-5 w-5 text-gray-700" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <DownloadIcon className="h-5 w-5 text-gray-700" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Right Column - Scores and Feedback */}
            <div className="w-full md:w-1/2 p-6 bg-gray-50">
              <Tabs defaultValue="performance">
                <TabsList className="mb-6 border-b w-full justify-start rounded-none bg-transparent">
                  <TabsTrigger 
                    value="performance" 
                    className="data-[state=active]:text-[#4CAF50] data-[state=active]:border-b-2 data-[state=active]:border-[#4CAF50] rounded-none bg-transparent"
                  >
                    Performance
                  </TabsTrigger>
                  <TabsTrigger 
                    value="comparisons" 
                    className="data-[state=active]:text-[#4CAF50] data-[state=active]:border-b-2 data-[state=active]:border-[#4CAF50] rounded-none bg-transparent"
                  >
                    Comparisons
                  </TabsTrigger>
                  <TabsTrigger 
                    value="history" 
                    className="data-[state=active]:text-[#4CAF50] data-[state=active]:border-b-2 data-[state=active]:border-[#4CAF50] rounded-none bg-transparent"
                  >
                    History
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="performance" className="mt-0">
                  {/* Detailed Stroke Analysis (New Component) */}
                  <div className="mb-6">
                    <StrokeAnalysis analysis={sampleStrokeAnalysis} />
                  </div>
                  
                  {/* Legacy Performance Scores - Can be hidden or kept for reference */}
                  <div className="mb-6 mt-8 pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Overall Performance</h3>
                    <PerformanceScores 
                      preparationScore={analysis.preparationScore}
                      swingPathScore={analysis.swingPathScore}
                      bodyPositionScore={analysis.bodyPositionScore}
                      followThroughScore={analysis.followThroughScore}
                      overallScore={analysis.overallScore}
                    />
                  </div>
                  
                  {/* Professional Feedback */}
                  <AnalysisReport analysis={analysis} imageUrl={imageUrl} />
                </TabsContent>
                
                <TabsContent value="comparisons" className="mt-0">
                  <div className="flex items-center justify-center h-60 border rounded-lg text-gray-500">
                    Coming soon: Compare with pro players
                  </div>
                </TabsContent>
                
                <TabsContent value="history" className="mt-0">
                  <div className="flex items-center justify-center h-60 border rounded-lg text-gray-500">
                    Coming soon: View progress over time
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}
