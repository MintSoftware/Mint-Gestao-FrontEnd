import { cn } from "@/lib/utils";
import CpfCnpj from "./cpfcnpj/cpfcnpj";
import { Time } from "./time/time";
import Valores from "./valores/valores";

// Mapa de componentes baseado no tipo
const inputComponents = {
  valores: Valores,
  cpfCnpj: CpfCnpj,
  time: Time,
  // Adicione outros componentes aqui conforme necessário
};
interface InputBaseProps {
  type: keyof typeof inputComponents; // Garante que o tipo esteja no mapa
  value: any;
  onChange: (value: any) => void;
  className?: string;
  [key: string]: any; // Permitir props extras
}

export function InputBase({ type, value, onChange, className, ...props }: InputBaseProps) {
  const Component = inputComponents[type]; // Seleciona o componente baseado no tipo

  if (!Component) {
    return null; // Ou uma mensagem de erro, se desejar
  }

  return (
    <div className={cn("", className)}>
      <Component value={value} onChange={onChange} {...props} />
    </div>
  );
}
