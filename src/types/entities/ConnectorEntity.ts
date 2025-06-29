import { ConnectorPlatform } from "..";

export interface ConnectorEntity {
  id: number;
  name: string;
  platform: ConnectorPlatform;
  isActive: boolean;
  organizationId: number;
  data: Record<string, any>;
}
