-- Add original_url column to legislation table if not exists
ALTER TABLE legislation
ADD COLUMN IF NOT EXISTS original_url TEXT;

-- Update tenders_proposals table to include proposer_company_type if not exists
ALTER TABLE tender_proposals
ADD COLUMN IF NOT EXISTS proposer_company_type TEXT;
