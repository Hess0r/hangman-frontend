import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PrimaryBtn from "../components/button/PrimaryBtn";
import RadioBtn from "../components/button/RadioBtn";
import SplashScreen from "../components/SplashScreen";
import {
  createGame,
  fetchCurentGame,
  gameSelector,
} from "../lib/slices/gameSlice";
import { useAppDispatch } from "../lib/store";
import { GameDifficulty } from "../types/game";

const NewGame: React.FC<{}> = () => {
  const { status, loading } = useSelector(gameSelector);
  const dispatch = useAppDispatch();

  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (status === "init" && !loading) {
      dispatch(fetchCurentGame());
    }
  }, [status, loading]);

  const [selectedDifficulty, setSelectedDifficulty] =
    React.useState<GameDifficulty>("EASY");

  const handleStartGame = () => {
    setError(null);
    dispatch(createGame(selectedDifficulty))
      .unwrap()
      .catch((e) => {
        if (e.status === 400) {
          setError(e.data.message);
        }
      });
  };

  if (status === "init") {
    return <SplashScreen />;
  }

  if (status === "found") {
    return <Navigate to="/game" />;
  }

  return (
    <div className="flex flex-col gap-8 items-center">
      <h1 className="text-3xl font-semibold">Hangman Game</h1>
      <p className="text-sm">Choose a difficulty level</p>
      {!!error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex flex-col gap-2 md:gap-4 w-56">
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
          <PrimaryBtn
            type="button"
            onClick={handleStartGame}
            className="w-full"
          >
            Let's play
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
};

export default NewGame;
