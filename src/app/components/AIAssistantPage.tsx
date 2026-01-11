import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, ArrowUp } from "lucide-react";

interface Message {
  id: number;
  type: "user" | "bot";
  text: string;
  timestamp: Date;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      text: "Hello! I'm Wise, your personal assistant. I can help you with export procedures, permit applications, trade regulations, and more. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "Export license process",
    "PSI inspection locations",
    "Required documents",
    "Permit requirements",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      text: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        type: "bot",
        text: getBotResponse(inputText),
        timestamp: new Date(),
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botResponse]);
    }, 1200);
  };

  const getBotResponse = (question: string): string => {
    const lower = question.toLowerCase();

    if (lower.includes("license") || lower.includes("apply") || lower.includes("export")) {
      return "To apply for an export license:\n\n1. Register on the JSWIFT portal\n2. Complete the application form\n3. Upload required documents\n4. Submit and await approval (3-5 business days)\n\nWould you like more details?";
    }

    if (lower.includes("psi") || lower.includes("inspection")) {
      return "PSI locations in Jamaica:\n\n• Kingston - Main Port\n• Montego Bay - Freeport\n• Ocho Rios - Port Area\n\nSchedule via JSWIFT portal or call our PSI hotline.";
    }

    if (lower.includes("document")) {
      return "Required export documents:\n\n• Commercial invoice\n• Packing list\n• Bill of lading\n• Certificate of origin\n• Export license (if applicable)\n\nRequirements vary by product and destination.";
    }

    return "I can help with export procedures, licensing, PSI inspections, and trade regulations. Could you be more specific about what you'd like to know?";
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Minimal Header */}
      <div className="px-4 py-4 border-b border-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-semibold">Wise</h1>
          <p className="text-xs text-muted-foreground">Your personal assistant</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-4 max-w-2xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.type === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {message.type === "bot" && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.type === "bot"
                    ? "bg-muted"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-muted rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Questions - only show initially */}
      {messages.length === 1 && (
        <div className="px-4 pb-3">
          <div className="flex flex-wrap gap-2 justify-center">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="text-xs bg-muted rounded-full px-4 py-2 hover:bg-muted/80 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Modern Input Area */}
      <div className="px-4 py-3 border-t border-border">
        <div className="max-w-2xl mx-auto">
          <div className="relative bg-muted rounded-2xl">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask anything..."
              rows={3}
              className="w-full px-4 py-3 pb-12 bg-transparent rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="absolute right-3 bottom-3 w-9 h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/90 transition-all"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
