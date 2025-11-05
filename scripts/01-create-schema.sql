-- Create roles enum
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'viewer');

-- Create users table (extends Supabase auth)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role user_role DEFAULT 'viewer',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create president table
CREATE TABLE president (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  email TEXT,
  phone TEXT,
  official_start_date DATE,
  official_end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create staff table
CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  bio TEXT,
  image_url TEXT,
  department TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create media table
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  media_type TEXT NOT NULL, -- 'image', 'video', 'document'
  category TEXT,
  date_published TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create legislation table
CREATE TABLE legislation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  status TEXT NOT NULL, -- 'proposed', 'passed', 'rejected'
  date_proposed TIMESTAMPTZ,
  date_passed TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create tenders table
CREATE TABLE tenders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  budget DECIMAL(15, 2),
  deadline TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'open', -- 'open', 'closed', 'awarded'
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create tender proposals table
CREATE TABLE tender_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tender_id UUID NOT NULL REFERENCES tenders(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  proposer_name TEXT NOT NULL,
  proposer_email TEXT NOT NULL,
  proposal_amount DECIMAL(15, 2),
  proposal_file_url TEXT,
  status TEXT DEFAULT 'submitted', -- 'submitted', 'reviewed', 'accepted', 'rejected'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create enterprises table (advocacy/business registry)
CREATE TABLE enterprises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  registration_number TEXT UNIQUE,
  company_type TEXT, -- 'business', 'NGO', 'cooperative', etc.
  description TEXT,
  contact_person TEXT,
  email TEXT,
  phone TEXT,
  website TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE president ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE legislation ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenders ENABLE ROW LEVEL SECURITY;
ALTER TABLE tender_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprises ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'admin')
  );
CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can update users" ON users
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'admin')
  );

-- Create RLS policies for public read access (president, staff, media, legislation, enterprises)
CREATE POLICY "Public can view president info" ON president
  FOR SELECT USING (true);
CREATE POLICY "Admins/Managers can insert president info" ON president
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'manager'))
  );
CREATE POLICY "Admins/Managers can update president info" ON president
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'manager'))
  );
CREATE POLICY "Admins/Managers can delete president info" ON president
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'manager'))
  );

-- Create RLS policies for staff
CREATE POLICY "Public can view staff" ON staff
  FOR SELECT USING (true);
CREATE POLICY "Admins/Managers can insert staff" ON staff
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'manager'))
  );
CREATE POLICY "Admins/Managers can update staff" ON staff
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'manager'))
  );
CREATE POLICY "Admins/Managers can delete staff" ON staff
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'manager'))
  );

-- Create RLS policies for media
CREATE POLICY "Public can view media" ON media
  FOR SELECT USING (true);
CREATE POLICY "Admins/Managers can insert media" ON media
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'manager'))
  );
CREATE POLICY "Admins/Managers can update media" ON media
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'manager'))
  );
CREATE POLICY "Admins/Managers can delete media" ON media
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'manager'))
  );

-- Create RLS policies for legislation
CREATE POLICY "Public can view legislation" ON legislation
  FOR SELECT USING (true);
CREATE POLICY "Admins/Managers can insert legislation" ON legislation
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'manager'))
  );
CREATE POLICY "Admins/Managers can update legislation" ON legislation
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'manager'))
  );
CREATE POLICY "Admins/Managers can delete legislation" ON legislation
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'manager'))
  );

-- Create RLS policies for tenders
CREATE POLICY "Public can view tenders" ON tenders
  FOR SELECT USING (true);
CREATE POLICY "Admins/Managers can insert tenders" ON tenders
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'manager'))
  );
CREATE POLICY "Admins/Managers can update tenders" ON tenders
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'manager'))
  );
CREATE POLICY "Admins/Managers can delete tenders" ON tenders
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'manager'))
  );

-- Create RLS policies for tender proposals
CREATE POLICY "Public can view tender proposals" ON tender_proposals
  FOR SELECT USING (true);
CREATE POLICY "Anyone can submit tender proposals" ON tender_proposals
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins/Managers can update proposals" ON tender_proposals
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'manager'))
  );
CREATE POLICY "Admins/Managers can delete proposals" ON tender_proposals
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'manager'))
  );

-- Create RLS policies for enterprises
CREATE POLICY "Public can view enterprises" ON enterprises
  FOR SELECT USING (true);
CREATE POLICY "Anyone can register enterprises" ON enterprises
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins/Managers can update enterprises" ON enterprises
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'manager'))
  );
CREATE POLICY "Admins/Managers can delete enterprises" ON enterprises
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'manager'))
  );
