import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InfoIcon } from "lucide-react";
import { TennisAnalysis } from "@shared/schema";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

interface AnalysisReportProps {
  analysis: TennisAnalysis;
  imageUrl: string;
}

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  subtitle: {
    fontSize: 14,
    color: '#757575',
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  infoLabel: {
    width: '40%',
    fontSize: 12,
    color: '#757575',
  },
  infoValue: {
    width: '60%',
    fontSize: 12,
    color: '#424242',
    fontWeight: 'bold',
  },
  scoreContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  scoreLabel: {
    width: '50%',
    fontSize: 12,
    color: '#757575',
  },
  scoreValue: {
    width: '15%',
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  scoreBar: {
    width: '35%',
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  scoreIndicator: {
    height: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  feedback: {
    fontSize: 12,
    color: '#424242',
    marginBottom: 10,
    lineHeight: 1.5,
  },
  suggestionItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bullet: {
    width: 10,
    fontSize: 12,
    color: '#4CAF50',
  },
  suggestionText: {
    flex: 1,
    fontSize: 12,
    color: '#424242',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
    fontSize: 10,
    color: '#757575',
    textAlign: 'center',
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    objectFit: 'contain',
  },
});

// PDF Document Component
const AnalysisPDF = ({ analysis, imageUrl }: AnalysisReportProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>TennisAI Analysis Report</Text>
        <Text style={styles.subtitle}>Generated on {new Date().toLocaleDateString()}</Text>
      </View>
      
      <View style={styles.imageContainer}>
        <Image source={imageUrl} style={styles.image} />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Analysis Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Action Type:</Text>
          <Text style={styles.infoValue}>{analysis.actionType}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Action Stage:</Text>
          <Text style={styles.infoValue}>{analysis.actionStage}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Analysis Date:</Text>
          <Text style={styles.infoValue}>{new Date(analysis.createdAt).toLocaleDateString()}</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Scores</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Preparation</Text>
          <Text style={styles.scoreValue}>{analysis.preparationScore}%</Text>
          <View style={styles.scoreBar}>
            <View style={[styles.scoreIndicator, { width: `${analysis.preparationScore}%` }]} />
          </View>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Swing Path</Text>
          <Text style={styles.scoreValue}>{analysis.swingPathScore}%</Text>
          <View style={styles.scoreBar}>
            <View style={[styles.scoreIndicator, { width: `${analysis.swingPathScore}%` }]} />
          </View>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Body Position</Text>
          <Text style={styles.scoreValue}>{analysis.bodyPositionScore}%</Text>
          <View style={styles.scoreBar}>
            <View style={[styles.scoreIndicator, { width: `${analysis.bodyPositionScore}%` }]} />
          </View>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Follow Through</Text>
          <Text style={styles.scoreValue}>{analysis.followThroughScore}%</Text>
          <View style={styles.scoreBar}>
            <View style={[styles.scoreIndicator, { width: `${analysis.followThroughScore}%` }]} />
          </View>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Overall Score</Text>
          <Text style={styles.scoreValue}>{analysis.overallScore}%</Text>
          <View style={styles.scoreBar}>
            <View style={[styles.scoreIndicator, { width: `${analysis.overallScore}%` }]} />
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Feedback</Text>
        <Text style={styles.feedback}>{analysis.feedback}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Improvement Suggestions</Text>
        {analysis.suggestions.map((suggestion, index) => (
          <View key={index} style={styles.suggestionItem}>
            <Text style={styles.bullet}>• </Text>
            <Text style={styles.suggestionText}>{suggestion}</Text>
          </View>
        ))}
      </View>
      
      <Text style={styles.footer}>
        © {new Date().getFullYear()} TennisAI - AI-Powered Tennis Analysis
      </Text>
    </Page>
  </Document>
);

export default function AnalysisReport({ analysis, imageUrl }: AnalysisReportProps) {
  return (
    <div>
      <h3 className="font-bold text-xl text-gray-800 mb-4">Professional Feedback</h3>
      <Card className="mb-6">
        <CardContent className="pt-4">
          <p className="text-gray-700 mb-4">
            {analysis.feedback}
          </p>
          <h4 className="font-medium text-gray-800 mb-2">Improvement Suggestions:</h4>
          <ul className="text-gray-700 space-y-2 list-disc pl-5">
            {analysis.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <PDFDownloadLink 
          document={<AnalysisPDF analysis={analysis} imageUrl={imageUrl} />} 
          fileName={`tennis_analysis_${analysis.id}.pdf`}
          className="flex-1"
        >
          {({ loading }) => (
            <Button 
              className="bg-[#4CAF50] hover:bg-[#388E3C] text-white w-full flex items-center justify-center"
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              {loading ? 'Generating PDF...' : 'Generate PDF Report'}
            </Button>
          )}
        </PDFDownloadLink>
        
        <Button 
          variant="outline" 
          className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white flex items-center justify-center"
          onClick={() => window.location.href = "/analysis"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          New Analysis
        </Button>
      </div>
      
      <div className="mt-4 flex items-center">
        <InfoIcon className="h-4 w-4 text-blue-600 mr-2" />
        <a href="#" className="text-blue-600 text-sm font-medium">About this analysis</a>
      </div>
    </div>
  );
}
