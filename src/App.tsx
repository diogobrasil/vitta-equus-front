import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Plantel from "./pages/Plantel";
import PerfilAnimal from "./pages/PerfilAnimal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas — fora do MainLayout */}
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas — envolvidas pelo MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="plantel" element={<Plantel />} />
          <Route path="animal/:id" element={<PerfilAnimal />} />
        </Route>

        {/* Fallback: redireciona qualquer rota desconhecida para o Login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
