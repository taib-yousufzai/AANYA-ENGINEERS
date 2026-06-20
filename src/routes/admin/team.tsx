import { useState } from "react";
import { useSiteData } from "@/context/SiteDataContext";
import type { TeamMember } from "@/context/SiteDataContext";
import { validateTeamMember } from "@/lib/validation";
import { SortableTeamList } from "@/components/admin/SortableTeamList";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/ImageUpload";

const EMPTY_FORM: TeamMember = { name: "", role: "", bio: "", img: "" };

export default function TeamManager() {
  const { teamMembers, addTeamMember, updateTeamMember, removeTeamMember, reorderTeamMembers } = useSiteData();
  const [form, setForm] = useState<TeamMember>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);
  const [editingTarget, setEditingTarget] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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
    const result = validateTeamMember(form);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    if (editingTarget) {
      await updateTeamMember(editingTarget, form);
    } else {
      await addTeamMember(form);
    }
    setForm(EMPTY_FORM);
    setErrors({});
    setEditingTarget(null);
  }

  function handleEdit(member: TeamMember) {
    setForm(member);
    setEditingTarget(member.name);
    setErrors({});
  }

  function handleCancelEdit() {
    setForm(EMPTY_FORM);
    setEditingTarget(null);
    setErrors({});
  }

  async function handleConfirmDelete() {
    if (deleteTarget) {
      await removeTeamMember(deleteTarget.name);
      setDeleteTarget(null);
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Team Members</h1>

      <SortableTeamList
        items={teamMembers}
        onReorder={reorderTeamMembers}
        onEdit={handleEdit}
        onDelete={(item) => setDeleteTarget(item)}
      />

      <div className="border rounded-lg p-6 space-y-4 max-w-lg">
        <h2 className="text-lg font-medium">{editingTarget ? "Edit Team Member" : "Add Team Member"}</h2>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {(["name", "role"] as const).map((field) => (
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
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              aria-describedby={errors.bio ? "bio-error" : undefined}
            />
            {errors.bio && (
              <p id="bio-error" className="text-sm text-destructive">
                {errors.bio}
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
            <Button type="submit">{editingTarget ? "Save Changes" : "Add Member"}</Button>
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
        itemLabel={deleteTarget?.name ?? ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
