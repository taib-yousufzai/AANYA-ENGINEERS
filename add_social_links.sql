-- Run this SQL query in your Supabase SQL Editor to add the missing social media columns
-- to the 'team_members' table. This will fix the 400 Bad Request error when saving social links.

ALTER TABLE team_members 
ADD COLUMN IF NOT EXISTS linkedin TEXT,
ADD COLUMN IF NOT EXISTS instagram TEXT,
ADD COLUMN IF NOT EXISTS facebook TEXT,
ADD COLUMN IF NOT EXISTS twitter TEXT;
