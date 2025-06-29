import ConnectorSendgrid from "../models/Connector/ConnectorSendgrid";
import Organization from "../models/Organization";
import { Connectors } from "../respositories/Connectors";
import { CONNECTOR_PLATFORM_SENGRID } from "../types";

export default class SendgridService {
  async getSendgridConnector(organization: Organization) {
    const connector = await new Connectors().findByOrgIdAndPlatform(
      organization.id,
      CONNECTOR_PLATFORM_SENGRID
    );

    if (!connector) {
      throw new Error("SendGrid connector not found for the organization");
    }

    return new ConnectorSendgrid(connector);
  }
}
