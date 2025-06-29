import { ConnectorEntity } from "../types/entities/ConnectorEntity";

export default class Connector {
  id: number;
  name: string;
  platform: string;
  isActive: boolean;
  organizationId: number;
  data: Record<string, any>;

  constructor({
    id,
    name,
    platform,
    isActive,
    organizationId,
    data = {},
  }: ConnectorEntity) {
    this.id = id;
    this.name = name;
    this.platform = platform;
    this.isActive = isActive;
    this.organizationId = organizationId;
    this.data = data;
  }
}
