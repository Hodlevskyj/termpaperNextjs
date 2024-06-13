import { NextRequest, NextResponse } from 'next/server';
import getProducts from '../../../../actions/getProduct';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const searchTerm = searchParams.get('searchTerm') || '';

  const products = await getProducts({ category, searchTerm });

  return NextResponse.json(products);
}
