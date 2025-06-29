import connectorsData from "../data/connectors";
import Connector from "../models/Connector";
import { ConnectorEntity } from "../types/entities/ConnectorEntity";

export class Connectors {
  async findByOrgIdAndPlatform(
    organizationId: number,
    platform: string
  ): Promise<Connector | null> {
    const connectors = connectorsData;
    const rawData = connectors.find(
      (connector: ConnectorEntity) =>
        connector.organizationId === organizationId &&
        connector.platform === platform
    );

    return rawData ? new Connector(rawData) : null;
  }
}
