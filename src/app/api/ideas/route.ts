import { NextResponse } from 'next/server';
import { INITIAL_IDEAS } from '@/lib/services/mock-db';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    data: INITIAL_IDEAS,
  });
}
