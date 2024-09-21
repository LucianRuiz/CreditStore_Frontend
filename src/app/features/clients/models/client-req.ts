export interface ClientReq {
  name: string;
  lastName: string;
  dni: string;
  birthDate: Date;
  address?: string;
  paymentDay: number;
  creditLine: number;
}
