export interface EmailSubmission {
  email: string;
  score: number;
}

/**
 * Submit email to the /api/email endpoint.
 * v1: logs to console and returns success.
 * v2: integrate with Mailchimp / ConvertKit via EMAIL_SERVICE_API_KEY.
 */
export async function submitEmail(email: string, score: number): Promise<void> {
  const response = await fetch("/api/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, score } satisfies EmailSubmission),
  });

  if (!response.ok) {
    throw new Error("Failed to submit email");
  }
}
