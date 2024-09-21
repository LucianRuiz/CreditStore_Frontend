// src/app/features/home/models/client.model.ts
export interface Client {
  id: number;
  name: string;
  lastName: string;
  dni: number;
  birhtDate: Date;
  paymentDay: number;
  debt: number;
  creditLine: number;
  availableBalance: number;
  tieneMora: boolean;
}

export class ClientModel {
}
