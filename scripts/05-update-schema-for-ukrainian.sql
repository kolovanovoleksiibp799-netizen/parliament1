-- Update president table to include Telegram/Discord instead of email/phone
ALTER TABLE president 
ADD COLUMN IF NOT EXISTS telegram TEXT,
ADD COLUMN IF NOT EXISTS discord TEXT;

-- Update staff table to include Discord instead of email/phone
ALTER TABLE staff 
ADD COLUMN IF NOT EXISTS discord TEXT,
DROP COLUMN IF EXISTS email,
DROP COLUMN IF EXISTS phone;

-- Update tenders to support currency (грн)
ALTER TABLE tenders 
ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'UAH';

-- Update tender_proposals to remove company_type restriction
ALTER TABLE tender_proposals
ADD COLUMN IF NOT EXISTS proposer_company_type TEXT;

-- Update enterprises table - remove email/phone, add discord
ALTER TABLE enterprises
DROP COLUMN IF EXISTS email,
DROP COLUMN IF EXISTS phone,
ADD COLUMN IF NOT EXISTS discord TEXT,
ADD COLUMN IF NOT EXISTS company_type_custom TEXT;
