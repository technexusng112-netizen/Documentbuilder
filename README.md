# ProjectHelper

ProjectHelper is a production-ready MVP SaaS platform for discovering Nigerian university research topics and hiring academic support services.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Prisma ORM + PostgreSQL
- NextAuth credentials authentication
- Server/API routes for search, admin CRUD, inquiries, bookmarks, recommendations, and topic export

## Key Features
- Rich Nigerian university data model (University → Faculty → Department → Topic)
- Topic explorer with dynamic search/filtering by keyword, department, level, and category
- Public pages: Home, About, Services, Topics Explorer, Contact, Hire
- Contact + Hire funnel with validation and success/error states
- Student auth + bookmarks dashboard
- Admin dashboard and CRUD API endpoints for core academic entities
- Recommendation engine based on department/category/level/tags
- Topic export endpoint (configured as downloadable PDF response)

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment:
   ```bash
   cp .env.example .env
   ```
3. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```
4. Run migrations:
   ```bash
   npm run prisma:migrate
   ```
5. Seed database:
   ```bash
   npm run prisma:seed
   ```
6. Start dev server:
   ```bash
   npm run dev
   ```

## Admin Seed Credentials
- Email: `admin@projecthelper.ng`
- Password: `Admin@12345`

## Project Structure
- `app/`: Pages + API routes
- `components/`: Reusable UI and form components
- `lib/`: Prisma client, auth, helpers
- `prisma/`: Schema + seed script
- `types/`: Shared TypeScript types
