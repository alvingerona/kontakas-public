import SendMailContactUs from "../integrations/ses/SendMailContactUs";
import ConnectorSES from "../models/Connector/ConnectorSES";
import { Connectors } from "../respositories/Connectors";
import { CONNECTOR_AWS_SES } from "../types";
import { ProcedureAttributes } from "../types/entities/ProcedureEntity";
import { logger } from "../utils/logger";
import { ValidationResult } from "../utils/validation";
import AbstractProcedureHandler from "./AbstractProcedureHandler";

export default class SESContactUsNotification extends AbstractProcedureHandler {
  async process(formData: any, attributes: ProcedureAttributes): Promise<ValidationResult<any>> {
    const org = this.getOrganization();
    const connectorSES = await this.getSESConnector(org);
    const sender = new SendMailContactUs(connectorSES);
    const { subject, body, senderEmail, senderName } = formData;

    try {
      await sender.send({
        subject,
        toEmail: this.getAttibuteByKey("toEmail"),
        senderEmail: senderEmail,
        body,
        senderName,
      });

      return {
        isValid: true,
      };
    } catch (error) {
      return {
        isValid: false,
        errors: {
          details: error instanceof Error ? error.message : "Unknown error",
        },
      };
    }
  }

  private async getSESConnector(organization: any) {
    const connector = await new Connectors().findByOrgIdAndPlatform(
      organization.id,
      CONNECTOR_AWS_SES
    );

    if (!connector) {
      throw new Error("SES connector not found for the organization");
    }

    return new ConnectorSES(connector);
  }
}