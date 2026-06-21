import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';

type PropertyRouteContext = RouteContext<'/api/properties/[id]'>;

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unexpected server error';
}

export async function GET(_req: NextRequest, context: PropertyRouteContext) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json({ success: false, message: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: property,
    });
  } catch (error: unknown) {
    console.error('Fetch Property Error:', error);
    return NextResponse.json({ success: false, message: getErrorMessage(error) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: PropertyRouteContext) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const body = await req.json();

    const property = await Property.findByIdAndUpdate(id, body, {
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
  } catch (error: unknown) {
    console.error('Update Property Error:', error);
    return NextResponse.json({ success: false, message: getErrorMessage(error) }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, context: PropertyRouteContext) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const property = await Property.findByIdAndDelete(id);

    if (!property) {
      return NextResponse.json({ success: false, message: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Property deleted successfully',
    });
  } catch (error: unknown) {
    console.error('Delete Property Error:', error);
    return NextResponse.json({ success: false, message: getErrorMessage(error) }, { status: 500 });
  }
}
