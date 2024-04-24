import Calendario from "@/components/agenda";
import { Label } from "@/components/ui/label";

export default function Agenda() {
    return (
        <div className="flex flex-col h-full w-full px-10 pt-[50px] h-full">
            <Label className="text-xl pb-10">Agenda</Label>
            <Calendario />
        </div>
    );
}