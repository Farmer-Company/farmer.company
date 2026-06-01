# Farmer.company - Operating System for Indian Agriculture

![GHBanner](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

## Overview

**Farmer.company (Digital Orchard OS)** is a professional B2B agricultural marketplace portal connecting Indian farmers, aggregators, traders, processors, retailers, and institutional buyers through a blended online-offline workflow. It facilitates trusted national commodity trades, high-signal pricing discovery, and comprehensive Supply CRM.

## Tech Stack

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 + IBM Carbon Engineered Design System
- **Routing**: React Router DOM v7
- **Database/Auth**: Firebase

## Project Structure

- `/src` - Application source code (components, pages, routing)
- `/Product_Docs` - Extensive PRDs, UI/UX guidelines, and product documentation
- `/public` - Static assets
- `design.md` - Digital Orchard OS Design System specifications

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn`

## Getting Started

1. **Clone the repository** (if not already done) and navigate to the root directory.
2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Setup**:
   Copy `.env.example` to `.env.local` and set your `GEMINI_API_KEY` and other necessary environment variables.

   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

   The app will be accessible at `http://localhost:3000`.

## Production Build

To build the production bundle:

```bash
npm run build
```

## Documentation

For full product context, user roles, design guidelines, and the beta delivery plan, please refer to the `/Product_Docs/README.md` file in this repository.
