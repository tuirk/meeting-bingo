
import React from "react";
import BingoCard from "../components/BingoCard";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <header className="mb-6 md:mb-10 text-center">
        <div className="inline-block bg-bingo-accent/10 px-3 py-1 rounded-full mb-2">
          <span className="text-bingo-accent font-semibold text-sm">Let's play!</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-2 bg-gradient-to-r from-bingo-primary via-bingo-accent to-bingo-secondary bg-clip-text text-transparent">
          Meeting Bingo
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          Mark a square when you hear these phrases during your meeting. 
          Get 5 in a row (horizontally, vertically, or diagonally) to win!
        </p>
      </header>
      
      <BingoCard />
      
      <footer className="text-center mt-8 text-sm text-gray-500 pb-4">
        <p>Click or tap on a phrase when you hear it during a meeting.</p>
      </footer>
    </div>
  );
};

export default Index;
