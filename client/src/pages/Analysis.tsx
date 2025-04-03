import React, { useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FileUpload from "@/components/tennis/FileUpload";
import AnalysisProgress from "@/components/tennis/AnalysisProgress";
import { Card, CardContent } from "@/components/ui/card";
import { AnalysisStatus } from "@/lib/types";

export default function Analysis() {
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [, navigate] = useLocation();
  
  const handleUploadComplete = (analysisId: number) => {
    // Redirect to results page
    navigate(`/result/${analysisId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="rounded-xl overflow-hidden shadow-md mb-12">
          <div className="bg-gradient-to-r from-[#4CAF50] to-[#388E3C] text-white p-6">
            <h2 className="font-bold text-2xl">Upload Tennis Media for Analysis</h2>
            <p className="text-white/80">Supported formats: JPG, PNG, MP4 (max 100MB)</p>
          </div>
          
          <CardContent className="p-6">
            {/* File Upload Component */}
            <FileUpload 
              onUploadComplete={handleUploadComplete}
              setStatus={setStatus}
              status={status}
            />
            
            {/* Analysis Progress Component */}
            <AnalysisProgress status={status} />
          </CardContent>
        </Card>
        
        {/* Instructions Section */}
        <Card className="rounded-xl overflow-hidden shadow-md mb-12">
          <div className="p-6">
            <h3 className="font-bold text-xl text-gray-800 mb-4">How to Get the Best Analysis</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="rounded-full bg-[#4CAF50]/10 w-12 h-12 flex items-center justify-center mb-3">
                  <span className="text-[#4CAF50] font-bold">1</span>
                </div>
                <h4 className="font-medium text-gray-800 mb-2">Choose Clear Media</h4>
                <p className="text-gray-600 text-sm">
                  Upload well-lit photos or videos with a clear view of your entire body. Avoid blurry or dark footage.
                </p>
              </div>
              
              <div>
                <div className="rounded-full bg-[#4CAF50]/10 w-12 h-12 flex items-center justify-center mb-3">
                  <span className="text-[#4CAF50] font-bold">2</span>
                </div>
                <h4 className="font-medium text-gray-800 mb-2">Capture Full Motion</h4>
                <p className="text-gray-600 text-sm">
                  For videos, capture your complete tennis stroke from preparation to follow-through. For photos, choose a key moment.
                </p>
              </div>
              
              <div>
                <div className="rounded-full bg-[#4CAF50]/10 w-12 h-12 flex items-center justify-center mb-3">
                  <span className="text-[#4CAF50] font-bold">3</span>
                </div>
                <h4 className="font-medium text-gray-800 mb-2">Side-View Angle</h4>
                <p className="text-gray-600 text-sm">
                  The best angle for analysis is from the side or at a 45° angle to clearly see your body positioning and swing path.
                </p>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Tips Section */}
        <Card className="rounded-xl overflow-hidden shadow-md">
          <div className="p-6">
            <h3 className="font-bold text-xl text-gray-800 mb-4">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-1">What file formats are supported?</h4>
                <p className="text-gray-600 text-sm">We support JPG and PNG images, as well as MP4 videos up to 100MB in size.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-1">How accurate is the analysis?</h4>
                <p className="text-gray-600 text-sm">Our AI has been trained on thousands of tennis strokes from players of all levels, including professionals. The analysis is highly accurate but depends on the quality of your uploaded media.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-1">Can I analyze multiple strokes?</h4>
                <p className="text-gray-600 text-sm">Yes, you can upload and analyze as many different tennis strokes as you like! Each analysis is saved in your history for easy reference.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-1">How are the scores calculated?</h4>
                <p className="text-gray-600 text-sm">Scores are calculated by comparing your technique to optimal form based on biomechanical principles and professional player references.</p>
              </div>
            </div>
          </div>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}
