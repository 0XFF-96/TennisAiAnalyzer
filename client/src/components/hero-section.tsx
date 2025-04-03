import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pt-8 pb-16 sm:pt-16 sm:pb-24 lg:pt-24 lg:pb-32 flex flex-col lg:flex-row items-center">
          <div className="px-4 sm:px-6 lg:px-8 lg:w-1/2">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Improve Your <span className="text-green-600">Tennis Game</span> with AI Analysis
            </h1>
            <p className="mt-6 text-xl text-gray-500">
              Upload your tennis footage and get instant professional-level analysis of your technique, posture, and movement with our AI-powered platform.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <a href="#upload" className="inline-flex items-center">
                  Analyze My Swing
                  <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:w-1/2 px-4 sm:px-6 lg:px-8 relative">
            <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1595435934820-ffe096adb407?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Tennis player in action with AI analysis overlay" 
                className="w-full h-full object-cover"
              />
              {/* AI Analysis overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Skeleton points */}
                  <circle cx="400" cy="120" r="8" fill="#3B82F6" />  {/* head */}
                  <circle cx="400" cy="160" r="8" fill="#3B82F6" />  {/* neck */}
                  <circle cx="350" cy="180" r="8" fill="#3B82F6" />  {/* shoulder L */}
                  <circle cx="450" cy="180" r="8" fill="#3B82F6" />  {/* shoulder R */}
                  <circle cx="300" cy="250" r="8" fill="#3B82F6" />  {/* elbow L */}
                  <circle cx="520" cy="200" r="8" fill="#3B82F6" />  {/* elbow R */}
                  <circle cx="260" cy="320" r="8" fill="#3B82F6" />  {/* wrist L */}
                  <circle cx="580" cy="150" r="8" fill="#3B82F6" />  {/* wrist R */}
                  <circle cx="400" cy="260" r="8" fill="#3B82F6" />  {/* hip center */}
                  <circle cx="370" cy="260" r="8" fill="#3B82F6" />  {/* hip L */}
                  <circle cx="430" cy="260" r="8" fill="#3B82F6" />  {/* hip R */}
                  <circle cx="350" cy="350" r="8" fill="#3B82F6" />  {/* knee L */}
                  <circle cx="450" cy="350" r="8" fill="#3B82F6" />  {/* knee R */}
                  <circle cx="350" cy="420" r="8" fill="#3B82F6" />  {/* ankle L */}
                  <circle cx="450" cy="420" r="8" fill="#3B82F6" />  {/* ankle R */}

                  {/* Skeleton lines */}
                  <line x1="400" y1="120" x2="400" y2="160" stroke="#3B82F6" strokeWidth="3" />  {/* head to neck */}
                  <line x1="400" y1="160" x2="350" y2="180" stroke="#3B82F6" strokeWidth="3" />  {/* neck to left shoulder */}
                  <line x1="400" y1="160" x2="450" y2="180" stroke="#3B82F6" strokeWidth="3" />  {/* neck to right shoulder */}
                  <line x1="350" y1="180" x2="300" y2="250" stroke="#3B82F6" strokeWidth="3" />  {/* left shoulder to left elbow */}
                  <line x1="450" y1="180" x2="520" y2="200" stroke="#3B82F6" strokeWidth="3" />  {/* right shoulder to right elbow */}
                  <line x1="300" y1="250" x2="260" y2="320" stroke="#3B82F6" strokeWidth="3" />  {/* left elbow to left wrist */}
                  <line x1="520" y1="200" x2="580" y2="150" stroke="#3B82F6" strokeWidth="3" />  {/* right elbow to right wrist */}
                  <line x1="400" y1="160" x2="400" y2="260" stroke="#3B82F6" strokeWidth="3" />  {/* neck to hip center */}
                  <line x1="400" y1="260" x2="370" y2="260" stroke="#3B82F6" strokeWidth="3" />  {/* hip center to left hip */}
                  <line x1="400" y1="260" x2="430" y2="260" stroke="#3B82F6" strokeWidth="3" />  {/* hip center to right hip */}
                  <line x1="370" y1="260" x2="350" y2="350" stroke="#3B82F6" strokeWidth="3" />  {/* left hip to left knee */}
                  <line x1="430" y1="260" x2="450" y2="350" stroke="#3B82F6" strokeWidth="3" />  {/* right hip to right knee */}
                  <line x1="350" y1="350" x2="350" y2="420" stroke="#3B82F6" strokeWidth="3" />  {/* left knee to left ankle */}
                  <line x1="450" y1="350" x2="450" y2="420" stroke="#3B82F6" strokeWidth="3" />  {/* right knee to right ankle */}
                  
                  {/* Angle measurement on right elbow - example of analysis */}
                  <path d="M 500 200 A 20 20 0 0 1 520 180" stroke="#FFEB3B" strokeWidth="2" fill="none" />
                  <text x="505" y="190" fill="#FFEB3B" fontSize="12" fontWeight="bold">135°</text>
                  
                  {/* Tennis racket highlight */}
                  <circle cx="600" cy="130" r="25" stroke="#FFEB3B" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                  <text x="590" y="110" fill="#FFEB3B" fontSize="12" fontWeight="bold">Racket Position</text>
                </svg>
              </div>
            </div>
            <div className="absolute -bottom-4 right-12 bg-white rounded-lg shadow-lg p-4 border border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">Perfect Backswing Position</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
