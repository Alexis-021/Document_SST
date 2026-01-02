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

  // FUNCIÓN DE NORMALIZACIÓN: Quita tildes, espacios y mayúsculas
  const normalizar = (texto: string) => 
    texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Elimina tildes
      .replace(/ /g, "-");             // Cambia espacios por guiones

  // Buscamos el área comparando ambos nombres normalizados
  const areaData = sedeData?.areas.find(
    (a: any) => normalizar(a.nombre) === areaId
  );

  if (!areaData) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-slate-500">
        <h2 className="text-2xl font-bold mb-2">Área no encontrada</h2>
        <p>La URL "{areaId}" no coincide con ningún área registrada.</p>
      </div>
    );
  }

  const archivosConMetadata = areaData.archivos.map((doc: any) => {
    const meta = getFileMetadata(doc.nombre);
    return {
      ...doc,
      fecha: meta.date,
      peso: meta.size
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