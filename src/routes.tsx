import { useEffect } from "react";
import { Route, Routes, } from "react-router-dom";
import { realizaRefresh } from "./infra/helpers/refreshToken";
import { useAuth } from "./infra/hooks/useAuth";
import Configuracoes from "./modules/configuracoes";
import DashboardPage from "./modules/dashboard/page";
import { Filial } from "./modules/filial";
import Financeiro from "./modules/financeiro";
import Locais from "./modules/local";
import Login from "./modules/login";
import PaginaNaoEncontrada from "./modules/paginanaoencontrada";
import RecuperarSenha from "./modules/recuperarsenha";
import { Layout } from "./modules/layout";
import Agenda from "./modules/agenda";

function MainRoutes() {

  const { usuarioLogado, recuperarUsuarioLogado } = useAuth();


  useEffect(() => {
    handleLoadStorageData()
  }, [])

  async function handleLoadStorageData() {
    try {
      await recuperarUsuarioLogado();
      realizaRefresh();
    } catch (error) {
      console.log(error)
    } finally {
    }
  }

  if (!usuarioLogado) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
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
        <Route path="/filial" element={<Filial />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </Layout>
  )
}

export default MainRoutes;
