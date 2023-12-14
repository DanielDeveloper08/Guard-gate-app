export interface IVisitor {
  id: number;
  names: string;
  surnames: string;
  docNumber: string;
  idResidency: number;
  isSelected?: boolean;
  initials: string;
}
