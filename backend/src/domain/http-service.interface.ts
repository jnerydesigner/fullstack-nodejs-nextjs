export interface IHttpService{
    get<T = any>(url: string): Promise<T>;
}