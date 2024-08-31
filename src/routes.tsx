import { useEffect, useState } from "react";
import { Route, Routes, } from "react-router-dom";
import Api from "./infra/api";
import { realizaRefresh } from "./infra/helpers/refreshToken";
import { useAuth } from "./infra/hooks/useAuth";
import Agenda from "./modules/agenda";
import Configuracoes from "./modules/configuracoes";
import DashboardPage from "./modules/dashboard/page";
import Financeiro from "./modules/financeiro/page";
import { Layout } from "./modules/layout";
import Locais from "./modules/local";
import Login from "./modules/login";
import PaginaNaoEncontrada from "./modules/paginanaoencontrada";
import RecuperarSenha from "./modules/recuperarsenha";

function MainRoutes() {

  const { usuarioLogado, recuperarUsuarioLogado } = useAuth();


  const [isDarkMode, setIsDarkMode] = useState(false)
  const [primaryColor, setPrimaryColor] = useState("#03bb85")
  const [secondaryColor, setSecondaryColor] = useState("#818cf8")
  const [borderRadius, setBorderRadius] = useState(8)

  useEffect(() => {
    handleLoadStorageData();
  }, [])

  useEffect(() => {
    const savedConfig = localStorage.getItem("themeConfig")
    if (savedConfig) {
      const config = JSON.parse(savedConfig)
      setIsDarkMode(config.isDarkMode)
      setPrimaryColor(config.primaryColor)
      setSecondaryColor(config.secondaryColor)
      setBorderRadius(config.borderRadius)
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', primaryColor)
    document.documentElement.style.setProperty('--secondary', secondaryColor)
    document.documentElement.style.setProperty('--radius', `${borderRadius}px`)
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [primaryColor, secondaryColor, borderRadius, isDarkMode])

  async function handleLoadStorageData() {
    try {
      await recuperarUsuarioLogado();
      if(localStorage.getItem('usuario')) {
        const usuario = JSON.parse(localStorage.getItem('usuario') as string);
        if(usuario) {
          await buscarTema(usuario.id);
        }
      }
      if(usuarioLogado) realizaRefresh();
    } catch (error) {
      console.log(error)
    }
  }

  if (!usuarioLogado) {
    return (
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/recuperar" element={<RecuperarSenha />} />
      </Routes>
    )
  }

  async function buscarTema(id: string) {    
    const { data } = await Api.get(`configuracao/tema/buscarporusuario/${id}`);
    if (!data) return;
    setIsDarkMode(data.isDarkMode)
    setPrimaryColor(data.primaryColor)
    setSecondaryColor(data.secondaryColor)
    setBorderRadius(data.borderRadius)

    localStorage.setItem("themeConfig", JSON.stringify(data));
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
