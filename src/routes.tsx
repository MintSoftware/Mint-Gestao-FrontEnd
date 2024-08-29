import { useEffect } from "react";
import { Route, Routes, } from "react-router-dom";
import { realizaRefresh } from "./infra/helpers/refreshToken";
import { useAuth } from "./infra/hooks/useAuth";
import Agenda from "./view/agenda";
import Configuracoes from "./view/configuracoes";
import { Filial } from "./view/filial";
import { Layout } from "./view/layout";
import Locais from "./view/local";
import Login from "./view/login";
import PaginaNaoEncontrada from "./view/paginanaoencontrada";
import RecuperarSenha from "./view/recuperarsenha";
import Financeiro from "./view/financeiro";

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
      </Routes>
    </Layout>
  )
}

export default MainRoutes;
