import Tabela from "@/components/tabela/tabela";
import { Label } from "@/components/ui/label";
import { Local } from "@/types/Local";
import CadastroLocal from "@/view/local/cadastro";
import colunas from "./colunas";
import ExportarLocal from "./exportar";

export const dados = (): Local[] => {
    return [{
        id: 1,
        nome: 'Fulano',
        endereco: 'Rua dos bobos, 0',
        complemento: 'Complemento qualquer',
        observacao: 'Nenhuma observação',
        horaAbertura: new Date(),
        horaFechamento: new Date(),
        diasFuncionamento: 'Segunda a sexta'
    }, {
        id: 2,
        nome: 'Beltrano',
        endereco: 'Avenida das Flores, 123',
        complemento: 'Complemento adicional',
        observacao: 'Observação qualquer',
        horaAbertura: new Date(),
        horaFechamento: new Date(),
        diasFuncionamento: 'Segunda a sábado'
    }, {
        id: 3,
        nome: 'Ciclano',
        endereco: 'Praça da Liberdade, 456',
        complemento: 'Complemento final',
        observacao: 'Observação adicional',
        horaAbertura: new Date(),
        horaFechamento: new Date(),
        diasFuncionamento: 'Todos os dias'
    }, {
        id: 4,
        nome: 'Sicrano',
        endereco: 'Rua dos Andradas, 789',
        complemento: 'Complemento extra',
        observacao: 'Observação extra',
        horaAbertura: new Date(),
        horaFechamento: new Date(),
        diasFuncionamento: 'Segunda a quinta'
    }, {
        id: 5,
        nome: 'João',
        endereco: 'Avenida Paulista, 1010',
        complemento: 'Complemento final',
        observacao: 'Observação final',
        horaAbertura: new Date(),
        horaFechamento: new Date(),
        diasFuncionamento: 'Sexta a domingo'
    }]
}

export default function Locais() {
    return (
        <div className="w-[100%] px-5 pt-[50px] h-[100%]">
            <Label className="text-xl p-5">Locais</Label>
            <Tabela
                colunas={colunas()}
                dados={dados()}
                modal={<CadastroLocal/>}
                exportar={ExportarLocal(dados())}
            />
        </div>
    )
}   