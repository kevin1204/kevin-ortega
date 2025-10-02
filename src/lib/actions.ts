'use server';

import { z } from 'zod';
import { Resend } from 'resend';

// Initialize Resend (will be undefined if API key is not provided)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Rate limiting (simple in-memory store)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  userLimit.count++;
  return true;
}

export async function submitContactForm(formData: FormData) {
  try {
    // Get client IP (simplified for demo)
    const ip = 'unknown'; // In production, get from headers
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return {
        success: false,
        error: 'Too many requests. Please try again later.',
      };
    }

    // Parse and validate form data
    const rawData = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message'),
    };

    const validatedData = contactSchema.parse(rawData);

    // Prepare email content
    const emailContent = `
New contact form submission from kevin-resume.vercel.app

Name: ${validatedData.name}
Email: ${validatedData.email}
Company: ${validatedData.company || 'Not provided'}
Message: ${validatedData.message}

---
Sent from: ${validatedData.email}
Time: ${new Date().toISOString()}
    `.trim();

    // Send email if Resend is configured
    if (resend && process.env.CONTACT_TO && process.env.CONTACT_FROM) {
      try {
        await resend.emails.send({
          from: process.env.CONTACT_FROM,
          to: process.env.CONTACT_TO,
          subject: `New Contact Form Submission from ${validatedData.name}`,
          text: emailContent,
        });
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // Don't fail the request if email sending fails
      }
    } else {
      // Log to console in development
      console.log('Contact form submission (email not configured):', {
        ...validatedData,
        timestamp: new Date().toISOString(),
      });
    }

    return {
      success: true,
      message: 'Thank you for your message! I\'ll get back to you soon.',
    };

  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Please check your input and try again.',
      };
    }

    return {
      success: false,
      error: 'Something went wrong. Please try again later.',
    };
  }
}
