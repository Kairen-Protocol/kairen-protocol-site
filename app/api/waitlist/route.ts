import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Resend for email
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Initialize rate limiter with in-memory fallback
let ratelimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '1 h'), // 3 requests per hour per IP
    analytics: true,
    prefix: '@upstash/ratelimit',
  });
}

// In-memory rate limiting fallback (for development)
const memoryStore = new Map<string, { count: number; resetAt: number }>();

function checkRateLimitMemory(identifier: string): { success: boolean; remaining: number } {
  const now = Date.now();
  const key = identifier;
  const entry = memoryStore.get(key);

  // Clean up expired entries
  if (entry && entry.resetAt < now) {
    memoryStore.delete(key);
  }

  const current = memoryStore.get(key);

  if (!current) {
    memoryStore.set(key, { count: 1, resetAt: now + 3600000 }); // 1 hour
    return { success: true, remaining: 2 };
  }

  if (current.count >= 3) {
    return { success: false, remaining: 0 };
  }

  current.count++;
  return { success: true, remaining: 3 - current.count };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Rate limiting
    const identifier = request.headers.get('x-forwarded-for') ||
                      request.headers.get('x-real-ip') ||
                      'anonymous';

    let rateLimitResult;

    if (ratelimit) {
      rateLimitResult = await ratelimit.limit(identifier);
    } else {
      // Fallback to in-memory rate limiting
      rateLimitResult = checkRateLimitMemory(identifier);
    }

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded. Please try again later.',
          remaining: 0
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '3',
            'X-RateLimit-Remaining': '0',
          }
        }
      );
    }

    // Send configuration email if Resend is configured
    if (resend) {
      const configToken = Buffer.from(
        JSON.stringify({
          email,
          timestamp: Date.now(),
          action: 'beta_signup'
        })
      ).toString('base64');

      const configUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://kairen.xyz'}/configure?token=${configToken}`;

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@kairen.xyz',
        to: email,
        subject: 'Configure Your Kairen Beta Access',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  font-family: 'Courier New', monospace;
                  background-color: #000000;
                  color: #00ff00;
                  padding: 40px;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  border: 2px solid #00ff00;
                  padding: 30px;
                  background: rgba(0, 20, 0, 0.8);
                }
                .header {
                  font-size: 24px;
                  font-weight: bold;
                  margin-bottom: 20px;
                  text-transform: uppercase;
                  letter-spacing: 2px;
                }
                .content {
                  line-height: 1.8;
                  margin-bottom: 30px;
                }
                .button {
                  display: inline-block;
                  background: #00ff00;
                  color: #000000;
                  padding: 15px 30px;
                  text-decoration: none;
                  font-weight: bold;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                  border: 2px solid #00ff00;
                  transition: all 0.3s;
                }
                .button:hover {
                  background: #000000;
                  color: #00ff00;
                }
                .footer {
                  margin-top: 30px;
                  font-size: 12px;
                  color: rgba(0, 255, 0, 0.6);
                }
                .glow {
                  text-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header glow">
                  [KAIREN PROTOCOL]
                </div>
                <div class="header" style="font-size: 18px; color: #ffff00;">
                  BETA ACCESS CONFIGURATION REQUIRED
                </div>
                <div class="content">
                  <p>// SYSTEM MESSAGE</p>
                  <p>Thank you for joining the Kairen Protocol beta waitlist.</p>
                  <p>To complete your registration and configure your preferences, please click the button below:</p>
                </div>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${configUrl}" class="button">
                    CONFIGURE ACCESS →
                  </a>
                </div>
                <div class="content">
                  <p><strong>What to expect:</strong></p>
                  <p>• Configure your agent identity preferences</p>
                  <p>• Select your blockchain preferences (Solana, EVM, or both)</p>
                  <p>• Choose notification settings</p>
                  <p>• Early access when beta launches Q2 2026</p>
                </div>
                <div class="footer">
                  <p>[LAUNCHING Q2 2026] • KAIREN.XYZ</p>
                  <p>This link expires in 48 hours.</p>
                  <p>If you didn't request this, please ignore this email.</p>
                </div>
              </div>
            </body>
          </html>
        `,
      });
    }

    // Store email in database (you'll need to implement this)
    // For now, just log it
    console.log(`[WAITLIST] New signup: ${email} from ${identifier}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Configuration email sent! Please check your inbox.',
        remaining: rateLimitResult.remaining || 0
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': '3',
          'X-RateLimit-Remaining': String(rateLimitResult.remaining || 0),
        }
      }
    );

  } catch (error) {
    console.error('[WAITLIST ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
