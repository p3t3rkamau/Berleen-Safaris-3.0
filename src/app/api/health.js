// api/health.js
export default function handler(req, res) {
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'Berleen Safaris API',
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0'
    });
  }