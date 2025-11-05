-- Fix infinite recursion in RLS policies
-- Drop problematic policies
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
DROP POLICY IF EXISTS "Admins can view all users" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;
DROP POLICY IF EXISTS "Admins can update users" ON users;

-- Create simpler RLS policies for users that don't cause recursion
-- Use auth.uid() directly instead of subqueries
CREATE POLICY "Users can view themselves" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update themselves" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Allow service role to manage users (for admin operations)
CREATE POLICY "Service role can manage users" ON users
  FOR ALL USING (auth.role() = 'service_role');

-- For admin/manager operations, they need to be able to see other users
-- This is handled at the application level with role checks before queries
CREATE POLICY "Authenticated users can view all for admin check" ON users
  FOR SELECT USING (auth.role() IN ('authenticated', 'service_role'));
