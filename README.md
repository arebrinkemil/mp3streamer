# MP3Streamer

MP3Streamer is a Spotify clone built with Next.js and TypeScript. It allows users to upload music, create playlists, and stream their collections from anywhere. This app utilizes Supabase as the database and supports Stripe for handling any monetization needs.

## Features

- User authentication and profile management
- Music upload and storage
- Playlist creation and management
- High-quality streaming of uploaded tracks
- Integration with Stripe for monetization options

## Prerequisites

- Node.js & npm installed

## Getting Started

### 1. Clone the repository


git clone https://github.com/yourusername/mp3streamer.git
cd mp3streamer
2. Install dependencies
bash
npm install
3. Set up environment variables
Create an .env.local file in the root directory and add your Supabase and Stripe keys:

plaintext
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
4. Run the app
bash

npm run dev
Visit http://localhost:3000 in your browser to explore MP3Streamer!

Technologies Used
Next.js: Framework for building React applications with server-side rendering.
TypeScript: Strongly typed JavaScript for enhanced code quality.
Supabase: Backend as a service for handling database operations.
Stripe: Payment processing and monetization.
