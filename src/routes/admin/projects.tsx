import { useState } from "react";
import { useSiteData } from "@/context/SiteDataContext";
import type { Project } from "@/context/SiteDataContext";
import { validateProject } from "@/lib/validation";
import { ContentTable } from "@/components/admin/ContentTable";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/admin/ImageUpload";

const EMPTY_FORM: Project = {
  title: "",
  client: "",
  category: "",
  year: "",
  status: "Ongoing",
  description: "",
  img: "",
};

export default function ProjectsManager() {
  const { projects, addProject, removeProject } = useSiteData();
  const [form, setForm] = useState<Project>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name])
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
  }

  function handleStatusChange(value: string) {
    setForm((prev) => ({ ...prev, status: value as Project["status"] }));
    if (errors.status)
      setErrors((prev) => {
        const next = { ...prev };
        delete next.status;
        return next;
      });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = validateProject(form);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    await addProject(form);
    setForm(EMPTY_FORM);
    setErrors({});
  }

  async function handleConfirmDelete() {
    if (deleteTarget) {
      await removeProject(deleteTarget.title);
      setDeleteTarget(null);
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Projects</h1>

      <ContentTable<Project>
        rows={projects}
        columns={[
          { label: "Title", accessor: "title" },
          { label: "Client", accessor: "client" },
          { label: "Category", accessor: "category" },
          { label: "Status", accessor: "status" },
        ]}
        onDelete={(item) => setDeleteTarget(item)}
      />

      <div className="border rounded-lg p-6 space-y-4 max-w-lg">
        <h2 className="text-lg font-medium">Add Project</h2>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {(["title", "client", "category", "year"] as const).map((field) => (
            <div key={field} className="space-y-1">
              <Label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Label>
              <Input
                id={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                aria-describedby={errors[field] ? `${field}-error` : undefined}
              />
              {errors[field] && (
                <p id={`${field}-error`} className="text-sm text-destructive">
                  {errors[field]}
                </p>
              )}
            </div>
          ))}

          <div className="space-y-1">
            <Label htmlFor="status">Status</Label>
            <Select value={form.status} onValueChange={handleStatusChange}>
              <SelectTrigger
                id="status"
                aria-describedby={errors.status ? "status-error" : undefined}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ongoing">Ongoing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p id="status-error" className="text-sm text-destructive">
                {errors.status}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              aria-describedby={errors.description ? "desc-error" : undefined}
            />
            {errors.description && (
              <p id="desc-error" className="text-sm text-destructive">
                {errors.description}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label>Image</Label>
            <ImageUpload
              value={form.img}
              onChange={(url) => setForm((prev) => ({ ...prev, img: url }))}
              error={errors.img}
            />
          </div>
          <Button type="submit">Add Project</Button>
        </form>
      </div>

      <DeleteConfirmDialog
        open={deleteTarget !== null}
        itemLabel={deleteTarget?.title ?? ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
