import axios from 'axios';
import Constants from 'expo-constants';
import Markdown from 'react-native-markdown-display';

const OPENROUTER_API_KEY = Constants.expoConfig?.extra?.AI_API;
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
        content: `You are a medical AI assistant. Analyze the following medicine image and output ONLY the extracted medicine information in Markdown format. Use clear section headings (## Name, ## Usage, ## Dosage, etc.), bullet lists, and formatting as appropriate. Do NOT include any AI commentary, meta statements, or suggestions. Do NOT say what you were able or unable to extract. Only output the information itself, in valid Markdown.`
      },
      {
        role: 'user',
        content: `data:image/jpeg;base64,${imageBase64}`
      }
    ]
  };
  const response = await axios.post(OPENROUTER_API_URL, data, { headers: getHeaders() });
  return response.data;
}

export async function analyzeHealthReport(imageBase64: string) {
  const data = {
    model: 'deepseek/deepseek-chat-v3-0324:free',
    messages: [
      {
        role: 'system',
        content: `You are a medical AI assistant. Analyze the following health report image and output ONLY the extracted report information in Markdown format. Use clear section headings, bullet lists, and formatting as appropriate. Do NOT include any AI commentary, meta statements, or suggestions. Do NOT say what you were able or unable to extract. Only output the information itself, in valid Markdown.`
      },
      {
        role: 'user',
        content: `data:image/jpeg;base64,${imageBase64}`
      }
    ]
  };
  const response = await axios.post(OPENROUTER_API_URL, data, { headers: getHeaders() });
  return response.data;
}

export async function analyzeMedicineText(text: string) {
  const data = {
    model: 'deepseek/deepseek-chat-v3-0324:free',
    messages: [
      {
        role: 'system',
        content: `You are a medical assistant AI. You will be given extracted text from a medicine strip (front/back) or packet. Based strictly on this text, determine the medicine name and provide structured information in markdown format. Do not include any commentary, guesswork, disclaimers, or conversational phrases like "I think", "maybe", "it seems". Either return structured medicine data or say:\n\n"Sorry, I am not able to understand the medicine."\n\nIf the medicine is recognized, return the result in the following format:\n\n##  Name of Medicine:\n[Insert Medicine Name]\n\n##  Usage:\n[3–4 lines describing what the medicine is used for]\n\n##  Dosage (as per age):\n- Children (Below 12): ...\n- Teenagers (13–18): ...\n- Adults (18+): ...\n\n##  Side Effects:\n- ...\n\n##  Precautions:\n- ...\n\n## Alternatives:\n- ...\n\nNow analyze the following extracted text and respond in markdown only, without any additional explanation:\n\n`
      },
      {
        role: 'user',
        content: text
      }
    ]
  };
  const response = await axios.post(OPENROUTER_API_URL, data, { headers: getHeaders() });
  return response.data;
}

export async function analyzeHealthReportText(text: string) {
  const data = {
    model: 'deepseek/deepseek-chat-v3-0324:free',
    messages: [
      {
        role: 'system',
        content: `You are a medical assistant AI. You will be given extracted text from a health test report. Based strictly on this text, provide a structured summary in markdown format for a non-medical user. Do not include any commentary, guesswork, disclaimers, or conversational phrases like "I think", "maybe", "it seems". Either return structured report data or say:\n\n"Sorry, I am not able to understand the report."\n\nIf the report is recognized, return the result in the following format:\n\n##  Report Title:\n[Insert Report Title]\n\n##  Patient Name (if available):\n[Insert Patient Name]\n\n##  Summary/Advice:\n- [Summarize the overall patient condition in plain language. Give actionable advice if possible.]\n\n##  Key Findings:\n- [Summarize the main findings in simple language. For each abnormal value, explain what it means for the patient’s health.]\n\n##  Test Results:\n- Test: ...\n  - Value: ...\n  - Reference Range: ...\n  - **Interpretation:** [Is it normal, high, or low? What does this mean in simple terms?]\n- ...\n\n##  Doctor's Notes (if available):\n- ...\n\nNow analyze the following extracted text and respond in markdown only, without any additional explanation:\n\n`
      },
      {
        role: 'user',
        content: text
      }
    ]
  };
  const response = await axios.post(OPENROUTER_API_URL, data, { headers: getHeaders() });
  return response.data;
}
