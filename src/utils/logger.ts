import { LOG_LEVEL } from "./env";

export const logger = (msg: string, context?: any) => {
  if (LOG_LEVEL !== "debug") {
    return;
  }

  console.debug("=================================");
  console.debug(`LOG: ${msg}`);
  if (context) {
    console.debug("Context:", JSON.stringify(context, null, 2));
  }
  console.debug("=================================");
};
