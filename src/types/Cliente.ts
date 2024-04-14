import { Status } from "./Status"

export type Cliente = {
    id: number
    nome: string
    status: Status
    cpf: string
    email: string
    telefone: string
}