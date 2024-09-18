import { Dialog } from "@/components/ui/dialog";
import { AgendaProvider } from "@/providers/AgendaProvider";
import { CabecalhoAgenda } from "./components/Cabecalho";
import Mensal from "./components/Mensal";
import { Rodape } from "./components/Rodape";


export default function Agenda() {
    return (
        <div className="flex flex-col h-full w-full px-10">
            <AgendaProvider>
                <Dialog>
                    <CabecalhoAgenda />
                    <Mensal />
                    <Rodape />
                </Dialog>
            </AgendaProvider>
        </div>
    );
}