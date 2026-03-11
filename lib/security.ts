// Security utilities for input validation and sanitization

/**
 * Validates email format with strict regex
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;

  // Check length
  if (email.length > 254) return false;

  // RFC 5322 compliant email regex (simplified but secure)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return emailRegex.test(email);
}

/**
 * Sanitizes string input to prevent XSS
 */
export function sanitizeString(input: string): string {
  if (!input || typeof input !== 'string') return '';

  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and >
    .substring(0, 1000); // Max length
}

/**
 * Validates that a string contains only allowed characters
 */
export function isAlphanumericWithSpaces(input: string): boolean {
  if (!input || typeof input !== 'string') return false;
  return /^[a-zA-Z0-9\s-_]+$/.test(input);
}

/**
 * Checks if request is from a suspicious source
 */
export function isSuspiciousRequest(userAgent?: string | null): boolean {
  if (!userAgent) return true;

  const suspiciousPatterns = [
    /curl/i,
    /wget/i,
    /python/i,
    /scrapy/i,
    /bot/i,
    /spider/i,
    /crawler/i,
  ];

  // Allow legitimate bots (Google, etc.)
  const allowedBots = [
    /googlebot/i,
    /bingbot/i,
  ];

  if (allowedBots.some(pattern => pattern.test(userAgent))) {
    return false;
  }

  return suspiciousPatterns.some(pattern => pattern.test(userAgent));
}

/**
 * Extracts client IP from request headers
 */
export function getClientIp(request: Request): string {
  const headers = request.headers;

  // Check various headers in order of preference
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

/**
 * Validates JSON Web Token (simplified for email tokens)
 */
export function validateEmailToken(token: string): {
  valid: boolean;
  data?: any;
  error?: string;
} {
  try {
    // Decode base64
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const data = JSON.parse(decoded);

    // Validate required fields
    if (!data.email || !data.timestamp || !data.action) {
      return { valid: false, error: 'Invalid token structure' };
    }

    // Check if email is valid
    if (!isValidEmail(data.email)) {
      return { valid: false, error: 'Invalid email in token' };
    }

    // Check if token is expired (48 hours)
    const now = Date.now();
    const expiryTime = 48 * 60 * 60 * 1000;
    if (now - data.timestamp > expiryTime) {
      return { valid: false, error: 'Token expired' };
    }

    // Check if action is valid
    if (data.action !== 'beta_signup') {
      return { valid: false, error: 'Invalid action' };
    }

    return { valid: true, data };
  } catch (error) {
    return { valid: false, error: 'Invalid token format' };
  }
}

/**
 * Rate limiting check (returns time to wait in ms)
 */
export function calculateBackoff(attempts: number): number {
  // Exponential backoff: 1s, 2s, 4s, 8s, etc.
  return Math.min(Math.pow(2, attempts) * 1000, 60000); // Max 60s
}

/**
 * Validates preference selections
 */
export function validatePreferences(preferences: any): {
  valid: boolean;
  error?: string;
} {
  if (!preferences || typeof preferences !== 'object') {
    return { valid: false, error: 'Invalid preferences format' };
  }

  // Validate chains
  if (!Array.isArray(preferences.chains)) {
    return { valid: false, error: 'Chains must be an array' };
  }

  const allowedChains = ['Solana', 'Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Base', 'Avalanche'];
  for (const chain of preferences.chains) {
    if (!allowedChains.includes(chain)) {
      return { valid: false, error: `Invalid chain: ${chain}` };
    }
  }

  if (preferences.chains.length === 0) {
    return { valid: false, error: 'At least one chain must be selected' };
  }

  if (preferences.chains.length > 10) {
    return { valid: false, error: 'Too many chains selected' };
  }

  // Validate agent type
  const allowedAgentTypes = [
    'ai-agent-developer',
    'service-provider',
    'infrastructure-operator',
    'researcher',
    'enterprise',
    'other'
  ];

  if (!preferences.agentType || !allowedAgentTypes.includes(preferences.agentType)) {
    return { valid: false, error: 'Invalid agent type' };
  }

  // Validate notifications
  if (typeof preferences.notifications !== 'boolean') {
    return { valid: false, error: 'Notifications must be boolean' };
  }

  return { valid: true };
}

/**
 * Checks for SQL injection patterns
 */
export function containsSqlInjection(input: string): boolean {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/i,
    /(--|;|\/\*|\*\/)/,
    /(\bOR\b.*=.*)/i,
    /(\bAND\b.*=.*)/i,
    /(UNION.*SELECT)/i,
  ];

  return sqlPatterns.some(pattern => pattern.test(input));
}

/**
 * Checks for XSS patterns
 */
export function containsXss(input: string): boolean {
  const xssPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi, // onclick, onload, etc.
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
  ];

  return xssPatterns.some(pattern => pattern.test(input));
}

/**
 * Complete input validation
 */
export function validateInput(input: string, type: 'email' | 'text' = 'text'): {
  valid: boolean;
  sanitized?: string;
  error?: string;
} {
  if (!input || typeof input !== 'string') {
    return { valid: false, error: 'Input is required' };
  }

  // Check for malicious patterns
  if (containsSqlInjection(input)) {
    return { valid: false, error: 'Invalid characters detected' };
  }

  if (containsXss(input)) {
    return { valid: false, error: 'Invalid characters detected' };
  }

  // Type-specific validation
  if (type === 'email') {
    if (!isValidEmail(input)) {
      return { valid: false, error: 'Invalid email format' };
    }
    return { valid: true, sanitized: input.toLowerCase().trim() };
  }

  // General text validation
  const sanitized = sanitizeString(input);
  return { valid: true, sanitized };
}
