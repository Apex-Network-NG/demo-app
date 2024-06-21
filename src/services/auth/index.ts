import { axiosInstance } from "@/api";
import { IQRCode, ITrader } from "./types";

export class AppService {
  private static TRADER_BASE = "trader";

  constructor() {}

  public static async getQRCode(traderId: string) {
    const { data } = await axiosInstance.get<{ data: IQRCode }>(
      `${this.TRADER_BASE}/${traderId}/qr-code`
    );
    return data.data;
  }

  public static async createTradingBot() {
    const response = await axiosInstance.post<{
      data: { trader: ITrader };
    }>(`${this.TRADER_BASE}`, null);
    return response;
  }

  public static async updateBotWebhook(traderId: string) {
    const { data } = await axiosInstance.post<{ trader: ITrader }>(
      `${this.TRADER_BASE}/${traderId}/complete`,
      null
    );
    return data;
  }

  public static async disconnectBot(traderId: string) {
    const { data } = await axiosInstance.post(
      `${this.TRADER_BASE}/${traderId}/disconnect`
    );
    return data;
  }
}
