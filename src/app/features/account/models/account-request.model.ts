export interface AccountRequest {
  valorCompra: number;
  tipoTasa: string;
  capitalizacionTasa: number;
  valorTasa: number;
  tipoCredito: string;
  numeroCuotas: number;
  plazoGracia: string;
  periodoGracia: number;
  paymentDate: Date;
  tasaMoratoria: number;
  diasAtraso: number;
  limiteCredito:number;
  tiempoTasa:number;
  clientId : string;
}
