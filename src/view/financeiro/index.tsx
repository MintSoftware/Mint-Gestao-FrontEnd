import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, BarChart, Bar } from "recharts"

export function Financeiro() {

    const incomeData = [
        { date: 'Jun 1', value: 1000 },
        { date: 'Jun 3', value: 1200 },
        { date: 'Jun 5', value: 1100 },
        { date: 'Jun 7', value: 1300 },
        { date: 'Jun 9', value: 1150 },
        { date: 'Jun 11', value: 1250 },
        { date: 'Jun 13', value: 1180 },
        { date: 'Jun 15', value: 1220 },
        { date: 'Jun 17', value: 1300 },
        { date: 'Jun 19', value: 1150 },
        { date: 'Jun 21', value: 1400 },
        { date: 'Jun 23', value: 1350 },
        { date: 'Jun 25', value: 1200 },
        { date: 'Jun 27', value: 1250 },
    ]

    const revenueData = [
        { day: 'Jun 1', value: 200 },
        { day: 'Jun 2', value: 150 },
        { day: 'Jun 3', value: 180 },
        { day: 'Jun 4', value: 120 },
        { day: 'Jun 5', value: 200 },
        { day: 'Jun 6', value: 140 },
        { day: 'Jun 7', value: 190 },
    ]

    return (
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-6 text-white">Escritório Privativo</h1>
            <ScrollArea className="flex flex-col w-[113rem] h-[50rem] p-4">
                {/* Distribuição de Reservas */}
                <Card className="mb-6 bg-background border">
                    <CardHeader>
                        <CardTitle className="text-white">Distribuição de Reservas</CardTitle>
                    </CardHeader>
                    <CardContent className="flex space-x-2">
                        {["Escritório 1", "Escritório 2", "Escritório 3", "Escritório 4", "Escritório 5"].map((office) => (
                            <Button key={office} variant="outline" size="sm" className="text-gray-300 border-gray-600 hover:bg hover:text-white">
                                {office}
                            </Button>
                        ))}
                    </CardContent>
                </Card>

                {/* Horas Reservadas */}
                <Card className="mb-6 bg-background border">
                    <CardHeader>
                        <CardTitle className="text-white">Horas Reservadas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {["8h", "9h", "10h", "11h", "12h", "13h", "14h", "15h", "16h"].map((time) => (
                                <div key={time} className="flex items-center">
                                    <span className="w-12 text-sm text-gray-400">{time}</span>
                                    <div className="flex-1 h-6 bg rounded-full overflow-hidden">
                                        <div className="h-full bg-primary rounded-full" style={{ width: `${Math.random() * 100}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Renda ao longo do mês */}
                <Card className="mb-6 bg-background border">
                    <CardHeader>
                        <CardTitle className="text-white">Renda ao longo do mês</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h3 className="text-2xl font-bold mb-4 text-white">Renda Diária</h3>
                        <p className="text-4xl font-bold mb-4 text-green-400">R$ 1.200</p>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={incomeData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="date" stroke="#9CA3AF" />
                                    <YAxis stroke="#9CA3AF" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                                        itemStyle={{ color: '#D1D5DB' }}
                                    />
                                    <Line type="monotone" dataKey="value" stroke="#03bb85" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Detalhamento da Receita Diária */}
                <Card className="mb-6 bg-background border">
                    <CardHeader>
                        <CardTitle className="text-white">Detalhamento da Receita Diária</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h3 className="text-2xl font-bold mb-4 text-white">Receita Diária</h3>
                        <p className="text-4xl font-bold mb-4 text-green-400">R$ 200</p>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="day" stroke="#9CA3AF" />
                                    <YAxis stroke="#9CA3AF" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                                        itemStyle={{ color: '#D1D5DB' }}
                                    />
                                    <Bar dataKey="value" fill="#03bb85" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Solicitações de Reserva */}
                <Card className="bg-background border">
                    <CardHeader>
                        <CardTitle className="text-white">Solicitações de Reserva</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {[
                                { time: "8:00 - 10:00", date: "15/06/2023" },
                                { time: "10:00 - 12:00", date: "15/06/2023" },
                                { time: "12:00 - 14:00", date: "15/06/2023" },
                                { time: "14:00 - 16:00", date: "15/06/2023" },
                                { time: "16:00 - 18:00", date: "15/06/2023" },
                            ].map((request, index) => (
                                <li key={index} className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg rounded-lg"></div>
                                    <div>
                                        <p className="font-medium text-white">{request.time}</p>
                                        <p className="text-sm text-gray-400">{request.date}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Button className="w-full mt-4" variant="outline">Gerenciar Solicitações de Reserva</Button>
                    </CardContent>
                </Card>
            </ScrollArea>
        </div>
    );
}