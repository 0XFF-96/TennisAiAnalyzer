import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import jimmyAvatar from "../assets/jimmy-avatar.jpg";
import tennis1 from "../assets/tennis1.jpg";
import tennis2 from "../assets/tennis2.jpg";
import tennis3 from "../assets/tennis-extra4.jpg";
import tennis4 from "../assets/tennis-extra5.jpg";
import tennis5 from "../assets/tennis-extra2.jpg";
import tennis6 from "../assets/tennis-extra3.jpg";

export default function About() {
  const [, navigate] = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">About TennisAI</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced AI-powered tennis form analysis to help players of all levels improve their game.
            </p>
          </div>
          
          {/* Creator Information */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
            <div className="md:flex">
              <div className="md:shrink-0 bg-[#4CAF50]/10 flex items-center justify-center py-8 px-6">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#4CAF50]/20">
                  <img 
                    src={jimmyAvatar} 
                    alt="Jimmy Li" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Jimmy Li</h2>
                <h3 className="text-lg font-medium text-[#4CAF50] mb-4">Creator & Lead Developer</h3>
                
                <p className="text-gray-600 mb-6">
                  Jimmy is a passionate software engineer and tennis enthusiast who built TennisAI to help players visualize and
                  improve their tennis form using advanced AI techniques. With a background in computer vision and machine learning,
                  Jimmy has created a powerful yet accessible tool to help tennis players at all levels enhance their game.
                </p>
                
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com/0XFF-96" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-[#4CAF50] transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/jimmy-li-2b0a082b9/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-[#4CAF50] transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mission & Vision Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4CAF50]" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h3>
              <p className="text-gray-600">
                TennisAI's mission is to democratize professional tennis coaching by making advanced technical analysis 
                accessible to players of all levels. We believe that with the right feedback and guidance, every player 
                can improve their technique and enjoy the game more fully.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4CAF50]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Our Vision</h3>
              <p className="text-gray-600">
                We envision a future where AI assistance is a fundamental part of sports training, providing insights that 
                were previously available only to elite athletes. TennisAI aims to be at the forefront of this revolution, 
                continually improving our technology to offer the most accurate and helpful analysis possible.
              </p>
            </div>
          </div>
          
          {/* Tennis Action Gallery */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Tennis in Action</h3>
            <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              My passion for tennis drives the development of TennisAI. Here's a glimpse of the key action stages 
              our AI analyzes - from preparation and backswing to contact point and follow-through.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="overflow-hidden rounded-lg shadow-md aspect-square relative group">
                <img 
                  src={tennis1} 
                  alt="Tennis preparation stance" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="overflow-hidden rounded-lg shadow-md aspect-square relative group">
                <img 
                  src={tennis2} 
                  alt="Tennis backswing" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="overflow-hidden rounded-lg shadow-md aspect-square relative group">
                <img 
                  src={tennis3} 
                  alt="Tennis serving motion" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="overflow-hidden rounded-lg shadow-md aspect-square relative group">
                <img 
                  src={tennis4} 
                  alt="Tennis service preparation" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="overflow-hidden rounded-lg shadow-md aspect-square relative group">
                <img 
                  src={tennis5} 
                  alt="Tennis reaching for ball" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="overflow-hidden rounded-lg shadow-md aspect-square relative group">
                <img 
                  src={tennis6} 
                  alt="Tennis overhead serve" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Technology</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800">Computer Vision</h4>
                <p className="text-sm text-gray-600">Advanced pose estimation to detect body keypoints with high accuracy</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800">Machine Learning</h4>
                <p className="text-sm text-gray-600">Neural networks trained on thousands of tennis movements</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800">Biomechanics</h4>
                <p className="text-sm text-gray-600">Analysis based on principles of optimal tennis mechanics</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800">Data Analysis</h4>
                <p className="text-sm text-gray-600">Pattern recognition to identify improvement opportunities</p>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="bg-[#4CAF50] rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Improve Your Tennis Game?</h2>
            <p className="text-lg mb-6 max-w-3xl mx-auto">
              Experience the power of AI-driven tennis analysis and take your game to the next level.
            </p>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white text-[#4CAF50] hover:bg-gray-100 border-none font-medium px-8"
              onClick={() => navigate("/analysis")}
            >
              Try TennisAI Now
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}