import Calendario from "@/components/agenda";
import { Label } from "@/components/ui/label";

export default function Agenda() {
    return (
        <div className="flex flex-col h-full w-full px-10 pt-[50px] h-full">
            <span className="pb-10">Agenda</span>
            <Calendario />
        </div>
    );
}