import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const OCR_SPACE_API_KEY = 'K84980331388957'; // <-- Replace with your real OCR.space API key

export async function extractTextFromImage(imageUri: string): Promise<string> {
  try {
    // Read the image as base64 using expo-file-system
    const base64data = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });
    console.log('Base64 length:', base64data.length);
    console.log('Base64 preview:', base64data.slice(0, 100));

    // Prepare form data
    const formData = new FormData();
    formData.append('apikey', OCR_SPACE_API_KEY);
    formData.append('base64Image', `data:image/jpeg;base64,${base64data}`);
    formData.append('language', 'eng');
    formData.append('isOverlayRequired', 'false');
    console.log('FormData for OCR.space:', formData);

    const ocrRes = await axios.post(
      'https://api.ocr.space/parse/image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log('OCR.space response:', ocrRes.data);
    const parsedText = ocrRes.data?.ParsedResults?.[0]?.ParsedText || '';
    return parsedText;
  } catch (err) {
    console.error('OCR.space error:', err);
    throw new Error('Failed to process image for OCR.');
  }
} 