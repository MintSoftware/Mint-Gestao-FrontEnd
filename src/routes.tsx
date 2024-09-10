import { Route, Routes, } from "react-router-dom";
import Agenda from "./modules/agenda";
import Configuracoes from "./modules/configuracoes";
import DashboardPage from "./modules/dashboard/page";
import Financeiro from "./modules/financeiro/page";
import { Layout } from "./modules/layout";
import Locais from "./modules/local/page";
import Login from "./modules/login";
import PaginaNaoEncontrada from "./modules/paginanaoencontrada";
import RecuperarSenha from "./modules/recuperarsenha";
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
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </Layout>
  )
}

export default MainRoutes;
