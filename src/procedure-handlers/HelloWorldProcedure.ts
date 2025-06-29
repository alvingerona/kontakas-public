import AbstractProcedureHandler from "./AbstractProcedureHandler";
import { ValidationResult } from "../utils/validation";
import { logger } from "../utils/logger";

export default class HelloWorldProcedure extends AbstractProcedureHandler {
  async process(formData: any): Promise<ValidationResult<any>> {
    const org = this.getOrganization();

    const response = {
      isValid: true,
      data: {
        message: `Hello, ${org.name}!`,
        formData: formData,
      },
    };

    logger(`HelloWorldProcedure processed for organization ${org.id}`, {
      response: response,
    });

    return response;
  }
}
