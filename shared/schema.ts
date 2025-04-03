import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Tennis Analysis Schema
export const tennisAnalyses = pgTable("tennis_analyses", {
  id: serial("id").primaryKey(),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(), // image or video
  fileSize: integer("file_size").notNull(), // in bytes
  actionType: text("action_type").notNull(), // forehand, backhand, serve, etc.
  actionStage: text("action_stage").notNull(), // backswing, forward swing, impact, follow-through
  preparationScore: integer("preparation_score").notNull(), // 0-100
  swingPathScore: integer("swing_path_score").notNull(), // 0-100
  bodyPositionScore: integer("body_position_score").notNull(), // 0-100
  followThroughScore: integer("follow_through_score").notNull(), // 0-100
  overallScore: integer("overall_score").notNull(), // 0-100
  feedback: text("feedback").notNull(),
  suggestions: text("suggestions").array(),
  poseKeypoints: json("pose_keypoints"), // JSON array of keypoints
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTennisAnalysisSchema = createInsertSchema(tennisAnalyses).omit({
  id: true,
  createdAt: true,
});

export const uploadFileSchema = z.object({
  fileName: z.string().min(1),
  fileType: z.string().min(1),
  fileSize: z.number().positive(),
  fileData: z.string().min(1), // base64 encoded file data
});

export type InsertTennisAnalysis = z.infer<typeof insertTennisAnalysisSchema>;
export type TennisAnalysis = typeof tennisAnalyses.$inferSelect;
export type UploadFile = z.infer<typeof uploadFileSchema>;
