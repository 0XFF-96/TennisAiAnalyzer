import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";
import { insertAnalysisSchema, ACTION_STAGES } from "@shared/schema";
import { z } from "zod";

// Configure multer for file upload
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueFileName = `${randomUUID()}${path.extname(file.originalname)}`;
      cb(null, uniqueFileName);
    },
  }),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only images and videos
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif',
      'video/mp4', 'video/quicktime', 'video/x-msvideo'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type. Please upload an image or video.') as any);
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Get all analyses or filtered by userId
  app.get("/api/analyses", async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      const analyses = await storage.getAnalyses(userId);
      res.json(analyses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analyses" });
    }
  });

  // Get a specific analysis by ID
  app.get("/api/analyses/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const analysis = await storage.getAnalysis(id);
      
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }
      
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analysis" });
    }
  });

  // Upload and process a new analysis
  app.post("/api/analyses", upload.single("file"), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      
      // Determine file type from mimetype
      const fileType = req.file.mimetype.startsWith("image/") ? "image" : "video";
      
      // In a real application, here you would process the file with AI models
      // For this example, we'll generate mock analysis data
      
      // Mock processing delay to simulate AI analysis (1-3 seconds)
      await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));
      
      // Generate mock analysis data
      const mockDetectedStage = ACTION_STAGES[Math.floor(Math.random() * ACTION_STAGES.length)];
      const mockPreparationScore = Math.floor(Math.random() * 30) + 70; // 70-100
      const mockSwingScore = Math.floor(Math.random() * 30) + 70; // 70-100
      const mockFollowThroughScore = Math.floor(Math.random() * 30) + 70; // 70-100
      
      // Generate mock keypoints for pose estimation
      const mockKeypoints = generateMockKeypoints();
      
      // Generate mock observations and suggestions
      const mockObservations = [
        { text: "Excellent racket preparation and grip positioning", type: "positive" },
        { text: "Your elbow height could be higher during forward swing", type: "warning" },
        { text: "Limited hip rotation restricting power transfer", type: "negative" }
      ];
      
      const mockSuggestions = [
        "Practice keeping your elbow at shoulder height during the forward swing phase",
        "Engage core muscles to increase hip rotation by 15-20 degrees",
        "Complete your follow-through with the racket finishing higher above your opposite shoulder"
      ];
      
      // Create the analysis record in storage
      const insertData = {
        userId: req.body.userId ? parseInt(req.body.userId) : 1, // Default to user 1 if not specified
        fileName: req.file.filename,
        fileType,
        originalFileName: req.file.originalname,
        detectedStage: mockDetectedStage,
        preparationScore: mockPreparationScore,
        swingScore: mockSwingScore,
        followThroughScore: mockFollowThroughScore,
        keypoints: mockKeypoints,
        observations: mockObservations,
        suggestions: mockSuggestions,
      };
      
      // Validate with zod schema
      const validatedData = insertAnalysisSchema.parse(insertData);
      
      // Store in database
      const analysis = await storage.createAnalysis(validatedData);
      
      res.status(201).json(analysis);
    } catch (error) {
      console.error("Analysis upload error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data format", details: error.format() });
      }
      res.status(500).json({ message: "Failed to process analysis" });
    }
  });

  // Delete an analysis
  app.delete("/api/analyses/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const analysis = await storage.getAnalysis(id);
      
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }
      
      // Delete the file from storage
      try {
        const filePath = path.join(process.cwd(), "uploads", analysis.fileName);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (fileError) {
        console.error("Error deleting file:", fileError);
        // Continue with deleting the database record even if file deletion fails
      }
      
      // Delete the database record
      await storage.deleteAnalysis(id);
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete analysis" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to generate mock keypoints for pose visualization
function generateMockKeypoints() {
  // Basic skeletal keypoints for tennis pose
  return [
    { x: 400, y: 120, part: "head", score: 0.92 },
    { x: 400, y: 160, part: "neck", score: 0.95 },
    { x: 350, y: 180, part: "leftShoulder", score: 0.88 },
    { x: 450, y: 180, part: "rightShoulder", score: 0.89 },
    { x: 300, y: 250, part: "leftElbow", score: 0.85 },
    { x: 520, y: 200, part: "rightElbow", score: 0.84 },
    { x: 260, y: 320, part: "leftWrist", score: 0.79 },
    { x: 580, y: 150, part: "rightWrist", score: 0.81 },
    { x: 400, y: 260, part: "hipCenter", score: 0.91 },
    { x: 370, y: 260, part: "leftHip", score: 0.87 },
    { x: 430, y: 260, part: "rightHip", score: 0.86 },
    { x: 350, y: 350, part: "leftKnee", score: 0.82 },
    { x: 450, y: 350, part: "rightKnee", score: 0.83 },
    { x: 350, y: 420, part: "leftAnkle", score: 0.78 },
    { x: 450, y: 420, part: "rightAnkle", score: 0.79 }
  ];
}
