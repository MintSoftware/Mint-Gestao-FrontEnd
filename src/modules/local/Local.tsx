import { Label } from "@/components/ui/label";
import { LocalProvider } from "@/providers/LocalProvider";
import { ListaLocal } from "./components/ListaLocal";

export default function Locais() {

    return (
        <LocalProvider>
            <div className="flex flex-col w-full">
                <Label className="text-xl p-5">Locais</Label>
                <ListaLocal />
            </div>
        </LocalProvider>
    )
}   