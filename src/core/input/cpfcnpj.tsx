import { Input } from "@/components/ui/input"

interface InputBaseCpfCnpjProps {
  value?: string
  onChange?: (value: string) => void
}

export default function CpfCnpj({ value = '', onChange }: InputBaseCpfCnpjProps) {
  const formatCPF_CNPJ = (val: string) => {
    const digits = val.replace(/\D/g, '')
    if (digits.length <= 11) {
      return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    } else {
      return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const numericValue = inputValue.replace(/\D/g, '')

    const formattedValue = formatCPF_CNPJ(numericValue)
    onChange?.(formattedValue)
  }

  return (
    <div className="w-full max-w-sm space-y-2">
      <Input
        id="cpf-cnpj-input"
        type="text"
        placeholder="Digite o CPF ou CNPJ"
        value={value}
        onChange={handleChange}
        className="text-right"
      />
    </div>
  )
}
