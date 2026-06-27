# Edexcel Easy Backend

This project now includes a small Node.js admin API that writes to Supabase.

## What It Adds

- `site_content`: generic content records for blogs, courses, booklets, resources, papers, worksheets, and homepage sections.
- `content_files`: uploaded file metadata connected to content records.
- Supabase Storage buckets:
  - `site-assets` for images.
  - `site-documents` for PDFs and document-like uploads.
- Node admin API in `server/index.js`.

## Setup

1. Copy `.env.example` to `.env`.
2. Fill in:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_API_TOKEN`
   - `ADMIN_SETUP_PASSWORD`
3. Apply Supabase migrations.
4. Start the API:

```bash
pnpm dev:api
```

The API runs on `http://localhost:3001` by default.

## Admin Dashboard

Start the frontend:

```bash
pnpm dev
```

Open:

```txt
http://localhost:8080/admin
```

Log in with your admin email and password. Use `ADMIN_SETUP_PASSWORD` only once when creating the first admin profile.

### First Admin Login

Run the `admin_users` migration:

```txt
supabase/migrations/20260628100000_admin_users.sql
```

Then open `/admin`, enter:

- Admin email
- Admin password
- Setup password: your `ADMIN_SETUP_PASSWORD`

Click **Create Admin** once. After that, use the email and password to log in.

Passwords are stored in Supabase as PBKDF2 hashes, not plain text.

## Public Endpoints

```bash
GET /health
GET /api/content
GET /api/content?type=blog
GET /api/content/blog/my-post-slug
```

## Admin Endpoints

All admin endpoints require:

```http
Authorization: Bearer YOUR_ADMIN_API_TOKEN
```

Create content:

```bash
curl -X POST http://localhost:3001/api/admin/content \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_API_TOKEN" \
  -d '{
    "type": "blog",
    "slug": "exam-revision-plan",
    "title": "Exam Revision Plan",
    "summary": "A simple revision plan for Edexcel students.",
    "body": "Full post content here.",
    "published": true,
    "metadata": {
      "author": "Edexcel Easy"
    }
  }'
```

Upload a file and attach it to content:

```bash
curl -X POST http://localhost:3001/api/admin/content/CONTENT_ID/files \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_API_TOKEN" \
  -d '{
    "bucket": "site-documents",
    "folder": "past-papers/igcse/physics",
    "fileName": "paper-1.pdf",
    "contentType": "application/pdf",
    "fileType": "question-paper",
    "base64": "BASE64_FILE_CONTENT"
  }'
```

## Content Type Ideas

Use consistent `type` values so the frontend can query them later:

- `blog`
- `course`
- `booklet`
- `resource`
- `past-paper`
- `worksheet`
- `textbook`
- `homepage-section`

## Security Notes

- Never put `SUPABASE_SERVICE_ROLE_KEY` in frontend code.
- Keep `ADMIN_API_TOKEN` long and random.
- Public site reads should use Supabase anon key or the public API.
- Admin writes should go through the Node API only.
