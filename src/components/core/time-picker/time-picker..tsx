import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import * as React from "react";
import { TimePickerInput } from "./time-picker-input";

interface TimePickerDemoProps {
  date: Date | undefined;
  setDate: (date: Date) => void;
  className?: string;
  listaHoras?: Date[];
}

export function TimePicker({ date, setDate, className, listaHoras }: TimePickerDemoProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      <div className="grid gap-1 text-center">
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      :
      <div className="grid gap-1 text-center">
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
      </div>
      {listaHoras && <div>
        <Popover modal open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Clock size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <ScrollArea className="h-[10rem]">
              <div className="flex flex-col">
                {listaHoras?.map((hora, index) => (
                <Button variant={"ghost"} key={index} onClick={() => {
                  setDate(hora)
                  setOpen(false)
                }}>{hora.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}</Button>
              ))} 
            </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>}
    </div>
  );
}



// export function ComboBoxResponsive() {
//   const [open, setOpen] = React.useState(false)
//   const isDesktop = useMediaQuery("(min-width: 768px)")
//   const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
//     null
//   )
 
//   if (isDesktop) {
//     return (
//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button variant="outline" className="w-[150px] justify-start">
//             {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-[200px] p-0" align="start">
//           <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
//         </PopoverContent>
//       </Popover>
//     )
//   }
 
//   return (
//     <Drawer open={open} onOpenChange={setOpen}>
//       <DrawerTrigger asChild>
//         <Button variant="outline" className="w-[150px] justify-start">
//           {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
//         </Button>
//       </DrawerTrigger>
//       <DrawerContent>
//         <div className="mt-4 border-t">
//           <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
//         </div>
//       </DrawerContent>
//     </Drawer>
//   )
// }
 
// function StatusList({
//   setOpen,
//   setSelectedStatus,
// }: {
//   setOpen: (open: boolean) => void
//   setSelectedStatus: (status: Status | null) => void
// }) {
//   return (
//     <Command>
//       <CommandInput placeholder="Filter status..." />
//       <CommandList>
//         <CommandEmpty>No results found.</CommandEmpty>
//         <CommandGroup>
//           {statuses.map((status) => (
//             <CommandItem
//               key={status.value}
//               value={status.value}
//               onSelect={(value) => {
//                 setSelectedStatus(
//                   statuses.find((priority) => priority.value === value) || null
//                 )
//                 setOpen(false)
//               }}
//             >
//               {status.label}
//             </CommandItem>
//           ))}
//         </CommandGroup>
//       </CommandList>
//     </Command>
//   )
// }