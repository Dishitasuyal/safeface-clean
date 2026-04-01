import { Link, useLocation } from "react-router-dom";
import { User, FileText, Shield, File } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: User },
  { href: "/admin/users", label: "Manage Users", icon: FileText },
  { href: "/admin/moderate", label: "Moderate Community", icon: Shield },
];

export const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] bg-card border-r border-border p-4 hidden md:block">
      <nav className="space-y-1">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
