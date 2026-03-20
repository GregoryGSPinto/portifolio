import { NextResponse } from 'next/server';
import { contactFallbackCopy } from '@/lib/content';
import { siteConfig } from '@/lib/site';

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string;
  lang?: 'pt' | 'en';
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value: string) {
  return value.replace(/\r/g, '').trim();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const lang = body.lang === 'en' ? 'en' : 'pt';
    const name = sanitize(body.name ?? '');
    const email = sanitize(body.email ?? '');
    const subject = sanitize(body.subject ?? '');
    const message = sanitize(body.message ?? '');

    if (body.website) {
      return NextResponse.json({ success: true, spam: true }, { status: 202 });
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: lang === 'pt' ? 'Preencha todos os campos.' : 'All fields are required.' },
        { status: 400 },
      );
    }

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: lang === 'pt' ? 'Email invalido.' : 'Invalid email address.' },
        { status: 400 },
      );
    }

    if (message.length < 20) {
      return NextResponse.json(
        { error: lang === 'pt' ? 'Explique um pouco mais sobre o contexto.' : 'Please add a bit more context to your message.' },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL || siteConfig.email;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          fallback: true,
          fallbackMessage: contactFallbackCopy[lang],
          contactEmail: toEmail,
        },
        { status: 503 },
      );
    }

    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 },
    );
  }
}
