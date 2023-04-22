import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedLayout from "./components/ProtectedLayout";
import Admin from "./pages/Admin";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import NewGame from "./pages/NewGame";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/new-game" />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/game" element={<Game />} />
          <Route path="/new-game" element={<NewGame />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
