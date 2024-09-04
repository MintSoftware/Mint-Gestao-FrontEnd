import {
  CalendarDaysIcon,
  DollarSignIcon,
  HomeIcon,
  MapPinIcon,
  NotebookTextIcon,
  SettingsIcon
} from "lucide-react";
import { Link, useLocation } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const MenuLateral = () => {

  const { pathname } = useLocation();

  return (
    <aside className="sticky h-screen inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Link
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            to="/filial"
          >
            <img className="scale-120 transition-all group-hover:scale-[135%]" src="./logomint.png" alt="Mint Software" />
            <span className="sr-only">Mint Software</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                className={pathname === '/' ? 'flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8' : 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'}
                to="/"
              >
                <HomeIcon className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                className={pathname === '/agenda' ? 'flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8' : 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'}
                to="/agenda"
              >
                <CalendarDaysIcon className="h-5 w-5" />
                <span className="sr-only">Agenda</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Agenda</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                className={pathname === '/financeiro' ? 'flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8' : 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'}
                to="/financeiro"
              >
                <DollarSignIcon className="h-5 w-5" />
                <span className="sr-only">Financeiro</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Financeiro</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                className={pathname === '/locais' ? 'flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8' : 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'}
                to="/locais"
              >
                <MapPinIcon className="h-5 w-5" />
                <span className="sr-only">Locais</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Locais</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center px-2 sm:py-5">
        <div className="flex flex-col gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={pathname === ('/releases' || '/releases/*') ? 'flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8' : 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'}
                  to="/releases"
                >
                  <NotebookTextIcon className="h-5 w-5" />
                  <span className="sr-only">Configurações</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Configurações</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={pathname === ('/configuracoes' || '/configuracoes/*') ? 'flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8' : 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'}
                  to="/configuracoes"
                >
                  <SettingsIcon className="h-5 w-5" />
                  <span className="sr-only">Configurações</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Configurações</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </nav>
    </aside>
  )
}

export default MenuLateral;
