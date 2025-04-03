import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HistoryCard from "@/components/tennis/HistoryCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationEllipsis } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { HistoryFilterOptions, TennisAnalysisWithPreview } from "@/lib/types";
import { ListChecksIcon, LayoutGridIcon } from "lucide-react";

export default function History() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // Filter states
  const [filters, setFilters] = useState<HistoryFilterOptions>({
    shotType: "All Shots",
    timeRange: "Last 30 days"
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // Layout state
  const [isGridView, setIsGridView] = useState(true);
  
  // Fetch all analyses
  const { data: analyses, isLoading } = useQuery({
    queryKey: ['/api/analyses'],
  });
  
  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/analyses/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/analyses'] });
      toast({
        title: "Analysis deleted",
        description: "The analysis has been successfully deleted.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete the analysis. Please try again.",
        variant: "destructive"
      });
    }
  });
  
  // Handle filter changes
  const handleFilterChange = (key: keyof HistoryFilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };
  
  // Handle delete
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this analysis?")) {
      deleteMutation.mutate(id);
    }
  };
  
  // Apply filters to the analyses
  const getFilteredAnalyses = () => {
    if (!analyses) return [];
    
    let filtered = [...analyses] as TennisAnalysisWithPreview[];
    
    // Add preview URLs (in a real app, these would come from the server)
    filtered = filtered.map(analysis => ({
      ...analysis,
      previewUrl: analysis.fileType.includes('video') 
        ? "https://images.unsplash.com/photo-1594141376010-27de812c1a12?q=80&w=2070" 
        : "https://images.unsplash.com/photo-1613903614039-62b4b49a13b1?q=80&w=2070"
    }));
    
    // Apply shot type filter
    if (filters.shotType !== "All Shots") {
      filtered = filtered.filter(a => a.actionType === filters.shotType);
    }
    
    // Apply time range filter
    const now = new Date();
    let cutoffDate = new Date();
    
    switch (filters.timeRange) {
      case "Last 30 days":
        cutoffDate.setDate(now.getDate() - 30);
        break;
      case "Last 90 days":
        cutoffDate.setDate(now.getDate() - 90);
        break;
      case "This year":
        cutoffDate = new Date(now.getFullYear(), 0, 1);
        break;
      case "All time":
      default:
        cutoffDate = new Date(0); // Beginning of time
        break;
    }
    
    if (filters.timeRange !== "All time") {
      filtered = filtered.filter(a => new Date(a.createdAt) >= cutoffDate);
    }
    
    return filtered;
  };
  
  const filteredAnalyses = getFilteredAnalyses();
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredAnalyses.length / itemsPerPage);
  const paginatedAnalyses = filteredAnalyses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="rounded-xl overflow-hidden shadow-md mb-12">
          <div className="bg-gradient-to-r from-[#4CAF50] to-[#388E3C] text-white p-6">
            <h2 className="font-bold text-2xl">Analysis History</h2>
            <p className="text-white/80">Review and compare your previous analyses</p>
          </div>
          
          <div className="p-6">
            {/* History Filters */}
            <div className="flex flex-wrap items-center justify-between mb-6">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <Select 
                  value={filters.shotType}
                  onValueChange={(value) => handleFilterChange('shotType', value)}
                >
                  <SelectTrigger className="bg-white border border-gray-200 text-gray-800 rounded-lg min-w-[150px]">
                    <SelectValue placeholder="All Shots" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Shots">All Shots</SelectItem>
                    <SelectItem value="Forehand">Forehand</SelectItem>
                    <SelectItem value="Backhand">Backhand</SelectItem>
                    <SelectItem value="Serve">Serve</SelectItem>
                    <SelectItem value="Volley">Volley</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select 
                  value={filters.timeRange}
                  onValueChange={(value) => handleFilterChange('timeRange', value)}
                >
                  <SelectTrigger className="bg-white border border-gray-200 text-gray-800 rounded-lg min-w-[150px]">
                    <SelectValue placeholder="Last 30 days" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                    <SelectItem value="Last 90 days">Last 90 days</SelectItem>
                    <SelectItem value="This year">This year</SelectItem>
                    <SelectItem value="All time">All time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant={isGridView ? "ghost" : "secondary"} 
                  size="icon" 
                  onClick={() => setIsGridView(false)}
                >
                  <ListChecksIcon className="h-5 w-5" />
                </Button>
                <Button 
                  variant={isGridView ? "secondary" : "ghost"} 
                  size="icon" 
                  onClick={() => setIsGridView(true)}
                >
                  <LayoutGridIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* History Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="shadow-sm border border-gray-200 rounded-lg overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4">
                      <Skeleton className="h-6 w-24 mb-2" />
                      <Skeleton className="h-4 w-32 mb-4" />
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : paginatedAnalyses.length === 0 ? (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <circle cx="10" cy="13" r="2"></circle>
                  <path d="m20 17-1.09-1.09a2 2 0 0 0-2.82 0L10 22"></path>
                </svg>
                <h3 className="font-medium text-xl text-gray-700 mb-2">No analyses found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-4">
                  We couldn't find any analyses matching your current filters. Try changing your filters or upload a new analysis.
                </p>
                <Button 
                  className="bg-[#4CAF50] hover:bg-[#388E3C] text-white"
                  onClick={() => window.location.href = "/analysis"}
                >
                  Upload New Analysis
                </Button>
              </div>
            ) : (
              <div className={`grid ${isGridView ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4 mb-6`}>
                {paginatedAnalyses.map(analysis => (
                  <HistoryCard 
                    key={analysis.id} 
                    analysis={analysis} 
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
            
            {/* Pagination */}
            {!isLoading && filteredAnalyses.length > 0 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button 
                      variant="ghost" 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="text-gray-500 hover:text-gray-800 font-medium flex items-center text-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                      Previous
                    </Button>
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                    let pageNumber = i + 1;
                    
                    if (totalPages > 5 && currentPage > 3) {
                      if (i === 0) {
                        pageNumber = 1;
                      } else if (i === 1) {
                        return (
                          <PaginationItem key="ellipsis-1">
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      } else {
                        pageNumber = Math.min(currentPage + i - 2, totalPages);
                      }
                    }
                    
                    if (pageNumber <= totalPages) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink 
                            isActive={currentPage === pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={currentPage === pageNumber ? "bg-[#4CAF50] text-white" : ""}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    
                    return null;
                  })}
                  
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => setCurrentPage(totalPages)}
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}
                  
                  <PaginationItem>
                    <Button 
                      variant="ghost" 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="text-gray-800 font-medium flex items-center text-sm"
                    >
                      Next
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </Card>
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
