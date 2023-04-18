import { Navigate, Route, Routes } from "react-router-dom";
import AuthGuard from "./components/AuthGuard";
import Login from "./pages/Login";
import NewGame from "./pages/NewGame";

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/game" />} />
      <Route element={<AuthGuard />}>
        <Route path="/game" element={<NewGame />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
