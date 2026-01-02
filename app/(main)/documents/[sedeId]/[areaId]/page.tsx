import { DATA_SEDES } from "@/lib/data";
import { getFileMetadata } from "@/lib/files";
import AreaClientPage from "./AreaClientPage";

export default async function AreaPage({ 
  params 
}: { 
  params: Promise<{ sedeId: string, areaId: string }> 
}) {
  const { sedeId, areaId } = await params;
  
  const sedeData = DATA_SEDES[sedeId];
  const areaData = sedeData?.areas.find(
    (a: any) => a.nombre.toLowerCase().replace(/ /g, "-") === areaId
  );

  if (!areaData) return <div className="p-20 text-center">Área no encontrada</div>;

  // Inyectamos la metadata real asegurando que los nombres de las propiedades
  // coincidan con lo que AreaClientPage consume (peso y fecha).
  const archivosConMetadata = areaData.archivos.map((doc: any) => {
    const meta = getFileMetadata(doc.nombre);
    return {
      ...doc,
      fecha: meta.date, // Coincide con doc.fecha en el cliente
      peso: meta.size    // Coincide con doc.peso en el cliente
    };
  });

  return (
    <AreaClientPage 
      sedeId={sedeId}
      areaId={areaId}
      areaNombre={areaData.nombre}
      archivos={archivosConMetadata}
    />
  );
}