import { Label } from "@/components/ui/label";
import { Link, useLocation } from "react-router-dom";
import ConfigAparencia from "./modulos/aparencia";
import ConfigGeral from "./modulos/geral";
import ConfigSeguranca from "./modulos/seguranca";

export default function Configuracoes() {

    const { pathname } = useLocation();

    return (
        <div className="w-[100%] px-5 pt-[50px] h-[100%]">
            <main className="flex flex-1 flex-col gap-4">
                <div className="flex">
                    <Label className="text-xl">Configurações</Label>
                </div>
                <div className=" flex flex-row w-full h-full items-start gap-10">
                    <nav className="flex flex-col gap-3 text-sm text-muted-foreground justify-center w-auto">
                        <Link className={pathname === "/configuracoes/geral" ? "font-semibold text-primary" : ""} to="/configuracoes/geral">Geral</Link>
                        <Link className={pathname === "/configuracoes/seguranca" ? "font-semibold text-primary" : ""} to="/configuracoes/seguranca">Segurança</Link>
                        <Link className={pathname === "/configuracoes/aparencia" ? "font-semibold text-primary" : ""} to="/configuracoes/aparencia">Aparencia</Link>
                        <Link className={pathname === "/configuracoes/apoio" ? "font-semibold text-primary" : ""} to="/configuracoes/apoio">Apoio</Link>
                        <Link className={pathname === "/configuracoes/organizacoes" ? "font-semibold text-primary" : ""} to="/configuracoes/organizacoes">Organizações</Link>
                        <Link className={pathname === "/configuracoes/avancado" ? "font-semibold text-primary" : ""} to="/configuracoes/avancado">Avançado</Link>
                    </nav>
                    <div className="flex flex-col gap-6 w-full justify-center">
                        {pathname === "/configuracoes/geral" && <ConfigGeral />}
                        {pathname === "/configuracoes/seguranca" && <ConfigSeguranca />}
                        {pathname === "/configuracoes/aparencia" && <ConfigAparencia />}
                        {pathname === "/configuracoes/apoio" && <></>}
                        {pathname === "/configuracoes/organizacoes" && <></>}
                        {pathname === "/configuracoes/avancado" && <></>}
                    </div>
                </div>
            </main>
        </div>
    )
}

