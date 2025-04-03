import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import tennisCourtImage from "../assets/tennis-court-analysis.png";

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
                  src={tennisCourtImage} 
                  alt="Tennis player with AI analysis overlay" 
                  className="w-full h-full object-cover rounded-r-xl" 
                  style={{ maxHeight: "500px" }}
                />
                <div className="absolute bottom-4 right-4 bg-white/80 rounded-full px-3 py-1 text-sm text-green-800 font-medium flex items-center shadow-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  AI Analysis Active
                </div>
              </div>
            </div>
          </div>
          
          {/* How It Works Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">How TennisAI Works</h2>
            
            {/* Step Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#4CAF50]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-800">1. Upload</h3>
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
                <h3 className="font-bold text-xl mb-2 text-gray-800">2. Analyze</h3>
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
                <h3 className="font-bold text-xl mb-2 text-gray-800">3. Improve</h3>
                <p className="text-gray-600">Get detailed feedback, scoring, and personalized tips to improve your tennis technique.</p>
              </div>
            </div>
            
            {/* Detailed Analysis Flow */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <h3 className="text-xl font-bold text-center p-6 bg-[#4CAF50]/10 text-[#4CAF50]">
                The Analysis Process
              </h3>
              
              {/* Process Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Left side: Data Analysis View */}
                <div className="p-6 border-r border-gray-200">
                  <h4 className="font-bold text-lg mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#4CAF50]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Data Analysis
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-[#4CAF50] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">1</div>
                      <div className="ml-3">
                        <h5 className="font-medium">Pose Detection</h5>
                        <p className="text-sm text-gray-600">Our AI detects 33 body keypoints to analyze your form.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-[#4CAF50] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">2</div>
                      <div className="ml-3">
                        <h5 className="font-medium">Shot Classification</h5>
                        <p className="text-sm text-gray-600">Identifies your shot type (forehand, backhand, serve).</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-[#4CAF50] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">3</div>
                      <div className="ml-3">
                        <h5 className="font-medium">Stage Analysis</h5>
                        <p className="text-sm text-gray-600">Breaks down your stroke into stages: preparation, backswing, contact, follow-through.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-[#4CAF50] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">4</div>
                      <div className="ml-3">
                        <h5 className="font-medium">Score Calculation</h5>
                        <p className="text-sm text-gray-600">Evaluates each component of your technique with precise scoring.</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sample Data Chart */}
                  <div className="mt-6 border border-gray-200 rounded-lg p-4">
                    <h5 className="font-medium text-sm mb-3 text-center">Sample Data Visualization</h5>
                    <div className="flex space-x-1">
                      <div className="flex-1">
                        <div className="h-24 bg-gradient-to-t from-[#4CAF50]/80 to-[#4CAF50]/20 rounded"></div>
                        <div className="text-xs text-center mt-1">Prep</div>
                      </div>
                      <div className="flex-1">
                        <div className="h-20 bg-gradient-to-t from-[#FFEB3B]/80 to-[#FFEB3B]/20 rounded"></div>
                        <div className="text-xs text-center mt-1">Swing</div>
                      </div>
                      <div className="flex-1">
                        <div className="h-28 bg-gradient-to-t from-[#4CAF50]/80 to-[#4CAF50]/20 rounded"></div>
                        <div className="text-xs text-center mt-1">Contact</div>
                      </div>
                      <div className="flex-1">
                        <div className="h-16 bg-gradient-to-t from-[#F44336]/80 to-[#F44336]/20 rounded"></div>
                        <div className="text-xs text-center mt-1">Follow</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right side: Results View */}
                <div className="p-6">
                  <h4 className="font-bold text-lg mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#4CAF50]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Analysis Results
                  </h4>
                  
                  {/* Sample Stage Analysis */}
                  <div className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="font-medium">Preparation Phase</h5>
                      <div className="flex items-center">
                        <span className="text-xl font-bold mr-2">8.4</span>
                        <div className="w-10 h-10 rounded-full border-4 border-[#4CAF50]/30 border-t-[#4CAF50] border-r-[#4CAF50]"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-start p-2 bg-green-50 rounded">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-2">
                          <p className="text-sm font-medium text-green-800">Excellent Grip Position</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start p-2 bg-red-50 rounded">
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-2">
                          <p className="text-sm font-medium text-red-800">Shoulder Rotation Needs Improvement</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Improvement Tips */}
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                      </svg>
                      <h5 className="font-medium text-blue-800">Improvement Suggestion</h5>
                    </div>
                    <p className="text-sm text-blue-700">Try turning your shoulders more during the preparation phase. Aim to have your back shoulder pointing more toward the net.</p>
                  </div>
                  
                  {/* Report Generation */}
                  <div className="mt-4 flex">
                    <button className="flex-1 bg-[#4CAF50] text-white text-sm py-2 px-4 rounded flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
                      </svg>
                      Download PDF Analysis
                    </button>
                  </div>
                </div>
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
