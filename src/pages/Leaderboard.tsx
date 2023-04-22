import React from "react";
import { useSelector } from "react-redux";
import SplashScreen from "../components/SplashScreen";
import { authSelector } from "../lib/slices/authSlice";
import {
  getLeaderboard,
  leaderboardSelector,
} from "../lib/slices/leaderboardSlice";
import { useAppDispatch } from "../lib/store";

const Leaderboard: React.FC<{}> = () => {
  const { leaderboard, loading } = useSelector(leaderboardSelector);
  const { user } = useSelector(authSelector);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getLeaderboard());
  }, []);

  if (!leaderboard.length && !!loading) {
    return <SplashScreen />;
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-3xl font-semibold">Leaderboard</h1>
      <table className="w-3/4 table-fixed text-left">
        <thead>
          <tr className="border-b">
            <th className="w-20 px-4 py-3">#</th>
            <th className="px-4 py-3">Name</th>
            <th className="w-24 px-4 py-3">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((us) => (
            <tr
              key={`leaderboard-user-${us.id}`}
              className={`border-b ${user?.id === us.id ? "font-bold" : ""}`}
            >
              <td className="px-4 py-3">{us.rank}</td>
              <td className="px-4 py-3">{us.name}</td>
              <td className="px-4 py-3">{us.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
