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
  }, [user]);

  if (!leaderboard.length && !!loading) {
    return <SplashScreen />;
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-3xl font-semibold">Leaderboard</h1>
      <table className="w-full lg:w-3/4 table-fixed text-left">
        <thead>
          <tr className="border-b">
            <Td head className="w-14 md:w-20">
              #
            </Td>
            <Td head>Name</Td>
            <Td head className="w-16 md:w-24">
              Score
            </Td>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((us) => (
            <tr
              key={`leaderboard-user-${us.id}`}
              className={`border-b ${user?.id === us.id ? "font-bold" : ""}`}
            >
              <Td>{us.rank}</Td>
              <Td>{us.name}</Td>
              <Td>{us.score}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Td: React.FC<
  React.PropsWithChildren<{ className?: string; head?: boolean }>
> = ({ className, children, head }) => {
  const Component = head ? "th" : "td";
  return (
    <Component className={`px-2 py-2 sm:px-4 sm:py-3 ${className ?? ""}`}>
      {children}
    </Component>
  );
};

export default Leaderboard;
