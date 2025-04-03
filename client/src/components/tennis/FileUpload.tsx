import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fileToBase64, formatFileSize } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { uploadFileSchema } from "@shared/schema";
import { AnalysisStatus, FileProgress } from "@/lib/types";

interface FileUploadProps {
  onUploadComplete: (analysisId: number) => void;
  setStatus: (status: AnalysisStatus) => void;
  status: AnalysisStatus;
}

export default function FileUpload({ onUploadComplete, setStatus, status }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileProgress, setFileProgress] = useState<FileProgress | null>(null);
  const { toast } = useToast();

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

  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  // Process the selected file(s)
  const handleFiles = async (files: FileList) => {
    const file = files[0]; // Just handle the first file for now
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'video/mp4'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPG, PNG or MP4 file.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate file size (100MB max)
    const maxSize = 100 * 1024 * 1024; // 100MB in bytes
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Maximum file size is 100MB.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Update status to uploading
      setStatus('uploading');
      
      // Setup file progress
      setFileProgress({
        fileName: file.name,
        progress: 0,
        size: 0,
        totalSize: file.size
      });
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setFileProgress(prev => {
          if (!prev) return null;
          
          const newProgress = Math.min(prev.progress + 10, 100);
          const newSize = Math.floor((newProgress / 100) * prev.totalSize);
          
          if (newProgress === 100) {
            clearInterval(progressInterval);
            // Set processing status after upload completes
            setTimeout(() => setStatus('processing'), 500);
          }
          
          return {
            ...prev,
            progress: newProgress,
            size: newSize
          };
        });
      }, 300);
      
      // Convert file to base64
      const base64Data = await fileToBase64(file);
      
      // Prepare upload data
      const uploadData = {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        fileData: base64Data
      };
      
      // Validate data
      uploadFileSchema.parse(uploadData);
      
      // Set analyzing status
      setTimeout(() => {
        setStatus('analyzing');
        
        // Simulate analysis process
        setTimeout(async () => {
          try {
            // Upload to server
            const response = await apiRequest('POST', '/api/upload', uploadData);
            const result = await response.json();
            
            // Complete the upload process
            setStatus('complete');
            onUploadComplete(result.id);
          } catch (error) {
            console.error('Upload failed:', error);
            setStatus('error');
            toast({
              title: "Upload failed",
              description: "There was an error uploading your file. Please try again.",
              variant: "destructive"
            });
          }
        }, 3000);
      }, 2000);
      
    } catch (error) {
      console.error('File handling error:', error);
      setStatus('error');
      toast({
        title: "Upload failed",
        description: "There was an error processing your file. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setFileProgress(null);
    setStatus('idle');
  };

  // Render upload area if not uploading or processing
  if (status === 'idle') {
    return (
      <div 
        className={`border-2 border-dashed ${dragActive ? 'border-[#4CAF50] bg-[#4CAF50]/5' : 'border-gray-400'} rounded-lg p-8 text-center cursor-pointer transition-all`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <h3 className="font-medium text-xl text-gray-800 mb-2">Drag and drop your files here</h3>
        <p className="text-gray-500 mb-6">or</p>
        <Button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white">
          Browse Files
        </Button>
        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept="image/jpeg,image/png,video/mp4"
          className="hidden"
        />
        <p className="mt-4 text-sm text-gray-500">
          Supported formats: JPG, PNG, MP4 (max 100MB)
        </p>
      </div>
    );
  }
  
  // Render upload progress
  if (status === 'uploading' && fileProgress) {
    return (
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Uploading {fileProgress.fileName}...</span>
          <span className="text-sm font-medium text-gray-700">{fileProgress.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className="bg-[#4CAF50] h-2.5 rounded-full" 
            style={{ width: `${fileProgress.progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {formatFileSize(fileProgress.size)} of {formatFileSize(fileProgress.totalSize)}
          </span>
          <Button variant="ghost" size="sm" className="text-blue-600" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }
  
  return null;
}
