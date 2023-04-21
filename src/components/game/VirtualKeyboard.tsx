import React from "react";
import Button from "../button/Button";

const characters = "abcdefghijklmnopqrstuvwxyz";

const VirtualKeyboard: React.FC<{
  handleClick: (char: string) => void;
  guessedLetters: string;
}> = ({ handleClick, guessedLetters }) => {
  const disabledLetters: string[] = React.useMemo(() => {
    return Array.from(guessedLetters.toLowerCase());
  }, [guessedLetters]);

  return (
    <div className="grid grid-cols-13 gap-1.5">
      {Array.from(characters).map((char, index) => (
        <Button
          key={`virtual-keyboard-char-${index}`}
          type="button"
          className="!px-2 !py-1 border border-gray-500 uppercase"
          onClick={() => handleClick(char)}
          disabled={disabledLetters.includes(char)}
        >
          {char}
        </Button>
      ))}
    </div>
  );
};

export default VirtualKeyboard;
