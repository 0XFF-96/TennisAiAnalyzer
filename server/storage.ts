import { type User, type InsertUser, type Analysis, type InsertAnalysis } from "@shared/schema";
import { DbStorage } from "./db-storage";
import { MemStorage } from "./mem-storage";

// Interface for storage operations
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

// Decide which storage implementation to use based on environment
// Use PostgreSQL in production and memory storage for development if needed
const useDatabase = process.env.DATABASE_URL !== undefined;

// Export the storage instance
export const storage: IStorage = useDatabase 
  ? new DbStorage() 
  : new MemStorage();
