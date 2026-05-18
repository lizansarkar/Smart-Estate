'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Sparkles,
  Home,
  Search,
  Lightbulb,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

const AIChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI Property Assistant. I can help you find the perfect property, answer questions about real estate, or provide personalized recommendations. What are you looking for today?",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        "Find apartments in Gulshan under ৳30L",
        "What are the best family neighborhoods in Dhaka?",
        "Help me understand property taxes",
        "Show me luxury villas with pools"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();

    if (input.includes('gulshan') && input.includes('apartment')) {
      return {
        id: Date.now().toString(),
        content: "Based on your interest in Gulshan apartments, I found several excellent options! Here are some recommendations:\n\n🏢 **Modern 3BR Apartment** - ৳28L, 1,800 sq ft, with parking\n🏢 **Luxury Corner Unit** - ৳32L, 2,200 sq ft, city views\n🏢 **Penthouse Suite** - ৳45L, 2,800 sq ft, private terrace\n\nWould you like me to show you more details about any of these properties or help you schedule a viewing?",
        sender: 'ai',
        timestamp: new Date(),
        suggestions: [
          "Show me photos of the corner unit",
          "Schedule a tour for tomorrow",
          "What are the nearby amenities?",
          "Compare these with Dhanmondi options"
        ]
      };
    }

    if (input.includes('family') && input.includes('neighborhood')) {
      return {
        id: Date.now().toString(),
        content: "For families looking for the best neighborhoods in Dhaka, I recommend:\n\n🏘️ **Dhanmondi** - Excellent schools, parks, and family-friendly atmosphere\n🏘️ **Gulshan** - Safe, upscale area with international schools\n🏘️ **Banani** - Green spaces, good infrastructure, family-oriented\n🏘️ **Baridhara** - Modern amenities, security, growing family community\n\nEach area has different price ranges and property types. What size family are you looking for housing, and what's your budget range?",
        sender: 'ai',
        timestamp: new Date(),
        suggestions: [
          "Show me family houses in Dhanmondi",
          "What's the school quality like?",
          "Compare safety ratings",
          "Find properties with gardens"
        ]
      };
    }

    if (input.includes('tax') || input.includes('cost')) {
      return {
        id: Date.now().toString(),
        content: "Here's a breakdown of typical property-related costs in Bangladesh:\n\n💰 **Property Transfer Tax**: 7.5% of property value\n💰 **Registration Fee**: 1% of property value\n💰 **Stamp Duty**: Varies by property type (2-7%)\n💰 **Legal Fees**: 0.5-1% of property value\n💰 **Annual Holding Tax**: 0.2-0.5% of property value\n\nThese costs vary by location and property type. For investment properties, you might also consider:\n• Maintenance costs (1-2% annually)\n• Property management fees\n• Insurance premiums\n\nWould you like me to help you calculate costs for a specific property?",
        sender: 'ai',
        timestamp: new Date(),
        suggestions: [
          "Calculate costs for a ৳50L property",
          "Explain stamp duty in detail",
          "What about rental property taxes?",
          "Help with investment analysis"
        ]
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      content: "I'd be happy to help you with your property search! I can assist with:\n\n🏠 Finding properties in specific areas or price ranges\n📊 Providing market insights and investment advice\n📅 Scheduling property tours and viewings\n💡 Answering questions about buying, selling, or renting\n📈 Analyzing property values and trends\n\nWhat specific information are you looking for? Feel free to ask about any aspect of real estate in Bangladesh!",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        "Find properties in my budget",
        "Explain the buying process",
        "Show me market trends",
        "Help me find an agent"
      ]
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Home className="h-6 w-6" />
                <span className="font-semibold">Back to Home</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Sparkles className="h-4 w-4 mr-1" />
                AI Assistant
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Chat Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bot className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold font-playfair text-foreground mb-2">
            AI Property Assistant
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get personalized property recommendations, market insights, and answers to all your real estate questions.
            Powered by advanced AI technology.
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-card rounded-2xl border shadow-lg overflow-hidden">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex space-x-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>

                  {/* Message Content */}
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex space-x-3 max-w-[80%]">
                  <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Suggestions */}
            {messages.length > 0 && messages[messages.length - 1].suggestions && !isTyping && (
              <div className="flex flex-wrap gap-2 mt-4">
                {messages[messages.length - 1].suggestions?.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex space-x-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about properties..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span>💡 Try asking about specific locations, budgets, or property types</span>
              </div>
              <div className="flex items-center space-x-1">
                <Lightbulb className="h-3 w-3" />
                <span>AI Powered</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-card rounded-lg p-6 text-center border">
            <Search className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Smart Search</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered search that understands your preferences and finds the perfect matches.
            </p>
          </div>
          <div className="bg-card rounded-lg p-6 text-center border">
            <Lightbulb className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Market Insights</h3>
            <p className="text-sm text-muted-foreground">
              Get real-time market analysis and investment recommendations.
            </p>
          </div>
          <div className="bg-card rounded-lg p-6 text-center border">
            <MessageSquare className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">24/7 Support</h3>
            <p className="text-sm text-muted-foreground">
              Always available to answer your questions and guide your decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatPage;