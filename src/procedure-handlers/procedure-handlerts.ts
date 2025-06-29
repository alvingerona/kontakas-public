import AbstractProcedureHandler from "./AbstractProcedureHandler";
import HelloWorldProcedure from "./HelloWorldProcedure";
import SESContactUsNotification from "./SESContactUsNotification";
import ValidateDefaultContactUs from "./ValidateDefaultContactUs";

export default {
  "validate-default-contact-us": ValidateDefaultContactUs,
  "hello-world": HelloWorldProcedure,
  "aws-ses-contact-us-notification": SESContactUsNotification,
} as Record<string, Partial<AbstractProcedureHandler>>;
