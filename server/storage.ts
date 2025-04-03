import { users, type User, type InsertUser, type Analysis, type InsertAnalysis } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Analysis methods
  getAnalyses(userId?: number): Promise<Analysis[]>;
  getAnalysis(id: number): Promise<Analysis | undefined>;
  createAnalysis(analysis: InsertAnalysis): Promise<Analysis>;
  deleteAnalysis(id: number): Promise<boolean>;
}

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
    const analysis: Analysis = {
      ...insertAnalysis,
      id,
      actionDate: insertAnalysis.actionDate || new Date(),
    };
    this.analyses.set(id, analysis);
    return analysis;
  }
  
  async deleteAnalysis(id: number): Promise<boolean> {
    return this.analyses.delete(id);
  }
}

export const storage = new MemStorage();
