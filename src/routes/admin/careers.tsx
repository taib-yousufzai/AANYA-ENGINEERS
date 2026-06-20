import { useState } from "react";
import { useSiteData } from "@/context/SiteDataContext";
import type { JobOpening } from "@/context/SiteDataContext";
import { validateJobOpening } from "@/lib/validation";
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

const EMPTY_FORM: JobOpening = {
  title: "",
  department: "",
  location: "",
  type: "Full-time",
  experience: "",
  description: "",
};

export default function CareersManager() {
  const { jobOpenings, addJobOpening, updateJobOpening, removeJobOpening } = useSiteData();
  const [form, setForm] = useState<JobOpening>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<JobOpening | null>(null);
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

  function handleTypeChange(value: string) {
    setForm((prev) => ({ ...prev, type: value as JobOpening["type"] }));
    if (errors.type)
      setErrors((prev) => {
        const next = { ...prev };
        delete next.type;
        return next;
      });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = validateJobOpening(form);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    if (editingTarget) {
      await updateJobOpening(editingTarget, form);
    } else {
      await addJobOpening(form);
    }
    setForm(EMPTY_FORM);
    setErrors({});
    setEditingTarget(null);
  }

  function handleEdit(job: JobOpening) {
    setForm(job);
    setEditingTarget(job.title);
    setErrors({});
  }

  function handleCancelEdit() {
    setForm(EMPTY_FORM);
    setEditingTarget(null);
    setErrors({});
  }

  async function handleConfirmDelete() {
    if (deleteTarget) {
      await removeJobOpening(deleteTarget.title);
      setDeleteTarget(null);
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Career Openings</h1>

      <ContentTable<JobOpening>
        rows={jobOpenings}
        columns={[
          { label: "Title", accessor: "title" },
          { label: "Department", accessor: "department" },
          { label: "Location", accessor: "location" },
          { label: "Type", accessor: "type" },
        ]}
        onEdit={handleEdit}
        onDelete={(item) => setDeleteTarget(item)}
      />

      <div className="border rounded-lg p-6 space-y-4 max-w-lg">
        <h2 className="text-lg font-medium">{editingTarget ? "Edit Career Opening" : "Add Career Opening"}</h2>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {(["title", "department", "location", "experience"] as const).map((field) => (
            <div key={field} className="space-y-1">
              <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
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
            <Label htmlFor="type">Type</Label>
            <Select value={form.type} onValueChange={handleTypeChange}>
              <SelectTrigger id="type" aria-describedby={errors.type ? "type-error" : undefined}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p id="type-error" className="text-sm text-destructive">
                {errors.type}
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

          <div className="flex gap-2">
            <Button type="submit">{editingTarget ? "Save Changes" : "Add Opening"}</Button>
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
