
import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";

interface BingoTileProps {
  phrase: string;
  isStamped: boolean;
  isBingo: boolean;
  onClick: () => void;
}

const BingoTile: React.FC<BingoTileProps> = ({ phrase, isStamped, isBingo, onClick }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (isStamped) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isStamped]);

  const tileClasses = `
    bingo-tile 
    ${isStamped ? "stamped" : ""} 
    ${isBingo ? "bingo" : ""} 
    ${isAnimating ? "animate-stamp" : ""}
    ${phrase === "Free Space" ? "bg-bingo-accent/20 font-bold" : ""}
  `;

  return (
    <div className={tileClasses} onClick={onClick}>
      <div className="relative">
        {phrase}
        {isStamped && (
          <div className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 md:w-7 md:h-7 bg-bingo-stamped rounded-full shadow-md">
            <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BingoTile;
