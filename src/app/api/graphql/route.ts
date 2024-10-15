import { NextRequest, NextResponse } from 'next/server';
import dotenv from "dotenv";

dotenv.config();

const API_TOKEN = process.env.API_TOKEN!;
const API_URL = process.env.API_URL!;

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  const secureData = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: rawBody, // Pass the incoming body to the GraphQL API
  });

  const data = await secureData.json();

  // Return the data to the client without exposing the token
  return NextResponse.json(data);
}
