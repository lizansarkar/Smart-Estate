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
    { name: "Favorites", href: "/favorites", icon: Building2 },
    { name: "Blog", href: "/blog", icon: BookOpen },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Dashboard", href: "/dashboard", icon: User },
  ];

  const navItems = isAuthenticated ? loggedInNavItems : loggedOutNavItems;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border backdrop-blur-xl transition-all duration-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-3 md:py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-playfair text-primary hidden sm:inline">
              Smart Estate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.hasDropdown ? (
                  <button
                    onClick={togglePropertyDropdown}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 cursor-pointer"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                    <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )}

                {/* Property Types Dropdown */}
                {item.hasDropdown && isPropertyDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-background border border-border rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {propertyTypes.map((type) => (
                      <Link
                        key={type.name}
                        href={type.href}
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
                        onClick={() => setIsPropertyDropdownOpen(false)}
                      >
                        <type.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="font-medium">{type.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative h-9 w-9 text-foreground hover:bg-primary/10 hover:text-primary rounded-lg"
              title="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative group hidden md:block">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/10 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="hidden lg:inline">
                    {user?.name?.split(" ")[0]}
                  </span>
                  <ChevronDown className="h-3 w-3 transition-transform" />
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-background border border-border rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-semibold text-foreground">
                        {user?.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
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
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 cursor-pointer"
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
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-6 rounded-lg shadow-sm hover:shadow-md"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  variant="default"
                  size="lg"
                  className="px-6 rounded-lg shadow-md hover:shadow-lg"
                >
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 hover:bg-primary/10 hover:text-primary rounded-lg"
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
          <div className="md:hidden border-t border-border bg-background/80 backdrop-blur-md animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-4 space-y-3">
              {/* Navigation Links */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}

              {/* Property Types for Mobile */}
              {navItems.some((item) => item.hasDropdown) && (
                <div className="space-y-2 border-t border-border pt-3 mt-3">
                  <p className="text-xs font-bold uppercase text-muted-foreground px-4">
                    Property Types
                  </p>
                  {propertyTypes.map((type) => (
                    <Link
                      key={type.name}
                      href={type.href}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <type.icon className="h-4 w-4" />
                      <span>{type.name}</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Auth Buttons for Mobile */}
              {!isAuthenticated && (
                <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                  <Button variant="outline" asChild className="">
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="">
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}

              {/* Mobile Profile Menu */}
              {isAuthenticated && (
                <div className="space-y-2 border-t border-border pt-3 mt-3">
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-3 px-4 py-3 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 rounded-lg cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
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
