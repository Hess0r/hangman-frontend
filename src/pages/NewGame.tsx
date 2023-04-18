import React from "react";
import PrimaryBtn from "../components/button/PrimaryBtn";
import RadioBtn from "../components/button/RadioBtn";

const NewGame: React.FC<{}> = () => {
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<
    "EASY" | "MEDIUM" | "HARD"
  >("EASY");

  const handleStartGame = () => {
    console.log("selectedDifficulty: ", selectedDifficulty);
  };

  return (
    <div className="flex flex-col gap-8 items-center">
      <h1 className="text-gray-500 text-3xl font-semibold">Hangman Game</h1>
      <p className="text-sm">Choose a difficulty level</p>
      <div className="flex flex-col gap-4 w-56">
        <RadioBtn
          selected={selectedDifficulty === "EASY"}
          onClick={() => setSelectedDifficulty("EASY")}
        >
          Easy
        </RadioBtn>

        <RadioBtn
          selected={selectedDifficulty === "MEDIUM"}
          onClick={() => setSelectedDifficulty("MEDIUM")}
        >
          Medium
        </RadioBtn>

        <RadioBtn
          selected={selectedDifficulty === "HARD"}
          onClick={() => setSelectedDifficulty("HARD")}
        >
          Hard
        </RadioBtn>

        <div className="mt-16">
          <PrimaryBtn type="button" onClick={handleStartGame}>
            Let's play
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
};

export default NewGame;
