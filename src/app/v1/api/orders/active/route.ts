import { NextResponse } from 'next/server';
import { INITIAL_ORDERS } from '@/lib/services/mock-db';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    count: INITIAL_ORDERS.length,
    data: INITIAL_ORDERS,
  });
}
