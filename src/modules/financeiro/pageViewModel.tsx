import { useState } from "react";

interface Movimentacao {
    id: number;
    data: string;
    descricao: string;
    tipo: string;
    valor: number;
    local: string;
    hora: number;
}

// Funções Utilitárias
const gerarDadosHorarios = (movimentacoes: Movimentacao[], local: string) => {
    const horasBase = Array.from({ length: 24 }, (_, i) => ({ hora: i, valor: 0 })),
        dadosFiltrados = movimentacoes.filter(mov => local === "Todos" || mov.local === local);

    dadosFiltrados.forEach(mov => {
        if (mov.tipo === "Entrada") {
            horasBase[mov.hora].valor += mov.valor;
        }
    });

    return horasBase.map(({ hora, valor }) => ({
        hora: `${hora.toString().padStart(2, '0')}:00`,
        valor,
    }));
};

const gerarDadosLocais = (movimentacoes: Movimentacao[]) => {
    const locais: { [key: string]: number } = {};

    movimentacoes.forEach(mov => {
        if (mov.tipo === "Entrada") {
            locais[mov.local] = (locais[mov.local] || 0) + mov.valor;
        }
    });

    return Object.entries(locais).map(([nome, valor]) => ({ nome, valor }));
};

const gerarDadosTipoMovimentacao = (movimentacoes: Movimentacao[]) => {
    const entradas = movimentacoes.filter(mov => mov.tipo === "Entrada").reduce((acc, mov) => acc + mov.valor, 0),
        saidas = Math.abs(movimentacoes.filter(mov => mov.tipo === "Saída").reduce((acc, mov) => acc + mov.valor, 0));

    return [
        { nome: "Entradas", valor: entradas },
        { nome: "Saídas", valor: saidas },
    ];
};

// Hook Customizado
export function useFinanceiroViewModel() {
    const initialMovimentacoes: Movimentacao[] = [
        { id: 1, data: "2023-05-01", descricao: "Venda de produtos", tipo: "Entrada", valor: 5000, local: "Loja Física", hora: 14 },
        { id: 2, data: "2023-05-02", descricao: "Venda de serviços", tipo: "Entrada", valor: 3000, local: "Online", hora: 10 },
        { id: 3, data: "2023-05-03", descricao: "Venda de produtos", tipo: "Entrada", valor: 4000, local: "Shopping", hora: 18 },
        { id: 4, data: "2023-05-04", descricao: "Venda de serviços", tipo: "Entrada", valor: 2000, local: "Online", hora: 22 },
        { id: 5, data: "2023-05-05", descricao: "Venda de produtos", tipo: "Entrada", valor: 6000, local: "Loja Física", hora: 16 },
        { id: 6, data: "2023-05-01", descricao: "Pagamento de fornecedor", tipo: "Saída", valor: -2000, local: "Loja Física", hora: 9 },
        { id: 7, data: "2023-05-03", descricao: "Pagamento de aluguel", tipo: "Saída", valor: -3000, local: "Shopping", hora: 11 },
        { id: 8, data: "2023-05-05", descricao: "Pagamento de salários", tipo: "Saída", valor: -5000, local: "Loja Física", hora: 17 },
    ];

    const [movimentacoes, setMovimentacoes] = useState(initialMovimentacoes);
    const [localSelecionado, setLocalSelecionado] = useState("Todos");

    const [novoMovimento, setNovoMovimento] = useState({
        data: "",
        descricao: "",
        tipo: "Entrada",
        valor: 0,
        local: "",
        hora: ""
    });

    const saldoTotal = movimentacoes.reduce((acc, mov) => acc + mov.valor, 0),
        totalEntradas = movimentacoes.filter(mov => mov.tipo === "Entrada").reduce((acc, mov) => acc + mov.valor, 0),
        totalSaidas = movimentacoes.filter(mov => mov.tipo === "Saída").reduce((acc, mov) => acc + Math.abs(mov.valor), 0),
        dadosHorarios = gerarDadosHorarios(movimentacoes, localSelecionado),
        dadosLocais = gerarDadosLocais(movimentacoes),
        dadosTipoMovimentacao = gerarDadosTipoMovimentacao(movimentacoes),
        locaisUnicos = [...new Set(movimentacoes.map(mov => mov.local))];

    // Manipuladores de Eventos
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNovoMovimento(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setNovoMovimento(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const novoId = movimentacoes.length + 1,
            novaMovimentacao = {
                ...novoMovimento,
                id: novoId,
                valor: novoMovimento.tipo === "Entrada" ? Number(novoMovimento.valor) : -Number(novoMovimento.valor),
                hora: Number(novoMovimento.hora.split(':')[0]),
            };

        setMovimentacoes(prev => [...prev, novaMovimentacao]);
        setNovoMovimento({
            data: "",
            descricao: "",
            tipo: "Entrada",
            valor: 0,
            local: "",
            hora: ""
        });
    };

    return {
        saldoTotal,
        totalEntradas,
        totalSaidas,
        dadosHorarios,
        dadosLocais,
        dadosTipoMovimentacao,
        handleInputChange,
        handleSelectChange,
        handleSubmit,
        locaisUnicos,
        movimentacoes,
        localSelecionado,
        setLocalSelecionado,
        novoMovimento,
    };
}