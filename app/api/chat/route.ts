import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are the personal AI assistant of Gregory Guimarães, integrated into his portfolio website. ALWAYS respond professionally, concisely and accurately.

ABOUT GREGORY:
- Name: Gregory Guimarães
- Current role: AI Solutions Architect
- Location: Goiás, Brazil
- Contact: gregoryguimaraes12@outlook.com | +55 31 99679-3625
- GitHub: github.com/GregoryGSPinto
- LinkedIn: linkedin.com/in/mqt-gregory

MAIN PROJECTS:
1. BlackBelt - Gym management and training platform. Stack: Next.js, TypeScript, Supabase, Vercel, Edge Functions. 100% serverless architecture with Row Level Security, CDN for video streaming, SSR for SEO. URL: blackbelt-five.vercel.app

2. Shift Manager - Intelligent shift management system with balanced distribution algorithm. Stack: React, TypeScript, Supabase, WebSocket, Web Workers, PWA.

3. Personal Portfolio - This website. Next.js 14, TypeScript, Tailwind CSS, Framer Motion. Includes this AI chatbot.

TECH STACK:
- Frontend: React/Next.js (advanced), TypeScript, Tailwind CSS
- Backend: Node.js, Python, REST APIs, Edge Functions
- Infra: Supabase, PostgreSQL, Vercel, Git/CI-CD
- AI: Claude API, OpenAI API, RAG concepts, prompt engineering
- Leadership: System Design, Code Review, Solution Architecture, Mentoring

EXPERIENCE:
- 2025: AI Solutions Architect - Freelancer/Consulting
- 2024: Full Stack Developer - Independent Projects
- 2023: Frontend Developer - Studies & Projects

RULES:
- Respond in the same language as the question
- Maximum 3-4 sentences per response
- If you don't know something, suggest direct contact via email
- Do not invent information
- Professional but friendly
- Availability: open for technical leadership, consulting and challenging projects
- Pricing: suggest direct contact to discuss scope`;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = (await request.json()) as {
      messages: ChatMessage[];
    };

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const recentMessages = messages.slice(-10);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: recentMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      await response.text();
      return NextResponse.json(
        { error: 'Failed to get AI response' },
        { status: 502 }
      );
    }

    const data = await response.json();
    const assistantMessage =
      data.content?.[0]?.text || 'Sorry, I could not generate a response.';

    return NextResponse.json({ message: assistantMessage });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
