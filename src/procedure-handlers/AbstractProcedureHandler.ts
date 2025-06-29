import Form from "../models/Form";
import Organization from "../models/Organization";
import { ProcedureAttributes } from "../types/entities/ProcedureEntity";
import { ValidationResult } from "../utils/validation";

export default abstract class AbstractProcedureHandler {
  protected form: Form;
  protected organization: Organization;

  constructor({
    form,
    organization,
    attributess = {},
  }: {
    form: Form;
    organization: Organization;
    attributess?: ProcedureAttributes;
  }) {
    this.form = form;
    this.organization = organization;
  }

  getOrganization(): Organization {
    return this.organization;
  }

  abstract process(formData: any): Promise<ValidationResult<any>>;
}
