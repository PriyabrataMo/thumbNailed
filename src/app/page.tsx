import { ImageGenerator } from "@/components/ImageGenerator";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header
        className="border-b"
        style={{ backgroundColor: "var(--background-color)" }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Thumbnailed</h1>
          <div className="text-sm" style={{ color: "var(--muted-text)" }}>
            AI Image Generator
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Generate Images with AI
            </h2>
            <p style={{ color: "var(--muted-text)" }}>
              Enter a detailed description to generate stunning images with AI
            </p>
          </div>

          <ImageGenerator />
        </div>
      </main>

      <footer
        className="border-t"
        style={{ backgroundColor: "var(--background-color)" }}
      >
        <div
          className="container mx-auto px-4 py-6 text-center text-sm"
          style={{ color: "var(--muted-text)" }}
        >
          Built with Next.js, shadcn/ui, and OpenAI
        </div>
      </footer>
    </div>
  );
}
