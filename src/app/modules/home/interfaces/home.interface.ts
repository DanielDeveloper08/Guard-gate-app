import { IResidence } from "../../profile/interfaces/residences";

export interface IMainHome{
    id:         number;
    names:      string;
    surnames:   string;
    residence: IResidence;
}