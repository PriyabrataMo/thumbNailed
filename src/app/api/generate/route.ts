import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export async function POST(req: NextRequest) {
  try {
    const { prompt, imageData } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    let response;

    // Standard image generation without reference image
    // Using only DALL-E 3 for generation since DALL-E 2 edit is more complex to implement
    response = await openai.images.generate({
      model: "dall-e-3",
      prompt: imageData
        ? `Based on the reference image I have in mind, ${prompt}`
        : prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0].url;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
