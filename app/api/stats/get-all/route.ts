import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  const client = await db.connect();
  try {
    const { rows } = await client.sql`SELECT document_id, views, downloads FROM document_stats`;
    
    const statsMap = rows.reduce((acc: any, row: any) => {
      acc[row.document_id] = { views: row.views, downloads: row.downloads };
      return acc;
    }, {});

    return NextResponse.json(statsMap);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener datos" }, { status: 500 });
  } finally {
    client.release();
  }
}