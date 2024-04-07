import { useEffect, useState } from "react";
import { Route, Routes, } from "react-router-dom";
import Agenda from "./components/agenda";
import { useAuth } from "./hooks/useAuth";
import Cliente from "./view/cliente";
import Configuracoes from "./view/configuracoes";
import { Layout } from "./view/layout";
import LoadingScreen from "./view/loading/Loading";
import Locais from "./view/local";
import Login from "./view/login";
import RecuperarSenha from "./view/recuperarsenha";

function MainRoutes() {

  const { userLogged, handleGetUserLoggedFromStorageData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleLoadStorageData()
  }, [])

  async function handleLoadStorageData() {
    setIsLoading(true);
    setTimeout(() => {
      handleGetUserLoggedFromStorageData().finally(() => setIsLoading(false))
    }, 400)
  }

  if (isLoading) {
    return (
      <LoadingScreen />
    )
  }

  if (!userLogged?.token) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recuperar" element={<RecuperarSenha/>} />
      </Routes>
    )
  }

  return (
    <Layout>
      <Routes>
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/clientes" element={<Cliente/>} />
        <Route path="/locais" element={<Locais/>} />
        <Route path="/configuracoes/*" element={<Configuracoes />} />
      </Routes>
    </Layout>
  )
}

export default MainRoutes;
