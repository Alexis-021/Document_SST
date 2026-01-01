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

  // Procesamos la metadata antes de enviarla al cliente
  const archivosConMetadata = areaData.archivos.map((doc: any) => {
    const meta = getFileMetadata(doc.nombre);
    return {
      ...doc,
      fecha: meta.date,
      tamano: meta.size
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