import { NextResponse } from 'next/server';
require('dotenv').config();

export async function POST(request) {
  const adminToken = process.env.API_TOKEN;

  if (!adminToken) {
    return NextResponse.json({ error: 'Admin token is missing' }, { status: 500 });
  }

  // Extract the incoming request body
  const body = await request.json();

  // Forward the request body to the GraphQL API
  const secureData = await fetch('https://wiki.jopdorp.nl/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${adminToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body), // Pass the incoming body to the GraphQL API
  });

  const data = await secureData.json();

  // Return the data to the client without exposing the token
  return NextResponse.json(data);
}
