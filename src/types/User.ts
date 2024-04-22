import { Filial } from "./Filial"

export type User = {
    nome: string,
    email: string,
    senha: string,
    role: string,
    filiais: Array<Filial>
}