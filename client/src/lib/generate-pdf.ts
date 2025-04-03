import type { Analysis } from "@shared/schema";
import { jsPDF } from "jspdf";
import "jspdf/dist/polyfills.es.js";

export async function generatePDF(analysis: Analysis): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      // Create a new PDF document
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      // Add title
      doc.setFontSize(22);
      doc.setTextColor(76, 175, 80); // Green color
      doc.text("TennisAI Analysis Report", 105, 20, { align: "center" });
      
      // Add date
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      const date = new Date(analysis.actionDate).toLocaleDateString();
      doc.text(`Generated on: ${date}`, 105, 30, { align: "center" });
      
      // Add detected stage
      doc.setFontSize(16);
      doc.setTextColor(50, 50, 50);
      const formattedStage = analysis.detectedStage
        ? analysis.detectedStage.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())
        : "Unknown";
      doc.text(`Detected Action Stage: ${formattedStage}`, 20, 45);
      
      // Add scores section
      doc.setFontSize(16);
      doc.text("Performance Scores", 20, 60);
      
      // Draw score boxes
      doc.setFillColor(240, 240, 240);
      doc.roundedRect(20, 65, 50, 30, 3, 3, "F");
      doc.roundedRect(80, 65, 50, 30, 3, 3, "F");
      doc.roundedRect(140, 65, 50, 30, 3, 3, "F");
      
      // Add score labels
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text("Preparation", 45, 75, { align: "center" });
      doc.text("Swing", 105, 75, { align: "center" });
      doc.text("Follow-Through", 165, 75, { align: "center" });
      
      // Add score values
      doc.setFontSize(16);
      doc.setTextColor(76, 175, 80);
      doc.text(`${analysis.preparationScore}%`, 45, 85, { align: "center" });
      doc.text(`${analysis.swingScore}%`, 105, 85, { align: "center" });
      doc.text(`${analysis.followThroughScore}%`, 165, 85, { align: "center" });
      
      // Add observations section
      doc.setFontSize(16);
      doc.setTextColor(50, 50, 50);
      doc.text("Key Observations", 20, 110);
      
      // Add observations
      doc.setFontSize(12);
      if (analysis.observations && analysis.observations.length > 0) {
        let yPosition = 120;
        analysis.observations.forEach((obs, index) => {
          let prefix = "";
          if (obs.type === "positive") {
            doc.setTextColor(76, 175, 80);
            prefix = "✓ ";
          } else if (obs.type === "warning") {
            doc.setTextColor(255, 152, 0);
            prefix = "! ";
          } else {
            doc.setTextColor(244, 67, 54);
            prefix = "✗ ";
          }
          
          doc.text(`${prefix}${obs.text}`, 25, yPosition);
          yPosition += 10;
        });
      } else {
        doc.setTextColor(100, 100, 100);
        doc.text("No observations available", 25, 120);
      }
      
      // Add suggestions section
      doc.setFontSize(16);
      doc.setTextColor(50, 50, 50);
      let suggestionsY = analysis.observations?.length 
        ? 130 + analysis.observations.length * 10
        : 130;
      
      doc.text("Improvement Suggestions", 20, suggestionsY);
      
      // Add suggestions
      doc.setFontSize(12);
      doc.setTextColor(50, 50, 50);
      if (analysis.suggestions && analysis.suggestions.length > 0) {
        let yPosition = suggestionsY + 10;
        analysis.suggestions.forEach((suggestion, index) => {
          doc.text(`${index + 1}. ${suggestion}`, 25, yPosition);
          yPosition += 10;
        });
      } else {
        doc.setTextColor(100, 100, 100);
        doc.text("No suggestions available", 25, suggestionsY + 10);
      }
      
      // Add footer
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text("Powered by TennisAI - Advanced Tennis Action Analysis", 105, 280, { align: "center" });
      
      // Convert to blob and resolve promise
      const pdfBlob = doc.output("blob");
      resolve(pdfBlob);
    } catch (error) {
      console.error("Error generating PDF:", error);
      reject(error);
    }
  });
}
