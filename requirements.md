# MedAI - Medicine & Health Report Analyzer

## Project Overview
A React Native/Expo mobile app that analyzes medicine images and health test reports via AI (OpenRouter) and presents results in a user-friendly interface.

## Core Features
1. **Medicine Analyzer**:
   - Upload medicine image (box/tablet/strip)
   - AI extracts: Name, Usage, Dosage (by age), Side Effects, Precautions, Alternatives, Buy Links
   
2. **Health Report Analyzer**:
   - Upload health test reports (PDF)
   - AI generates easy-to-understand summary with key insights

## Technical Requirements

### Core Dependencies
```json
"dependencies": {
  "expo": "^50.0.0",
  "expo-file-system": "^16.0.0",
  "expo-image-picker": "^15.0.0",
  "expo-document-picker": "^12.0.0",
  "react-native-paper": "^5.0.0",
  "react-native-reanimated": "~3.6.0",
  "react-native-gesture-handler": "~2.14.0",
  "axios": "^1.6.0",
  "react-native-vector-icons": "^10.0.0",
  "react-native-render-html": "^8.0.0",
  "lottie-react-native": "^6.5.0",
  "react-native-pdf": "^8.1.0"
}
```
API Integration
OpenRouter API:
Docs: https://openrouter.ai/docs
Endpoint: https://openrouter.ai/api/v1/chat/completions
Required Headers:
Authorization: Bearer [API_KEY]
HTTP-Referer: [YOUR_URL]
X-Title: [YOUR_APP_NAME]
UI Components
Main Screen:

Two prominent buttons for each feature
App branding/logo
Clean, medical-themed design
Upload Screens:

Camera/Gallery selection for medicine image
Document picker for PDF reports
Preview of selected file
Upload button with loading indicator
Result Screens:

Beautifully formatted text output
Section headers for different information types
"Copy to Clipboard" functionality
Animation during processing
Error handling UI
Technical Considerations
Image compression before upload
PDF text extraction (for better AI context)
Network error handling
Rate limiting prevention
Dark/light mode support
Responsive layout for all screen sizes
Documentation Links
Expo: https://docs.expo.dev/
React Native: https://reactnative.dev/docs/getting-started
OpenRouter API: https://openrouter.ai/docs
React Native Paper: https://callstack.github.io/react-native-paper/
Lottie Animation: https://docs.expo.dev/versions/latest/sdk/lottie/
Project Structure

/src
  /components
    UploadButton.js
    ResultCard.js
    LoadingIndicator.js
  /screens
    HomeScreen.js
    MedicineUpload.js
    ReportUpload.js
    MedicineResults.js
    ReportResults.js
  /assets
    /animations
      loading.json
      success.json
    /images
      logo.png
  /services
    api.js
    imageProcessor.js
    pdfParser.js
  /styles
    theme.js
    globalStyles.js
App.js
Implementation Notes
Use expo-image-picker for camera/gallery access
Implement fluent animations between screens
All API calls should have proper error handling
Results should be cached locally for offline viewing
Use React Context for state management of uploads/results
Implement proper loading states throughout user flow