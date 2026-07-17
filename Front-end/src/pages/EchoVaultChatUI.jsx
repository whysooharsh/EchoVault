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
        let errorMsg = err.response?.data?.error || "API error";
        if (typeof errorMsg === 'string' && (errorMsg.includes("API key not valid") || errorMsg.includes("API_KEY_INVALID"))) {
           errorMsg = "Your Gemini API key is invalid or missing. Please double-check your .env file and restart the server.";
        }
        throw new Error(errorMsg);
      } else {
        throw new Error("Unexpected error");
      }
    }
  }

  return (
    <div className="h-screen bg-transparent flex justify-center p-6 lg:px-24 overflow-hidden relative">
      <div
        className="
          w-full max-w-4xl h-full flex flex-col
          bg-[#fdf8e7]        
          shadow-2xl shadow-vintage-ink/30 
          transition-all duration-300 relative z-10
        "
      >
     
        <div className="flex-shrink-0 relative flex flex-col items-center justify-center py-8 px-6 border-b border-vintage-ink/20 bg-transparent z-20">
          <h1 className="text-4xl font-serif font-bold text-vintage-ink drop-shadow-sm tracking-wide">The Memory Vault</h1>
          
          {activeCard && (
            <div className="mt-3 text-sm font-serif italic text-vintage-ink/70 tracking-widest uppercase">
              ~ {activeCard.title} ~
            </div>
          )}
        </div>


        <div className="flex-1 overflow-y-auto px-8 py-12" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}>
          <div className="max-w-2xl mx-auto space-y-8">
            {message.length === 0 && (
              <div className="text-vintage-ink/80 text-center space-y-6 animate-in fade-in duration-1000">
                {activeCard ? (
                  <div className="p-8">
                    <p className="text-xl font-serif italic mb-8 text-vintage-ink leading-relaxed whitespace-pre-wrap">
                      {activeCard.description}
                    </p>
                    <div className="w-16 h-px bg-vintage-ink/30 mx-auto mb-8"></div>
                    <p className="text-sm font-serif tracking-widest text-vintage-ink/50 uppercase">
                      The ink has dried. What would you like to ask the magic?
                    </p>
                  </div>
                ) : (
                  <div className="text-xl font-serif italic mt-20 text-vintage-ink/60">
                    The pages are blank. Begin your incantation...
                  </div>
                )}
              </div>
            )}
            
            {message.map((msg) => (
              <div
                key={msg.id}
                className={`flex w-full animate-in fade-in slide-in-from-bottom-2 duration-700 ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className={`flex flex-col ${msg.type === "user" ? "items-end" : "items-start"} max-w-[85%]`}>
                  {msg.type === "user" ? (
                    <div className="text-right">
                      <p className="text-lg font-mono text-vintage-ink/80 leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                      </p>
                    </div>
                  ) : (
                    <div className="text-left">
                      <p className="text-2xl font-serif text-vintage-ink leading-relaxed whitespace-pre-wrap italic">
                        {msg.content}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-in fade-in duration-500">
                <div className="flex flex-col items-start">
                  <div className="text-2xl font-serif text-vintage-ink/50 italic flex space-x-1">
                    <span className="animate-pulse">.</span>
                    <span className="animate-pulse" style={{animationDelay: '0.2s'}}>.</span>
                    <span className="animate-pulse" style={{animationDelay: '0.4s'}}>.</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="flex-shrink-0 p-8 bg-transparent">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center border-b-2 border-vintage-ink/30 focus-within:border-vintage-ink transition-colors pb-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={activeCard 
                  ? `Write your inquiry...` 
                  : "Pen your thoughts here..."
                }
                className="flex-1 bg-transparent text-vintage-ink font-mono text-lg placeholder:text-vintage-ink/30 px-2 py-2 focus:outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="text-vintage-ink hover:text-magical-gold disabled:text-vintage-ink/20 px-4 py-2 transition-colors disabled:cursor-not-allowed"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="transform rotate-90"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
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