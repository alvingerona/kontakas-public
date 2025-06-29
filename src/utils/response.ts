import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";

interface ErrorResponse {
  message: string;
  error?: string;
}

interface SuccessResponse {
  [key: string]: any;
}

/**
 * Creates a standardized API response
 */
export const createResponse = (
  statusCode: number,
  body: SuccessResponse | ErrorResponse
): APIGatewayProxyResult => {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body),
  };
};

/**
 * Creates a success response (200 OK)
 */
export const success = (body: SuccessResponse): APIGatewayProxyResult => {
  return createResponse(200, {
    success: true,
    ...body,
  });
};

/**
 * Creates a not found response (404)
 */
export const notFound = (message = "Not found"): APIGatewayProxyResult => {
  return createResponse(404, { message });
};

/**
 * Creates a validation error response (400 Bad Request)
 */
export const validationError = ({
  message = "Validation error",
  errors,
}: {
  errors?: Record<string, string>;
  message?: string;
}): APIGatewayProxyResult => {
  return createResponse(400, { message, errors });
};

/**
 * Creates a server error response (500)
 */
export const serverError = (error: unknown): APIGatewayProxyResult => {
  return createResponse(500, {
    message: "Internal server error",
    error: error instanceof Error ? error.message : "Unknown error",
  });
};

export const responseHandler = async ({
  event,
  handler,
  handlerName,
}: {
  event: APIGatewayProxyEvent;
  handlerName: string;
  handler: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;
}): Promise<APIGatewayProxyResult> => {
  try {
    return await handler(event);
  } catch (error) {
    console.error(`${handlerName} - Error`, error);
    return serverError(error);
  }
};
