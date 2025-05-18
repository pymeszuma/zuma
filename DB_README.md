# Zuma Database Setup

This README describes how to set up and use the database for storing Zuma form data using Drizzle ORM and Hono API.

## Database Structure

The database schema consists of the following tables:

1. `companies` - Stores basic company information
2. `ndc_assessments` - Stores NDC knowledge-related responses
3. `sustainability_assessments` - Stores sustainability actions responses

## Installation

1. Set up a Neon Database account at https://neon.tech

2. Create a new project in Neon's dashboard and get your connection string.

3. Install the required dependencies:
   ```bash
   pnpm install
   ```

## Configuration

1. Create an `.env` file in the project root (use `.env.example` as a template):

   ```
   DATABASE_URL="postgres://username:password@pg.neon.tech/your-database?sslmode=require"
   ```

   Replace `username`, `password` with your Neon Database credentials.

## Using Neon Database

[Neon](https://neon.tech) is a serverless PostgreSQL service that separates storage and compute, which makes it well-suited for serverless environments like Vercel deployments. Our implementation includes:

1. **Connection Pooling** - Efficient connection management for serverless environments
2. **Edge Compatibility** - Works with edge functions and serverless environments
3. **Auto-scaling** - Automatically scales database resources based on demand

### Setting up Neon Database

1. Create an account on [Neon](https://neon.tech)
2. Create a new project
3. Create a new database
4. Get your connection string from the Neon dashboard
5. Add the connection string to your `.env` file

## Database Migrations

1. Generate the migration files:

   ```bash
   pnpm db:generate
   ```

2. Run the migrations:

   ```bash
   pnpm db:migrate
   ```

3. (Optional) You can view your database using Drizzle Studio:
   ```bash
   pnpm db:studio
   ```

## API Usage

The API for managing form data is available at the following endpoints:

- `GET /api/forms` - Get all forms
- `GET /api/forms/:id` - Get a form by ID
- `POST /api/forms` - Create a new form
- `PUT /api/forms/:id` - Update an existing form
- `DELETE /api/forms/:id` - Delete a form

## Frontend Integration

The Zuma form dialog has been updated to use the API for saving and retrieving form data. The form data is stored in both the database and localStorage for offline access.

### Key Features

1. **Persistence** - Form data is stored in a PostgreSQL database
2. **API** - RESTful API for CRUD operations on form data
3. **Type Safety** - Full TypeScript support through Drizzle ORM
4. **Relationships** - Company data is linked to both NDC assessments and sustainability assessments

### Example: Loading Form Data from API

```typescript
const { loadFormFromApi } = useZuma();

// Load form data with ID 1
const formData = await loadFormFromApi(1);
```

### Example: Saving Form Data to API

The form dialog automatically handles saving to the API when the form is submitted.

## Database Schema Diagram

```
┌─────────────┐      ┌──────────────────┐
│  companies  │      │  ndc_assessments │
├─────────────┤      ├──────────────────┤
│ id          │──┐   │ id               │
│ uuid        │  └──>│ company_id       │
│ nombre_empresa│     │ familiarizado_metas│
│ nit         │      │ conoce_metas_pymes│
│ sector_economico│   │ recibido_formacion│
│ sector_economico_otro│ │ familiarizado_ods│
│ subsector   │      └──────────────────┘
│ cantidad_empleados│
│ departamento│      ┌──────────────────────┐
└─────────────┘      │sustainability_assessments│
                     ├──────────────────────┤
                     │ id                   │
                     │ company_id           │
                     │ calculado_huella_12  │
                     │ calculado_huella_3   │
                     │ identificado_asuntos │
                     │ analizado_doble      │
                     │ capacitado_colaboradores│
                     └──────────────────────┘
```
