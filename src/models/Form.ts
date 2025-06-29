import { FormEntity } from "../types/entities/FormEntity";
import procedureHandlerts from "../procedure-handlers/procedure-handlerts";
import AbstractProcedureHandler from "../procedure-handlers/AbstractProcedureHandler";
import Organization from "./Organization";
import {
  ProcedureAttributes,
  ProcedureEntity,
} from "../types/entities/ProcedureEntity";

export default class Form {
  id: number;
  name: string;
  organizationId: number;
  isActive: boolean;
  procedures: ProcedureEntity[];
  organization?: Organization | null;

  constructor(formEntity: FormEntity) {
    this.id = formEntity.id;
    this.name = formEntity.name;
    this.organizationId = formEntity.organizationId;
    this.isActive = formEntity.isActive;
    this.procedures = formEntity.procedures || [];
    this.organization = null;
  }

  setOrganization(organization: Organization) {
    if (organization.id !== this.organizationId) {
      throw new Error("Organization ID does not match Form's organizationId");
    }

    this.organization = organization;
  }

  initializeProcedures(): (AbstractProcedureHandler | null)[] {
    return this.procedures.map((procedure: ProcedureEntity) => {
      const HandlerClass = procedureHandlerts[procedure.key] as
        | (new (p: {
            form: Form;
            organization: Organization;
            attributess?: ProcedureAttributes;
          }) => AbstractProcedureHandler)
        | undefined;

      if (!HandlerClass) {
        return null;
      }

      if (!this.organization) {
        return null;
      }

      return new HandlerClass({
        form: this,
        organization: this.organization,
        attributess: procedure.attributes || {},
      });
    });
  }
}
