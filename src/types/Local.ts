import { Status } from "./Status"

export type Local = {
    id: string
    nome: string
    status: Status
    endereco: string
    complemento: string
    observacao: string
    horaAbertura: Date
    horaFechamento: Date
    diasFuncionamento: string
    valorHora: number
}