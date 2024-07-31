import { Toaster } from "@/components/ui/toaster"
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.tsx'
import MainRoutes from './routes.tsx'
import './style/global.css'
import { ThemeProvider } from './theme/theme-provider.tsx'

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
