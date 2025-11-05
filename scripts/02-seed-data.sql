-- Insert seed data for president
INSERT INTO president (name, bio, email, phone, official_start_date)
VALUES (
  'Volodymyr Zelensky',
  'President of Ukraine, focused on democratic reforms and regional development',
  'president@ua.gov',
  '+38 (044) 123-45-67',
  '2024-01-01'::date
);

-- Insert seed data for staff
INSERT INTO staff (name, position, email, department, image_url, bio)
VALUES
  ('Andriy Yermak', 'Chief of Staff', 'ayermak@ua.gov', 'Presidential Office', '/placeholder.svg?height=150&width=150', 'Chief of Staff with 15 years of experience'),
  ('Olha Stefanishyna', 'Economic Advisor', 'ostefanishyna@ua.gov', 'Economic Policy', '/placeholder.svg?height=150&width=150', 'Leading economic policy initiatives'),
  ('Dmytro Kuleba', 'Foreign Policy Advisor', 'dkuleba@ua.gov', 'International Relations', '/placeholder.svg?height=150&width=150', 'International relations specialist');

-- Insert seed data for media
INSERT INTO media (title, description, media_type, category, date_published, image_url)
VALUES
  ('Press Conference March 2024', 'President addresses national concerns', 'image', 'press-conference', NOW() - INTERVAL '30 days', '/placeholder.svg?height=300&width=400'),
  ('Regional Development Initiative', 'New program for western Ukraine', 'document', 'initiatives', NOW() - INTERVAL '45 days', '/placeholder.svg?height=300&width=400'),
  ('Public Address on Reform', 'State of the nation address', 'video', 'speeches', NOW() - INTERVAL '60 days', '/placeholder.svg?height=300&width=400');

-- Insert seed data for legislation
INSERT INTO legislation (title, description, status, date_proposed)
VALUES
  ('Regional Economic Development Law', 'Promoting business growth in western regions', 'passed', NOW() - INTERVAL '90 days'),
  ('Digital Governance Act', 'Modernizing government digital services', 'proposed', NOW() - INTERVAL '30 days'),
  ('Investment Protection Bill', 'Strengthening investor protections', 'passed', NOW() - INTERVAL '120 days');

-- Insert seed data for tenders
INSERT INTO tenders (title, description, budget, deadline, category)
VALUES
  ('Infrastructure Development Project', 'Building regional infrastructure', 5000000.00, NOW() + INTERVAL '60 days', 'Construction'),
  ('IT Services Contract', 'Government digital services provider', 2000000.00, NOW() + INTERVAL '45 days', 'Technology'),
  ('Education Initiative', 'Teacher training and curriculum development', 3000000.00, NOW() + INTERVAL '90 days', 'Education');

-- Insert seed data for enterprises
INSERT INTO enterprises (company_name, company_type, description, contact_person, email, status)
VALUES
  ('Tech Ukraine LLC', 'business', 'IT services provider', 'Ivan Kovenko', 'ivan@techukraine.com', 'active'),
  ('Green Energy Cooperative', 'cooperative', 'Renewable energy development', 'Maria Bondarenko', 'maria@greenenergy.ua', 'active'),
  ('Community Support NGO', 'NGO', 'Social welfare organization', 'Petro Shevchenko', 'petro@communitysupport.org', 'active');
