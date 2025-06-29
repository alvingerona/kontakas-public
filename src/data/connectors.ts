import { ConnectorEntity } from "../types/entities/ConnectorEntity";

const connectorsData: ConnectorEntity[] = [
  {
    id: 1,
    organizationId: 1,
    name: "GoldenCode Solutions - SES Demo",
    platform: "aws-ses",
    isActive: true,
    data: {
      accessKeyId:"",
      fromEmail: "info@goldencodesolutions.com",
    },
  },
    {
    id: 2,
    organizationId: 1,
    name: "GoldenCode Solutions - Google Recaptcha",
    platform: "google-recaptcha",
    isActive: true,
    data: {
      secretKey: "6Le-qFkrAAAAAE7FhbtSyRkYMvKlXmzpnLYK3sT8",
    },
  },
];

export default connectorsData;
