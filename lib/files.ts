import fs from 'fs';
import path from 'path';

export function getFileMetadata(fileName: string) {
  try {
    const docsDir = path.join(process.cwd(), 'public', 'docs');
    let filePath = path.join(docsDir, fileName);

    // Si el archivo no existe, probamos añadiendo extensiones comunes
    if (!fs.existsSync(filePath)) {
      const extensions = ['.pdf', '.docx', '.xlsx', '.png', '.jpg'];
      const foundExt = extensions.find(ext => fs.existsSync(`${filePath}${ext}`));
      
      if (foundExt) {
        filePath = `${filePath}${foundExt}`;
      } else {
        // Si no existe de ninguna forma, retornamos valores por defecto sin romper la app
        return { size: "---", date: "N/A" };
      }
    }

    const stats = fs.statSync(filePath);

    // Formateo de Peso (MB o KB)
    const sizeInBytes = stats.size;
    const sizeFormatted = sizeInBytes > 1024 * 1024 
      ? `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`
      : `${(sizeInBytes / 1024).toFixed(0)} KB`;

    return {
      size: sizeFormatted,
      // Usamos mtime (última modificación) para la fecha real de carga
      date: stats.mtime.toLocaleDateString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    };
  } catch (error) {
    // Evitamos que el error detenga el servidor, devolviendo valores neutros
    return { size: "---", date: "N/A" };
  }
}