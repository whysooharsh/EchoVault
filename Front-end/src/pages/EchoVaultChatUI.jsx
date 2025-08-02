import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BACKEND_URL } from "../components/config";

function ChatInterface({ activeCard: propActiveCard }) {
  const location = useLocation();
  
  const activeCard = propActiveCard || location.state?.activeCard;
  
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message, isTyping]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const lockedMessage = (activeCard && typeof activeCard.description === 'string') 
      ? activeCard.description 
      : "";

    if (!activeCard || !lockedMessage) {
      setMessage((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "ai",
          content: "Sorry, no card context is available for this chat. Please navigate from a specific unlocked card to chat about it.",
          timestamp: new Date(),
        },
      ]);
      return;
    }

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessage((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await handleChat({
        query: input,
        lockedMessage: lockedMessage,
      });

      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: response.reply || "No response from Gemini.",
        timestamp: new Date(),
      };
      setMessage((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessage((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "ai",
          content: err.message || "Oops! Something went wrong with Gemini.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  async function handleChat({ query, lockedMessage }) {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/generate`, {
        query: typeof query === 'string' ? query : "",
        lockedMessage: typeof lockedMessage === 'string' ? lockedMessage : "",
        conversationHistory: message 
      });
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMsg = err.response?.data?.error || "API error";
        throw new Error(errorMsg);
      } else {
        throw new Error("Unexpected error");
      }
    }
  }

  return (
    <div className="h-screen bg-[wheat] flex justify-center p-6 lg:px-24 overflow-hidden">
      <div
        className="
          w-full max-w-4xl h-full flex flex-col
          bg-white/10        
          backdrop-blur-md   
          border border-white/20 
          rounded-xl shadow-lg shadow-black/20 
          transition-all duration-300
        "
      >
     
        <div className="flex-shrink-0 relative flex items-center justify-center py-6 px-6 border-b border-white/20">
          <h1 className="text-xl font-semibold">Conversational Agent</h1>
          
          {activeCard && (
            <div className="absolute right-6 text-sm text-gray-600 bg-white/20 px-3 py-1 rounded-lg">
              Chatting about: {activeCard.title}
            </div>
          )}
        </div>


        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {message.length === 0 && (
              <div className="text-zinc-700 text-center space-y-4">
                {activeCard ? (
                  <div className="bg-white/20 rounded-lg p-6 border border-white/30">
                    <h3 className="font-semibold mb-2">💭 Your Past Message:</h3>
                    <p className="text-sm italic mb-4 bg-white/10 p-3 rounded">
                      "{activeCard.description}"
                    </p>
                    <p className="text-xs text-gray-600">
                      You can ask questions like: "Did I achieve this goal?", "How can I improve?", "What should I do next?", or just say "hi" to start reflecting!
                    </p>
                  </div>
                ) : (
                  <div className="text-sm italic">
                    Chat with your past self. Try sending a text...
                  </div>
                )}
              </div>
            )}
            
            {message.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex flex-col items-start max-w-[75%]">
                  <div
                    className={`p-3 rounded-xl border ${
                      msg.type === "ai"
                        ? "bg-white/90 border-[#E07155]/30 text-[#242021]"
                        : "bg-[#E39682]/20 text-[#242021]"
                    }`}
                  >
                    <p className="text-sm leading-relaxed font-light">
                      {msg.content}
                    </p>
                  </div>
                  <div
                    className={`text-sm font-mono text-[#6E6059] mt-1 ${
                      msg.type === "user" ? "text-right self-end" : ""
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex flex-col items-start max-w-[75%]">
                  <div className="p-3 rounded-xl border bg-white/90 border-[#E07155]/30 text-[#242021]">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="flex-shrink-0 p-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center overflow-hidden rounded-2xl backdrop-blur-xl border border-[#E39682]/30 bg-white/20 shadow-lg">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={activeCard 
                  ? `Ask about "${activeCard.title}" or say "hi" to start...` 
                  : "are you proud of yourself ?"
                }
                className="flex-1 bg-transparent text-[#242021] placeholder:text-[#6E6059] px-4 py-4 focus:outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-[#D25D5D] hover:bg-[#bd6c5d] disabled:opacity-30 px-5 py-5 text-white transition-all disabled:cursor-not-allowed"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="m22 2-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;