import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="container">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Logo & Project Info */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Link to="/" className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
              <Shield className="h-5 w-5 text-primary" />
              SafeFace
            </Link>
            <p className="text-sm text-muted-foreground">
              B.Tech Final Year Project — Deepfake Intelligence Platform
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Home
            </Link>
            <Link to="/community" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Community
            </Link>
            <Link to="/legal" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Legal
            </Link>
            <Link to="/login" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Login
            </Link>
          </nav>
        </div>

        <div className="mt-6 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SafeFace. All rights reserved. This platform is for educational purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
