import { NextResponse, type NextRequest } from "next/server";

// In a real deployment, use Resend, SendGrid, or a proper form backend
// For now, this endpoint acknowledges receipt and returns a success status

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Simulate form submission - in production, integrate with Resend/SendGrid
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "portfolio@ankitdeshpande.dev",
    //   to: "ankitdeshpande1998@gmail.com",
    //   subject: `Portfolio Contact: ${body.subject}`,
    //   text: `
    //     You have a new message from your portfolio contact form.
    //
    //     From: ${body.name} <${body.email}>
    //     Subject: ${body.subject}
    //
    //     Message:
    //     ${body.message}
    //   `,
    // });

    console.log("Contact form submission:", body);

    return NextResponse.json(
      { success: true, message: "Message received successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process submission. Please try again." },
      { status: 500 }
    );
  }
}