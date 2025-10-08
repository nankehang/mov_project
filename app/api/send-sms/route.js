import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { productId, productName, productUrl } = await request.json();

    // Validate required fields
    if (!productId || !productName || !productUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Your phone number
    const TO_PHONE = "+16127200910"; // Your phone number in E.164 format

    // Twilio credentials (add these to your .env.local)
    const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
    const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
    const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

    // Check if Twilio is configured
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
      console.error("Twilio credentials not configured");
      return NextResponse.json(
        { error: "SMS service not configured. Please contact administrator." },
        { status: 500 }
      );
    }

    // Create the SMS message
    const message = `🛍️ New Product Inquiry!\n\nProduct: ${productName}\n\nView Product:\n${productUrl}\n\n📱 Customer wants to order this item!`;

    // Send SMS using Twilio API
    const authHeader = Buffer.from(
      `${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`
    ).toString("base64");

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          To: TO_PHONE,
          From: TWILIO_PHONE_NUMBER,
          Body: message,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Twilio API error:", data);
      throw new Error(data.message || "Failed to send SMS");
    }

    console.log("SMS sent successfully:", data.sid);

    return NextResponse.json({
      success: true,
      message: "SMS sent successfully",
      messageId: data.sid,
    });
  } catch (error) {
    console.error("Error sending SMS:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send SMS" },
      { status: 500 }
    );
  }
}
