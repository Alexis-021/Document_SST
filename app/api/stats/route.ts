import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const client = await db.connect();
  try {
    const { documentId, action } = await request.json(); 

    await client.sql`
      INSERT INTO document_stats (document_id, views, downloads)
      VALUES (${documentId}, ${action === 'view' ? 1 : 0}, ${action === 'download' ? 1 : 0})
      ON CONFLICT (document_id)
      DO UPDATE SET 
        views = document_stats.views + ${action === 'view' ? 1 : 0},
        downloads = document_stats.downloads + ${action === 'download' ? 1 : 0},
        last_updated = CURRENT_TIMESTAMP;
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  } finally {
    client.release();
  }
}