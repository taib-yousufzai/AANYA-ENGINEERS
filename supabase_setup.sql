-- Run this SQL query in your Supabase SQL Editor to add the missing 'position' column
-- to the 'team_members' table. This will enable team member drag-and-drop reordering
-- to be persisted and rendered correctly on the website.

ALTER TABLE team_members ADD COLUMN position INTEGER;
