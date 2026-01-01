// lib/files.ts
import fs from 'fs';
import path from 'path';

export function getFileMetadata(fileName: string) {
  try {
    // Construimos la ruta absoluta hacia la carpeta public/docs
    const filePath = path.join(process.cwd(), 'public', 'docs', fileName);
    
    // Obtenemos las estadísticas del archivo
    const stats = fs.statSync(filePath);

    // Convertimos bytes a MB o KB
    const sizeInBytes = stats.size;
    const sizeFormatted = sizeInBytes > 1024 * 1024 
      ? `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`
      : `${(sizeInBytes / 1024).toFixed(2)} KB`;

    return {
      size: sizeFormatted,
      // birthtime es la fecha de creación, mtime es la última modificación
      date: stats.mtime.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    };
  } catch (error) {
    console.error("Error leyendo metadata:", error);
    return { size: "0 KB", date: "N/A" };
  }
}