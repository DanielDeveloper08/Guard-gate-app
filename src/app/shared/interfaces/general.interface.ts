export interface IGeneralResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export enum RoleTypeEnum {
  ADMIN = 'ADMINISTRADOR',
  RESIDENT = 'RESIDENTE',
  OPERATIONAL = 'OPERATIVO',
}

export enum VisitStatusEnum {
  PENDING = 'PENDIENTE',      // Initial State
  FULFILLED = 'COMPLETADA',   // Sensor
  CANCELLED = 'CANCELADA',    // Resident
  IN_PROGRESS = 'EN CURSO',   // Sensor
}

export interface IGeneralResponsePagination {
  page: number;
  totalPages: number;
  totalRecords: number;
}

export interface IGeneralRequestPagination {
  limit?: number;
  page?: number;
  search?: string;
}

export enum ButtonStyle {
  Primary = 'primary',
  Secondary = 'secondary',
  Danger = 'danger',
  Outline = 'outline',
  Danger_Outline = 'outline-danger'
}
