import { Building2, MapPin } from "lucide-react";
import Link from "next/link";
import { DATA_SEDES } from "@/lib/data";

export default function Home() {
  const sedesIds = Object.keys(DATA_SEDES);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafc] font-sans antialiased">
      <div className="text-center mb-16 px-4">
        <h1 className="text-[48px] font-bold text-[#1e293b] leading-tight mb-4">Gestión Documental SST</h1>
        <p className="text-[#64748b] text-xl font-light">Seleccione una sede para acceder a la documentación corporativa</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] w-full px-10">
        {sedesIds.map((id) => {
          const sede = DATA_SEDES[id];
          return (
            <Link href={`/documents/${id}`} key={id}>
              <div className="bg-white border border-slate-100 rounded-[24px] p-10 flex flex-col items-center shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 cursor-pointer group h-full">
                <div className="mb-8 p-6 bg-[#0066ff] text-white rounded-[22px] shadow-lg shadow-blue-100 group-hover:scale-105 transition-transform">
                  <Building2 className="h-10 w-10" />
                </div>
                <h2 className="text-[22px] font-bold text-[#1e293b] mb-4 text-center">{sede.nombre}</h2>
                <div className="flex items-center text-[#94a3b8] text-sm mb-2">
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