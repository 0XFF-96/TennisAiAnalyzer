import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [, navigate] = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="rounded-xl overflow-hidden shadow-md bg-white mb-12">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-4">
                  Elevate Your Tennis Game With AI Analysis
                </h1>
                <p className="text-gray-500 text-lg mb-8">
                  Upload your tennis photos or videos and get instant professional analysis and personalized improvement tips.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-6 py-6 rounded-lg font-medium transition-colors"
                    onClick={() => navigate("/analysis")}
                  >
                    Start Analysis
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white px-6 py-6 rounded-lg font-medium transition-colors"
                    onClick={() => navigate("/about")}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-1/2 relative">
                <img 
                  src="https://images.unsplash.com/photo-1594141376010-27de812c1a12?q=80&w=2070" 
                  alt="Tennis player with AI analysis overlay" 
                  className="w-full h-full object-cover" 
                  style={{ maxHeight: "500px" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* AI Keypoints Overlay (Visual Element) */}
                  <div className="relative w-40 h-64">
                    {/* Keypoints */}
                    <div className="keypoint absolute" style={{ top: "20%", left: "50%" }}></div>
                    <div className="keypoint absolute" style={{ top: "35%", left: "50%" }}></div>
                    <div className="keypoint absolute" style={{ top: "50%", left: "50%" }}></div>
                    <div className="keypoint absolute" style={{ top: "35%", left: "30%" }}></div>
                    <div className="keypoint absolute" style={{ top: "35%", left: "70%" }}></div>
                    <div className="keypoint absolute" style={{ top: "65%", left: "40%" }}></div>
                    <div className="keypoint absolute" style={{ top: "65%", left: "60%" }}></div>
                    <div className="keypoint absolute" style={{ top: "80%", left: "40%" }}></div>
                    <div className="keypoint absolute" style={{ top: "80%", left: "60%" }}></div>
                    
                    {/* Connecting Lines */}
                    <div className="keypoint-line absolute" style={{ top: "20%", left: "50%", width: "30px", transform: "rotate(90deg)" }}></div>
                    <div className="keypoint-line absolute" style={{ top: "35%", left: "30%", width: "40px", transform: "rotate(0deg)" }}></div>
                    <div className="keypoint-line absolute" style={{ top: "35%", left: "50%", width: "30px", transform: "rotate(90deg)" }}></div>
                    <div className="keypoint-line absolute" style={{ top: "50%", left: "50%", width: "30px", transform: "rotate(125deg)" }}></div>
                    <div className="keypoint-line absolute" style={{ top: "50%", left: "50%", width: "30px", transform: "rotate(55deg)" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Features Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">How TennisAI Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#4CAF50]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-800">Upload</h3>
                <p className="text-gray-600">Upload your tennis photos or videos. Our system supports various formats to analyze your technique.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#4CAF50]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-800">Analyze</h3>
                <p className="text-gray-600">Our AI analyzes your form, detects keypoints, and evaluates your technique in real-time.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#4CAF50]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-800">Improve</h3>
                <p className="text-gray-600">Get detailed feedback, scoring, and personalized tips to improve your tennis technique.</p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-[#4CAF50] rounded-xl p-8 text-white text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to analyze your tennis game?</h2>
            <p className="text-xl mb-6 max-w-3xl mx-auto">Get detailed analysis of your tennis form and technique with our AI-powered platform.</p>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white text-[#4CAF50] hover:bg-gray-100 border-none text-lg font-medium px-8"
              onClick={() => navigate("/analysis")}
            >
              Start Your Free Analysis
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <style jsx global>{`
        .keypoint {
          width: 12px;
          height: 12px;
          background-color: #FFEB3B;
          border: 2px solid #FFF;
          border-radius: 50%;
          box-shadow: 0 0 0 2px rgba(0,0,0,0.1);
        }
        .keypoint-line {
          background-color: rgba(255, 235, 59, 0.6);
          height: 3px;
          position: absolute;
          transform-origin: left center;
        }
      `}</style>
    </div>
  );
}
