# SvelteKit Base Application

A comprehensive SvelteKit starter template with authentication, database integration, internationalization, and modern development tools.

## Features

- **Authentication**: Multi-provider authentication with Better Auth
  - Email/password authentication
  - Social login (GitHub, Google)
  - Organization/team management
  - User sessions and account management
- **Database**: PostgreSQL with Drizzle ORM
  - Type-safe database operations
  - Migration system
  - Docker Compose for local development
- **Internationalization**: Multi-language support with Paraglide
  - Support for English, Spanish, and Dutch
  - Type-safe translations
- **Payment Integration**: Polar integration for subscriptions and payments
  - Checkout flow
  - Customer portal
  - Usage tracking
  - Webhook handling
- **UI Components**: Shadcn/ui components with Tailwind CSS
  - Pre-configured component library
  - Responsive design system
  - Dark/light mode ready
- **Form Handling**: Superforms with Zod validation
  - Type-safe form validation
  - Server-side form handling
- **Testing**: Complete testing setup
  - Unit tests with Vitest
  - E2E tests with Playwright
  - Browser testing support
- **Development Tools**: Modern development experience
  - TypeScript support
  - ESLint and Prettier configuration
  - Hot module reloading
  - Docker support

## Dependencies

### Core Framework

- **SvelteKit** - Full-stack web framework
- **Svelte** - Reactive component framework
- **Vite** - Build tool and development server

### Authentication & Security

- **Better Auth** - Authentication library
- **@polar-sh/better-auth** - Polar integration for Better Auth
- **@polar-sh/sdk** - Polar SDK for payments

### Database

- **Drizzle ORM** - TypeScript ORM
- **postgres** - PostgreSQL client
- **drizzle-kit** - Database toolkit

### UI & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **@tailwindcss/vite** - Vite plugin for Tailwind
- **@lucide/svelte** - Icon library
- **clsx** - Conditional class utility
- **tailwind-merge** - Tailwind class merging
- **tailwind-variants** - Variant API for Tailwind

### Forms & Validation

- **sveltekit-superforms** - Form handling library
- **formsnap** - Form components
- **zod** - Schema validation

### Internationalization

- **@inlang/paraglide-js** - Internationalization library

### Testing

- **Vitest** - Unit testing framework
- **@vitest/browser** - Browser testing
- **Playwright** - E2E testing
- **@playwright/test** - Playwright test runner

### Development Tools

- **TypeScript** - Type checking
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **svelte-check** - Svelte type checking

## Environment Variables

Create a `.env` file in the root directory with the following variables:

### Required Environment Variables

```env
# Database
DATABASE_URL="postgresql://root:mysecretpassword@localhost:5432/local"

# Better Auth
BETTER_AUTH_URL="http://localhost:5173"

# GitHub OAuth (for social login)
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# Google OAuth (for social login)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Polar Integration (for payments)
POLAR_ACCESS_TOKEN="your_polar_access_token"
POLAR_WEBHOOK_SECRET="your_polar_webhook_secret"
```

### Setting up OAuth Providers

#### GitHub OAuth

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to: `http://localhost:5173/api/auth/callback/github`
4. Copy the Client ID and Client Secret to your `.env` file

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create credentials (OAuth client ID)
5. Set authorized redirect URI to: `http://localhost:5173/api/auth/callback/google`
6. Copy the Client ID and Client Secret to your `.env` file

#### Polar Integration

1. Sign up at [Polar](https://polar.sh/)
2. Create an application and get your access token
3. Set up webhook endpoints in your Polar dashboard
4. Copy the access token and webhook secret to your `.env` file

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Docker and Docker Compose (for database)

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd sveltekit-base
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
# Edit .env with your actual values
```

4. **Start the database**

```bash
pnpm run db:start
```

5. **Push database schema**

```bash
pnpm run db:push
```

6. **Start development server**

```bash
pnpm run dev
```

The application will be available at `http://localhost:5173`

### Development Scripts

```bash
# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Database commands
pnpm run db:start      # Start PostgreSQL with Docker
pnpm run db:push       # Push schema changes
pnpm run db:migrate    # Run migrations
pnpm run db:studio     # Open Drizzle Studio

# Testing
pnpm run test          # Run all tests
pnpm run test:unit     # Run unit tests
pnpm run test:e2e      # Run E2E tests

# Code quality
pnpm run lint          # Lint code
pnpm run format        # Format code
pnpm run check         # Type check
```

### Database Management

The application uses PostgreSQL with Drizzle ORM. The database schema includes:

- **Users**: User accounts
- **Sessions**: User session management
- **Accounts**: OAuth account linking
- **Organizations**: Team/Organization support
- **Members**: Organization membership
- **Invitations**: Organization invitations
- **Verification**: Email verification tokens

To view and manage your database:

```bash
pnpm run db:studio
```

### Internationalization

The app supports multiple languages using Paraglide:

- English (en) - default
- Spanish (es)
- Dutch (nl)

Translation files are located in the `messages/` directory. To add a new language:

1. Add the locale to `project.inlang/settings.json`
2. Create a new message file in `messages/{locale}.json`
3. Add translations for all message keys

### UI Components

The application uses Shadcn/ui components with Tailwind CSS. Components are configured in `components.json` and can be added using:

```bash
npx shadcn-svelte@latest add button
```

### Testing

- **Unit Tests**: Located alongside source files with `.test.ts` extension
- **E2E Tests**: Located in the `e2e/` directory
- **Browser Tests**: Configured for testing Svelte components in browser environment

### Deployment

The application can be deployed to various platforms:

1. **Build the application**

```bash
pnpm run build
```

2. **Set up production environment variables**
3. **Deploy the built application**

Make sure to:

- Set up a production PostgreSQL database
- Configure OAuth redirect URIs for your production domain
- Set up Polar webhooks for your production URL
- Update the `BETTER_AUTH_URL` environment variable

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

### License

This project is licensed under the MIT License.
