import React from "react";

type CurrentWordProps = {
  currentWord: string;
};

const CurrentWord: React.FC<CurrentWordProps> = ({ currentWord }) => {
  return (
    <div className="flex gap-2">
      {Array.from(currentWord).map((char, index) => (
        <div
          key={`current-word-char-${index}`}
          className="h-8 w-8 px-1 border-b-2 border-neutral-500 text-center"
        >
          <span
            className={`text-xl uppercase ${char === "_" ? "opacity-0" : ""}`}
          >
            {char}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CurrentWord;
