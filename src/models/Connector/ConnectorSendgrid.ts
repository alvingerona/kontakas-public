import Connector from "../Connector";

export default class ConnectorSendgrid {
  connector: Connector;

  constructor(connector: Connector) {
    this.connector = connector;
  }

  getAPIKey(): string | null {
    return this.connector.data.apiKey || null;
  }

  getFromEmail(): string | null {
    return this.connector.data.fromEmail || null;
  }
}
