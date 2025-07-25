import { useState } from "react";

export default function Card({ title, description, unlockTime }) {
  const [flipped, setFlipped] = useState(false);

  const isUnlocked = new Date() >= new Date(unlockTime);

  return (
    <div
      className="relative w-[280px] h-[360px] cursor-pointer group select-none"
      onClick={() => setFlipped(!flipped)}
      tabIndex={0}
      role="button"
      aria-pressed={flipped}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        } [transform-style:preserve-3d]`}
        style={{ perspective: "1200px" }}
      >
        {/* FRONT */}
        <div className="absolute w-full h-full [backface-visibility:hidden] rounded-3xl overflow-hidden bg-gradient-to-br from-white via-amber-50 to-amber-100 shadow-2xl border border-amber-300 flex flex-col justify-between p-7 transition-all duration-300 group-hover:shadow-amber-200">
          <div className="flex justify-between items-center w-full mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${
              isUnlocked
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}>
              {isUnlocked ? "Unlocked" : "Locked"}
            </span>
            <span className="text-xs text-gray-400 font-mono">
              {new Date(unlockTime).toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center flex-grow text-center">
            <h2 className="text-black text-2xl font-extrabold mb-2 tracking-tight drop-shadow-lg">
              {title}
            </h2>
            <p className="text-gray-500 text-sm font-medium">
              {isUnlocked ? "Tap to view details" : "Tap to see unlock time"}
            </p>
          </div>
          <div className="flex justify-center mt-4">
            <div className="w-20 h-6 bg-amber-200 rounded-full blur-lg opacity-40"></div>
          </div>
        </div>

        {/* BACK */}
        <div className="absolute w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-3xl bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300 text-black flex flex-col justify-center items-center text-center px-8 shadow-2xl border border-amber-300">
          {isUnlocked ? (
            <>
              <h3 className="text-2xl font-extrabold mb-2 text-amber-900 drop-shadow-lg">{title}</h3>
              <p className="text-base text-black/80 font-medium mb-2">{description}</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-300">Unlocked</span>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center mb-3">
                <svg
                  className="w-12 h-12 text-red-400 mb-2 animate-pulse"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c0-1.657-1.343-3-3-3S6 9.343 6 11v2m0 0v6h12v-6m-6 0h6m-6 0v-2m0-2V7a4 4 0 00-8 0v4"
                  />
                </svg>
                <span className="text-lg font-semibold text-red-700">Locked</span>
              </div>
              <div className="bg-white/90 rounded-xl px-5 py-3 shadow-inner border border-amber-200">
                <span className="block text-amber-900 font-bold text-sm mb-1">Unlocks at:</span>
                <span className="block text-amber-700 font-mono text-base">
                  {new Date(unlockTime).toLocaleString()}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
