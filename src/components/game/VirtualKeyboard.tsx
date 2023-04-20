import React from "react";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const VirtualKeyboard: React.FC<{
  handleClick: (char: string) => void;
  guessedLetters: string[];
}> = ({ handleClick }) => {
  return (
    <div className="grid grid-cols-13 gap-1.5">
      {Array.from(characters).map((char, index) => (
        <button
          key={`virtual-keyboard-char-${index}`}
          type="button"
          className="px-2 py-1 border border-gray-500 text-gray-500"
          onClick={() => handleClick(char)}
        >
          {char}
        </button>
      ))}
    </div>
  );
};

export default VirtualKeyboard;
