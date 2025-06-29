import Form from "../models/Form";
import Organization from "../models/Organization";
import { ProcedureAttributes } from "../types/entities/ProcedureEntity";
import { logger } from "../utils/logger";
import { ValidationResult } from "../utils/validation";

export default abstract class AbstractProcedureHandler {
  protected form: Form;
  protected organization: Organization;
  protected attributes: ProcedureAttributes;

  constructor({
    form,
    organization,
    attributes = {},
  }: {
    form: Form;
    organization: Organization;
    attributes?: ProcedureAttributes;
  }) {
    this.form = form;
    this.organization = organization;
    this.attributes = attributes;
  }

  getOrganization(): Organization {
    return this.organization;
  }

  getAttibuteByKey(key: string): any {
    return this.attributes[key];
  }

  getAttributes(): ProcedureAttributes {
    return this.attributes;
  }

  abstract process(formData: any, attributes: ProcedureAttributes): Promise<ValidationResult<any>>;
}
