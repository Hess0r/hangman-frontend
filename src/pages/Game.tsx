import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import OutlineBtn from "../components/button/OutlineBtn";
import PrimaryBtn from "../components/button/PrimaryBtn";
import CurrentWord from "../components/game/CurrentWord";
import Gallows from "../components/game/Gallows";
import VirtualKeyboard from "../components/game/VirtualKeyboard";
import { fetchCurentGame, gameSelector } from "../lib/slices/gameSlice";
import { useAppDispatch } from "../lib/store";

const Game: React.FC<{}> = () => {
  const { status, loading, game } = useSelector(gameSelector);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (status === "init" && !loading) {
      dispatch(fetchCurentGame());
    }
  }, [status, loading]);

  if (status === "init") {
    return <div>loading</div>;
  }

  if (status === "not_found") {
    return <Navigate to="/new-game" />;
  }

  if (!game) {
    return <div>loading</div>;
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-8">
        <h1 className="text-gray-500 text-3xl font-semibold">Hangman Game</h1>
        <div>
          <CurrentWord currentWord={game.currentWord} />
        </div>
        <div>
          <VirtualKeyboard handleClick={(char) => console.log(char)} />
        </div>
        <p className="text-sm">
          Remaining possibility of failure:
          <span className="font-bold"> {game.remainingIncorrectGuesses}</span>
        </p>
        <div className="flex">
          <OutlineBtn>End game</OutlineBtn>
          <PrimaryBtn>Start new game</PrimaryBtn>
        </div>
      </div>
      <div className="">
        <Gallows className="w-64 h-64" />
      </div>
    </div>
  );
};

export default Game;
