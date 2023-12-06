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

export interface IRecoveryRequest{
    username:string;
}

export interface ICodeOtpRequest{
    username: string;
    code: string;
}

export interface ICodeData{
    eventClick: boolean;
    code: string;
}

export interface IResetPasswordRequest{
    username: string;
    newPassword: string;
}

export interface INewPasswordData{
    eventClick: boolean;
    newPassword: string;
}
  