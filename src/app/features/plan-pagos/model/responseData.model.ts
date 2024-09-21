export interface Client {
    createdBy: string;
    dateHourCreation: string;
    status: number;
    id: string;
    name: string;
    lastName: string;
    dni: string;
    birthDate: string;
    address: string;
    creditLine: number;
    debt: number;
    availableBalance: number;
}

export interface Account {
    id: number;
    valorCompra: number;
    tipoTasa: string;
    capitalizacionTasa: number;
    valorTasa: number;
    tipoCredito: string;
    numeroCuotas: number;
    plazoGracia: string;
    periodoGracia: number;
    paymentDate: string;
    tasaMoratoria: number;
    diasAtraso: number;
    limiteCredito: number;
    tiempoTasa: number;
    client: Client;
}

export interface DatosEntrada {
    tipoTasa: string;
    tiempoTasa: number;
    capitalizacion: number;
    tasa: number;
    tipoPeriodoGracia: string;
    periodoGraciaMeses: number;
    numeroCuotas: number;
    limiteCredito: number;
    tipoCredito: string | null;
    cuotasPeriodoGracia: number;
    montoPrestamo: number;
    diasAtraso: number;
    tasaMoratoria: number;
    fechaInicial: string;
}

export interface DatosSalida {
    id: number;
    mes: number;
    saldoInicial: number;
    intereses: number;
    amortizacion: number;
    cuota: number;
    saldoFinal: number;
    flujo: number;
    tem: number;
    tipoPeriodoGracia: string;
    interesMora: number;
    estado: string;
    fecha: string;
    account: Account;
}

export interface ResponseData {
    datosEntrada: DatosEntrada;
    datosSalidaList: DatosSalida[];
}
