import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  message: string;
  conversationHistory: Message[];
  suggestedProducts?: any[];
}

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (message: string): Promise<ChatResponse | null> => {
    if (!message.trim()) return null;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/chatbot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.trim(),
          conversationHistory: messages,
        }),
      });

      if (!response.ok) {
        throw new Error('Błąd komunikacji z chatbotem');
      }

      const data: ChatResponse = await response.json();
      setMessages(data.conversationHistory);
      
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Wystąpił nieoczekiwany błąd';
      setError(errorMessage);
      console.error('Błąd chatbota:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setError(null);
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
}
