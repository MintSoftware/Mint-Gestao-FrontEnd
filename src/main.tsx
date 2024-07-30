import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.tsx'
import MainRoutes from './routes.tsx'
import { ThemeProvider } from './components/theme/theme-provider.tsx'
import './style/global.css'
import { Toaster } from "@/components/ui/toaster"

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
