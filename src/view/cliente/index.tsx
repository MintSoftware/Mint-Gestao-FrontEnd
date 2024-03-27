import Tabela from "@/components/tabela/tabela";
import colunas from "./colunas";
import { Cliente } from "@/types/Cliente";
import { Label } from "@/components/ui/label";

export const dados = (): Cliente[] => {
    return [
        {
            id: 1,
            nome: 'Fulano',
            cpf: '123.456.789-00',
            email: 'fulano@gmail.com',
            telefone: '(11) 99999-9999'
        }, {
            id: 2,
            nome: 'Ciclano',
            cpf: '987.654.321-00',
            email: 'ciclano@gmail.com',
            telefone: '(11) 99999-9999'
        }, {
            id: 3,
            nome: 'Beltrano',
            cpf: '555.555.555-55',
            email: 'beltrano@gmail.com',
            telefone: '(11) 99999-9999'
        }, {
            id: 4,
            nome: 'Sicrano',
            cpf: '666.666.666-66',
            email: 'sicrano@gmail.com',
            telefone: '(11) 99999-9999'
        }, {
            id: 5,
            nome: 'João',
            cpf: '777.777.777-77',
            email: 'joao@gmail.com',
            telefone: '(11) 99999-9999'
        }, {
            id: 6,
            nome: 'Maria',
            cpf: '888.888.888-88',
            email: 'maria@gmail.com',
            telefone: '(11) 99999-9999'
        }, {
            id: 7,
            nome: 'Pedro',
            cpf: '999.999.999-99',
            email: 'pedro@gmail.com',
            telefone: '(11) 99999-9999'
        }, {
            id: 8,
            nome: 'Ana',
            cpf: '111.111.111-11',
            email: 'ana@gmail.com',
            telefone: '(11) 99999-9999'
        }, {
            id: 9,
            nome: 'José',
            cpf: '222.222.222-22',
            email: 'jose@gmail.com',
            telefone: '(11) 99999-9999'
        }, {
            id: 10,
            nome: 'Mariana',
            cpf: '333.333.333-33',
            email: 'mariana@gmail.com',
            telefone: '(11) 99999-9999'
        }, {
            id: 11,
            nome: 'Carlos',
            cpf: '444.444.444-44',
            email: 'carlos@gmail.com',
            telefone: '(11) 99999-9999'
        }, {
            id: 12,
            nome: 'Julia',
            cpf: '555.555.555-55',
            email: 'julia@gmail.com',
            telefone: '(11) 99999-9999'
        }, {
            id: 13,
            nome: 'Lucas',
            cpf: '666.666.666-66',
            email: 'lucas@gmail.com',
            telefone: '(11) 99999-9999'
        }, {
            id: 14,
            nome: 'Amanda',
            cpf: '777.777.777-77',
            email: 'amanda@gmail.com',
            telefone: '(11) 99999-9999'
        }, {
            id: 15,
            nome: 'Rafael',
            cpf: '888.888.888-88',
            email: 'rafael@gmail.com',
            telefone: '(11) 99999-9999'
        }, {
            id: 16,
            nome: 'Patricia',
            cpf: '999.999.999-99',
            email: 'patricia@gmail.com',
            telefone: '(11) 99999-9999'
        }, {
            id: 17,
            nome: 'Gustavo',
            cpf: '111.111.111-11',
            email: 'gustavo@gmail.com',
            telefone: '(11) 99999-9999'
        }
    ]
}

export default function cliente() {
    return (
        <div className="w-[95%] pt-[3%] h-[95%]">
            <Label className="text-xl">Clientes</Label>
            <Tabela
                colunas={colunas()}
                dados={dados()}
            />
        </div>
    )
}   