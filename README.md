# Presidential Administration Website - Western Ukraine

A comprehensive full-stack Next.js application for managing the presidential administration of Western Ukraine, featuring public-facing content management and admin dashboard with role-based access control.

## Features

### Public-Facing Pages
- **Homepage**: Hero section with featured president, staff, and latest media
- **President Biography**: Dedicated page showcasing the president's profile and information
- **Staff Directory**: Browse administrative staff members by department
- **Media & News**: Press releases, announcements, and media coverage
- **Legislation**: View proposed, passed, and rejected laws and regulations
- **Open Tenders**: Browse and submit bids for government projects
- **Business Registry**: Discover and register enterprises and organizations

### Admin Features
- **Role-Based Access Control**: Admin, Manager, and Viewer roles
- **Dashboard**: Overview of all system data and statistics
- **President Management**: Update president biography and contact information
- **Staff Management**: Add, edit, and manage administrative personnel
- **Media Management**: Upload and organize press releases and media content
- **Legislation Management**: Create and track legislative proposals
- **Tenders Management**: Post government projects and manage proposals
- **Enterprises Registry**: Manage registered businesses and organizations
- **User Management** (Admin only): Create and manage system users

### Technical Features
- **Authentication**: Secure Supabase authentication with email/password
- **Database**: PostgreSQL with Row Level Security (RLS) policies
- **Real-time Updates**: Dynamic content management with Supabase
- **Light/Dark Mode**: Full theme support with Tailwind CSS
- **Responsive Design**: Mobile-first approach with full responsiveness
- **Type Safety**: Full TypeScript implementation

## Quick Start

### 1. Clone and Install

Using shadcn CLI:
\`\`\`bash
npx shadcn-cli@latest init your-project-name
cd your-project-name
\`\`\`

Or manually:
\`\`\`bash
git clone <your-repo-url>
cd presidential-admin
npm install
\`\`\`

### 2. Set Up Supabase

1. Create a new Supabase project at https://supabase.com
2. In v0, go to **Connect** → Add **Supabase** integration
3. Copy your Supabase URL and anon key

### 3. Create Database Schema

1. Run the database migration script:
   - Execute `scripts/01-create-schema.sql` in your Supabase SQL editor
   - Execute `scripts/02-seed-data.sql` to populate sample data

2. Or use the Vercel dashboard to run scripts automatically

### 4. Environment Variables

The following variables are automatically provided by Supabase integration:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

No additional configuration needed!

### 5. Development

\`\`\`bash
npm run dev
# Open http://localhost:3000
\`\`\`

## Project Structure

\`\`\`
app/
├── admin/                    # Admin dashboard routes
│   ├── page.tsx             # Admin dashboard home
│   ├── president/           # President management
│   ├── staff/               # Staff management
│   ├── media/               # Media management
│   ├── legislation/         # Legislation management
│   ├── tenders/             # Tenders management
│   ├── enterprises/         # Enterprises management
│   └── users/               # User management (admin only)
├── auth/
│   └── login/               # Admin login page
├── media/                   # Public media page
├── legislation/             # Public legislation page
├── tenders/                 # Public tenders listing
│   └── [id]/               # Tender detail with proposal form
├── enterprises/             # Public enterprises directory
│   └── register/           # Enterprise registration form
├── president/               # Public president biography page
└── page.tsx                # Public homepage

components/
├── header.tsx              # Navigation header
├── hero.tsx                # Homepage hero section
├── president-bio.tsx       # President biography component
├── staff-section.tsx       # Staff directory section
├── media-section.tsx       # Latest media section
├── footer.tsx              # Footer with links
└── proposal-form.tsx       # Tender proposal submission

lib/
├── supabase/
│   ├── client.ts          # Browser client
│   ├── server.ts          # Server client
│   └── middleware.ts      # Auth middleware
└── database.ts            # Database utility functions

scripts/
├── 01-create-schema.sql   # Database schema creation
└── 02-seed-data.sql       # Sample data population
\`\`\`

## User Roles

### Admin
- Full system access
- Create and manage users
- Create/edit all content
- Manage system settings

### Manager
- Create and edit content
- Manage staff, media, legislation, tenders, enterprises
- Cannot manage users

### Viewer
- Read-only access
- View all public and admin content
- Cannot make any changes

## Database Schema

### Core Tables
- **users**: System user accounts with roles
- **president**: President biography and information
- **staff**: Administrative staff members
- **media**: Press releases and media content
- **legislation**: Laws and regulations
- **tenders**: Government procurement projects
- **tender_proposals**: Bids submitted for tenders
- **enterprises**: Registered businesses and organizations

All tables are secured with Row Level Security (RLS) policies to ensure data privacy and security.

## Features by User Type

### Public Users
- View homepage with featured president and staff
- Read president biography
- Browse staff directory
- Access media and news
- View legislation
- Submit tender proposals
- Register their enterprise

### Admin Users
- Everything managers can do
- Create and manage system users
- Assign roles and permissions
- System administration

### Manager Users
- Add/edit president information
- Manage staff directory
- Publish media and news
- Create and manage legislation
- Post and manage tenders
- Manage enterprise registrations

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Add Supabase environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

Or use the "Publish" button in v0 dashboard to deploy directly.

## Security Notes

- All user data is protected by Supabase authentication
- Database queries use Row Level Security policies
- Admin routes are protected by middleware
- Sensitive operations require proper role verification
- All forms validate input on both client and server

## Support & Troubleshooting

### Issue: Can't login
- Verify Supabase environment variables are correct
- Check that Supabase integration is connected in v0
- Ensure user account exists in Supabase auth

### Issue: Database errors
- Verify all schema SQL has been executed
- Check RLS policies are enabled on tables
- Ensure database URL is correct

### Issue: Missing data
- Run the seed data script (02-seed-data.sql)
- Check that data insert permissions are set correctly

## Next Steps

1. Customize branding and colors in `globals.css`
2. Add your logo and images
3. Create initial admin user
4. Populate president and staff information
5. Customize homepage content
6. Deploy to production

## Support

For issues or questions, contact support at vercel.com/help
