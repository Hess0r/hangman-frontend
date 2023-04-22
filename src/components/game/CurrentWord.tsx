import React from "react";

type CurrentWordProps = {
  currentWord: string;
};

const CurrentWord: React.FC<CurrentWordProps> = ({ currentWord }) => {
  return (
    <div className="flex justify-center lg:justify-start gap-0.5 md:gap-1 xl:gap-2">
      {Array.from(currentWord).map((char, index) => (
        <div
          key={`current-word-char-${index}`}
          className="w-5 h-6 px-1  md:w-6 md:h-6 xl:w-8  xl:h-8 border-b md:border-b-2 border-neutral-500 text-center"
        >
          <span
            className={`text-xs md:text-base xl:text-xl uppercase ${
              char === "_" ? "opacity-0" : ""
            }`}
          >
            {char}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CurrentWord;
