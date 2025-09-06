export interface IFResponse<T> {
    error: boolean
    message: string,
    data: T | null,
}