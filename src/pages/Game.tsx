import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import OutlineBtn from "../components/button/OutlineBtn";
import PrimaryBtn from "../components/button/PrimaryBtn";
import CurrentWord from "../components/game/CurrentWord";
import Gallows from "../components/game/Gallows";
import VirtualKeyboard from "../components/game/VirtualKeyboard";
import SplashScreen from "../components/SplashScreen";
import {
  createGame,
  endGame,
  fetchCurentGame,
  gameSelector,
  guessLetter,
} from "../lib/slices/gameSlice";
import { useAppDispatch } from "../lib/store";

const Game: React.FC<{}> = () => {
  const { status, loading, game } = useSelector(gameSelector);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (status === "init" && !loading) {
      dispatch(fetchCurentGame());
    }
  }, [status, loading]);

  const handleLetterClick = (letter: string) => {
    dispatch(guessLetter(letter));
  };

  const handleEndGame = () => {
    dispatch(endGame());
  };

  const handleNewGame = React.useCallback(() => {
    if (!game) return;

    dispatch(createGame(game.difficulty));
  }, [game]);

  if (status === "init") {
    return <SplashScreen />;
  }

  if (status === "not_found") {
    return <Navigate to="/new-game" />;
  }

  if (!game) {
    return <SplashScreen />;
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="flex-1 space-y-4 lg:space-y-8">
        <h1 className="text-center text-3xl font-semibold lg:mb-10 lg:text-left">Hangman Game</h1>
        {game.status !== "IN_PROGRESS" && (
          <h2
            className={`text-center text-xl font-semibold lg:text-left ${
              game.status === "WON" ? "text-green-500" : "text-red-500"
            }`}
          >
            You've {game.status === "WON" ? "won" : "lost"}!
          </h2>
        )}
        <div className="lg:hidden">
          <Gallows
            className="w-40 h-40 mx-auto xl:w-64 xl:h-64"
            errorCount={game.remainingIncorrectGuesses}
          />
        </div>
        <div>
          <CurrentWord currentWord={game.currentWord} />
        </div>
        <div>
          <VirtualKeyboard
            handleClick={handleLetterClick}
            guessedLetters={game.guessedLetters}
          />
        </div>
        <p className="text-center lg:text-left text-sm">
          Remaining possibility of failure:
          <span className="font-bold"> {game.remainingIncorrectGuesses}</span>
        </p>
        <div className="flex gap-2">
          <OutlineBtn className="flex-1 lg:w-44 lg:flex-none" onClick={() => handleEndGame()}>
            End game
          </OutlineBtn>
          <PrimaryBtn className="flex-1 lg:w-44 lg:flex-none" onClick={() => handleNewGame()}>
            Start new game
          </PrimaryBtn>
        </div>
      </div>
      <div className="hidden lg:block">
        <Gallows
          className="w-40 h-40 xl:w-64 xl:h-64"
          errorCount={game.remainingIncorrectGuesses}
        />
      </div>
    </div>
  );
};

export default Game;
