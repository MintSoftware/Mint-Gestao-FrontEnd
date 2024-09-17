import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CardDistribuicaoEntSai } from "./components/distribuicaoEntSai";
import { CardEvolucaoSaldo } from "./components/evolucaoSaldo";
import { CardHorarioMaisFat } from "./components/horariosMaisFat";
import { CardLocaisMaisFat } from "./components/locaisMaisFat";
import { CardMovimentosFinanc } from "./components/movimentosFinanc";
import { CardCadastroMovtoFinanc } from "./components/registroMovtoFinanc";
import { CardSaldoTotal } from "./components/saldoTotal";
import { CardTotalEntradas } from "./components/totalEntradas";
import { CardTotalSaidas } from "./components/totalSaidas";

// Importe o hook refatorado
import { useFinanceiroViewModel } from "./FinanceiroController";

export default function Financeiro() {
    const {
        dadosHorarios,
        dadosLocais,
        dadosTipoMovimentacao,
        handleSubmit,
        handleInputChange,
        handleSelectChange,
        localSelecionado,
        locaisUnicos,
        movimentacoes,
        novoMovimento,
        saldoTotal,
        setLocalSelecionado,
        totalEntradas,
        totalSaidas,
    } = useFinanceiroViewModel(); // Use o hook refatorado aqui

    return (
        <div className="relative w-full px-4">
            <ScrollArea className="desktop:h-[52rem] notebook:h-[40rem] px-4">
                <Label className="text-2xl font-bold">Fluxo de Caixa</Label>
                <div className="grid grid-cols-12 gap-4 mb-8 mt-3">
                    <CardSaldoTotal saldoTotal={saldoTotal} />
                    <CardTotalEntradas totalEntradas={totalEntradas} />
                    <CardTotalSaidas totalSaidas={totalSaidas} />
                    <div className="flex w-screen gap-4">
                        <CardCadastroMovtoFinanc
                            handleSubmit={handleSubmit}
                            handleInputChange={handleInputChange}
                            handleSelectChange={handleSelectChange}
                            novoMovimento={novoMovimento}
                            locaisUnicos={locaisUnicos}
                        />
                        <CardMovimentosFinanc movimentacoes={movimentacoes} />
                    </div>
                    <CardHorarioMaisFat
                        dadosLocais={dadosLocais}
                        dadosHorarios={dadosHorarios}
                        localSelecionado={localSelecionado}
                        setLocalSelecionado={setLocalSelecionado}
                    />
                    <CardEvolucaoSaldo movimentacoes={movimentacoes} />
                    <CardLocaisMaisFat dadosLocais={dadosLocais} />
                    <CardDistribuicaoEntSai dadosTipoMovimentacao={dadosTipoMovimentacao} />
                </div>
            </ScrollArea>
        </div>
    );
}