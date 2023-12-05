export interface IGeneralResponse<T> {
    statusCode: number;
    message:    string;
    data:       T;
}
