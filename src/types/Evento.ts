import { Cliente } from "./Cliente"
import { Local } from "./Local"

export type Evento = {

    id: string
    nome: string
    sobrenome: string
    email: string
    telefone: string
    valortotal: number
    valorhora: number
    horainicio: Date
    horafim: Date
    diaevento: Date
    local: Local
    cliente?: Cliente
    idtenant: number
}