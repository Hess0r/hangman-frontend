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
          className="h-6 w-5 xl:w-8 xl:h-8 px-1 border-b md:border-b-2 border-neutral-500 text-center"
        >
          <span
            className={`text-xs xl:text-xl uppercase ${
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
