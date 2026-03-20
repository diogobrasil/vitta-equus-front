import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Login from "./pages/Login/Login";
import PerfilUsuario from "./pages/Perfil/PerfilUsuario";
import Dashboard from "./pages/Dashboard/Dashboard";
import Plantel from "./pages/Animais/Plantel";
import PerfilAnimal from "./pages/Animais/PerfilAnimal";
import NovoExameReprodutivo from "./pages/Reproducao/NovoExameReprodutivo";
import NovaCobertura from "./pages/Reproducao/NovaCobertura";
import DiagnosticoGestacao from "./pages/Reproducao/DiagnosticoGestacao";
import NovoCheckupGestacional from "./pages/Reproducao/NovoCheckupGestacional";
import RegistroParto from "./pages/Reproducao/RegistroParto";
import CentralReproducao from "./pages/Reproducao/CentralReproducao";
import ProntuariosClinicos from "./pages/Clinica/ProntuariosClinicos";
import NovoProntuario from "./pages/Clinica/NovoProntuario";
import DetalhesProntuario from "./pages/Clinica/DetalhesProntuario";
import EstoqueFarmacia from "./pages/Farmacia/EstoqueFarmacia";
import NovoInsumo from "./pages/Farmacia/NovoInsumo";
import CadastrosGerais from "./pages/CadastrosGerais/CadastrosGerais";
import NovoAnimal from "./pages/Animais/NovoAnimal";
import EditarAnimal from "./pages/Animais/EditarAnimal";
import NovoProprietario from "./pages/CadastrosGerais/NovoProprietario";
import NovaPropriedade from "./pages/CadastrosGerais/NovaPropriedade";
import NovoFornecedor from "./pages/CadastrosGerais/NovoFornecedor";
import EditarProprietario from "./pages/CadastrosGerais/EditarProprietario";
import EditarPropriedade from "./pages/CadastrosGerais/EditarPropriedade";
import EditarFornecedor from "./pages/CadastrosGerais/EditarFornecedor";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<PerfilUsuario />} />

        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/plantel" element={<Plantel />} />
          <Route path="/reproducao" element={<CentralReproducao />} />
          <Route path="/clinico" element={<ProntuariosClinicos />} />
          <Route path="/clinico/novo" element={<NovoProntuario />} />
          <Route path="/clinico/:id" element={<DetalhesProntuario />} />
          <Route path="/farmacia" element={<EstoqueFarmacia />} />
          <Route path="/farmacia/novo" element={<NovoInsumo />} />
          <Route path="/cadastros" element={<CadastrosGerais />} />
          <Route path="/cadastros/proprietario/novo" element={<NovoProprietario />} />
          <Route path="/cadastros/proprietario/editar/:id" element={<EditarProprietario />} />
          <Route path="/cadastros/propriedade/nova" element={<NovaPropriedade />} />
          <Route path="/cadastros/propriedade/editar/:id" element={<EditarPropriedade />} />
          <Route path="/cadastros/fornecedor/novo" element={<NovoFornecedor />} />
          <Route path="/cadastros/fornecedor/editar/:id" element={<EditarFornecedor />} />
          <Route path="/plantel/novo" element={<NovoAnimal />} />

          <Route path="/plantel/:id" element={<PerfilAnimal />} />
          <Route path="/plantel/editar/:id" element={<EditarAnimal />} />
          <Route path="/reproducao/novo-exame" element={<NovoExameReprodutivo />} />
          <Route path="/reproducao/nova-cobertura" element={<NovaCobertura />} />
          <Route path="/reproducao/diagnostico" element={<DiagnosticoGestacao />} />
          <Route path="/reproducao/checkup" element={<NovoCheckupGestacional />} />
          <Route path="/reproducao/parto" element={<RegistroParto />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
