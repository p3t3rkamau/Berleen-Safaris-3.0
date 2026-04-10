// api/bookings/create.js
import express from 'express';
import cors from 'cors';
import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    'https://berleensafaris.com',
    'https://www.berleensafaris.com',
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:5173', 'http://localhost:3000'] : [])
  ],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Email transporter factory
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Generate PDF function
async function generateBookingPDF(bookingData) {
  return new Promise((resolve, reject) => {
    try {
      const buffers = [];
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50,
        bufferPages: true,
        info: {
          Title: `Berleen Safaris - ${bookingData.safari.title}`,
          Author: 'Berleen Safaris',
          Subject: 'Safari Booking Confirmation',
          Keywords: 'safari, booking, kenya, tanzania, berleen safaris'
        }
      });

      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      // ============ HEADER ============
      doc.fontSize(28)
         .font('Helvetica-Bold')
         .fillColor('#1a4d2e')
         .text('BERLEEN SAFARIS', { align: 'center' });
      
      doc.fontSize(14)
         .font('Helvetica')
         .fillColor('#e67e22')
         .text('Your Gateway to African Adventure', { align: 'center' });
      
      doc.moveDown(1);
      
      doc.fontSize(18)
         .font('Helvetica-Bold')
         .fillColor('#2c3e50')
         .text('Safari Booking Confirmation', { align: 'center' });
      
      doc.moveDown(2);

      // ============ BOOKING REFERENCE BOX ============
      doc.rect(50, doc.y, 495, 45)
         .fillAndStroke('#f8f9fa', '#1a4d2e');
      
      doc.fillColor('#1a4d2e')
         .fontSize(12)
         .font('Helvetica-Bold')
         .text('BOOKING REFERENCE:', 65, doc.y + 12, { continued: true })
         .font('Helvetica')
         .fillColor('#e67e22')
         .text(` ${bookingData.bookingReference}`);
      
      doc.fillColor('#6c757d')
         .fontSize(10)
         .text('Please quote this reference in all communications', 65, doc.y + 10);
      
      doc.moveDown(3);

      // ============ SAFARI DETAILS ============
      doc.fontSize(16)
         .font('Helvetica-Bold')
         .fillColor('#1a4d2e')
         .text('Safari Details', { underline: true });
      
      doc.moveDown(0.5);
      
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .fillColor('#2c3e50')
         .text(bookingData.safari.title);
      
      if (bookingData.safari.description) {
        doc.fontSize(11)
           .font('Helvetica')
           .fillColor('#495057')
           .text(bookingData.safari.description, { width: 500 });
      }
      
      doc.moveDown();

      // ============ DETAILS TABLE ============
      const tableLeft = 50;
      const col1Width = 160;
      const col2Width = 300;
      
      const details = [
        { label: 'Duration:', value: bookingData.safari.duration || `${bookingData.safari.days} Days` },
        { label: 'Destination:', value: bookingData.safari.location || 'Kenya/Tanzania' },
        { label: 'Price per person:', value: bookingData.safari.price ? `$${bookingData.safari.price.toLocaleString()}` : 'Contact for pricing' },
        { label: 'Preferred Date:', value: new Date(bookingData.preferredDate).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })},
        { label: 'Number of Travelers:', value: bookingData.travelers }
      ];
      
      details.forEach((detail, index) => {
        if (index % 2 === 0) {
          doc.rect(tableLeft - 10, doc.y - 5, 450, 20).fill('#f8f9fa');
        }
        
        doc.fillColor('#1a4d2e')
           .font('Helvetica-Bold')
           .text(detail.label, tableLeft, doc.y, { width: col1Width });
        
        doc.fillColor('#2c3e50')
           .font('Helvetica')
           .text(detail.value, tableLeft + col1Width, doc.y - 15, { width: col2Width });
        
        doc.moveDown(0.5);
      });
      
      doc.moveDown();

      // ============ CUSTOMER INFORMATION ============
      doc.fontSize(16)
         .font('Helvetica-Bold')
         .fillColor('#1a4d2e')
         .text('Customer Information');
      
      doc.moveDown(0.5);
      
      doc.fontSize(11)
         .font('Helvetica-Bold')
         .fillColor('#1a4d2e')
         .text('Name:', { continued: true })
         .font('Helvetica')
         .fillColor('#2c3e50')
         .text(` ${bookingData.fullName}`);
      
      doc.fontSize(11)
         .font('Helvetica-Bold')
         .fillColor('#1a4d2e')
         .text('Email:', { continued: true })
         .font('Helvetica')
         .fillColor('#2c3e50')
         .text(` ${bookingData.email}`);
      
      if (bookingData.phone) {
        doc.fontSize(11)
           .font('Helvetica-Bold')
           .fillColor('#1a4d2e')
           .text('Phone:', { continued: true })
           .font('Helvetica')
           .fillColor('#2c3e50')
           .text(` ${bookingData.phone}`);
      }
      
      if (bookingData.specialRequests) {
        doc.moveDown();
        doc.fontSize(11)
           .font('Helvetica-Bold')
           .fillColor('#1a4d2e')
           .text('Special Requests:');
        doc.font('Helvetica')
           .fillColor('#495057')
           .text(bookingData.specialRequests, { width: 500 });
      }
      
      doc.moveDown(2);

      // ============ WHAT'S INCLUDED ============
      doc.fontSize(16)
         .font('Helvetica-Bold')
         .fillColor('#1a4d2e')
         .text('What\'s Included');
      
      doc.moveDown(0.5);
      
      const inclusions = bookingData.safari.highlights || [
        'Professional English-speaking safari guide',
        'All park entrance fees and government taxes',
        'Accommodation as per itinerary',
        'All meals during safari',
        'Bottled water during game drives',
        'Airport transfers',
        '4x4 safari vehicle with pop-up roof'
      ];
      
      doc.fontSize(11)
         .font('Helvetica')
         .fillColor('#2c3e50');
      
      inclusions.slice(0, 8).forEach(item => {
        doc.text(`✓ ${item}`, { indent: 20 });
      });
      
      doc.moveDown(2);

      // ============ PAYMENT POLICY ============
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .fillColor('#e67e22')
         .text('Payment & Cancellation Policy');
      
      doc.moveDown(0.5);
      
      doc.fontSize(10)
         .font('Helvetica')
         .fillColor('#495057')
         .text('• 30% deposit required to confirm booking')
         .text('• Balance due 45 days before departure')
         .text('• Free cancellation up to 60 days before departure')
         .text('• 50% refund for cancellations 30-59 days before departure')
         .text('• Travel insurance is strongly recommended');
      
      doc.moveDown(2);

      // ============ FOOTER ============
      doc.fontSize(10)
         .font('Helvetica-Bold')
         .fillColor('#1a4d2e')
         .text('Berleen Safaris', { align: 'center' });
      
      doc.fontSize(9)
         .font('Helvetica')
         .fillColor('#6c757d')
         .text('📞 +254 714 018 914 | ✉️ tours@berleensafaris.com | 🌐 www.berleensafaris.com', { align: 'center' });
      
      doc.moveDown(0.5);
      
      doc.fontSize(8)
         .fillColor('#adb5bd')
         .text(`Generated on ${new Date().toLocaleString('en-US', { 
           dateStyle: 'full', 
           timeStyle: 'short' 
         })}`, { align: 'center' });
      
      doc.fontSize(8)
         .text('Thank you for choosing Berleen Safaris - Creating Unforgettable African Memories', { align: 'center' });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

// Customer email HTML template
function getCustomerEmailHtml(bookingData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { 
          font-family: 'Segoe UI', Arial, sans-serif; 
          line-height: 1.6; 
          color: #2c3e50; 
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background: #ffffff;
        }
        .header { 
          background: linear-gradient(135deg, #1a4d2e 0%, #2d6a4f 100%);
          color: white; 
          padding: 40px 30px; 
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
        }
        .header p {
          margin: 10px 0 0;
          font-size: 16px;
          opacity: 0.95;
        }
        .content { 
          padding: 40px 30px;
          background: #f8f9fa;
        }
        .greeting {
          font-size: 18px;
          margin-bottom: 20px;
        }
        .booking-box { 
          background: white; 
          padding: 20px; 
          border-left: 5px solid #e67e22; 
          margin: 25px 0;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .booking-ref {
          font-size: 20px;
          font-weight: bold;
          color: #1a4d2e;
          font-family: 'Courier New', monospace;
        }
        .safari-title {
          color: #1a4d2e;
          font-size: 20px;
          margin: 20px 0 10px;
        }
        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin: 25px 0;
        }
        .detail-item {
          background: white;
          padding: 15px;
          border-radius: 5px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .detail-label {
          font-weight: 600;
          color: #1a4d2e;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        .detail-value {
          color: #2c3e50;
          font-size: 15px;
          font-weight: 500;
        }
        .next-steps {
          background: #fff3cd;
          padding: 20px;
          border-radius: 5px;
          margin: 25px 0;
          border: 1px solid #ffc107;
        }
        .next-steps h3 {
          color: #856404;
          margin-top: 0;
        }
        .next-steps ol {
          margin-bottom: 0;
          padding-left: 20px;
        }
        .next-steps li {
          margin-bottom: 8px;
        }
        .button {
          display: inline-block;
          background: #e67e22;
          color: white;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
          font-weight: 600;
        }
        .footer {
          padding: 30px;
          text-align: center;
          background: #1a4d2e;
          color: white;
        }
        .footer a {
          color: #e67e22;
          text-decoration: none;
        }
        .social-links {
          margin: 20px 0;
        }
        .social-links a {
          margin: 0 10px;
          color: #e67e22;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🦁 Booking Confirmed!</h1>
          <p>Your African adventure begins here</p>
        </div>
        
        <div class="content">
          <div class="greeting">
            Dear ${bookingData.fullName},
          </div>
          
          <p>Thank you for choosing <strong>Berleen Safaris</strong> for your upcoming adventure. We're thrilled to confirm your safari booking!</p>
          
          <div class="booking-box">
            <div style="font-size: 14px; color: #6c757d; margin-bottom: 5px;">Booking Reference</div>
            <div class="booking-ref">${bookingData.bookingReference}</div>
            <div style="font-size: 12px; color: #6c757d; margin-top: 10px;">
              Please quote this reference in all communications
            </div>
          </div>
          
          <h2 class="safari-title">${bookingData.safari.title}</h2>
          
          <div class="details-grid">
            <div class="detail-item">
              <div class="detail-label">Duration</div>
              <div class="detail-value">${bookingData.safari.duration || `${bookingData.safari.days} Days`}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Travelers</div>
              <div class="detail-value">${bookingData.travelers}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Preferred Date</div>
              <div class="detail-value">${new Date(bookingData.preferredDate).toLocaleDateString('en-US', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Destination</div>
              <div class="detail-value">${bookingData.safari.location || 'Kenya/Tanzania'}</div>
            </div>
          </div>
          
          <div class="next-steps">
            <h3>📋 What Happens Next?</h3>
            <ol>
              <li>Our team will contact you within 24 hours to confirm availability</li>
              <li>We'll send payment details for the 30% deposit</li>
              <li>Once deposit is received, your booking is fully confirmed</li>
              <li>You'll receive pre-departure information 2 weeks before travel</li>
            </ol>
          </div>
          
          <p>Your detailed booking confirmation is attached as a PDF. Please review it carefully and let us know if anything needs adjustment.</p>
          
          <center>
            <a href="https://berleensafaris.com/contact" class="button">Contact Us</a>
          </center>
        </div>
        
        <div class="footer">
          <h3 style="margin-top: 0; color: white;">Berleen Safaris</h3>
          <p>
            📞 +254 714 018 914<br>
            ✉️ tours@berleensafaris.com<br>
            🌐 www.berleensafaris.com
          </p>
          <div class="social-links">
            <a href="#">Facebook</a> • 
            <a href="#">Instagram</a> • 
            <a href="#">TripAdvisor</a>
          </div>
          <p style="font-size: 12px; opacity: 0.8; margin-top: 20px;">
            © ${new Date().getFullYear()} Berleen Safaris. All rights reserved.<br>
            Creating Unforgettable African Memories
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Admin email HTML template
function getAdminEmailHtml(bookingData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; }
        .header { background: #1a4d2e; color: white; padding: 20px; }
        .header h2 { margin: 0; }
        .content { padding: 20px; }
        .info-table { width: 100%; border-collapse: collapse; }
        .info-table td { padding: 12px; border-bottom: 1px solid #dee2e6; }
        .info-table td:first-child { font-weight: bold; background: #f8f9fa; width: 180px; }
        .urgent { background: #dc3545; color: white; padding: 15px; margin: 20px 0; border-radius: 5px; text-align: center; }
        .reference { font-size: 20px; font-weight: bold; color: #e67e22; font-family: monospace; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🦁 New Safari Booking Received</h2>
        </div>
        <div class="content">
          <table class="info-table">
            <tr><td>Booking Reference</td><td><span class="reference">${bookingData.bookingReference}</span></td></tr>
            <tr><td>Customer Name</td><td>${bookingData.fullName}</td></tr>
            <tr><td>Email</td><td><a href="mailto:${bookingData.email}">${bookingData.email}</a></td></tr>
            <tr><td>Phone</td><td>${bookingData.phone || 'Not provided'}</td></tr>
            <tr><td>Safari Package</td><td>${bookingData.safari.title}</td></tr>
            <tr><td>Number of Travelers</td><td>${bookingData.travelers}</td></tr>
            <tr><td>Preferred Date</td><td>${bookingData.preferredDate}</td></tr>
            <tr><td>Special Requests</td><td>${bookingData.specialRequests || 'None'}</td></tr>
            <tr><td>Booking Time</td><td>${new Date().toLocaleString()}</td></tr>
          </table>
          
          <div class="urgent">
            ⏰ ACTION REQUIRED: Contact customer within 24 hours to confirm availability
          </div>
          
          <p>The complete booking confirmation PDF is attached to this email.</p>
          <p>Reply to this email to acknowledge receipt.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// POST /api/bookings/create
app.post('/api/bookings/create', async (req, res) => {
  try {
    const bookingData = {
      bookingReference: `BER-${Date.now().toString(36).toUpperCase()}`,
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone || null,
      travelers: req.body.travelers,
      preferredDate: req.body.preferredDate,
      specialRequests: req.body.specialRequests || null,
      safari: req.body.safari,
      timestamp: new Date().toISOString()
    };

    console.log(`📝 Processing booking: ${bookingData.bookingReference}`);
    console.log(`   Customer: ${bookingData.fullName} (${bookingData.email})`);
    console.log(`   Safari: ${bookingData.safari.title}`);

    // Generate PDF
    const pdfBuffer = await generateBookingPDF(bookingData);
    console.log(`📄 PDF generated (${(pdfBuffer.length / 1024).toFixed(2)} KB)`);

    // Create email transporter
    const transporter = createTransporter();

    // Send both emails in parallel
    await Promise.all([
      // Customer confirmation email
      transporter.sendMail({
        from: `"Berleen Safaris" <${process.env.SMTP_USER}>`,
        to: bookingData.email,
        replyTo: 'tours@berleensafaris.com',
        subject: `🎉 Safari Booking Confirmation - ${bookingData.safari.title} | Berleen Safaris`,
        html: getCustomerEmailHtml(bookingData),
        attachments: [{
          filename: `Berleen-Safaris-Booking-${bookingData.bookingReference}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }]
      }),
      
      // Admin notification email
      transporter.sendMail({
        from: `"Berleen Safaris System" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL || 'tours@berleensafaris.com',
        subject: `🦁 NEW BOOKING: ${bookingData.safari.title} - ${bookingData.fullName}`,
        html: getAdminEmailHtml(bookingData),
        attachments: [{
          filename: `ADMIN-BOOKING-${bookingData.bookingReference}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }]
      })
    ]);

    console.log(`📧 Emails sent successfully`);
    console.log(`✅ Booking ${bookingData.bookingReference} completed`);

    res.status(200).json({
      success: true,
      message: 'Booking confirmed! Check your email for the PDF confirmation.',
      bookingReference: bookingData.bookingReference
    });

  } catch (error) {
    console.error('❌ Booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process booking. Please try again or contact us directly.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Handle 404 for undefined routes within this function
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'API endpoint not found' 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  });
});

export default app;