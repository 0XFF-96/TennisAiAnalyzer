import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTennisAnalysisSchema, uploadFileSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

// Mock AI processing function
function processAIAnalysis(fileData: string, fileType: string) {
  // In a real app, this would call an AI service to analyze the tennis form
  // For this demo, we'll generate mock analysis data
  
  const actionTypes = ["Forehand", "Backhand", "Serve", "Volley"];
  const actionStages = ["Preparation", "Backswing", "Forward Swing", "Impact", "Follow Through"];
  
  const getRandomScore = () => Math.floor(Math.random() * 30) + 70; // Scores between 70-99
  const preparationScore = getRandomScore();
  const swingPathScore = getRandomScore();
  const bodyPositionScore = getRandomScore();
  const followThroughScore = getRandomScore();
  const overallScore = Math.floor((preparationScore + swingPathScore + bodyPositionScore + followThroughScore) / 4);
  
  // Generate mock keypoints data (simplified for demo)
  const poseKeypoints = {
    keypoints: [
      { position: { x: 50, y: 20 }, part: "nose", score: 0.95 },
      { position: { x: 50, y: 35 }, part: "neck", score: 0.97 },
      { position: { x: 50, y: 50 }, part: "torso", score: 0.98 },
      { position: { x: 30, y: 35 }, part: "leftShoulder", score: 0.96 },
      { position: { x: 70, y: 35 }, part: "rightShoulder", score: 0.96 },
      { position: { x: 25, y: 50 }, part: "leftElbow", score: 0.94 },
      { position: { x: 75, y: 50 }, part: "rightElbow", score: 0.94 },
      { position: { x: 20, y: 65 }, part: "leftWrist", score: 0.92 },
      { position: { x: 80, y: 65 }, part: "rightWrist", score: 0.92 },
      { position: { x: 40, y: 65 }, part: "leftHip", score: 0.95 },
      { position: { x: 60, y: 65 }, part: "rightHip", score: 0.95 },
      { position: { x: 35, y: 80 }, part: "leftKnee", score: 0.93 },
      { position: { x: 65, y: 80 }, part: "rightKnee", score: 0.93 },
      { position: { x: 35, y: 95 }, part: "leftAnkle", score: 0.91 },
      { position: { x: 65, y: 95 }, part: "rightAnkle", score: 0.91 },
    ],
    connections: [
      ["nose", "neck"],
      ["neck", "torso"],
      ["neck", "leftShoulder"],
      ["neck", "rightShoulder"],
      ["leftShoulder", "leftElbow"],
      ["rightShoulder", "rightElbow"],
      ["leftElbow", "leftWrist"],
      ["rightElbow", "rightWrist"],
      ["torso", "leftHip"],
      ["torso", "rightHip"],
      ["leftHip", "leftKnee"],
      ["rightHip", "rightKnee"],
      ["leftKnee", "leftAnkle"],
      ["rightKnee", "rightAnkle"],
    ]
  };
  
  // Generate feedback and suggestions
  const feedback = "Your tennis form shows good fundamentals. Your preparation is solid, but there are areas for improvement in your follow-through and body positioning.";
  
  const suggestionsList = [
    "Extend your follow-through more completely toward the target",
    "Maintain a more stable wrist position throughout the swing",
    "Improve weight transfer from back foot to front foot during the swing",
    "Keep your non-dominant arm more balanced during follow-through",
    "Focus on rotating your hips and shoulders together for more power"
  ];
  
  // Select 2-3 random suggestions
  const numSuggestions = Math.floor(Math.random() * 2) + 2; // 2-3 suggestions
  const suggestions: string[] = [];
  
  while (suggestions.length < numSuggestions) {
    const randomIndex = Math.floor(Math.random() * suggestionsList.length);
    const suggestion = suggestionsList[randomIndex];
    
    if (!suggestions.includes(suggestion)) {
      suggestions.push(suggestion);
    }
  }
  
  return {
    actionType: actionTypes[Math.floor(Math.random() * actionTypes.length)],
    actionStage: actionStages[Math.floor(Math.random() * actionStages.length)],
    preparationScore,
    swingPathScore,
    bodyPositionScore,
    followThroughScore,
    overallScore,
    feedback,
    suggestions,
    poseKeypoints
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get("/api/analyses", async (req: Request, res: Response) => {
    try {
      const analyses = await storage.getAllTennisAnalyses();
      res.json(analyses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analyses" });
    }
  });

  app.get("/api/analyses/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const analysis = await storage.getTennisAnalysis(id);
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }
      
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analysis" });
    }
  });

  app.post("/api/upload", async (req: Request, res: Response) => {
    try {
      const uploadData = uploadFileSchema.parse(req.body);
      
      // Process the file with AI (mocked for this demo)
      const aiAnalysis = processAIAnalysis(uploadData.fileData, uploadData.fileType);
      
      // Create the analysis record
      const analysisData = insertTennisAnalysisSchema.parse({
        fileName: uploadData.fileName,
        fileType: uploadData.fileType,
        fileSize: uploadData.fileSize,
        ...aiAnalysis
      });
      
      const createdAnalysis = await storage.createTennisAnalysis(analysisData);
      res.status(201).json(createdAnalysis);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to upload and analyze file" });
    }
  });

  app.delete("/api/analyses/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const success = await storage.deleteTennisAnalysis(id);
      if (!success) {
        return res.status(404).json({ message: "Analysis not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete analysis" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
