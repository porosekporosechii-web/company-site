import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, phone, message, email, source } = body as {
    name?: string;
    phone?: string;
    message?: string;
    email?: string;
    source?: string;
  };

  if (!phone?.trim()) {
    return NextResponse.json({ error: 'Телефон обязателен' }, { status: 400 });
  }

  await prisma.submission.create({
    data: {
      name: name?.trim() || null,
      phone: phone.trim(),
      email: email?.trim() || null,
      message: message?.trim() || null,
      source: source || null,
    },
  });

  if (process.env.SMTP_PASS && process.env.NOTIFY_EMAIL) {
    try {
      const transport = createTransport();
      await transport.sendMail({
        from: `"Сайт RAUCO" <${process.env.SMTP_USER}>`,
        to: process.env.NOTIFY_EMAIL,
        subject: '📋 Новая заявка с сайта rauco.ru',
        text: [
          `Имя: ${name || '—'}`,
          `Телефон: ${phone}`,
          `Email: ${email || '—'}`,
          `Сообщение: ${message || '—'}`,
          `Источник: ${source || '—'}`,
        ].join('\n'),
        html: `
          <h2 style="margin:0 0 16px">Новая заявка с сайта</h2>
          <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:14px">
            <tr><td style="color:#888;padding-right:16px">Имя</td><td>${name || '—'}</td></tr>
            <tr><td style="color:#888;padding-right:16px">Телефон</td><td><b>${phone}</b></td></tr>
            <tr><td style="color:#888;padding-right:16px">Email</td><td>${email || '—'}</td></tr>
            <tr><td style="color:#888;padding-right:16px">Сообщение</td><td>${message || '—'}</td></tr>
            <tr><td style="color:#888;padding-right:16px">Источник</td><td>${source || '—'}</td></tr>
          </table>
        `,
      });
    } catch (err) {
      console.error('[contact] email send failed:', err);
    }
  }

  return NextResponse.json({ ok: true });
}
