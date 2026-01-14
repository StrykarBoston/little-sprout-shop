import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, Baby } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/FirebaseAuthContext';
import { cn } from '@/lib/utils';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, loading } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Shop All', href: '/products' },
    { name: 'Clothing', href: '/products?category=clothing' },
    { name: 'Diapers', href: '/products?category=diapers' },
    { name: 'Toys', href: '/products?category=toys' },
    { name: 'Baby Care', href: '/products?category=care' },
    { name: 'Sale', href: '/products?sale=true' }
  ];

  const isActiveLink = (href: string) => {
    if (href === '/products') {
      return location.pathname === '/products';
    }
    return location.pathname.startsWith(href.split('?')[0]);
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      {/* Top banner */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
        🎉 Free shipping on orders over $50! Use code: BABYJOY
      </div>

      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 -ml-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Baby className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl md:text-2xl font-heading font-bold text-foreground">
              Little Sprout Shop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  "text-muted-foreground hover:text-foreground hover:bg-accent",
                  isActiveLink(link.href) && "text-primary bg-primary/10",
                  link.name === 'Sale' && "text-destructive hover:text-destructive"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              to="/wishlist"
              className="hidden sm:flex p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
            </Link>

            {!loading && user ? (
              <div className="hidden sm:flex items-center gap-1">
                <Link
                  to="/profile"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  aria-label="Profile"
                >
                  <User className="h-5 w-5" />
                </Link>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-1">
                <Link
                  to="/login"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <Link
              to="/cart"
              className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center animate-scale-in">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search bar */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300",
            isSearchOpen ? "max-h-20 pb-4" : "max-h-0"
          )}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for baby products..."
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-background border-t border-border",
          isMenuOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="container py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "px-4 py-3 text-base font-medium rounded-lg transition-colors",
                "text-foreground hover:bg-accent",
                isActiveLink(link.href) && "text-primary bg-primary/10",
                link.name === 'Sale' && "text-destructive hover:text-destructive"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex gap-4 mt-4 px-4">
            <Link to="/wishlist" className="flex items-center gap-2 text-muted-foreground">
              <Heart className="h-5 w-5" /> Wishlist
            </Link>
            {!loading && user ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-5 w-5" /> Profile
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-5 w-5" /> Sign In
                </Link>
                <Link to="/signup" className="flex items-center gap-2 text-primary font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
