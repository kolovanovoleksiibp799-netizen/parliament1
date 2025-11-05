-- Add original_url column to legislation table for links to original documents
ALTER TABLE legislation ADD COLUMN IF NOT EXISTS original_url TEXT;

-- Update the comment to document the new field
COMMENT ON COLUMN legislation.original_url IS 'Link to the original document or official source';
