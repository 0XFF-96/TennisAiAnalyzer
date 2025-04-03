import React from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [location] = useLocation();
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <svg className="h-8 w-8 text-[#4CAF50]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.07,4.93C13.68,4 11.84,4.93 9.94,6C6.24,7.94 3.34,12.34 4.97,17.5C6.24,21.1 10.04,23 13.68,21.97C15.57,21.34 17.97,19.37 17.97,15.77C17.97,14.11 17.04,12.76 16.04,11.76C15.37,11.08 14.22,10.36 13.3,11.04C12.53,11.65 12.77,12.7 13.14,13.48C13.5,14.21 13.31,14.88 12.5,15.16C11.72,15.42 11.03,14.8 10.78,14.16C9.75,11.29 12.16,9.31 14.62,10.36C17.07,11.46 18.92,13.19 18.92,16.28C18.92,18.93 17.41,20.77 14.76,21.91C11.02,23.46 7.34,22.25 5.19,19.2C2.83,15.77 3.33,11.54 5.5,8.5C7.7,5.45 10.96,3.5 15,3C16.27,3 19.07,3.97 19.07,4.93Z" fill="currentColor"/>
              </svg>
              <span className="font-bold text-xl text-gray-800 ml-2">TennisAI</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <a className={`font-medium px-3 py-2 rounded-md text-sm ${
                location === "/" 
                  ? "text-[#4CAF50]" 
                  : "text-gray-700 hover:text-[#4CAF50]"
              }`}>
                Home
              </a>
            </Link>
            <Link href="/analysis">
              <a className={`font-medium px-3 py-2 rounded-md text-sm ${
                location === "/analysis" 
                  ? "text-[#4CAF50]" 
                  : "text-gray-700 hover:text-[#4CAF50]"
              }`}>
                Analysis
              </a>
            </Link>
            <Link href="/history">
              <a className={`font-medium px-3 py-2 rounded-md text-sm ${
                location === "/history" 
                  ? "text-[#4CAF50]" 
                  : "text-gray-700 hover:text-[#4CAF50]"
              }`}>
                History
              </a>
            </Link>
            <Link href="/about">
              <a className={`font-medium px-3 py-2 rounded-md text-sm ${
                location === "/about" 
                  ? "text-[#4CAF50]" 
                  : "text-gray-700 hover:text-[#4CAF50]"
              }`}>
                About
              </a>
            </Link>
            <Button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white">
              My Account
            </Button>
          </div>
          <div className="flex md:hidden items-center">
            <Button variant="ghost" size="icon">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-gray-800"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
