import { Suspense, lazy} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from './components/ui/sonner.tsx';
import './style/global.css';
import Loading from './modules/loading/Loading.tsx';

const MainRoutesLazy = lazy(() => import('./routes.tsx'));

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <MainRoutesLazy />
        </Suspense>
        <Toaster expand visibleToasts={20} toastOptions={{
          className: 'min-h-[3rem] p-3',
          classNames: {
            success: 'bg-green-500 text-black font-bold',
            info: 'bg-blue-500 text-black font-bold',
            warning: 'bg-yellow-500 text-black font-bold',
            error: 'bg-red-500 text-black font-bold flex',
          }
        }} />
    </BrowserRouter>
);