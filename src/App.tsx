import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Plantel from "./pages/Plantel";
import PerfilAnimal from "./pages/PerfilAnimal";
import NovoExameReprodutivo from "./pages/NovoExameReprodutivo";
import NovaCobertura from "./pages/NovaCobertura";
import DiagnosticoGestacao from "./pages/DiagnosticoGestacao";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/plantel" element={<Plantel />} />

          <Route path="/plantel/:id" element={<PerfilAnimal />} />
          <Route path="/reproducao/novo-exame" element={<NovoExameReprodutivo />} />
          <Route path="/reproducao/nova-cobertura" element={<NovaCobertura />} />
          <Route path="/reproducao/diagnostico" element={<DiagnosticoGestacao />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
