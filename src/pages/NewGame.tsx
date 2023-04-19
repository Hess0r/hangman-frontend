import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PrimaryBtn from "../components/button/PrimaryBtn";
import RadioBtn from "../components/button/RadioBtn";
import {
  createGame,
  fetchCurentGame,
  gameSelector,
} from "../lib/slices/gameSlice";
import { useAppDispatch } from "../lib/store";

const NewGame: React.FC<{}> = () => {
  const { status, loading } = useSelector(gameSelector);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (status === "init" && !loading) {
      dispatch(fetchCurentGame());
    }
  }, [status, loading]);

  const [selectedDifficulty, setSelectedDifficulty] = React.useState<
    "EASY" | "MEDIUM" | "HARD"
  >("EASY");

  const handleStartGame = () => {
    console.log("selectedDifficulty: ", selectedDifficulty);
    dispatch(createGame(selectedDifficulty));
  };

  if (status === "init") {
    return <div>loading</div>;
  }

  if (status === "found") {
    return <Navigate to="/game" />;
  }

  return (
    <div className="flex flex-col gap-8 items-center">
      <h1 className="text-gray-500 text-3xl font-semibold">Hangman Game</h1>
      <p className="text-sm">Choose a difficulty level</p>
      <div className="flex flex-col gap-4 w-56">
        <RadioBtn
          selected={selectedDifficulty === "EASY"}
          onClick={() => setSelectedDifficulty("EASY")}
        >
          Easy (6-8)
        </RadioBtn>

        <RadioBtn
          selected={selectedDifficulty === "MEDIUM"}
          onClick={() => setSelectedDifficulty("MEDIUM")}
        >
          Medium (9-11)
        </RadioBtn>

        <RadioBtn
          selected={selectedDifficulty === "HARD"}
          onClick={() => setSelectedDifficulty("HARD")}
        >
          Hard (12-14)
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
