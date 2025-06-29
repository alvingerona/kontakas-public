import { verifyRecaptcha } from "../../integrations/google-recaptcha/verify-recaptcha";
import ConnectorGoogleRecaptcha from "../../models/Connector/ConnectorGoogleRecaptcha";
import Organization from "../../models/Organization";
import { Connectors } from "../../respositories/Connectors";
import { CONNECTOR_PLATFORM_GOOGLE_RECAPTCHA } from "../../types";
import { validationError } from "../../utils/response";
import { FIELD_G_RECAPTCHA_RESPONSE } from "./constants";

async function getGoogleRecaptchaConnector(organization: Organization) {
  const connector = await new Connectors().findByOrgIdAndPlatform(
    organization.id,
    CONNECTOR_PLATFORM_GOOGLE_RECAPTCHA
  );

  if (!connector) {
    throw new Error(
      "Google reCAPTCHA connector not found for the organization"
    );
  }

  return new ConnectorGoogleRecaptcha(connector);
}

function buildReturn(
  isValid: boolean,
  error: ReturnType<typeof validationError> | null
) {
  return {
    isValid,
    error,
  };
}

export async function recaptchaValidate({
  organization,
  recaptchaResponse,
}: {
  organization: Organization;
  recaptchaResponse: string;
}): Promise<{
  isValid: boolean;
  error: ReturnType<typeof validationError> | null;
}> {
  const connectorGoogleRecaptcha = await getGoogleRecaptchaConnector(
    organization
  );

  if (!connectorGoogleRecaptcha) {
    return buildReturn(
      false,
      validationError({
        message: "Google reCAPTCHA connector is not set",
        errors: {
          [CONNECTOR_PLATFORM_GOOGLE_RECAPTCHA]:
            "Google reCAPTCHA connector is not set",
        },
      })
    );
  }

  const recaptchaSecretKey = connectorGoogleRecaptcha.getSecretKey();

  if (!recaptchaSecretKey) {
    return buildReturn(
      false,
      validationError({
        message: "Google reCAPTCHA secret key is not set",
        errors: {
          [CONNECTOR_PLATFORM_GOOGLE_RECAPTCHA]:
            "Google reCAPTCHA secret key is not set",
        },
      })
    );
  }

  const validRecaptcha = await verifyRecaptcha({
    token: recaptchaResponse,
    secretKey: recaptchaSecretKey,
  });

  if (!validRecaptcha) {
    return buildReturn(
      false,
      validationError({
        message: "Invalid reCAPTCHA response",
        errors: { [FIELD_G_RECAPTCHA_RESPONSE]: "Invalid reCAPTCHA response" },
      })
    );
  }

  return buildReturn(true, null);
}
