import { Building2, MapPin } from "lucide-react";
import Link from "next/link";
import { DATA_SEDES } from "@/lib/data";

export default function Home() {
  const sedesIds = Object.keys(DATA_SEDES);

  return (
    /* Cambiado a h-full y se redujeron los paddings para ajustar a la pantalla sin scroll */
    <div className="flex flex-col items-center w-full h-full pt-8 md:pt-12 pb-6 bg-[#f8fafc] font-sans antialiased">
      
      {/* Encabezado: Margen reducido de mb-12 a mb-8 */}
      <div className="text-center mb-8 px-4">
        <h1 className="text-[36px] md:text-[44px] font-bold text-[#1e293b] leading-tight mb-2">
          Gestión Documental SST
        </h1>
        <p className="text-[#64748b] text-lg md:text-xl font-light">
          Seleccione una sede para acceder a la documentación corporativa
        </p>
      </div>

      {/* Grid de Sedes: Ajustado gap y padding horizontal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] w-full px-6 md:px-10 mx-auto">
        {sedesIds.map((id) => {
          const sede = DATA_SEDES[id];
          return (
            <Link href={`/documents/${id}`} key={id} className="block h-full group">
              {/* Padding reducido de p-10 a p-8 para ahorrar espacio vertical */}
              <div className="bg-white border border-slate-100 rounded-[24px] p-8 flex flex-col items-center shadow-sm hover:shadow-xl hover:border-[#8dc63f] transition-all duration-300 cursor-pointer h-full">
                
                {/* Icono: Reducido mb-8 a mb-6 y p-6 a p-5 */}
                <div className="mb-6 p-5 bg-[#8dc63f] text-white rounded-[22px] shadow-lg shadow-[#8dc63f]/20 group-hover:scale-105 transition-transform">
                  <Building2 className="h-9 w-9" />
                </div>

                <h2 className="text-[20px] md:text-[22px] font-bold text-[#1e293b] mb-3 text-center group-hover:text-[#8dc63f] transition-colors">
                  {sede.nombre}
                </h2>

                <div className="flex items-center text-[#8dc63f] text-sm mb-2 font-semibold">
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
    </div>
  );
}