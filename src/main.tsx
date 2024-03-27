import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.tsx'
import MainRoutes from './routes.tsx'
import { ThemeProvider } from './components/theme/theme-provider.tsx'
import { Slide, ToastContainer } from 'react-toastify'
import './style/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider defaultTheme="system" storageKey='vite-ui-theme'>
          <ToastContainer limit={4} theme='dark' position='top-right' transition={Slide} />
          <MainRoutes />
          <ToastContainer />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
