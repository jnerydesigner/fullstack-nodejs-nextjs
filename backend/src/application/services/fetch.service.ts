import { IHttpService } from "@domain/http-service.interface";
import { injectable } from "inversify";

@injectable()
export class FetchService implements IHttpService{
    async get<T = any>(url: string): Promise<T> {
        const response = await fetch(url, {
            method: "GET"
        })
        const data: T = await response.json();

        return data;
    }
}