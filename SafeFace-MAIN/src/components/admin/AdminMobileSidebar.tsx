import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, FileText, Shield, File, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: User },
  { href: "/admin/users", label: "Manage Users", icon: FileText },
  { href: "/admin/moderate", label: "Moderate Community", icon: Shield },
  { href: "/admin/legal", label: "Update Legal Resources", icon: File },
];

export const AdminMobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="md:hidden p-4 border-b border-border bg-card">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-4">
          <nav className="space-y-1 mt-8">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminMobileSidebar;
