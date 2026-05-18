export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  avatar?: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

export interface Property {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  location: string;
  category: 'apartment' | 'house' | 'villa' | 'commercial' | 'land';
  createdBy: string;
  createdAt: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  status: 'available' | 'sold';
}

export interface Review {
  _id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  itemId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Booking {
  _id: string;
  userId: string;
  userName: string;
  itemId: string;
  itemTitle: string;
  itemPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string, address?: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface DashboardStats {
  totalUsers: number;
  totalProperties: number;
  totalBookings: number;
  totalRevenue: number;
}

export interface ChartData {
  monthlyBookings: { month: string; count: number }[];
  revenueOverTime: { month: string; revenue: number }[];
  propertyCategories: { category: string; count: number }[];
}

export interface PropertyFilters {
  search?: string;
  category?: Property['category'];
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  location?: string;
  sort?: 'price_asc' | 'price_desc' | 'rating_desc' | 'newest';
  page?: number;
  limit?: number;
}