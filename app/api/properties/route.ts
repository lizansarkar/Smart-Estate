import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : 10;
    
    let query: any = {};
    if (category && category !== 'all') {
      query.category = category;
    }

    const properties = await Property.find(query).limit(limit).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: properties,
    });
  } catch (error: any) {
    console.error('Fetch Properties Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // In a real app, verify JWT token here and attach user ID to createdBy
    // const token = req.headers.get('Authorization')?.split(' ')[1];
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // body.createdBy = decoded.userId;
    
    // For now, we allow creation without strict auth just to seed data
    if (!body.createdBy) {
        // Fallback user ID for testing if not provided
        body.createdBy = "60d5ecb8b392d700153ee859"; // Dummy Object ID
    }

    const property = await Property.create(body);

    return NextResponse.json(
      { success: true, data: property, message: 'Property created successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create Property Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
