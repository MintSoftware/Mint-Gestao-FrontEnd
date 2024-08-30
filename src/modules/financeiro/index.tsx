import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Movimentacao {
    id: number
    data: string
    descricao: string
    tipo: string
    valor: number
    local: string
    hora: number
}

const initialMovimentacoes = [
    { id: 1, data: "2023-05-01", descricao: "Venda de produtos", tipo: "Entrada", valor: 5000, local: "Loja Física", hora: 14 },
    { id: 2, data: "2023-05-02", descricao: "Venda de serviços", tipo: "Entrada", valor: 3000, local: "Online", hora: 10 },
    { id: 3, data: "2023-05-03", descricao: "Venda de produtos", tipo: "Entrada", valor: 4000, local: "Shopping", hora: 18 },
    { id: 4, data: "2023-05-04", descricao: "Venda de serviços", tipo: "Entrada", valor: 2000, local: "Online", hora: 22 },
    { id: 5, data: "2023-05-05", descricao: "Venda de produtos", tipo: "Entrada", valor: 6000, local: "Loja Física", hora: 16 },
    { id: 6, data: "2023-05-01", descricao: "Pagamento de fornecedor", tipo: "Saída", valor: -2000, local: "Loja Física", hora: 9 },
    { id: 7, data: "2023-05-03", descricao: "Pagamento de aluguel", tipo: "Saída", valor: -3000, local: "Shopping", hora: 11 },
    { id: 8, data: "2023-05-05", descricao: "Pagamento de salários", tipo: "Saída", valor: -5000, local: "Loja Física", hora: 17 },
]

const gerarDadosHorarios = (movimentacoes: Movimentacao[], local: any) => {
    const horasBase = Array.from({ length: 24 }, (_, i) => ({ hora: i, valor: 0 }))
    const dadosFiltrados = movimentacoes.filter(mov => local === "Todos" || mov.local === local)

    dadosFiltrados.forEach(mov => {
        if (mov.tipo === "Entrada") {
            horasBase[mov.hora].valor += mov.valor
        }
    })

    return horasBase.map(({ hora, valor }) => ({
        hora: `${hora.toString().padStart(2, '0')}:00`,
        valor
    }))
}

const gerarDadosLocais = (movimentacoes: Movimentacao[]) => {
    const locais: { [key: string]: number } = {};
    movimentacoes.forEach(mov => {
        if (mov.tipo === "Entrada") {
            locais[mov.local] = (locais[mov.local] || 0) + mov.valor
        }
    })
    return Object.entries(locais).map(([nome, valor]) => ({ nome, valor }))
}

const gerarDadosTipoMovimentacao = (movimentacoes: Movimentacao[]) => {
    const entradas = movimentacoes.filter(mov => mov.tipo === "Entrada").reduce((acc, mov) => acc + mov.valor, 0)
    const saidas = Math.abs(movimentacoes.filter(mov => mov.tipo === "Saída").reduce((acc, mov) => acc + mov.valor, 0))
    return [
        { nome: "Entradas", valor: entradas },
        { nome: "Saídas", valor: saidas }
    ]
}

export default function Financeiro() {
    const [movimentacoes, setMovimentacoes] = useState(initialMovimentacoes)
    const [localSelecionado, setLocalSelecionado] = useState("Todos")
    const [novoMovimento, setNovoMovimento] = useState({
        data: "",
        descricao: "",
        tipo: "Entrada",
        valor: "",
        local: "",
        hora: ""
    })

    const saldoTotal = movimentacoes.reduce((acc, mov) => acc + mov.valor, 0)
    const totalEntradas = movimentacoes.filter(mov => mov.tipo === "Entrada").reduce((acc, mov) => acc + mov.valor, 0)
    const totalSaidas = movimentacoes.filter(mov => mov.tipo === "Saída").reduce((acc, mov) => acc + Math.abs(mov.valor), 0)

    const dadosHorarios = gerarDadosHorarios(movimentacoes, localSelecionado)
    const dadosLocais = gerarDadosLocais(movimentacoes)
    const dadosTipoMovimentacao = gerarDadosTipoMovimentacao(movimentacoes)

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setNovoMovimento(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: any, value: any) => {
        setNovoMovimento(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const novoId = movimentacoes.length + 1
        const novaMovimentacao = {
            ...novoMovimento,
            id: novoId,
            valor: novoMovimento.tipo === "Entrada" ? Number(novoMovimento.valor) : -Number(novoMovimento.valor),
            hora: Number(novoMovimento.hora.split(':')[0])
        }
        setMovimentacoes(prev => [...prev, novaMovimentacao])
        setNovoMovimento({
            data: "",
            descricao: "",
            tipo: "Entrada",
            valor: "",
            local: "",
            hora: ""
        })
    }

    const locaisUnicos = [...new Set(movimentacoes.map(mov => mov.local))]

    return (
        <div className="relative w-full p-4">
            <ScrollArea className="h-[52rem] px-4">
                <h1 className="text-2xl font-bold mb-4">Fluxo de Caixa</h1>

                <div className="grid grid-cols-12 gap-4 mb-8">
                    {/* Cards de resumo */}
                    <Card className="col-span-4 flex flex-col justify-center items-center">
                        <CardHeader className="py-2">
                            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{saldoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                        </CardContent>
                    </Card>
                    <Card className="col-span-4 flex flex-col justify-center items-center">
                        <CardHeader className="py-2">
                            <CardTitle className="text-sm font-medium">Total de Entradas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-500">{totalEntradas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                        </CardContent>
                    </Card>
                    <Card className="col-span-4 flex flex-col justify-center items-center">
                        <CardHeader className="py-2">
                            <CardTitle className="text-sm font-medium">Total de Saídas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-500">{totalSaidas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                        </CardContent>
                    </Card>

                    {/* Formulário para adicionar novo movimento */}
                    <div className="flex w-full gap-10">
                        <Card className="flex flex-col min-w-[55rem]">
                            <CardHeader>
                                <CardTitle>Registrar Novo Movimento</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="data">Data</Label>
                                        <Input id="data" name="data" type="date" value={novoMovimento.data} onChange={handleInputChange} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="descricao">Descrição</Label>
                                        <Input id="descricao" name="descricao" value={novoMovimento.descricao} onChange={handleInputChange} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tipo">Tipo</Label>
                                        <Select name="tipo" value={novoMovimento.tipo} onValueChange={(value) => handleSelectChange("tipo", value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o tipo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Entrada">Entrada</SelectItem>
                                                <SelectItem value="Saída">Saída</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="valor">Valor</Label>
                                        <Input id="valor" name="valor" type="number" value={novoMovimento.valor} onChange={handleInputChange} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="local">Local</Label>
                                        <Select name="local" value={novoMovimento.local} onValueChange={(value) => handleSelectChange("local", value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o local" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {locaisUnicos.map(local => (
                                                    <SelectItem key={local} value={local}>{local}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="hora">Hora</Label>
                                        <Input id="hora" name="hora" type="time" value={novoMovimento.hora} onChange={handleInputChange} required />
                                    </div>
                                    <Button type="submit" className="col-span-2">Registrar Movimento</Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Tabela de movimentações */}
                        <Card className="flex flex-col min-w-[55rem]">
                            <CardHeader className="py-2">
                                <CardTitle className="text-sm font-medium">Movimentações Recentes</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-xs">Data</TableHead>
                                            <TableHead className="text-xs">Descrição</TableHead>
                                            <TableHead className="text-xs">Local</TableHead>
                                            <TableHead className="text-xs text-right">Valor</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {movimentacoes.slice(-5).map((mov) => (
                                            <TableRow key={mov.id}>
                                                <TableCell className="text-xs py-1">{mov.data}</TableCell>
                                                <TableCell className="text-xs py-1">{mov.descricao}</TableCell>
                                                <TableCell className="text-xs py-1">{mov.local}</TableCell>
                                                <TableCell className={`text-xs py-1 text-right ${mov.tipo === "Entrada" ? "text-green-500" : "text-red-500"}`}>
                                                    {mov.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Gráfico de Horários que Mais Faturaram (Largura Máxima) */}
                    <Card className="col-span-12">
                        <CardHeader className="py-2 flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium">Horários que Mais Faturaram</CardTitle>
                            <Select value={localSelecionado} onValueChange={setLocalSelecionado}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Selecione o local" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Todos">Todos os locais</SelectItem>
                                    {dadosLocais.map(local => (
                                        <SelectItem key={local.nome} value={local.nome}>{local.nome}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={dadosHorarios}>
                                    <XAxis dataKey="hora" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="valor" name="Faturamento" stroke={`var(--primary)`} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    
                    {/* Gráfico de Evolução do Saldo (Largura Máxima) */}
                    <Card className="col-span-12">
                        <CardHeader className="py-2">
                            <CardTitle className="text-sm font-medium">Evolução do Saldo</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={movimentacoes}>
                                    <XAxis dataKey="data" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="valor" name="Saldo" stroke={`var(--primary)`} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Gráficos de Largura Parcial */}
                    <Card className="col-span-6">
                        <CardHeader className="py-2">
                            <CardTitle className="text-sm font-medium">Locais que Mais Faturaram</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={dadosLocais}>
                                    <XAxis dataKey="nome" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="valor" fill={`var(--primary)`} name="Faturamento" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="col-span-6">
                        <CardHeader className="py-2">
                            <CardTitle className="text-sm font-medium">Distribuição de Entradas e Saídas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={dadosTipoMovimentacao}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill={`var(--primary)`}
                                        dataKey="valor"
                                        label={({ nome, percent }) => `${nome} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {dadosTipoMovimentacao.map((index : any) => (
                                            <Cell key={`cell-${index}`} fill={`var(--primary)`[index % `var(--primary)`.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </ScrollArea>
        </div>
    )
}