import { NextResponse } from 'next/server';

const getRequiredEnv = (name: 'REVIEWS_UPLOAD_URL' | 'REVIEWS_PUBLIC_BASE_URL') => {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required env: ${name}`);
  }

  return value.replace(/\/$/, '');
};

const getUploadConfig = () => ({
  uploadUrl: getRequiredEnv('REVIEWS_UPLOAD_URL'),
  publicBaseUrl: getRequiredEnv('REVIEWS_PUBLIC_BASE_URL'),
});

const asAbsoluteUrl = (value: string, publicBaseUrl: string) => {
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith('/')) return `${publicBaseUrl}${value}`;
  return `${publicBaseUrl}/${value}`;
};

const ensureUploadedImageAvailable = async (url: string) => {
  const response = await fetch(url, {
    method: 'HEAD',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Uploaded file is not reachable: ${response.status}`);
  }
};

const pickImageUrl = (payload: unknown, fallbackFileName: string, publicBaseUrl: string) => {
  if (typeof payload === 'string' && payload.trim()) return asAbsoluteUrl(payload.trim(), publicBaseUrl);
  if (!payload || typeof payload !== 'object') return asAbsoluteUrl(fallbackFileName, publicBaseUrl);

  const data = payload as Record<string, unknown>;
  const candidates = [
    data.url,
    data.imageUrl,
    data.image,
    data.path,
    data.filePath,
    data.location,
    data.src,
    (data.data as Record<string, unknown> | undefined)?.url,
    (data.data as Record<string, unknown> | undefined)?.imageUrl,
    (data.data as Record<string, unknown> | undefined)?.path,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) {
      return asAbsoluteUrl(candidate.trim(), publicBaseUrl);
    }
  }

  const nameCandidate = data.fileName ?? data.filename ?? data.name;
  if (typeof nameCandidate === 'string' && nameCandidate.trim()) {
    return asAbsoluteUrl(nameCandidate.trim(), publicBaseUrl);
  }

  return asAbsoluteUrl(fallbackFileName, publicBaseUrl);
};

const uploadToReviewsFolder = async (file: File, uploadUrl: string) => {
  const formData = new FormData();
  formData.append('image', file, file.name);

  let response = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const retryData = new FormData();
    retryData.append('file', file, file.name);

    response = await fetch(uploadUrl, {
      method: 'POST',
      body: retryData,
    });
  }

  return response;
};

export async function POST(request: Request) {
  try {
    const { uploadUrl, publicBaseUrl } = getUploadConfig();
    const formData = await request.formData();
    const image = formData.get('image');

    if (!(image instanceof File)) {
      return NextResponse.json({ error: 'Файл не передан' }, { status: 400 });
    }

    const upstreamResponse = await uploadToReviewsFolder(image, uploadUrl);
    const text = await upstreamResponse.text();

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        {
          error: 'Не удалось загрузить изображение',
          upstreamUrl: uploadUrl,
          upstreamStatus: upstreamResponse.status,
          details: text || upstreamResponse.statusText,
        },
        { status: 502 }
      );
    }

    let payload: unknown = null;
    if (text) {
      try {
        payload = JSON.parse(text);
      } catch {
        payload = text;
      }
    }

    const imageUrl = pickImageUrl(payload, image.name, publicBaseUrl);
    await ensureUploadedImageAvailable(imageUrl);

    return NextResponse.json({ url: imageUrl }, { status: 200 });
  } catch (error) {
    console.error('Ошибка upload route:', error);
    const details = error instanceof Error ? error.message : 'unknown error';
    return NextResponse.json(
      {
        error: 'Ошибка загрузки изображения',
        details,
      },
      { status: 502 }
    );
  }
}
