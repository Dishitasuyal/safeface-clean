import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield } from "lucide-react";


const navLinks = [
  { href: "/Dashboard", label: "Dashboard" },
  { href: "/community", label: "Community" },
  { href: "/legal", label: "Legal" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-nav-border bg-nav shadow-nav">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-semibold text-foreground">
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

        {/* Profile & Logout (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Profile */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
              U
            </div>
            <span className="text-sm font-medium text-foreground">
             My Profile
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
            }}
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Logout
          </button>
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
            <div className="flex flex-col gap-3 pt-2 border-t border-border">
              {/* Profile */}
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                  U
                </div>
              <span className="text-sm font-medium text-foreground">
                My Profile
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
              className="w-full text-left text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
