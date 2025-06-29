export type ProcedureAttributes = Record<string, any>;

export interface ProcedureEntity {
  key: string;
  attributes?: ProcedureAttributes;
}
