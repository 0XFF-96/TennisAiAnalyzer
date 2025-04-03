import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { generatePDF } from "@/lib/generate-pdf";
import { useToast } from "@/hooks/use-toast";
import type { Analysis } from "@shared/schema";

interface HistoryCardProps {
  analysis: Analysis;
}

export default function HistoryCard({ analysis }: HistoryCardProps) {
  const { toast } = useToast();
  
  // Get average score
  const avgScore = Math.round(
    (analysis.preparationScore + analysis.swingScore + analysis.followThroughScore) / 3
  );
  
  // Format date
  const formattedDate = formatDistanceToNow(new Date(analysis.actionDate), { addSuffix: true });
  
  // Determine background color based on score
  const getScoreBgColor = (score: number) => {
    if (score >= 85) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };
  
  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const pdfBlob = await generatePDF(analysis);
      const url = URL.createObjectURL(pdfBlob);
      
      // Create a link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `tennis-analysis-${analysis.id}.pdf`;
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
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="aspect-video bg-green-50">
        <img 
          src={`https://images.unsplash.com/photo-${Math.floor(Math.random() * 90000000) + 1000000000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`} 
          alt={`${analysis.detectedStage} analysis`} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1594623274890-b340cce0943b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
          }}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-medium text-gray-900">
            {analysis.detectedStage?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </h3>
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getScoreBgColor(avgScore)}`}>
            {avgScore}%
          </span>
        </div>
        <p className="text-xs text-gray-500">{formattedDate}</p>
        <div className="mt-3 flex justify-between items-center">
          <Button 
            asChild
            variant="link" 
            className="text-xs p-0 h-auto text-green-600 hover:text-green-700 font-medium"
          >
            <Link href={`/analysis/${analysis.id}`}>
              View Details
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 text-gray-500 hover:text-gray-700" />
            <span className="sr-only">Download report</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
