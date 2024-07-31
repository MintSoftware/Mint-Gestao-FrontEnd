import { useEffect, useState } from "react";
import { Route, Routes, } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Clientes from "./view/cliente";
import Configuracoes from "./view/configuracoes";
import { Layout } from "./view/layout";
import LoadingScreen from "./view/loading/Loading";
import Locais from "./view/local";
import Login from "./view/login";
import RecuperarSenha from "./view/recuperarsenha";
import { Filial } from "./view/filial";
import PaginaNaoEncontrada from "./view/paginanaoencontrada";
import Agenda from "./view/agenda";

function MainRoutes() {

  const { usuarioLogado, recuperarUsuarioLogado } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleLoadStorageData()
  }, [])

  async function handleLoadStorageData() {
    try {
      setIsLoading(true)
      await recuperarUsuarioLogado();
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <LoadingScreen />
    )
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
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/locais" element={<Locais />} />
        <Route path="/configuracoes/*" element={<Configuracoes />} />
        <Route path="/filial" element={<Filial />} />
      </Routes>
    </Layout>
  )
}

export default MainRoutes;
