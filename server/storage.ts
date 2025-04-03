import { users, type User, type InsertUser, type TennisAnalysis, type InsertTennisAnalysis } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Tennis Analysis CRUD operations
  getTennisAnalysis(id: number): Promise<TennisAnalysis | undefined>;
  getAllTennisAnalyses(): Promise<TennisAnalysis[]>;
  createTennisAnalysis(analysis: InsertTennisAnalysis): Promise<TennisAnalysis>;
  deleteTennisAnalysis(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tennisAnalyses: Map<number, TennisAnalysis>;
  private userId: number;
  private analysisId: number;

  constructor() {
    this.users = new Map();
    this.tennisAnalyses = new Map();
    this.userId = 1;
    this.analysisId = 1;
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
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getTennisAnalysis(id: number): Promise<TennisAnalysis | undefined> {
    return this.tennisAnalyses.get(id);
  }

  async getAllTennisAnalyses(): Promise<TennisAnalysis[]> {
    return Array.from(this.tennisAnalyses.values()).sort((a, b) => {
      // Sort by creation date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  async createTennisAnalysis(analysis: InsertTennisAnalysis): Promise<TennisAnalysis> {
    const id = this.analysisId++;
    const now = new Date();
    const tennisAnalysis: TennisAnalysis = { 
      ...analysis, 
      id, 
      createdAt: now 
    };
    
    this.tennisAnalyses.set(id, tennisAnalysis);
    return tennisAnalysis;
  }

  async deleteTennisAnalysis(id: number): Promise<boolean> {
    return this.tennisAnalyses.delete(id);
  }
}

export const storage = new MemStorage();
