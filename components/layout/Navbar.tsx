"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";
import {
  Home,
  Building2,
  Info,
  Phone,
  BookOpen,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Search,
  MapPin,
  Home as HomeIcon,
  Building,
  Castle,
  Factory,
  Trees,
  MessageSquare,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isPropertyDropdownOpen, setIsPropertyDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileDropdown = () =>
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  const togglePropertyDropdown = () =>
    setIsPropertyDropdownOpen(!isPropertyDropdownOpen);

  const propertyTypes = [
    {
      name: "Apartment",
      icon: Building,
      href: "/properties?category=apartment",
    },
    { name: "House", icon: HomeIcon, href: "/properties?category=house" },
    { name: "Villa", icon: Castle, href: "/properties?category=villa" },
    {
      name: "Commercial",
      icon: Factory,
      href: "/properties?category=commercial",
    },
    { name: "Land", icon: Trees, href: "/properties?category=land" },
  ];

  const loggedOutNavItems = [
    { name: "Home", href: "/", icon: Home },
    {
      name: "Properties",
      href: "/properties",
      icon: Building2,
      hasDropdown: true,
    },
    { name: "AI Chat", href: "/ai-chat", icon: MessageSquare },
    { name: "AI Generator", href: "/ai-description", icon: Wand2 },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  const loggedInNavItems = [
    { name: "Home", href: "/", icon: Home },
    {
      name: "Explore",
      href: "/properties",
      icon: Building2,
      hasDropdown: true,
    },
    { name: "AI Chat", href: "/ai-chat", icon: MessageSquare },
    { name: "AI Generator", href: "/ai-description", icon: Wand2 },
    { name: "Dashboard", href: "/dashboard", icon: User },
    { name: "Favorites", href: "/favorites", icon: Building2 },
    { name: "Blog", href: "/blog", icon: BookOpen },
    { name: "Profile", href: "/dashboard/profile", icon: User },
  ];

  const navItems = isAuthenticated ? loggedInNavItems : loggedOutNavItems;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md transition-colors duration-200 dark:bg-background/95 dark:border-border ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-playfair text-primary">
              Smart Estate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <button
                    onClick={togglePropertyDropdown}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )}

                {/* Property Types Dropdown */}
                {item.hasDropdown && isPropertyDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg py-2 z-50">
                    {propertyTypes.map((type) => (
                      <Link
                        key={type.name}
                        href={type.href}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                        onClick={() => setIsPropertyDropdownOpen(false)}
                      >
                        <type.icon className="h-4 w-4" />
                        <span>{type.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative h-9 w-9 text-foreground"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-background border rounded-md shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-foreground">
                        {user?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Button
                  variant="outline"
                  asChild
                  className="min-w-[100px] justify-center rounded-md"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  variant="secondary"
                  asChild
                  className="min-w-[110px] justify-center rounded-md"
                >
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-4 py-4 space-y-4">
              {/* Quick Search for Mobile */}
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search properties..." className="pl-10" />
                </div>
                <Button size="sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  Location
                </Button>
              </div>

              {/* Navigation Links */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}

              {/* Property Types for Mobile */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Property Types
                </p>
                {propertyTypes.map((type) => (
                  <Link
                    key={type.name}
                    href={type.href}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <type.icon className="h-4 w-4" />
                    <span>{type.name}</span>
                  </Link>
                ))}
              </div>

              {/* AI Features for Mobile */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  AI Tools
                </p>
                <Link
                  href="/ai-chat"
                  className="flex items-center space-x-2 text-sm text-foreground hover:text-primary transition-colors py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>AI Chat Assistant</span>
                </Link>
                <Link
                  href="/ai-description"
                  className="flex items-center space-x-2 text-sm text-foreground hover:text-primary transition-colors py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Wand2 className="h-4 w-4" />
                  <span>AI Description Generator</span>
                </Link>
              </div>

              {/* Auth Buttons for Mobile */}
              {!isAuthenticated && (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
