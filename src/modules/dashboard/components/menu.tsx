import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardAssinaturas } from "./assinaturas";
import { CardAtivo } from "./ativo";
import { CardReceitaTotal } from "./receitaTotal";
import { CardResumo } from "./resumo";
import { CardVendas } from "./vendas";
import { CardVendasRecentes } from "./vendasRecentes";

export function TabMenu() {
    return (
        <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics" disabled>
                    Analytics
                </TabsTrigger>
                <TabsTrigger value="reports" disabled>
                    Reports
                </TabsTrigger>
                <TabsTrigger value="notifications" disabled>
                    Notifications
                </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <CardReceitaTotal />
                    <CardAssinaturas />
                    <CardVendas />
                    <CardAtivo />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <CardResumo />
                    <CardVendasRecentes />
                </div>
            </TabsContent>
        </Tabs>
    )
}