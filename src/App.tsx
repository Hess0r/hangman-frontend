import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedLayout from "./components/ProtectedLayout";
import Admin from "./pages/Admin";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import NewGame from "./pages/NewGame";

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/new-game" />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/game" element={<Game />} />
        <Route path="/new-game" element={<NewGame />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
