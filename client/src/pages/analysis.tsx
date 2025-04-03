import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Download } from "lucide-react";
import PoseVisualization from "@/components/analysis/pose-visualization";
import ActionStage from "@/components/analysis/action-stage";
import PerformanceScore from "@/components/analysis/performance-score";
import Suggestions from "@/components/analysis/suggestions";
import { generatePDF } from "@/lib/generate-pdf";

export default function Analysis() {
  const [, params] = useRoute<{ id: string }>("/analysis/:id");
  const id = params?.id ? parseInt(params.id) : 0;
  const { toast } = useToast();
  
  // Set document title
  useEffect(() => {
    document.title = "TennisAI - Analysis Results";
  }, []);

  // Fetch analysis data
  const { data, isLoading, isError } = useQuery({
    queryKey: [`/api/analyses/${id}`],
    enabled: !!id,
  });

  const handleDownloadPDF = async () => {
    if (!data) return;
    
    try {
      const pdfBlob = await generatePDF(data);
      const url = URL.createObjectURL(pdfBlob);
      
      // Create a link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `tennis-analysis-${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download started",
        description: "Your PDF report is being downloaded",
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        variant: "destructive",
        title: "Download failed",
        description: "Could not generate the PDF report",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-72 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-96 w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-40" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {Array(3).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-28 w-full" />
                ))}
              </div>
              <Skeleton className="h-40 w-full mb-6" />
              <Skeleton className="h-32 w-full mb-6" />
              <div className="flex justify-end">
                <Skeleton className="h-10 w-36" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load analysis data. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Your Swing Analysis</h2>
        <p className="mt-4 text-xl text-gray-500">AI-powered insights to help you improve</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Analysis visualization card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium text-gray-900">
              {data.fileType.charAt(0).toUpperCase() + data.fileType.slice(1)} Analysis
            </CardTitle>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {data.detectedStage?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 relative overflow-hidden rounded-lg aspect-video bg-gray-100">
              <PoseVisualization keypoints={data.keypoints} />
            </div>
            
            <ActionStage stage={data.detectedStage} />
          </CardContent>
        </Card>
        
        {/* Score and suggestions card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-900">Performance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceScore 
              preparationScore={data.preparationScore} 
              swingScore={data.swingScore} 
              followThroughScore={data.followThroughScore}
              observations={data.observations}
            />
            
            <Suggestions suggestions={data.suggestions} />
            
            <div className="mt-6 flex justify-end">
              <Button onClick={handleDownloadPDF} className="bg-green-600 hover:bg-green-700">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
