import { IResidence } from "../../profile/interfaces/residences";
import { IVisit } from "../../visit/interfaces/visit.interface";

export interface IMainHome{
    id:         number;
    names:      string;
    surnames:   string;
    residence: IResidence;
}

export interface ISummaryResponse {
    lastVisits:       any[];
    pendingVisits:    IVisit[];
    frequentVisitors: IFrequentVisitor[];
}

export interface IFrequentVisitor {
    id:          number;
    names:       string;
    surnames:    string;
    docNumber:   string;
    idResidency: number;
    status:      boolean;
    frequency:   number;
    initials:    string;
    isSelected?: boolean;
}
