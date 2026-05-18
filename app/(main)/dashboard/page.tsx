'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  User,
  Settings,
  Heart,
  MessageSquare,
  TrendingUp,
  Home,
  Star,
  Calendar,
  DollarSign,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalProperties: number;
  favoriteProperties: number;
  inquiriesSent: number;
  profileViews: number;
}

const UserDashboard: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    favoriteProperties: 0,
    inquiriesSent: 0,
    profileViews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Simulate loading dashboard data
    const loadDashboardData = async () => {
      setLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats({
        totalProperties: 24,
        favoriteProperties: 8,
        inquiriesSent: 12,
        profileViews: 156,
      });
      setLoading(false);
    };

    loadDashboardData();
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to access your dashboard</h1>
          <Button onClick={() => router.push('/login')}>Go to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-playfair">Welcome back, {user.name}!</h1>
                <p className="text-primary-foreground/80">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="secondary" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-card rounded-lg p-6 border">
                <Skeleton className="h-8 w-8 mb-2" />
                <Skeleton className="h-6 w-16 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))
          ) : (
            <>
              <div className="bg-card rounded-lg p-6 border">
                <Home className="h-8 w-8 text-primary mb-2" />
                <div className="text-2xl font-bold">{stats.totalProperties}</div>
                <p className="text-muted-foreground">Properties Viewed</p>
              </div>
              <div className="bg-card rounded-lg p-6 border">
                <Heart className="h-8 w-8 text-red-500 mb-2" />
                <div className="text-2xl font-bold">{stats.favoriteProperties}</div>
                <p className="text-muted-foreground">Favorites</p>
              </div>
              <div className="bg-card rounded-lg p-6 border">
                <MessageSquare className="h-8 w-8 text-blue-500 mb-2" />
                <div className="text-2xl font-bold">{stats.inquiriesSent}</div>
                <p className="text-muted-foreground">Inquiries Sent</p>
              </div>
              <div className="bg-card rounded-lg p-6 border">
                <TrendingUp className="h-8 w-8 text-green-500 mb-2" />
                <div className="text-2xl font-bold">{stats.profileViews}</div>
                <p className="text-muted-foreground">Profile Views</p>
              </div>
            </>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-48 mb-2" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                      <Skeleton className="h-6 w-16" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Added to favorites</p>
                      <p className="text-sm text-muted-foreground">Modern Apartment in Downtown</p>
                    </div>
                    <Badge variant="secondary">2 hours ago</Badge>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Inquiry sent</p>
                      <p className="text-sm text-muted-foreground">Luxury Villa with Pool</p>
                    </div>
                    <Badge variant="secondary">1 day ago</Badge>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                      <Star className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Property rated</p>
                      <p className="text-sm text-muted-foreground">Cozy Studio Apartment</p>
                    </div>
                    <Badge variant="secondary">3 days ago</Badge>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Profile & Quick Actions */}
          <div className="space-y-6">
            {/* Profile Info */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{user.phone}</span>
                  </div>
                )}
                {user.address && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{user.address}</span>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/properties">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Home className="h-4 w-4 mr-2" />
                    Browse Properties
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  My Favorites
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  My Inquiries
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Scheduled Tours
                </Button>
              </div>
            </div>

            {/* AI Assistant */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get personalized property recommendations
              </p>
              <Button className="w-full" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat with AI
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;