import type { ActionStage } from "@shared/schema";

/**
 * Formats an action stage for display
 * @param stage The action stage to format
 * @returns Formatted stage string
 */
export function formatActionStage(stage?: ActionStage): string {
  if (!stage) return "Unknown";
  return stage.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Gets appropriate color class based on score value
 * @param score The score value (0-100)
 * @returns Tailwind CSS class name for the color
 */
export function getScoreColorClass(score: number): string {
  if (score >= 85) return "text-green-600";
  if (score >= 70) return "text-yellow-600";
  return "text-red-600";
}

/**
 * Gets appropriate background color class based on score value
 * @param score The score value (0-100)
 * @returns Tailwind CSS class name for the background color
 */
export function getScoreBgColorClass(score: number): string {
  if (score >= 85) return "bg-green-100";
  if (score >= 70) return "bg-yellow-100";
  return "bg-red-100";
}

/**
 * Calculates overall score from individual component scores
 * @param preparationScore Preparation score (0-100)
 * @param swingScore Swing score (0-100)
 * @param followThroughScore Follow-through score (0-100)
 * @returns Overall score (0-100)
 */
export function calculateOverallScore(
  preparationScore: number,
  swingScore: number,
  followThroughScore: number
): number {
  return Math.round((preparationScore + swingScore + followThroughScore) / 3);
}

/**
 * Generates a descriptive rating based on score
 * @param score The score value (0-100)
 * @returns Text description of the score
 */
export function getScoreRating(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Very Good";
  if (score >= 70) return "Good";
  if (score >= 60) return "Fair";
  if (score >= 50) return "Needs Improvement";
  return "Poor";
}
