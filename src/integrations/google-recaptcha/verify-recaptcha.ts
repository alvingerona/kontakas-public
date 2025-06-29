import axios from "axios";

interface RecaptchaVerifyResponse {
  success: boolean;
  score?: number; // for v3
  action?: string; // for v3
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

export async function verifyRecaptcha({
  token,
  secretKey,
}: {
  token: string;
  secretKey: string;
}): Promise<boolean> {
  try {
    if (!secretKey) {
      throw new Error("reCAPTCHA secret key is not configured");
    }

    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: secretKey,
          response: token,
        },
      }
    );

    const data: RecaptchaVerifyResponse = response.data;

    // For reCAPTCHA v3, you might want to check the score
    // if (data.success && data.score && data.score >= 0.5) return true;

    return data.success;
  } catch (error) {
    console.error("reCAPTCHA verification failed:", error);
    return false;
  }
}
