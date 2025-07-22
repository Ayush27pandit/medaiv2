// import axios from 'axios';

// const OPENROUTER_API_KEY = ; // TODO: Replace with your actual API key
// const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
// const HTTP_REFERER = 'http://localhost'; // TODO: Set your app's URL
// const X_TITLE = 'MedAI';

// // Helper to get headers
// function getHeaders() {
//   return {
//     'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
//     'HTTP-Referer': HTTP_REFERER,
//     'X-Title': X_TITLE,
//     'Content-Type': 'application/json',
//   };
// }

// // Analyze medicine image
// export async function analyzeMedicineImage(imageBase64: string) {
//   // You may need to adjust the payload based on OpenRouter's requirements
//   const data = {
//     model: 'deepseek/deepseek-chat-v3-0324:free',
//     messages: [
//       {
//         role: 'system',
//         content: 'You are a medical AI assistant. Analyze the following medicine image and extract: Name, Usage, Dosage (by age), Side Effects, Precautions, Alternatives, Buy Links. and in response dont use any character like # , * , etc.'
//       },
//       {
//         role: 'user',
//         content: `data:image/jpeg;base64,${imageBase64}`
//       }
//     ],
//   };
//   const response = await axios.post(OPENROUTER_API_URL, data, { headers: getHeaders() });
//   return response.data;
// }

// // Analyze health report PDF text
// export async function analyzeHealthReport(reportText: string) {
//   const data = {
//     model: 'deepseek/deepseek-chat-v3-0324:free',
//     messages: [
//       {
//         role: 'system',
//         content: 'You are a medical AI assistant. Analyze the following health report and provide a summary with key insights.'
//       },
//       {
//         role: 'user',
//         content: reportText
//       }
//     ],
//   };
//   const response = await axios.post(OPENROUTER_API_URL, data, { headers: getHeaders() });
//   return response.data;
// } 

// utils/api.ts

import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const OPENROUTER_API_KEY = process.env.AI_API;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const HTTP_REFERER = 'http://localhost';
const X_TITLE = 'MedAI';

function getHeaders() {
  return {
    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
    'HTTP-Referer': HTTP_REFERER,
    'X-Title': X_TITLE,
    'Content-Type': 'application/json',
  };
}

export async function analyzeMedicineImage(imageBase64: string) {
  const data = {
    model: 'deepseek/deepseek-chat-v3-0324:free',
    messages: [
      {
        role: 'system',
        content: `
      You are a medical AI assistant. Analyze the following medicine image and extract the following:
      
      Return ONLY a valid JSON object in this exact structure:
      
      {
        "name": "string",
        "usage": "string",
        "dosage": {
          "children": "string",
          "adults": "string"
        },
        "sideEffects": "string",
        "precautions": "string",
        "alternatives": ["string"],
        "buyLinks": ["string"]
      }
       Do NOT include any markdown, text before or after the JSON, or invalid characters. Only reply with raw JSON and double quotes.`
      }      
      ,
      {
        role: 'user',
        content: `data:image/jpeg;base64,${imageBase64}`
      }
    ]
  };

  const response = await axios.post(OPENROUTER_API_URL, data, { headers: getHeaders() });
  return response.data;
}
