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
  const { projects, addProject, updateProject, removeProject } = useSiteData();
  const [form, setForm] = useState<Project>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [editingTarget, setEditingTarget] = useState<string | null>(null);

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
    if (editingTarget) {
      await updateProject(editingTarget, form);
    } else {
      await addProject(form);
    }
    setForm(EMPTY_FORM);
    setErrors({});
    setEditingTarget(null);
  }

  function handleEdit(proj: Project) {
    setForm(proj);
    setEditingTarget(proj.title);
    setErrors({});
  }

  function handleCancelEdit() {
    setForm(EMPTY_FORM);
    setEditingTarget(null);
    setErrors({});
  }

  async function handleConfirmDelete() {
    if (deleteTarget) {
      await removeProject(deleteTarget.title);
      setDeleteTarget(null);
    }
  }

  async function seedProjects() {
    const defaultProjects: Project[] = [
      {
        title: "PRU Piping Fabrication & Erection (IOCL Panipat)",
        client: "Indian Oil Corporation Limited (IOCL)",
        category: "Fabrication & Erection",
        year: new Date().getFullYear().toString(),
        status: "Ongoing",
        description: "Piping fabrication and erection works for the Process Recovery Unit (PRU) at the IOCL Panipat refinery complex, executed in compliance with international quality and safety codes.",
        img: "/images/project_pru_pdf_1.png"
      },
      {
        title: "Diyodar–Lakhni Lift Irrigation Scheme",
        client: "Gujarat Water Infrastructure",
        category: "Infrastructure",
        year: new Date().getFullYear().toString(),
        status: "Ongoing",
        description: "Mechanical construction, pipeline trenching, and utility piping works for the Diyodar–Lakhni Lift Irrigation Scheme.",
        img: "/images/project_irrigation_pdf_1.png"
      },
      {
        title: "Palanpur, Gujarat",
        client: "Water Resources Department",
        category: "Pipeline & Civil",
        year: new Date().getFullYear().toString(),
        status: "Ongoing",
        description: "Laying of large-diameter cross-country water transmission pipelines and associated civil engineering structures in Palanpur, Gujarat.",
        img: "/images/project_irrigation_pdf_2.png"
      }
    ];

    for (const proj of defaultProjects) {
      await addProject(proj);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Button onClick={seedProjects} variant="outline">
          Seed Projects from PDF
        </Button>
      </div>

      <ContentTable<Project>
        rows={projects}
        columns={[
          { label: "Title", accessor: "title" },
          { label: "Client", accessor: "client" },
          { label: "Category", accessor: "category" },
          { label: "Status", accessor: "status" },
        ]}
        onEdit={handleEdit}
        onDelete={(item) => setDeleteTarget(item)}
      />

      <div className="border rounded-lg p-6 space-y-4 max-w-lg">
        <h2 className="text-lg font-medium">{editingTarget ? "Edit Project" : "Add Project"}</h2>
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
          <div className="flex gap-2">
            <Button type="submit">{editingTarget ? "Save Changes" : "Add Project"}</Button>
            {editingTarget && (
              <Button type="button" variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
            )}
          </div>
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
