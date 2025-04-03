import React from "react";
import { ClipboardList, BarChart2, BookOpen } from "lucide-react";

export default function FeatureSection() {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">AI-Powered Tennis Analysis</h2>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
            Our advanced computer vision technology helps you perfect your technique
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
              <ClipboardList className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Detailed Analysis</h3>
            <p className="text-gray-500">
              Get frame-by-frame breakdown of your technique with professional-level insights
            </p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
              <BarChart2 className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Track Progress</h3>
            <p className="text-gray-500">
              Follow your improvement over time with comprehensive performance metrics
            </p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
              <BookOpen className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Personalized Tips</h3>
            <p className="text-gray-500">
              Receive customized improvement suggestions based on your specific technique
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
