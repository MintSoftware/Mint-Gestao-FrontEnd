import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function Rodape() {
    return (
        <div className="flex h-[1.5rem]">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className=" cursor-pointer ml-6 flex w-auto justify-start items-center h-full gap-2">
                            <Label className="cursor-pointer text-xs items-center flex text-muted-foreground">Legenda:</Label>
                            <div className="w-3 h-3 rounded-full bg-green-500 border mt-1" />
                            <div className="w-3 h-3 rounded-full bg-purple-500 border mt-1" />
                            <div className="w-3 h-3 rounded-full bg-red-500 border mt-1" />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-muted">
                        <div className="text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <div>Hoje</div>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-purple-500" />
                                <div>Feriado</div>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div>Lotado</div>
                            </div>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}