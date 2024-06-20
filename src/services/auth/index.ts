import { axiosInstance } from "@/api";

class AuthService {
    private static TRADER_BASE = 'trader';

    constructor() { }
    
    public static async getQRCode(traderId: string) {
        const { data } = await axiosInstance.get(`${this.TRADER_BASE}/${traderId}/qr-code`)
        return data
    }

    public static async  createTradingBot(payload: any) { 
        const { data } = await axiosInstance.post(`${this.TRADER_BASE}`, payload)
        return data
    }

    public static async updateBotWebhook(traderId: string, botId: string, payload: any) {
        const { data } = await axiosInstance.post(`${this.TRADER_BASE}/${traderId}/complete`, payload)
        return data
    }

    public static async disconnectBot(traderId: string) { 
        const { data } = await axiosInstance.post(`${this.TRADER_BASE}/${traderId}/disconnect`);
        return data
    }
}