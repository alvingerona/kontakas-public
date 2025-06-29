export const CONNECTOR_AWS_SES = "aws-ses";
export const CONNECTOR_PLATFORM_SENGRID = "sendgrid";
export const CONNECTOR_PLATFORM_GOOGLE = "google";
export const CONNECTOR_PLATFORM_HUBSPOT = "hubspot";
export const CONNECTOR_PLATFORM_GOOGLE_RECAPTCHA = "google-recaptcha";

export type ConnectoPlatformAWSSES = typeof CONNECTOR_AWS_SES;
export type ConnectoPlatformSendgrid = typeof CONNECTOR_PLATFORM_SENGRID;
export type ConnectoPlatformGoogle = typeof CONNECTOR_PLATFORM_GOOGLE;
export type ConnectoPlatformHubspot = typeof CONNECTOR_PLATFORM_HUBSPOT;
export type ConnectoPlatformGoogleRecaptcha =
  typeof CONNECTOR_PLATFORM_GOOGLE_RECAPTCHA;

export type ConnectorPlatform =
  | ConnectoPlatformSendgrid
  | ConnectoPlatformGoogle
  | ConnectoPlatformHubspot
  | ConnectoPlatformGoogleRecaptcha
  | ConnectoPlatformAWSSES;
