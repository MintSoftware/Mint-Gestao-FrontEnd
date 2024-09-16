import { Route, Routes, } from "react-router-dom";
import { Layout } from "./layout/Layout";
import Agenda from "./modules/agenda/Agenda";
import Configuracoes from "./modules/configuracoes/Configuracao";
import DashboardPage from "./modules/dashboard/Dashboard";
import Locais from "./modules/local/Local";
import Login from "./modules/login/Login";
import PaginaNaoEncontrada from "./modules/paginanaoencontrada/PaginaNaoEncontrada";
import RecuperarSenha from "./modules/recuperarsenha/RecuperarSenha";
import { useAutenticacaoContext } from "./providers/AutenticacaoProvider";

function MainRoutes() {
  const { usuarioLogado, atualizarToken } = useAutenticacaoContext();

  setInterval(() => atualizarToken(), 10 * 60 * 1000);

  if (!usuarioLogado) {
    return (
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/recuperar" element={<RecuperarSenha />} />
      </Routes>
    )
  }

  return (
    <Layout>
      <Routes>
        <Route path="*" element={<PaginaNaoEncontrada />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/locais" element={<Locais />} />
        <Route path="/configuracoes/*" element={<Configuracoes />} />
        {/* <Route path="/financeiro" element={<Financeiro />} /> */}
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </Layout>
  )
}

export default MainRoutes;
