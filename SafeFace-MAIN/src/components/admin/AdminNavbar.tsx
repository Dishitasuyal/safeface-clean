import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/community", label: "Community" },
  { href: "/legal", label: "Legal" },
];

export const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-nav-border bg-nav shadow-nav">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/admin" className="flex items-center gap-2 font-heading text-xl font-semibold text-primary">
          <Shield className="h-6 w-6 text-primary" />
          SafeFace
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(link.href) 
                  ? "text-primary" 
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="hidden md:block">
          <Button variant="outline" className="font-medium" asChild>
            <Link to="/login">Logout</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-md text-foreground md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-nav-border bg-nav md:hidden animate-fade-in">
          <nav className="container flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href) 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="outline" className="mt-2 w-full font-medium" asChild>
              <Link to="/login">Logout</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default AdminNavbar;
