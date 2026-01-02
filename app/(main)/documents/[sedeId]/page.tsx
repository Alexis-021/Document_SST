import { DATA_SEDES } from "@/lib/data";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default async function SedePage({ 
  params 
}: { 
  params: Promise<{ sedeId: string }> 
}) {
  const { sedeId } = await params;
  const sedeData = DATA_SEDES[sedeId];

  if (!sedeData) return <div className="p-20 text-center font-bold text-slate-500">Sede no encontrada</div>;

  // FUNCIÓN DE NORMALIZACIÓN: Limpia tildes y espacios para la URL
  const normalizarParaUrl = (texto: string) => 
    texto
      .toLowerCase()
      .normalize("NFD")               
      .replace(/[\u0300-\u036f]/g, "") 
      .replace(/ /g, "-");             

  return (
    /* Restaurado items-center y max-w-6xl para diseño centrado */
    <div className="flex flex-col items-center w-full min-h-full pt-12 md:pt-16 pb-12 bg-[#f8fafc] font-sans antialiased">
      
      {/* Navegación Breadcrumbs centrada */}
      <nav className="flex items-center gap-x-2 text-[11px] md:text-xs font-medium mb-12 w-full max-w-6xl px-10">
        <Link 
          href="/" 
          className="flex items-center gap-1 text-slate-400 hover:text-[#8dc63f] transition-all cursor-pointer"
        >
          <Home className="h-3.5 w-3.5" />
          <span>Sedes</span>
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-300" />
        <span className="bg-[#8dc63f]/10 text-[#8dc63f] px-2.5 py-1 rounded-md font-bold flex items-center gap-1 border border-[#8dc63f]/20">
          <div className="h-1 w-1 rounded-full bg-[#8dc63f]" />
          {sedeData.nombre}
        </span>
      </nav>

      {/* Título de Sede centrado */}
      <div className="text-center mb-16 px-4">
        <h1 className="text-[40px] md:text-[48px] font-bold text-[#1e293b] leading-tight mb-4">
          {sedeData.nombre}
        </h1>
        <p className="text-[#64748b] text-xl font-light">
          Seleccione un área para acceder a la documentación oficial
        </p>
      </div>

      {/* GRID DE ÁREAS centrado */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full px-10 mx-auto">
        {sedeData.areas.map((area: any) => {
          const IconoArea = area.icono; 
          // Aplicamos la normalización aquí para el Link
          const areaSlug = normalizarParaUrl(area.nombre);
          
          return (
            <Link 
              key={area.nombre} 
              href={`/documents/${sedeId}/${areaSlug}`}
              className="block h-full group"
            >
              <div className="bg-white border border-slate-100 rounded-[24px] p-6 flex items-center gap-x-5 shadow-sm hover:shadow-xl hover:border-[#8dc63f] transition-all duration-300 cursor-pointer h-full">
                
                <div className="p-4 bg-slate-50 text-slate-400 rounded-[20px] group-hover:bg-[#8dc63f] group-hover:text-white transition-all duration-300 shadow-inner">
                  {IconoArea && <IconoArea className="h-7 w-7" />}
                </div>

                <div className="flex flex-col">
                  <span className="text-xl font-bold text-[#1e293b] group-hover:text-[#8dc63f] transition-colors">
                    {area.nombre}
                  </span>
                  
                  <span className="text-sm text-slate-400 font-medium">
                    {area.archivos.length} {area.archivos.length === 1 ? 'documento' : 'documentos'}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}