import { DATA_SEDES } from "@/lib/data";
import Link from "next/link";

export default async function SedePage({ 
  params 
}: { 
  params: Promise<{ sedeId: string }> 
}) {
  const { sedeId } = await params;
  const sedeData = DATA_SEDES[sedeId];

  if (!sedeData) return <div className="p-20 text-center">Sede no encontrada</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 md:p-16">
      {/* Navegación Breadcrumbs */}
      <nav className="flex items-center gap-x-2 text-sm text-slate-400 mb-12">
        <Link href="/" className="hover:text-slate-600 transition-colors">Sedes</Link>
        <span>&gt;</span>
        <span className="font-medium text-slate-600">{sedeData.nombre}</span>
      </nav>

      <div className="text-center mb-16">
        <h1 className="text-[44px] font-bold text-[#1e293b] mb-3">{sedeData.nombre}</h1>
        <p className="text-slate-400 text-lg">Seleccione un área para ver los documentos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {sedeData.areas.map((area: any) => (
          <Link 
            key={area.nombre} 
            // Esto crea la URL limpia: /documents/palmas-del-espino/sst
            href={`/documents/${sedeId}/${area.nombre.toLowerCase().replace(/ /g, "-")}`}
            className="group"
          >
            <div className="bg-white border border-slate-100 rounded-[20px] p-8 flex items-center gap-x-6 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-300 cursor-pointer h-full">
              <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                <area.icono className="h-6 w-6" />
              </div>

              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#334155] group-hover:text-blue-600 transition-colors">
                  {area.nombre}
                </span>
                
                {/* --- AQUÍ ESTÁ EL CAMBIO DINÁMICO --- */}
                <span className="text-sm text-slate-400">
                  {area.archivos.length} {area.archivos.length === 1 ? 'documento' : 'documentos'}
                </span>
                {/* ------------------------------------ */}
                
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}