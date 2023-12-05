export interface ILoginResponse {
    token: string;
    user:  IUser;
}

export interface IUser {
    id:       number;
    names:    string;
    surnames: string;
    email:    string;
    phone:    string;
    role:     string;
}

export interface ILoginRequest{
    username: string;
    password: string;
}
  