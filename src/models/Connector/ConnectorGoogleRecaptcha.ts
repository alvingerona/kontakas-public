import Connector from "../Connector";

export default class ConnectorGoogleRecaptcha {
  connector: Connector;

  constructor(connector: Connector) {
    this.connector = connector;
  }

  getSecretKey(): string | null {
    return this.connector.data.secretKey || null;
  }
}
