import React from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [location] = useLocation();
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <svg className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.5 12.5C7.5 9.5 12.5 7.5 17 12C21.5 16.5 15.5 21.5 12.5 19.5C9.5 17.5 10.5 15 12.5 13C14.5 11 17.5 11.5 18.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-900">Tennis<span className="text-green-600">AI</span></span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link href="/" className={`px-3 py-2 text-sm font-medium ${location === '/' ? 'text-green-600' : 'text-gray-900 hover:text-green-600'}`}>
              Home
            </Link>
            <Link href="/history" className={`px-3 py-2 text-sm font-medium ${location === '/history' ? 'text-green-600' : 'text-gray-900 hover:text-green-600'}`}>
              History
            </Link>
            <Button asChild className="ml-4 bg-green-600 hover:bg-green-700">
              <a href="/#upload">分析上传</a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
