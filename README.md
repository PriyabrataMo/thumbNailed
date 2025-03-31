# Thumbnailed - AI Image Generator

A modern web application that allows users to generate images from text prompts using OpenAI's DALL-E 3 model.

## Features

- Create AI-generated images from text descriptions
- Simple and intuitive user interface
- Copy image URLs for easy sharing
- Responsive design for mobile and desktop

## Technologies Used

- Next.js 15 with App Router
- React 19
- TypeScript
- OpenAI API
- Tailwind CSS
- shadcn/ui components

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- OpenAI API key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/thumbnailed.git
   cd thumbnailed
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Deployment

This application can be easily deployed to Vercel, Netlify, or any other hosting platform that supports Next.js.

## License

This project is licensed under the MIT License.
