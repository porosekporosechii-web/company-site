import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';
import sharp from 'sharp';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const MAX_BYTES = 30 * 1024 * 1024; // 30 MB input limit
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 82;

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File too large (max 30 MB)' }, { status: 400 });
  }

  const inputBuffer = Buffer.from(await file.arrayBuffer());

  // GIF — save as-is (sharp doesn't animate)
  const isGif = file.type === 'image/gif';
  const filename = `${randomUUID()}.${isGif ? 'gif' : 'webp'}`;
  const uploadsDir = join(process.cwd(), 'public', 'uploads');
  await mkdir(uploadsDir, { recursive: true });

  let outputBuffer: Buffer;
  if (isGif) {
    outputBuffer = inputBuffer;
  } else {
    outputBuffer = await sharp(inputBuffer)
      .rotate() // auto-rotate from EXIF
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();
  }

  await writeFile(join(uploadsDir, filename), outputBuffer);

  const savedKb = Math.round(outputBuffer.length / 1024);
  const originalKb = Math.round(inputBuffer.length / 1024);

  return NextResponse.json({
    url: `/uploads/${filename}`,
    originalKb,
    savedKb,
  });
}
