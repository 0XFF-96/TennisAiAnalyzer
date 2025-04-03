import { DetailedAnalysis, ActionStage } from './types';

// Sample data for detailed stroke analysis based on the image
export const sampleStrokeAnalysis: DetailedAnalysis = {
  stageScores: [
    { name: 'preparation', label: 'Preparation', score: 8.4, maxScore: 10 },
    { name: 'backswing', label: 'Backswing', score: 7.2, maxScore: 10 },
    { name: 'contact', label: 'Contact', score: 8.7, maxScore: 10 },
    { name: 'follow_through', label: 'Follow-through', score: 6.9, maxScore: 10 }
  ],
  phaseAnalyses: {
    preparation: {
      stageName: 'preparation',
      stageLabel: 'Preparation',
      score: 8.4,
      observations: [
        { 
          text: "Excellent Grip Position:Your eastern forehand grip is well-positioned, allowing for good control and power generation.", 
          type: "positive" 
        },
        { 
          text: "Good Footwork:You're properly positioned with your feet shoulder-width apart, creating a stable base.", 
          type: "positive" 
        },
        { 
          text: "Adjust Shoulder Rotation:Your shoulders could rotate more fully during preparation to generate additional power.", 
          type: "negative" 
        }
      ],
      improvementSuggestion: "Try turning your shoulders more during the preparation phase. Aim to have your back shoulder pointing more toward the net to create better rotation potential."
    },
    backswing: {
      stageName: 'backswing',
      stageLabel: 'Backswing',
      score: 7.2,
      observations: [
        { 
          text: "Good Racket Position:Your racket is properly positioned behind you at the right height.", 
          type: "positive" 
        },
        { 
          text: "Limited Hip Rotation:Your hips aren't rotating enough during backswing which limits power generation.", 
          type: "negative" 
        },
        { 
          text: "Elbow Position:Keep your elbow slightly more tucked in for better control.", 
          type: "warning" 
        }
      ],
      improvementSuggestion: "Focus on rotating your hips more during backswing to generate better power transfer from the ground up."
    },
    contact: {
      stageName: 'contact',
      stageLabel: 'Contact',
      score: 8.7,
      observations: [
        { 
          text: "Excellent Contact Point:You're making contact with the ball at the optimal point in front of your body.", 
          type: "positive" 
        },
        { 
          text: "Good Eye Focus:Your eyes are fixed on the ball through the contact point.", 
          type: "positive" 
        },
        { 
          text: "Wrist Stability:Maintain a slightly firmer wrist at contact for better control.", 
          type: "warning" 
        }
      ],
      improvementSuggestion: "Try to maintain a slightly firmer wrist at contact to improve consistency and control."
    },
    follow_through: {
      stageName: 'follow_through',
      stageLabel: 'Follow-through',
      score: 6.9,
      observations: [
        { 
          text: "Decent Follow-through Height:Your racket finishes at a good height.", 
          type: "positive" 
        },
        { 
          text: "Limited Extension:You're not fully extending through the shot which reduces power.", 
          type: "negative" 
        },
        { 
          text: "Balance Issues:Your weight transfer isn't complete, leaving you slightly off-balance.", 
          type: "negative" 
        }
      ],
      improvementSuggestion: "Work on extending your follow-through more completely, allowing your weight to transfer fully to your front foot."
    }
  },
  activeStage: 'preparation'
};