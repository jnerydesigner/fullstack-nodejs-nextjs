import { IHttpService } from "@domain/http-service.interface";
import axios, { AxiosInstance } from "axios";
import { injectable } from "inversify";

@injectable()
export class AxiosService implements IHttpService {
  private client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      timeout: 5000,
    });
  }
  async get<T = any>(url: string): Promise<T> {
    try {
      const response = await this.client.get<T>(url);
      if (!response) {
        throw new Error("Rota não trouxe resultados");
      }

      return response.data;
    } catch (_) {
      throw new Error("Rota não trouxe resultados");
    }
  }
}
