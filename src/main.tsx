import { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from './components/ui/sonner.tsx';
import useZoomFix from './hooks/useZoomFix.tsx';
import Loading from './modules/loading/Loading.tsx';
import { AutenticacaoProvider } from './providers/AutenticacaoProvider.tsx';
import { TemaProvider } from './providers/TemaProvider.tsx';
import './style/global.css';

const MainRoutesLazy = lazy(() => import('./routes.tsx'));

const App = () => {
  useZoomFix();

  return (
    <AutenticacaoProvider>
      <TemaProvider>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <MainRoutesLazy />
          </Suspense>
          <Toaster
            expand
            visibleToasts={3}
            toastOptions={{
              className: 'min-h-[3rem] p-3',
              classNames: {
                success: 'bg-green-500 text-secondary font-bold dark:text-black',
                info: 'bg-blue-500 text-secondary font-bold dark:text-black',
                warning: 'bg-yellow-500 text-secondary font-bold dark:text-black',
                error: 'bg-red-500 text-secondary font-bold flex dark:text-black',
                loading:
                  'bg-background font-bold text-secondary border border-secondary dark:text-white dark:border-muted',
              },
            }}
          />
        </BrowserRouter>
      </TemaProvider>
    </AutenticacaoProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
