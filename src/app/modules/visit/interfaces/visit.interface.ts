import { IVisitor } from '../../visitors/interfaces/visitor.interface';

export interface IVisitorState{
    visitType: string;
    visitors: IVisitor[];
    visitConfig: any;
}