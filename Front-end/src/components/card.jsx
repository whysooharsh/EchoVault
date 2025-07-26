import { useState } from "react";

export default function Card({ title, description, unlockTime }) {
  const [flipped, setFlipped] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const isUnlocked = new Date() >= new Date(unlockTime);

  const handleCardClick = () => {
    if (isUnlocked) {
      setShowPopup(true);
    } else {
      setFlipped(!flipped);
    }
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
          className={`relative w-full h-full transition-transform duration-700 ease-out ${
            !isUnlocked && flipped ? "[transform:rotateY(180deg)]" : ""
          } [transform-style:preserve-3d]`}
          style={{ perspective: "1200px" }}
        >
          {/* FRONT */}
          <div className="absolute w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-200 flex flex-col transition-all duration-300 group-hover:shadow-xl group-hover:border-gray-300">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                isUnlocked
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-gray-50 text-gray-600 border border-gray-200"
              }`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  isUnlocked ? "bg-green-400" : "bg-gray-400"
                }`}></div>
                {isUnlocked ? "Available" : "Locked"}
              </div>
              <span className="text-xs text-gray-400 font-mono">
                {new Date(unlockTime).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center items-center text-center px-6 py-8">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                isUnlocked ? "bg-green-50 border-2 border-green-200" : "bg-gray-50 border-2 border-gray-200"
              }`}>
                {isUnlocked ? (
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4"/>
                  </svg>
                )}
              </div>
              
              <h2 className="text-xl font-bold text-black mb-3 leading-tight">
                {title}
              </h2>
              
              <p className="text-sm text-gray-500 mb-6">
                {isUnlocked ? "Click to read message" : "Available soon"}
              </p>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50/50">
              <div className="text-center">
                <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                  {isUnlocked ? "Tap to open" : "Tap to view unlock time"}
                </span>
              </div>
            </div>
          </div>

          {/* BACK - Only for locked cards */}
          {!isUnlocked && (
            <div className="absolute w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl bg-white border border-gray-200 shadow-lg flex flex-col">
              
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-black">{title}</h3>
                  <button 
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFlipped(false);
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 px-6 py-6">
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-50 border-2 border-gray-200 flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4"/>
                    </svg>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Content Locked</h4>
                  <p className="text-sm text-gray-500 mb-6">This message will be available on:</p>
                  
                  <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(unlockTime).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(unlockTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Popup for unlocked cards */}
      {showPopup && isUnlocked && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-md w-full max-h-[80vh] overflow-hidden animate-in fade-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-400 mr-3"></div>
                <h3 className="text-lg font-bold text-black">{title}</h3>
              </div>
              <button 
                className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
                onClick={() => setShowPopup(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  <span className="text-sm text-gray-500 font-medium">Message from Past Self</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>

              <div className="text-xs text-gray-400 mb-4 text-center">
                Unlocked on {new Date(unlockTime).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <button className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
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