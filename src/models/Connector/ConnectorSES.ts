import Connector from "../Connector";

export default class ConnectorSES {
  connector: Connector;

  constructor(connector: Connector) {
    this.connector = connector;
  }

  getRegion(): string | null {
    return this.connector.data.region || "us-east-1";
  }

  getFromEmail(): string | null {
    return this.connector.data.fromEmail || null;
  }

  // SES can use IAM roles or access keys
  // These would typically be set via environment variables or IAM roles
  getAccessKeyId(): string | null {
    return this.connector.data.accessKeyId || null;
  }

  getSecretAccessKey(): string | null {
    return this.connector.data.secretAccessKey || null;
  }
}
