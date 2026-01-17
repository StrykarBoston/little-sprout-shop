# Technology Stack

## Frontend Framework
- **React 18.3.1** - UI library for building user interfaces
- **TypeScript 5.8.3** - Static type checking for JavaScript
- **Vite 5.4.19** - Build tool and development server

## UI Components & Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI primitives
- **Radix UI** - Unstyled, accessible components for React
  - @radix-ui/react-accordion
  - @radix-ui/react-alert-dialog
  - @radix-ui/react-avatar
  - @radix-ui/react-checkbox
  - @radix-ui/react-dialog
  - @radix-ui/react-dropdown-menu
  - @radix-ui/react-label
  - @radix-ui/react-popover
  - @radix-ui/react-select
  - @radix-ui/react-tabs
  - @radix-ui/react-toast
  - And more...
- **Lucide React 0.462.0** - Icon library
- **class-variance-authority 0.7.1** - Utility for component variants
- **tailwind-merge 2.6.0** - Utility for merging Tailwind classes
- **tailwindcss-animate 1.0.7** - Animation utilities for Tailwind

## State Management & Data Fetching
- **@tanstack/react-query 5.83.0** - Data fetching and state management
- **React Context API** - Local state management (CartContext, FirebaseAuthContext, WishlistContext)

## Backend & Database
- **Firebase 12.7.0** - Backend-as-a-Service
  - Firebase Authentication - User authentication
  - Firestore - NoSQL database
  - Firebase Analytics - User behavior tracking

## Routing
- **React Router DOM 6.30.1** - Client-side routing

## Forms & Validation
- **React Hook Form 7.61.1** - Form management
- **@hookform/resolvers 3.10.0** - Validation resolvers
- **Zod 3.25.76** - Schema validation

## Utilities & Libraries
- **date-fns 3.6.0** - Date manipulation utilities
- **recharts 2.15.4** - Chart library
- **embla-carousel-react 8.6.0** - Carousel component
- **sonner 1.7.4** - Toast notifications
- **next-themes 0.3.0** - Theme management
- **cmdk 1.1.1** - Command menu component

## Development Tools
- **ESLint 9.32.0** - Code linting
- **TypeScript ESLint 8.38.0** - TypeScript-specific ESLint rules
- **PostCSS 8.5.6** - CSS post-processing
- **Autoprefixer 10.4.21** - CSS vendor prefixing

## Deployment
- **Vercel** - Hosting platform (configured with vercel.json)

## Environment Configuration
- Environment variables managed through `.env` file
- Firebase configuration loaded from environment variables

## Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── cart/           # Shopping cart components
│   └── home/           # Home page components
├── context/            # React context providers
├── data/              # Static data and mock data
├── hooks/             # Custom React hooks
├── pages/             # Page components
└── utils/             # Utility functions
```

## Key Features
- **E-commerce functionality** with shopping cart and wishlist
- **User authentication** via Firebase Auth
- **Responsive design** with Tailwind CSS
- **Type-safe development** with TypeScript
- **Component-driven architecture** with shadcn/ui
- **Real-time data** with Firestore
- **Modern development experience** with Vite
