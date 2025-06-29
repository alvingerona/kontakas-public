import { ProcedureEntity } from "./ProcedureEntity";

export interface FormEntity {
  id: number;
  name: string;
  organizationId: number;
  isActive: boolean;
  procedures: ProcedureEntity[];
}
