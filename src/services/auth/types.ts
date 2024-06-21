export interface Document {
  id: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  deletedAt?: string;
}

export enum TraderStatus {
  PENDING = "PENDING",
  AWAITING_PHONE_AUTH = "AWAITING_PHONE_AUTH",
}

export interface ITrader extends Document {
  name: string;
  mode: string;
  phone: string;
  accessToken: string;
  status: TraderStatus;
}

export interface IQRCode {
  qrCode: string;
  expiresAt: string;
}
