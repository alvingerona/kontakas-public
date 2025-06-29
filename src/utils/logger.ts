import { LOG_LEVEL } from "./env";

export const logger = (msg: string, context?: any) => {
  if (LOG_LEVEL !== "debug") {
    return;
  }

  console.log("=================================");
  console.log(`LOG: ${msg}`);
  if (context) {
    console.log("Context:", JSON.stringify(context, null, 2));
  }
  console.log("=================================");
};
