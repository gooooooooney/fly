import { NextResponse } from 'next/server'
import fsPromises from 'fs/promises';
import path from 'path';
 
export async function GET() {
  const filePath = path.join(process.cwd(), 'public/emojis.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData as any);
  return NextResponse.json(objectData)
}