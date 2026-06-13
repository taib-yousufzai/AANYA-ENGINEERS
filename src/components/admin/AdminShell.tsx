import { NavLink, Outlet, useNavigate } from "react-router";
import { logout } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Users,
  Briefcase,
  FolderOpen,
  Star,
  LogOut,
} from "lucide-react";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/blogs", label: "Blog Posts", icon: FileText, end: false },
  { to: "/admin/team", label: "Team Members", icon: Users, end: false },
  { to: "/admin/careers", label: "Careers", icon: Briefcase, end: false },
  { to: "/admin/projects", label: "Projects", icon: FolderOpen, end: false },
  { to: "/admin/testimonials", label: "Testimonials", icon: Star, end: false },
];

/**
 * Layout shell for all authenticated admin pages.
 * Renders a sidebar with navigation links and a header with a logout button.
 * Child routes are rendered via <Outlet />.
 */
export function AdminShell() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r bg-muted/40 flex flex-col">
        {/* Logo / brand */}
        <div className="h-14 flex items-center px-4 border-b">
          <span className="font-semibold text-sm tracking-wide">Admin Panel</span>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 py-4 px-2 space-y-1" aria-label="Admin navigation">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                ].join(" ")
              }
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="h-14 shrink-0 border-b flex items-center justify-between px-6">
          <span className="text-sm text-muted-foreground">Aanya Engineers — Admin</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            aria-label="Log out"
            className="gap-2"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Logout
          </Button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
