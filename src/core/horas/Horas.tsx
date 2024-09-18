export function calcularPeriodoHoras(inicio = new Date(), fim = new Date()) {

    let resultado = [];
    let horaAtual = new Date(inicio); // Clona o horário de início

    // Itera enquanto a hora atual for menor ou igual ao horário final
    while (horaAtual <= fim) {
        // Formata a hora atual em string HH:mm
        const horaFormatada = horaAtual.toTimeString().slice(0, 5);
        resultado.push(horaFormatada);

        // Adiciona 1 hora à hora atual
        horaAtual.setHours(horaAtual.getHours() + 1);
    }

    return resultado;
}

export function calcularPeriodoHorasNumber(inicio = new Date(), fim = new Date()) {
    let resultado = [];

    for (let horaAtual = +inicio; horaAtual <= +fim; horaAtual++) {
        resultado.push(horaAtual);
    }

    return resultado;
}

export function calcularHoras(dataAbertura = new Date, dataFechamento = new Date) {
    let horaInicio, horaFim;

    // Verifica se o localSelecionadoFiltro tem dataabertura e datafechamento
    if (dataAbertura && dataFechamento) {
        horaInicio = new Date(dataAbertura).getHours();
        horaFim = new Date(dataFechamento).getHours();
    } else {
        // Intervalo padrão das 00:00 às 24:00
        horaInicio = 0;
        horaFim = 23; // Como trabalhamos de 0 a 23 horas (24 é um overflow)
    }

    let resultado = [];

    // Itera de hora em hora e adiciona ao array
    for (let horaAtual = horaInicio; horaAtual <= horaFim; horaAtual++) {
        resultado.push(horaAtual);
    }

    return resultado;
}