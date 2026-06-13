import { Link } from "react-router";
import { useSiteData } from "@/context/SiteDataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SECTIONS = [
  { label: "Blog Posts", key: "blogPosts", route: "/admin/blogs" },
  { label: "Team Members", key: "teamMembers", route: "/admin/team" },
  { label: "Career Openings", key: "jobOpenings", route: "/admin/careers" },
  { label: "Projects", key: "projects", route: "/admin/projects" },
  { label: "Testimonials", key: "testimonials", route: "/admin/testimonials" },
] as const;

export default function Dashboard() {
  const data = useSiteData();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map(({ label, key, route }) => (
          <Link key={key} to={route} className="group focus:outline-none">
            <Card className="transition-shadow group-hover:shadow-md group-focus:ring-2 group-focus:ring-ring">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">{label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{data[key].length}</p>
                <p className="text-sm text-muted-foreground">entries</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
