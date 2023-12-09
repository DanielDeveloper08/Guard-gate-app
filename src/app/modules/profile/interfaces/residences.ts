export interface IResidencesData {
    id:         number;
    username:   string;
    names:      string;
    surnames:   string;
    residences: IResidence[];
}

export interface IResidence {
    residencyId:  number;
    personId:     number;
    block:        string;
    town:         string;
    urbanization: string;
    isMain:       boolean;
}
