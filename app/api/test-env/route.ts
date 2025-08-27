import { NextResponse } from 'next/server';

export async function GET() {
  // Get all environment variables
  const envVars = {
    // SMTP Configuration
    SMTP_HOST: process.env.SMTP_HOST || 'Not set',
    SMTP_PORT: process.env.SMTP_PORT || 'Not set',
    SMTP_SECURE: process.env.SMTP_SECURE || 'Not set',
    SMTP_USER: process.env.SMTP_USER || 'Not set',
    SMTP_PASS: process.env.SMTP_PASS ? '***SET***' : 'Not set', // Hide password for security
    SMTP_FROM: process.env.SMTP_FROM || 'Not set',
    CONTACT_EMAIL: process.env.CONTACT_EMAIL || 'Not set',
    
    // Next.js default env vars
    NODE_ENV: process.env.NODE_ENV || 'Not set',
    
    // Custom env vars (if any)
    CUSTOM_VAR: process.env.CUSTOM_VAR || 'Not set',
  };

  // Check if .env.local is being loaded
  const envStatus = {
    hasEnvLocal: !!process.env.SMTP_HOST,
    totalVars: Object.keys(envVars).length,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json({
    message: 'Environment Variables Test',
    status: envStatus,
    environment: envVars,
    note: 'SMTP_PASS is hidden for security. If you see "***SET***", the password is configured.'
  });
}
