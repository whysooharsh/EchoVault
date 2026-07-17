import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Card({ title, description, unlockTime }) {
  const [flipped, setFlipped] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [isUnlocked, setIsUnlocked] = useState(new Date() >= new Date(unlockTime));

  useEffect(() => {
    if (isUnlocked) return;
    const timer = setInterval(() => {
      if (new Date() >= new Date(unlockTime)) {
        setIsUnlocked(true);
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [unlockTime, isUnlocked]);

  const handleCardClick = () => {
    if (isUnlocked) {
      setShowPopup(true);
    } else {
      setFlipped(!flipped);
    }
  };

  const handleChatNavigation = () => {
    const cardData = {
      title,
      description,
      unlockTime
    };

    
    navigate('/chat', { 
      state: { 
        activeCard: cardData
      }
    });
  };

  return (
    <>
      <div
        className="relative w-[300px] h-[400px] cursor-pointer group select-none"
        onClick={handleCardClick}
        tabIndex={0}
        role="button"
        aria-pressed={flipped}
      >
        <div
          className={`relative w-full h-full transition-transform duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
            !isUnlocked && flipped ? "[transform:rotateY(180deg)]" : ""
          } [transform-style:preserve-3d]`}
          style={{ perspective: "1200px" }}
        >
          <div className="absolute w-full h-full [backface-visibility:hidden] rounded-sm overflow-hidden bg-[#fdf8e7] shadow-lg border-4 border-double border-magical-gold/50 flex flex-col transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:border-magical-gold">
            <div className="px-6 py-4 border-b-2 border-magical-gold/30 flex justify-between items-center bg-[#f4ecd8]">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-serif font-bold uppercase tracking-wider ${
                  isUnlocked
                    ? "bg-green-900/10 text-green-800 border border-green-800/30"
                    : "bg-vintage-ink/10 text-vintage-ink border border-vintage-ink/30"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    isUnlocked ? "bg-green-700 shadow-[0_0_5px_rgba(22,101,52,0.8)]" : "bg-vintage-ink shadow-[0_0_5px_rgba(114,47,55,0.8)]"
                  }`}
                ></div>
                {isUnlocked ? "Seal Broken" : "Sealed"}
              </div>
              <span className="text-xs text-vintage-ink/60 font-mono">
                {new Date(unlockTime).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center text-center px-6 py-8 relative">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-inner ${
                  isUnlocked
                    ? "bg-[#f4ecd8] border-2 border-green-800/40"
                    : "bg-vintage-ink border-2 border-magical-gold"
                }`}
              >
                {isUnlocked ? (
                  <svg
                    className="w-8 h-8 text-green-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-8 h-8 text-magical-gold drop-shadow-md"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                    />
                  </svg>
                )}
              </div>

              <h2 className="text-2xl font-serif text-vintage-ink mb-3 leading-tight drop-shadow-sm">
                {title}
              </h2>

              <p className="text-sm text-vintage-ink/60 font-serif italic mb-6">
                {isUnlocked ? "Break the seal to read" : "Patience, the seal holds..."}
              </p>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-magical-gold/50 to-transparent"></div>
            </div>

            <div className="px-6 py-4 bg-[#f4ecd8] border-t-2 border-magical-gold/30">
              <div className="text-center">
                <span className="text-xs text-vintage-ink/80 uppercase tracking-widest font-mono">
                  {isUnlocked ? "Tap to open" : "Tap to inspect"}
                </span>
              </div>
            </div>
          </div>

          {!isUnlocked && (
            <div className="absolute w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-sm bg-[#fdf8e7] border-4 border-double border-magical-gold/50 shadow-lg flex flex-col transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:border-magical-gold">
              <div className="px-6 py-4 border-b-2 border-magical-gold/30 bg-[#f4ecd8]">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-serif text-vintage-ink">{title}</h3>
                  <button
                    className="text-magical-gold hover:text-vintage-ink transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFlipped(false);
                    }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex-1 px-6 py-6">
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-[#f4ecd8] border-2 border-magical-gold flex items-center justify-center mb-6 shadow-inner">
                    <svg
                      className="w-10 h-10 text-vintage-ink/50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>

                  <h4 className="text-2xl font-serif text-vintage-ink mb-2 drop-shadow-sm">
                    Time Sealed
                  </h4>
                  <p className="text-sm text-vintage-ink/60 font-serif italic mb-6">
                    This letter shall unlock on:
                  </p>

                  <div className="bg-[#f4ecd8] rounded-sm px-4 py-3 border border-magical-gold/40 shadow-inner">
                    <div className="text-sm font-mono font-bold text-gray-900 tracking-wider">
                      {new Date(unlockTime).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-sm font-mono text-vintage-ink mt-1">
                      {new Date(unlockTime).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showPopup && isUnlocked && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className="bg-[#fdf8e7] rounded-sm shadow-2xl border-4 border-double border-magical-gold/50 max-w-md w-full max-h-[80vh] overflow-hidden animate-in fade-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b-2 border-magical-gold/30 flex justify-between items-center bg-[#f4ecd8]">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-700/80 mr-3 border border-green-900 shadow-[0_0_8px_rgba(22,101,52,0.5)]"></div>
                <h3 className="text-2xl font-serif text-vintage-ink">{title}</h3>
              </div>
              <button
                className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
                onClick={() => setShowPopup(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
              <div className="mb-6">
              <div className="flex items-center mb-4 border-b border-magical-gold/20 pb-2">
                <span className="text-sm text-vintage-ink/70 font-serif italic">
                  A letter from your past:
                </span>
              </div>
              <div className="bg-[#f4ecd8] rounded-sm p-6 border border-magical-gold/40 shadow-inner">
                <p className="text-gray-900 font-serif leading-relaxed text-lg whitespace-pre-wrap">{description}</p>
              </div>
            </div>

            <div className="text-xs text-vintage-ink/60 mb-6 text-center font-mono tracking-widest uppercase">
              Seal broken on{" "}
              {new Date(unlockTime).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>

          <div className="px-6 py-5 border-t-2 border-magical-gold/30 bg-[#f4ecd8]">
            <button 
              onClick={handleChatNavigation} 
              className="w-full bg-vintage-ink text-[#f5deb3] py-3 px-4 rounded-md font-serif hover:bg-[#5a252b] border border-magical-gold transition-all duration-300 flex items-center justify-center shadow-md"
            >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Chat with Past Self
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}