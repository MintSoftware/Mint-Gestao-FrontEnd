import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CardDistribuicaoEntSai } from "./components/DistribuicaoEntSai";
import { CardEvolucaoSaldo } from "./components/EvolucaoSaldo";
import { CardHorarioMaisFat } from "./components/HorariosMaisFat";
import { CardLocaisMaisFat } from "./components/LocaisMaisFat";
import { CardMovimentosFinanc } from "./components/MovimentosFinanc";
import { CardCadastroMovtoFinanc } from "./components/RegistroMovtoFinanc";
import { CardSaldoTotal } from "./components/SaldoTotal";
import { CardTotalEntradas } from "./components/TotalEntradas";
import { CardTotalSaidas } from "./components/TotalSaidas";

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
        <div className="relative w-full p-4">
            <ScrollArea className="h-[52rem] px-4">
                <Label className="text-2xl font-bold">Fluxo de Caixa</Label>
                <div className="grid grid-cols-12 gap-4 mb-8 mt-3">
                    <CardSaldoTotal saldoTotal={saldoTotal} />
                    <CardTotalEntradas totalEntradas={totalEntradas} />
                    <CardTotalSaidas totalSaidas={totalSaidas} />
                    <div className="flex w-full gap-10">
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