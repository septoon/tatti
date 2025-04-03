import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const reviewsPath = path.join(process.cwd(), 'app/api/reviews.json');

export async function POST(request: NextRequest) {
  try {
    const newReview = await request.json();
    const fileContent = fs.readFileSync(reviewsPath, 'utf-8');
    const reviews = JSON.parse(fileContent);

    reviews.push(newReview);

    fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Отзыв успешно добавлен!' }, { status: 200 });
  } catch (error) {
    console.error('Ошибка при добавлении отзыва:', error);
    return NextResponse.json({ error: 'Ошибка при добавлении отзыва' }, { status: 500 });
  }
}