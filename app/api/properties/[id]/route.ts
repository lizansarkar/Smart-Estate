import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const property = await Property.findById(params.id);

    if (!property) {
      return NextResponse.json({ success: false, message: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: property,
    });
  } catch (error: any) {
    console.error('Fetch Property Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const body = await req.json();

    const property = await Property.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!property) {
      return NextResponse.json({ success: false, message: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: property,
      message: 'Property updated successfully',
    });
  } catch (error: any) {
    console.error('Update Property Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const property = await Property.findByIdAndDelete(params.id);

    if (!property) {
      return NextResponse.json({ success: false, message: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Property deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete Property Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
