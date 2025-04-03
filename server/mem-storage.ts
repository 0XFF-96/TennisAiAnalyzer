import { type User, type InsertUser, type Analysis, type InsertAnalysis } from "@shared/schema";
import { IStorage } from "./storage";

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private analyses: Map<number, Analysis>;
  private userIdCounter: number;
  private analysisIdCounter: number;

  constructor() {
    this.users = new Map();
    this.analyses = new Map();
    this.userIdCounter = 1;
    this.analysisIdCounter = 1;
    
    // Create a default user for demo purposes
    this.createUser({
      username: "demo",
      password: "password"
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Analysis methods
  async getAnalyses(userId?: number): Promise<Analysis[]> {
    const analyses = Array.from(this.analyses.values());
    if (userId) {
      return analyses.filter(analysis => analysis.userId === userId);
    }
    return analyses;
  }
  
  async getAnalysis(id: number): Promise<Analysis | undefined> {
    return this.analyses.get(id);
  }
  
  async createAnalysis(insertAnalysis: InsertAnalysis): Promise<Analysis> {
    const id = this.analysisIdCounter++;
    
    // Create a base analysis object with proper default values that match the schema
    const analysis: Analysis = {
      id,
      userId: insertAnalysis.userId ?? null,
      fileName: insertAnalysis.fileName,
      fileType: insertAnalysis.fileType,
      originalFileName: insertAnalysis.originalFileName,
      detectedStage: insertAnalysis.detectedStage ?? null,
      actionDate: insertAnalysis.actionDate ?? new Date(),
      preparationScore: insertAnalysis.preparationScore ?? null,
      swingScore: insertAnalysis.swingScore ?? null,
      followThroughScore: insertAnalysis.followThroughScore ?? null,
      keypoints: insertAnalysis.keypoints ?? null,
      observations: insertAnalysis.observations ?? null,
      suggestions: insertAnalysis.suggestions ?? null,
    };
    
    this.analyses.set(id, analysis);
    return analysis;
  }
  
  async deleteAnalysis(id: number): Promise<boolean> {
    return this.analyses.delete(id);
  }
}