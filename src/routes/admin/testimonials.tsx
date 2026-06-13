import { useState } from "react";
import { useSiteData } from "@/context/SiteDataContext";
import type { Testimonial } from "@/context/SiteDataContext";
import { validateTestimonial } from "@/lib/validation";
import { ContentTable } from "@/components/admin/ContentTable";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const EMPTY_FORM: Testimonial = { name: "", role: "", rating: 5, text: "" };

export default function TestimonialsManager() {
  const { testimonials, addTestimonial, removeTestimonial } = useSiteData();
  const [form, setForm] = useState<Testimonial>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "rating" ? Number(value) : value }));
    if (errors[name])
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = validateTestimonial(form);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    await addTestimonial(form);
    setForm(EMPTY_FORM);
    setErrors({});
  }

  async function handleConfirmDelete() {
    if (deleteTarget) {
      await removeTestimonial(deleteTarget.name);
      setDeleteTarget(null);
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Testimonials</h1>

      <ContentTable<Testimonial>
        rows={testimonials}
        columns={[
          { label: "Name", accessor: "name" },
          { label: "Role", accessor: "role" },
          { label: "Rating", accessor: "rating" },
          { label: "Testimonial", accessor: "text" },
        ]}
        onDelete={(item) => setDeleteTarget(item)}
      />

      <div className="border rounded-lg p-6 space-y-4 max-w-lg">
        <h2 className="text-lg font-medium">Add Testimonial</h2>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {(["name", "role"] as const).map((field) => (
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
            <Label htmlFor="rating">Rating (1–5)</Label>
            <Input
              id="rating"
              name="rating"
              type="number"
              min={1}
              max={5}
              value={form.rating}
              onChange={handleChange}
              aria-describedby={errors.rating ? "rating-error" : undefined}
            />
            {errors.rating && (
              <p id="rating-error" className="text-sm text-destructive">
                {errors.rating}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="text">Text</Label>
            <Textarea
              id="text"
              name="text"
              value={form.text}
              onChange={handleChange}
              rows={3}
              aria-describedby={errors.text ? "text-error" : undefined}
            />
            {errors.text && (
              <p id="text-error" className="text-sm text-destructive">
                {errors.text}
              </p>
            )}
          </div>

          <Button type="submit">Add Testimonial</Button>
        </form>
      </div>

      <DeleteConfirmDialog
        open={deleteTarget !== null}
        itemLabel={deleteTarget?.name ?? ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
