import { Toaster } from "@/components/ui/toaster"
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './routes.tsx'
import './style/global.css'
import { ThemeProvider } from './style/theme/theme-provider.tsx'
import { AuthProvider } from "./infra/contexts/AuthContext.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey='vite-ui-theme'>
        <MainRoutes />
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  </AuthProvider>
)
