import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Plantel from "./pages/Plantel";
import PerfilAnimal from "./pages/PerfilAnimal";
import NovoExameReprodutivo from "./pages/NovoExameReprodutivo";
import NovaCobertura from "./pages/NovaCobertura";
import DiagnosticoGestacao from "./pages/DiagnosticoGestacao";
import RegistroParto from "./pages/RegistroParto";
import CentralReproducao from "./pages/CentralReproducao";
import ProntuariosClinicos from "./pages/ProntuariosClinicos";
import NovoProntuario from "./pages/NovoProntuario";
import EstoqueFarmacia from "./pages/EstoqueFarmacia";
import NovoInsumo from "./pages/NovoInsumo";
import CadastrosGerais from "./pages/CadastrosGerais";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/plantel" element={<Plantel />} />
          <Route path="/reproducao" element={<CentralReproducao />} />
          <Route path="/clinico" element={<ProntuariosClinicos />} />
          <Route path="/clinico/novo" element={<NovoProntuario />} />
          <Route path="/farmacia" element={<EstoqueFarmacia />} />
          <Route path="/farmacia/novo" element={<NovoInsumo />} />
          <Route path="/cadastros" element={<CadastrosGerais />} />

          <Route path="/plantel/:id" element={<PerfilAnimal />} />
          <Route path="/reproducao/novo-exame" element={<NovoExameReprodutivo />} />
          <Route path="/reproducao/nova-cobertura" element={<NovaCobertura />} />
          <Route path="/reproducao/diagnostico" element={<DiagnosticoGestacao />} />
          <Route path="/reproducao/parto" element={<RegistroParto />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
