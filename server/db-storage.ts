import { eq } from "drizzle-orm";
import { db } from "./db";
import { users, analyses } from "@shared/schema";
import type { User, InsertUser, Analysis, InsertAnalysis } from "@shared/schema";
import { IStorage } from "./storage";

export class DbStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Analysis methods
  async getAnalyses(userId?: number): Promise<Analysis[]> {
    if (userId) {
      return db.select().from(analyses).where(eq(analyses.userId, userId));
    }
    return db.select().from(analyses);
  }

  async getAnalysis(id: number): Promise<Analysis | undefined> {
    const result = await db.select().from(analyses).where(eq(analyses.id, id));
    return result[0];
  }

  async createAnalysis(insertAnalysis: InsertAnalysis): Promise<Analysis> {
    const result = await db.insert(analyses).values(insertAnalysis).returning();
    return result[0];
  }

  async deleteAnalysis(id: number): Promise<boolean> {
    const result = await db.delete(analyses).where(eq(analyses.id, id)).returning();
    return result.length > 0;
  }
}