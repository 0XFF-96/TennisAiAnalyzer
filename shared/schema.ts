import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define the analysis action stage enum
export const ACTION_STAGES = ["preparation", "backswing", "forward_swing", "impact", "follow_through"] as const;
export type ActionStage = typeof ACTION_STAGES[number];

// User schema from the existing schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Analysis schema for tennis motion analysis
export const analyses = pgTable("analyses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(), // "image" or "video"
  originalFileName: text("original_file_name").notNull(),
  detectedStage: text("detected_stage").$type<ActionStage>(),
  actionDate: timestamp("action_date").defaultNow(),
  
  // Scores for different aspects
  preparationScore: integer("preparation_score"), // 0-100
  swingScore: integer("swing_score"), // 0-100
  followThroughScore: integer("follow_through_score"), // 0-100
  
  // Store keypoints data for pose visualization
  keypoints: jsonb("keypoints"),
  
  // Store feedback and improvement suggestions
  observations: jsonb("observations"),
  suggestions: jsonb("suggestions"),
});

// Insert schema for analysis
export const insertAnalysisSchema = createInsertSchema(analyses)
  .omit({ id: true })
  .extend({
    detectedStage: z.enum(ACTION_STAGES).optional(),
    keypoints: z.array(z.object({
      x: z.number(),
      y: z.number(),
      part: z.string(),
      score: z.number().optional(),
    })).optional(),
    observations: z.array(z.object({
      text: z.string(),
      type: z.enum(["positive", "warning", "negative"]),
    })).optional(),
    suggestions: z.array(z.string()).optional(),
  });

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertAnalysis = z.infer<typeof insertAnalysisSchema>;
export type Analysis = typeof analyses.$inferSelect;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});
