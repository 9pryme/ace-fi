import { GoogleGenerativeAI } from '@google/generative-ai';

// Replace with your API key
const API_KEY = 'YOUR_GEMINI_API_KEY';

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(API_KEY);

export const startConversation = async () => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const chat = model.startChat({
    history: [
      {
        role: 'user',
        parts: 'You are an AI assistant for a crypto exchange app called Ace-Fi. You should be friendly and professional. Keep your responses concise.',
      },
      {
        role: 'model',
        parts: 'I understand. I will act as a friendly and professional AI assistant for Ace-Fi, keeping my responses concise and focused on helping users with their crypto exchange needs.',
      },
    ],
  });

  return chat;
};

export const generateResponse = async (chat: any, message: string) => {
  try {
    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating AI response:', error);
    return 'I apologize, but I encountered an error. Please try again.';
  }
}; 