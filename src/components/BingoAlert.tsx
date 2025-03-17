
import React, { useEffect, useState } from "react";
import { PartyPopper } from "lucide-react";

interface BingoAlertProps {
  onContinue: () => void;
  onReset: () => void;
}

const BingoAlert: React.FC<BingoAlertProps> = ({ onContinue, onReset }) => {
  const [confetti, setConfetti] = useState<{ id: number; color: string; left: string; delay: string }[]>([]);
  
  useEffect(() => {
    const confettiCount = 50;
    const newConfetti = Array.from({ length: confettiCount }).map((_, i) => ({
      id: i,
      color: getRandomColor(),
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 0.5}s`
    }));
    setConfetti(newConfetti);
    
    // Play sound effect
    const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3");
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Audio play failed:", e));
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const getRandomColor = () => {
    const colors = [
      "bg-bingo-primary",
      "bg-bingo-secondary", 
      "bg-bingo-accent", 
      "bg-bingo-highlight",
      "bg-bingo-stamped",
      "bg-bingo-bingo"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bingo-alert-overlay">
      {confetti.map((c) => (
        <div
          key={c.id}
          className={`confetti ${c.color}`}
          style={{
            left: c.left,
            animationDelay: c.delay,
            top: "-10px",
            animationDuration: `${1.5 + Math.random() * 2}s`
          }}
        />
      ))}
      
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg mx-4 shadow-2xl bingo-alert animate-bingo-win">
        <div className="flex items-center justify-center mb-4">
          <PartyPopper className="w-10 h-10 text-bingo-bingo mr-3 animate-float" />
          <h2 className="text-3xl md:text-4xl font-bold text-bingo-primary">BINGO!</h2>
          <PartyPopper className="w-10 h-10 text-bingo-accent ml-3 animate-float" style={{ animationDelay: "0.5s" }} />
        </div>
        
        <p className="text-lg md:text-xl text-center mb-6 text-gray-700">
          Congratulations! You've completed a bingo pattern!
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={onContinue}
            className="px-6 py-3 bg-bingo-secondary text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Continue Playing
          </button>
          <button
            onClick={onReset}
            className="px-6 py-3 bg-bingo-highlight text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default BingoAlert;
