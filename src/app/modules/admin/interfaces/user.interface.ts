export interface IUser{
    id:number,
    username:string,
    roleId:number,
    names: string,
    surnames: string,
    email: string,
    phone: string,
    role:string
}

export interface IRegisterUserRequest extends Omit<IUser,'role'>{
    password:string
}

export type IUpdateUserRequest = Omit<IUser,'role'>;