import { useState } from "react";
import { useSiteData } from "@/context/SiteDataContext";
import type { BlogPost } from "@/context/SiteDataContext";
import { validateBlogPost } from "@/lib/validation";
import { ContentTable } from "@/components/admin/ContentTable";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ImageUpload";

const EMPTY_FORM: BlogPost = { title: "", slug: "", excerpt: "", date: "", img: "" };

export default function BlogsManager() {
  const { blogPosts, addBlogPost, updateBlogPost, removeBlogPost } = useSiteData();
  const [form, setForm] = useState<BlogPost>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [editingTarget, setEditingTarget] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[e.target.name];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const existingSlugs = editingTarget 
      ? blogPosts.filter(p => p.slug !== editingTarget).map((p) => p.slug)
      : blogPosts.map((p) => p.slug);
      
    const result = validateBlogPost(form, existingSlugs);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    if (editingTarget) {
      await updateBlogPost(editingTarget, form);
    } else {
      await addBlogPost(form);
    }
    setForm(EMPTY_FORM);
    setErrors({});
    setEditingTarget(null);
  }

  function handleEdit(post: BlogPost) {
    setForm(post);
    setEditingTarget(post.slug);
    setErrors({});
  }

  function handleCancelEdit() {
    setForm(EMPTY_FORM);
    setEditingTarget(null);
    setErrors({});
  }

  async function handleConfirmDelete() {
    if (deleteTarget) {
      await removeBlogPost(deleteTarget.slug);
      setDeleteTarget(null);
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Blog Posts</h1>

      <ContentTable<BlogPost>
        rows={blogPosts}
        columns={[
          { label: "Title", accessor: "title" },
          { label: "Slug", accessor: "slug" },
          { label: "Date", accessor: "date" },
          { label: "Excerpt", accessor: "excerpt" },
        ]}
        onEdit={handleEdit}
        onDelete={(item) => setDeleteTarget(item)}
      />

      <div className="border rounded-lg p-6 space-y-4 max-w-lg">
        <h2 className="text-lg font-medium">{editingTarget ? "Edit Blog Post" : "Add Blog Post"}</h2>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {(["title", "slug", "excerpt", "date"] as const).map((field) => (
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
            <Label>Image</Label>
            <ImageUpload
              value={form.img}
              onChange={(url) => setForm((prev) => ({ ...prev, img: url }))}
              error={errors.img}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit">{editingTarget ? "Save Changes" : "Add Post"}</Button>
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
