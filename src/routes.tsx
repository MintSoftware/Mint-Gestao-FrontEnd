import { Route, Routes, } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import LoadingScreen from "./view/loading/Loading";
import Login from "./view/login";
import { Layout } from "./view/layout";
import Calendario from "./components/calendar";
import Cliente from "./view/cliente";

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
      </Routes>
    )
  }

  return (
    <Layout>
      <Routes>
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/clientes" element={<Cliente/>} />
      </Routes>
    </Layout>
  )
}

export default MainRoutes;
