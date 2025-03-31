"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { Upload, X } from "lucide-react";

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Error",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          imageData: uploadedImage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate image");
      }

      setImageUrl(data.imageUrl);
      toast({
        title: "Success",
        description: "Image generated successfully!",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload Section */}
        <div className="space-y-2">
          <Label htmlFor="image-upload">
            Upload Reference Image (Optional)
          </Label>
          <div className="mt-2">
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              ref={fileInputRef}
            />
            {!uploadedImage ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center"
                style={{ borderColor: "var(--border-color)" }}
              >
                <Upload
                  className="h-10 w-10 mb-2"
                  style={{ color: "var(--muted-text)" }}
                />
                <p>Click to upload an image</p>
                <p className="text-sm" style={{ color: "var(--muted-text)" }}>
                  or drag and drop
                </p>
              </div>
            ) : (
              <div className="relative">
                <div className="aspect-video w-full overflow-hidden rounded-lg border">
                  <Image
                    src={uploadedImage}
                    alt="Uploaded preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 rounded-full p-1 h-8 w-8"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Prompt Input */}
        <div className="space-y-2">
          <Label htmlFor="prompt">Enter your prompt</Label>
          <Input
            id="prompt"
            placeholder={
              uploadedImage
                ? "Describe how to transform the uploaded image..."
                : "A serene lake surrounded by mountains at sunset..."
            }
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Generating..." : "Generate Image"}
        </Button>
      </form>

      {imageUrl && (
        <div className="mt-8 space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
            <Image
              src={imageUrl}
              alt="Generated image"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex justify-between">
            <Button
              variant="secondary"
              onClick={() => window.open(imageUrl, "_blank")}
            >
              Open Full Size
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(imageUrl);
                toast({
                  title: "Copied",
                  description: "Image URL copied to clipboard",
                });
              }}
            >
              Copy URL
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
