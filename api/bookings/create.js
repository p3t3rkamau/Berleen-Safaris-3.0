// api/bookings/create.js
import express from "express";
import PDFDocument from "pdfkit";
import nodemailer from "nodemailer";

const app = express();

app.use(express.json({ limit: "10mb" }));

// ================= HELPERS =================
const safeNumber = (val) => {
  const num = Number(val);
  return isNaN(num) ? null : num;
};

const safeDate = (val) => {
  const d = val ? new Date(val) : new Date();
  return isNaN(d.getTime()) ? new Date() : d;
};

// ================= TRANSPORTER =================
const createTransporter = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("⚠️ SMTP credentials missing — emails will be skipped");
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// ================= PDF GENERATOR =================
function generateBookingPDF(bookingData) {
  return new Promise((resolve, reject) => {
    try {
      const buffers = [];
      const doc = new PDFDocument({ size: "A4", margin: 50 });

      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.on("error", reject);

      const safari = bookingData.safari || {};

      const priceNum = safeNumber(safari.price);
      const formattedPrice = priceNum
        ? `$${priceNum.toLocaleString()}`
        : "Contact for pricing";

      const formattedDate = safeDate(
        bookingData.preferredDate
      ).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // ================= HEADER =================
      doc.fontSize(20).text("BERLEEN SAFARIS", { align: "center" });
      doc.moveDown();
      doc.fontSize(16).text("Booking Confirmation", { align: "center" });
      doc.moveDown(2);

      // ================= DETAILS =================
      doc.fontSize(12);
      doc.text(`Booking Ref: ${bookingData.bookingReference}`);
      doc.text(`Name: ${bookingData.fullName}`);
      doc.text(`Email: ${bookingData.email}`);
      doc.text(`Travelers: ${bookingData.travelers}`);
      doc.text(`Date: ${formattedDate}`);
      doc.moveDown();

      doc.text(`Safari: ${safari.title || "N/A"}`);
      doc.text(`Duration: ${safari.duration || "N/A"}`);
      doc.text(`Price: ${formattedPrice}`);

      if (bookingData.specialRequests) {
        doc.moveDown();
        doc.text(`Special Requests: ${bookingData.specialRequests}`);
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

// ================= EMAIL TEMPLATES =================
const customerEmail = (data) => `
  <h2>🎉 Booking Confirmed</h2>
  <p>Hi ${data.fullName},</p>
  <p>Your safari booking has been received successfully.</p>
  <p><strong>Booking Ref:</strong> ${data.bookingReference}</p>
  <p>We will contact you shortly.</p>
`;

const adminEmail = (data) => `
  <h2>🚨 New Booking Received</h2>
  <p><strong>Name:</strong> ${data.fullName}</p>
  <p><strong>Email:</strong> ${data.email}</p>
  <p><strong>Safari:</strong> ${data.safari.title}</p>
  <p><strong>Travelers:</strong> ${data.travelers}</p>
  <p><strong>Ref:</strong> ${data.bookingReference}</p>
`;

// ================= ROUTE =================
app.post("/bookings/create", async (req, res) => {
  try {
    const body = req.body || {};

    console.log("📥 Incoming booking:", body);

    // ================= VALIDATION =================
    if (!body.fullName || !body.email) {
      return res.status(400).json({
        success: false,
        message: "Missing name or email",
      });
    }

    if (!body.safari?.title) {
      return res.status(400).json({
        success: false,
        message: "Invalid safari data",
      });
    }

    // ================= BOOKING DATA =================
    const bookingData = {
      bookingReference: `BER-${Date.now().toString(36).toUpperCase()}`,
      fullName: body.fullName,
      email: body.email,
      travelers: body.travelers || "N/A",
      preferredDate: body.preferredDate,
      specialRequests: body.specialRequests || null,
      safari: body.safari,
      timestamp: new Date().toISOString(),
    };

    console.log(`📝 Booking ${bookingData.bookingReference}`);

    // ================= PDF =================
    let pdfBuffer = null;
    try {
      pdfBuffer = await generateBookingPDF(bookingData);
      console.log("📄 PDF generated");
    } catch (err) {
      console.error("❌ PDF error:", err);
    }

    // ================= EMAIL =================
    const transporter = createTransporter();

    if (transporter) {
      try {
        await Promise.all([
          // ================= CUSTOMER =================
          transporter.sendMail({
            from: `"Berleen Safaris" <${process.env.SMTP_USER}>`,
            to: bookingData.email,
            subject: `Booking Confirmation - ${bookingData.safari.title}`,
            html: customerEmail(bookingData),
            attachments: pdfBuffer
              ? [
                  {
                    filename: `booking-${bookingData.bookingReference}.pdf`,
                    content: pdfBuffer,
                  },
                ]
              : [],
          }),

          // ================= ADMIN =================
          transporter.sendMail({
            from: `"Berleen System" <${process.env.SMTP_USER}>`,
            to: "tours@berleensafaris.com",
            subject: `🚨 New Booking - ${bookingData.fullName}`,
            html: adminEmail(bookingData),
            attachments: pdfBuffer
              ? [
                  {
                    filename: `admin-${bookingData.bookingReference}.pdf`,
                    content: pdfBuffer,
                  },
                ]
              : [],
          }),
        ]);

        console.log("📧 Customer + Admin emails sent");
      } catch (emailErr) {
        console.error("❌ Email failed:", emailErr);
      }
    } else {
      console.log("⚠️ Email skipped (SMTP not configured)");
    }

    // ================= RESPONSE =================
    return res.status(200).json({
      success: true,
      bookingReference: bookingData.bookingReference,
      message: "Booking successful",
    });
  } catch (err) {
    console.error("❌ Server error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// ================= 404 =================
app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: "Not found" });
});

export default app;