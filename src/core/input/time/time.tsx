import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import * as React from "react";
import { TimePickerInput } from "./components/time-picker-input";

interface TimePickerDemoProps {
  value: Date | undefined;
  onChange: (value: Date) => void;
  className?: string;
  listaHoras?: Date[];
}

export function Time({ value, onChange, className, listaHoras }: TimePickerDemoProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      <div className="grid gap-1 text-center">
        <TimePickerInput
          picker="hours"
          date={value}
          setDate={onChange}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      :
      <div className="grid gap-1 text-center">
        <TimePickerInput
          picker="minutes"
          date={value}
          setDate={onChange}
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
                    onChange(hora)
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