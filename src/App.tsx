import { Routes, Route, useLocation } from "react-router";
import Home from "./routes/index";
import About from "./routes/about";
import Careers from "./routes/careers";
import Services from "./routes/services";
import Projects from "./routes/projects";
import ProjectDetail from "./routes/projects/detail";

import Blog from "./routes/blog";
import Contact from "./routes/contact";
import NotFound from "./routes/not-found";
import { SiteDataProvider } from "./context/SiteDataContext";

// Admin routes
import AdminLogin from "./routes/admin/login";
import Dashboard from "./routes/admin/dashboard";
import BlogsManager from "./routes/admin/blogs";
import TeamManager from "./routes/admin/team";
import CareersManager from "./routes/admin/careers";
import ProjectsManager from "./routes/admin/projects";
import TestimonialsManager from "./routes/admin/testimonials";
import { AuthGuard } from "./components/admin/AuthGuard";
import { AdminShell } from "./components/admin/AdminShell";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div key={location.key} className="animate-page-in">
      <Routes location={location}>
        {/* Public site routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AuthGuard>
              <AdminShell />
            </AuthGuard>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="blogs" element={<BlogsManager />} />
          <Route path="team" element={<TeamManager />} />
          <Route path="careers" element={<CareersManager />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="testimonials" element={<TestimonialsManager />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <SiteDataProvider>
      <AnimatedRoutes />
    </SiteDataProvider>
  );
}
