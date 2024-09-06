import { Input } from "@/components/ui/input";
import React from 'react';

interface CurrencyInputProps {
  value?: number
  onChange?: (value: number) => void
}

function verificaComecaComNumero(str: string): boolean {
  // Remove espaços em branco no início da string
  const trimmedStr = str.trim();
  
  // Verifica se o primeiro caractere da string é um dígito
  return /^\d/.test(trimmedStr);
}

export default function Valores({ value = 0, onChange }: CurrencyInputProps) {
  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debugger
    const inputValue = e.target.value
    //crime aqui, quem ver isso favor me lembrar de arrumar
    const numericValue = parseFloat(inputValue.replace(/\D/g, '')) / (verificaComecaComNumero(e.target.value) ? 100000 : 100)

    if (!isNaN(numericValue)) {
      onChange?.(numericValue)
    }
  }

  return (
    <div className="w-full space-y-2">
      <Input
        id="money-input"
        type="text"
        placeholder="R$ 0,00"
        value={formatCurrency(value)}
        onChange={handleChange}
        className="text-right w-full"
      />
    </div>
  )
}
