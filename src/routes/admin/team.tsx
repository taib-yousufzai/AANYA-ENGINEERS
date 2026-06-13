import { useState } from "react";
import { useSiteData } from "@/context/SiteDataContext";
import type { TeamMember } from "@/context/SiteDataContext";
import { validateTeamMember } from "@/lib/validation";
import { ContentTable } from "@/components/admin/ContentTable";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/ImageUpload";

const EMPTY_FORM: TeamMember = { name: "", role: "", bio: "", img: "" };

export default function TeamManager() {
  const { teamMembers, addTeamMember, removeTeamMember } = useSiteData();
  const [form, setForm] = useState<TeamMember>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);

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
    await addTeamMember(form);
    setForm(EMPTY_FORM);
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

      <ContentTable<TeamMember>
        rows={teamMembers}
        columns={[
          { label: "Name", accessor: "name" },
          { label: "Role", accessor: "role" },
          { label: "Bio", accessor: "bio" },
        ]}
        onDelete={(item) => setDeleteTarget(item)}
      />

      <div className="border rounded-lg p-6 space-y-4 max-w-lg">
        <h2 className="text-lg font-medium">Add Team Member</h2>
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
          <Button type="submit">Add Member</Button>
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
