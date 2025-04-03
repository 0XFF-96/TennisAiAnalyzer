import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { apiRequest } from "@/lib/queryClient";
import { Upload, AlertCircle } from "lucide-react";
import { queryClient } from "@/lib/queryClient";

export default function UploadSection() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const xhr = new XMLHttpRequest();
      
      return new Promise<any>((resolve, reject) => {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded * 100) / event.total);
            setUploadProgress(progress);
          }
        });
        
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        };
        
        xhr.onerror = () => {
          reject(new Error('Upload failed'));
        };
        
        xhr.open('POST', '/api/analyses');
        xhr.send(formData);
      });
    },
    onSuccess: (data) => {
      // Reset state
      setSelectedFile(null);
      setUploadProgress(0);
      
      // Show success toast
      toast({
        title: "Upload Complete",
        description: "Your tennis video has been analyzed successfully!",
      });
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/analyses"] });
      
      // Redirect to analysis page
      setLocation(`/analysis/${data.id}`);
    },
    onError: (error) => {
      console.error("Upload error:", error);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload and analyze file",
      });
      setUploadProgress(0);
    }
  });

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  // Validate file type and size
  const validateAndSetFile = (file: File) => {
    const validFileTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/quicktime'];
    const maxSize = 100 * 1024 * 1024; // 100MB
    
    if (!validFileTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a JPG, PNG, MP4, or MOV file.",
      });
      return;
    }
    
    if (file.size > maxSize) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "File size must be less than 100MB.",
      });
      return;
    }
    
    setSelectedFile(file);
  };

  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  // Handle button click to open file dialog
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle drag events
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select a file to upload.",
      });
      return;
    }
    
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", "1"); // Default user ID
    
    uploadMutation.mutate(formData);
  };

  return (
    <section id="upload" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Upload Your Tennis Footage</h2>
          <p className="mt-4 text-xl text-gray-500">Get instant AI-powered feedback on your tennis technique</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8">
              {/* Upload drop zone */}
              <div 
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                  dragActive ? 'border-green-700 bg-green-50' : 'border-green-500 hover:border-green-600 hover:bg-green-50'
                }`}
                onClick={handleUploadClick}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="space-y-4">
                  <div className="flex justify-center">
                    {selectedFile ? (
                      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <Upload className="h-16 w-16 text-green-500" />
                    )}
                  </div>
                  
                  {selectedFile ? (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">File selected</h3>
                      <p className="text-sm text-gray-500">{selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)</p>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-lg font-medium text-gray-900">Drag and drop your video or image</h3>
                      <p className="text-sm text-gray-500">
                        Supported formats: MP4, MOV, JPG, PNG (max 100MB)
                      </p>
                    </>
                  )}
                  
                  {!uploadMutation.isPending && (
                    <Button 
                      type="button"
                      variant="default" 
                      className="mt-4 bg-green-600 hover:bg-green-700"
                      onClick={handleUploadClick}
                    >
                      {selectedFile ? "Change File" : "Browse Files"}
                    </Button>
                  )}
                  
                  {uploadMutation.isPending && (
                    <div className="w-full mt-4">
                      <p className="text-sm text-gray-500 mb-2">Uploading and analyzing...</p>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}
                  
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden" 
                    accept="image/jpeg,image/png,video/mp4,video/quicktime"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              
              {selectedFile && !uploadMutation.isPending && (
                <div className="mt-6 flex justify-center">
                  <Button 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Analyze Now
                  </Button>
                </div>
              )}

              <div className="mt-6 border-t border-gray-200 pt-6">
                <h4 className="text-sm font-medium text-gray-900">For best results:</h4>
                <ul className="mt-2 text-sm text-gray-500 space-y-1 list-disc pl-5">
                  <li>Capture your full body in the frame</li>
                  <li>Record at 30+ fps for video analysis</li>
                  <li>Ensure good lighting conditions</li>
                  <li>Film from side-on for forehand/backhand analysis</li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
