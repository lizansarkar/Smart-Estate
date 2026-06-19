import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  location: string;
  category: 'apartment' | 'house' | 'villa' | 'commercial' | 'land';
  createdBy: mongoose.Types.ObjectId;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  status: 'available' | 'sold';
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    location: { type: String, required: true },
    category: {
      type: String,
      enum: ['apartment', 'house', 'villa', 'commercial', 'land'],
      required: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    area: { type: Number }, // in sq ft
    status: { type: String, enum: ['available', 'sold'], default: 'available' },
  },
  { timestamps: true }
);

export default mongoose.models.Property || mongoose.model<IProperty>('Property', PropertySchema);
