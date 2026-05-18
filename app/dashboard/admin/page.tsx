'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  Users,
  Building2,
  TrendingUp,
  DollarSign,
  Eye,
  MessageSquare,
  Settings,
  LogOut,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  UserCheck,
  Home,
  Plus,
  Edit,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';

interface AdminStats {
  totalUsers: number;
  totalProperties: number;
  totalBookings: number;
  totalRevenue: number;
  activeListings: number;
  pendingApprovals: number;
  monthlyGrowth: number;
  userGrowth: number;
}

interface RecentActivity {
  id: string;
  type: 'user_registered' | 'property_listed' | 'booking_made' | 'inquiry_received';
  message: string;
  timestamp: string;
  user?: string;
}

const AdminDashboard: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalProperties: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeListings: 0,
    pendingApprovals: 0,
    monthlyGrowth: 0,
    userGrowth: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'ADMIN') {
      router.push('/login');
      return;
    }

    // Simulate loading dashboard data
    const loadDashboardData = async () => {
      setLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats({
        totalUsers: 15420,
        totalProperties: 2847,
        totalBookings: 1250,
        totalRevenue: 45000000,
        activeListings: 2650,
        pendingApprovals: 23,
        monthlyGrowth: 12.5,
        userGrowth: 8.3,
      });
      setRecentActivity([
        {
          id: '1',
          type: 'property_listed',
          message: 'New luxury villa listed in Gulshan',
          timestamp: '2 minutes ago',
          user: 'Agent Rahman',
        },
        {
          id: '2',
          type: 'user_registered',
          message: 'New user registered: sarah.ahmed@email.com',
          timestamp: '15 minutes ago',
        },
        {
          id: '3',
          type: 'booking_made',
          message: 'Property tour scheduled for Apartment #1234',
          timestamp: '1 hour ago',
          user: 'John Doe',
        },
        {
          id: '4',
          type: 'inquiry_received',
          message: 'Inquiry received for Commercial Space #5678',
          timestamp: '2 hours ago',
          user: 'Business Corp',
        },
      ]);
      setLoading(false);
    };

    loadDashboardData();
  }, [isAuthenticated, user, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const formatCurrency = (amount: number) => {
    return `৳${(amount / 10000000).toFixed(1)}Cr`;
  };

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You need admin privileges to access this page.</p>
          <Button onClick={() => router.push('/login')}>Go to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Settings className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-playfair">Admin Dashboard</h1>
                <p className="text-primary-foreground/80">Welcome back, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="secondary" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
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
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-card rounded-lg p-6 border">
                <Skeleton className="h-8 w-8 mb-2" />
                <Skeleton className="h-6 w-16 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))
          ) : (
            <>
              <div className="bg-card rounded-lg p-6 border">
                <Users className="h-8 w-8 text-blue-500 mb-2" />
                <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                <p className="text-muted-foreground">Total Users</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+{stats.userGrowth}%</span>
                </div>
              </div>
              <div className="bg-card rounded-lg p-6 border">
                <Building2 className="h-8 w-8 text-green-500 mb-2" />
                <div className="text-2xl font-bold">{stats.totalProperties.toLocaleString()}</div>
                <p className="text-muted-foreground">Total Properties</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+{stats.monthlyGrowth}%</span>
                </div>
              </div>
              <div className="bg-card rounded-lg p-6 border">
                <DollarSign className="h-8 w-8 text-yellow-500 mb-2" />
                <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
                <p className="text-muted-foreground">Total Revenue</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+15.2%</span>
                </div>
              </div>
              <div className="bg-card rounded-lg p-6 border">
                <Activity className="h-8 w-8 text-purple-500 mb-2" />
                <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
                <p className="text-muted-foreground">Pending Approvals</p>
                <Badge variant="destructive" className="mt-2">Action Required</Badge>
              </div>
            </>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Recent Activity</h2>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
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
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        {activity.type === 'user_registered' && <Users className="h-5 w-5 text-primary" />}
                        {activity.type === 'property_listed' && <Building2 className="h-5 w-5 text-green-500" />}
                        {activity.type === 'booking_made' && <Calendar className="h-5 w-5 text-blue-500" />}
                        {activity.type === 'inquiry_received' && <MessageSquare className="h-5 w-5 text-orange-500" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.message}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.timestamp}
                          {activity.user && ` • ${activity.user}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="flex flex-col items-center p-4 h-auto" size="sm">
                  <Plus className="h-6 w-6 mb-2" />
                  <span className="text-xs">Add Property</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto" size="sm">
                  <Users className="h-6 w-6 mb-2" />
                  <span className="text-xs">Manage Users</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto" size="sm">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  <span className="text-xs">Analytics</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto" size="sm">
                  <Settings className="h-6 w-6 mb-2" />
                  <span className="text-xs">Settings</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* System Status */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Server Status</span>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Database</span>
                  <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Response</span>
                  <Badge className="bg-green-100 text-green-800">Fast</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Last Backup</span>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
              </div>
            </div>

            {/* Pending Tasks */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Pending Tasks</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Approve 23 property listings</span>
                  </div>
                  <Badge variant="secondary">High</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Review 5 user reports</span>
                  </div>
                  <Badge variant="secondary">Medium</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Update system settings</span>
                  </div>
                  <Badge variant="secondary">Low</Badge>
                </div>
              </div>
            </div>

            {/* Revenue Chart Placeholder */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
              <div className="h-32 flex items-center justify-center bg-muted rounded-lg">
                <div className="text-center">
                  <PieChart className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Chart will be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;