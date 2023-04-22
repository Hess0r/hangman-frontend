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
    <div className="grid grid-cols-13 gap-0.5 md:gap-1 xl:gap-1.5 mx-auto">
      {Array.from(characters).map((char, index) => (
        <Button
          key={`virtual-keyboard-char-${index}`}
          type="button"
          className="!px-1 !py-0 md:!px-2 md:!py-1 xl:!px-2 xl:!py-2 border border-gray-500 uppercase text-sm"
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
