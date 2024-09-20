import { Status } from "./Status";

export type Local = {
    id: string
    nome: string
    status: Status
    cep: string
    estado: string
    cidade: string
    bairro: string
    rua: string
    diasFuncionamento: string
    complemento: string
    horarioAbertura: string
    horarioFechamento: string
    observacao: string
    valorHora: number
    images: string[]
}