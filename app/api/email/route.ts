import { NextRequest, NextResponse } from "next/server";

interface EmailPayload {
  email: string;
  score: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: EmailPayload = await request.json();
    const { email, score } = body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (typeof score !== "number" || score < 0 || score > 100) {
      return NextResponse.json({ error: "Invalid score" }, { status: 400 });
    }

    // v1: Log to console
    // v2: Integrate with Mailchimp / ConvertKit using EMAIL_SERVICE_API_KEY
    console.log("[Together Transformed] New lead:", {
      email,
      score,
      timestamp: new Date().toISOString(),
    });

    // TODO: Replace with real email provider integration
    // Example for ConvertKit:
    // const apiKey = process.env.EMAIL_SERVICE_API_KEY;
    // await fetch(`https://api.convertkit.com/v3/forms/{FORM_ID}/subscribe`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ api_key: apiKey, email, fields: { score } }),
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Together Transformed] Email submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
