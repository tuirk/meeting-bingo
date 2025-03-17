
import React, { useState, useEffect } from "react";
import BingoTile from "./BingoTile";
import BingoAlert from "./BingoAlert";
import { checkForBingo, getBingoPatterns, generateBingoBoard } from "../utils/bingoUtils";
import { RotateCcw } from "lucide-react";

const BingoCard: React.FC = () => {
  const [phrases, setPhrases] = useState<string[]>([]);
  const [stamps, setStamps] = useState<boolean[]>([]);
  const [bingoTiles, setBingoTiles] = useState<number[]>([]);
  const [showBingoAlert, setShowBingoAlert] = useState(false);
  const [hasBingo, setHasBingo] = useState(false);

  // Initialize or reset the board
  const initializeBoard = () => {
    const newPhrases = generateBingoBoard();
    setPhrases(newPhrases);
    
    // Initialize all tiles as unstamped except the free space
    const initialStamps = Array(25).fill(false);
    initialStamps[12] = true; // Free space is always stamped
    setStamps(initialStamps);
    
    setBingoTiles([]);
    setHasBingo(false);
  };

  // Initial setup
  useEffect(() => {
    initializeBoard();
  }, []);

  // Handle tile click
  const handleTileClick = (index: number) => {
    if (index === 12) return; // Free space can't be unstamped
    
    const newStamps = [...stamps];
    newStamps[index] = !newStamps[index];
    setStamps(newStamps);
    
    // Check for bingo only if stamping (not unstamping)
    if (newStamps[index] && !hasBingo && checkForBingo(newStamps)) {
      const patterns = getBingoPatterns(newStamps);
      const bingoIndices = patterns.flat();
      setBingoTiles([...new Set(bingoIndices)]);
      setShowBingoAlert(true);
      setHasBingo(true);
    }
  };

  // Continue playing after getting bingo
  const handleContinuePlaying = () => {
    setShowBingoAlert(false);
  };

  // Reset the game
  const handleReset = () => {
    setShowBingoAlert(false);
    initializeBoard();
  };

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto mb-4">
        <div className="flex justify-between items-center">
          <button 
            onClick={handleReset}
            className="bingo-reset-btn flex items-center"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </button>
        </div>
      </div>
      
      <div className="bingo-card">
        {phrases.map((phrase, index) => (
          <BingoTile
            key={index}
            phrase={phrase}
            isStamped={stamps[index]}
            isBingo={bingoTiles.includes(index)}
            onClick={() => handleTileClick(index)}
          />
        ))}
      </div>
      
      {showBingoAlert && (
        <BingoAlert
          onContinue={handleContinuePlaying}
          onReset={handleReset}
        />
      )}
    </div>
  );
};

export default BingoCard;
