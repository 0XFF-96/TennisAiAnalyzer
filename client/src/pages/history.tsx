import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import HistoryCard from "@/components/history/history-card";

export default function History() {
  // Set document title
  useEffect(() => {
    document.title = "TennisAI - Analysis History";
  }, []);

  // Fetch analysis history
  const { data, isLoading, isError } = useQuery({
    queryKey: ["/api/analyses"],
  });

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Your Analysis History</h2>
          <p className="mt-2 text-gray-500">Track your progress over time</p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <Skeleton className="aspect-video w-full" />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-10" />
                  </div>
                  <Skeleton className="h-4 w-20 mb-3" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load history data. Please try again later.
            </AlertDescription>
          </Alert>
        ) : data?.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No analyses yet</h3>
            <p className="text-gray-500 mb-6">Upload a tennis image or video to get started with your analysis</p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <a href="/#upload">Analyze My Swing</a>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.map((analysis) => (
                <HistoryCard key={analysis.id} analysis={analysis} />
              ))}
            </div>
            
            {data.length > 8 && (
              <div className="mt-8 text-center">
                <Button variant="outline" className="inline-flex items-center">
                  View All Analysis
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
