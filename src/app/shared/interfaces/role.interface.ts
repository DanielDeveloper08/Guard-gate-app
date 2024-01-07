export interface IRole {
    id: number;
    name: string;
    operations: Array<IOperation>;
}

export interface IOperation {
    id: number;
    name: string;
    route: string;
}