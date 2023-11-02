export interface LoginResponseI {
    usuario: string;
    nombres: string;
    apellidos: string;
    correo: string;
}


export interface LoginRequestI{
    username: string;
    password: string;
    ip?: string;
}
  