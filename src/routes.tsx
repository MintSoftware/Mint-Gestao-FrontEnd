import { Route, Routes, } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import LoadingScreen from "./view/loading/Loading";
import Login from "./view/login";
import { Layout } from "./view/layout";
import Calendario from "./components/calendar";
import Cliente from "./view/cliente";
import Locais from "./view/local";
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
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/clientes" element={<Cliente/>} />
        <Route path="/locais" element={<Locais/>} />
      </Routes>
    </Layout>
  )
}

export default MainRoutes;
