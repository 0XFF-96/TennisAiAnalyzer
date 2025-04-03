import React from "react";

interface SuggestionsProps {
  suggestions?: string[];
}

export default function Suggestions({ suggestions = [] }: SuggestionsProps) {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }
  
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-500 mb-2">Improvement Suggestions</h4>
      <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
        <p className="mb-2">Focus on these key areas to improve your technique:</p>
        <ol className="list-decimal pl-5 space-y-1">
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ol>
        <p className="mt-2">Try the "shadow swing" drill with these adjustments 20-30 times before your next practice session.</p>
      </div>
    </div>
  );
}
