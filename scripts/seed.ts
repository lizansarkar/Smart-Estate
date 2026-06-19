import mongoose from 'mongoose';
import dbConnect from '../lib/mongodb';
import Property from '../models/Property';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const mockProperties = [
  {
    title: "Luxury Apartment in Gulshan",
    description: "Modern 3-bedroom apartment with stunning city views, premium finishes, and world-class amenities.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    price: 2500000,
    rating: 4.8,
    location: "Gulshan, Dhaka",
    category: "apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    status: "available",
  },
  {
    title: "Spacious Family House in Dhanmondi",
    description: "Beautiful detached house perfect for families, with garden, garage, and quiet neighborhood.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    price: 4500000,
    rating: 4.6,
    location: "Dhanmondi, Dhaka",
    category: "house",
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    status: "available",
  },
  {
    title: "Elegant Villa in Baridhara",
    description: "Luxurious villa with private pool, modern design, and premium location in exclusive neighborhood.",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=300&fit=crop",
    price: 8500000,
    rating: 4.9,
    location: "Baridhara, Dhaka",
    category: "villa",
    bedrooms: 5,
    bathrooms: 4,
    area: 3500,
    status: "available",
  },
  {
    title: "Commercial Space in Motijheel",
    description: "Prime commercial property in the heart of the business district, perfect for office or retail.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
    price: 12000000,
    rating: 4.4,
    location: "Motijheel, Dhaka",
    category: "commercial",
    area: 5000,
    status: "available",
  },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await dbConnect();
    
    // Clear existing data
    await Property.deleteMany({});
    await User.deleteMany({});
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@smartestate.com',
      password: hashedPassword,
      role: 'ADMIN'
    });
    
    // Add admin ID to properties
    const propertiesWithAdmin = mockProperties.map(p => ({
      ...p,
      createdBy: admin._id
    }));
    
    // Insert properties
    await Property.insertMany(propertiesWithAdmin);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
