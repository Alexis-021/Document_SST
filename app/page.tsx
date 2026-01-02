import { Building2, MapPin } from "lucide-react";
import Link from "next/link";
import { DATA_SEDES } from "@/lib/data";

export default function Home() {
  const sedesIds = Object.keys(DATA_SEDES);

  return (
    <div className="flex flex-col items-center w-full min-h-full pt-12 md:pt-16 pb-10 bg-[#f8fafc] font-sans antialiased">
      
      {/* Encabezado */}
      <div className="text-center mb-12 px-4">
        <h1 className="text-[40px] md:text-[48px] font-bold text-[#1e293b] leading-tight mb-4">
          Gestión Documental SST
        </h1>
        <p className="text-[#64748b] text-xl font-light">
          Seleccione una sede para acceder a la documentación corporativa
        </p>
      </div>

      {/* Grid de Sedes: Se agregó 'mx-auto' y se ajustó el responsive para Vercel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] w-full px-10 mx-auto">
        {sedesIds.map((id) => {
          const sede = DATA_SEDES[id];
          return (
            <Link href={`/documents/${id}`} key={id} className="block h-full">
              {/* Ajuste de borde: se eliminó la transparencia /40 para evitar el color púrpura por defecto del navegador */}
              <div className="bg-white border border-slate-100 rounded-[24px] p-10 flex flex-col items-center shadow-sm hover:shadow-xl hover:border-[#8dc63f] transition-all duration-300 cursor-pointer group h-full">
                
                {/* Icono reactivo con sombra institucional */}
                <div className="mb-8 p-6 bg-[#8dc63f] text-white rounded-[22px] shadow-lg shadow-[#8dc63f]/20 group-hover:scale-105 transition-transform">
                  <Building2 className="h-10 w-10" />
                </div>

                <h2 className="text-[22px] font-bold text-[#1e293b] mb-4 text-center group-hover:text-[#8dc63f] transition-colors">
                  {sede.nombre}
                </h2>

                <div className="flex items-center text-[#8dc63f] text-sm mb-2 font-medium">
                  <MapPin className="h-4 w-4 mr-2" />
                  {sede.ubicacion}
                </div>

                <p className="text-[#94a3b8] text-sm font-medium">
                  {sede.areas.length} áreas disponibles
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Logo Corporativo centrado */}
      <div className="mt-auto pt-16 flex justify-center w-full">
        <img 
          src="/logo-grupo-palmas.png" 
          alt="Grupo Palmas" 
          className="h-20 md:h-24 w-auto object-contain" 
        />
      </div>
    </div>
  );
}