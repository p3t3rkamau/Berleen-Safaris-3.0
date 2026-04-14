import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  try {
    // ================= METHOD CHECK =================
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    // ================= SAFE BODY PARSE =================
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body || {};

    console.log("📥 Incoming booking:", body);

    // ================= VALIDATION =================
    if (!body.fullName || !body.email || !body.safari?.title) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const bookingId = `BER-${Date.now()}-${uuidv4().slice(0, 6).toUpperCase()}`;

    // ================= TRANSPORTER (SAFE INIT) =================
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ================= PDF (SAFE WRAPPER) =================
    const generatePDF = () =>
      new Promise((resolve, reject) => {
        try {
          const doc = new PDFDocument({ size: "A4", margin: 50 });
          const buffers = [];

          doc.on("data", (b) => buffers.push(b));
          doc.on("end", () => resolve(Buffer.concat(buffers)));
          doc.on("error", reject);

          doc.fontSize(18).text("BERLEEN SAFARIS BOOKING", { align: "center" });
          doc.moveDown();

          doc.fontSize(12);
          doc.text(`Booking ID: ${bookingId}`);
          doc.text(`Name: ${body.fullName}`);
          doc.text(`Email: ${body.email}`);
          doc.text(`Travelers: ${body.travelers}`);
          doc.text(`Date: ${body.preferredDate}`);
          doc.moveDown();

          doc.text(`Safari: ${body.safari.title}`);
          doc.text(`Duration: ${body.safari.duration}`);
          doc.text(`Price: ${body.safari.price}`);

          doc.end();
        } catch (err) {
          reject(err);
        }
      });

    let pdfBuffer = null;

    try {
      pdfBuffer = await generatePDF();
      console.log("📄 PDF generated");
    } catch (err) {
      console.error("❌ PDF error:", err);
    }

    // ================= EMAIL =================
    try {
      await transporter.sendMail({
        from: `"Berleen Safaris" <${process.env.SMTP_USER}>`,
        to: "tours@berleensafaris.com",
        subject: `🚨 New Booking - ${body.fullName}`,
        html: `
          <h2>New Booking</h2>
          <p><strong>ID:</strong> ${bookingId}</p>
          <p><strong>Name:</strong> ${body.fullName}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Safari:</strong> ${body.safari.title}</p>
        `,
        attachments: pdfBuffer
          ? [
              {
                filename: `booking-${bookingId}.pdf`,
                content: pdfBuffer,
              },
            ]
          : [],
      });

      console.log("📧 Email sent");
    } catch (emailErr) {
      console.error("❌ Email failed:", emailErr);

      // IMPORTANT: do NOT crash API
      return res.status(500).json({
        success: false,
        message: "Email sending failed",
        error: emailErr.message,
      });
    }

    // ================= RESPONSE =================
    return res.status(200).json({
      success: true,
      bookingId,
      message: "Booking successful",
    });

  } catch (err) {
    console.error("❌ SERVER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
}