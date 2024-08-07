import { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from './components/ui/sonner.tsx';
import { AuthProvider } from "./infra/contexts/AuthContext.tsx";
import './style/global.css';
import { ThemeProvider } from './style/theme/theme-provider.tsx';
import Loading from './view/loading/Loading.tsx';

const MainRoutesLazy = lazy(() => import('./routes.tsx'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey='vite-ui-theme'>
        <Suspense fallback={<Loading />}>
          <MainRoutesLazy />
        </Suspense>
        <Toaster toastOptions={{
          className: 'h-[3rem] p-3',
          classNames: {
            success: 'bg-green-500 text-black font-bold',
            info: 'bg-blue-500 text-black font-bold',
            warning: 'bg-yellow-500 text-black font-bold',
            error: 'bg-red-500 text-black font-bold',
          }
        }} />
      </ThemeProvider>
    </BrowserRouter>
  </AuthProvider>
);