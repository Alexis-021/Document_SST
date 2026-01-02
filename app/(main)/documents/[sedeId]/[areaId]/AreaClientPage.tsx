"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  FileText, Download, Eye, Search, ChevronRight, Home, 
  Calendar, HardDrive, FileCode 
} from "lucide-react";

export default function AreaClientPage({ sedeId, areaId, areaNombre, archivos }: any) {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filtros = ["Todos", "Procedimientos", "Matriz IPERC", "Políticas", "Instructivos", "Formatos", "Registros","Reglamentos"];
  const sedeNombreFormateado = sedeId.replace(/-/g, ' ');

  const counts = useMemo(() => {
    const stats: Record<string, number> = { Todos: archivos.length };
    archivos.forEach((doc: any) => {
      if (doc.categoria) stats[doc.categoria] = (stats[doc.categoria] || 0) + 1;
    });
    return stats;
  }, [archivos]);

  const archivosFiltrados = useMemo(() => {
    return archivos.filter((doc: any) => {
      const coincideFiltro = activeFilter === "Todos" || doc.categoria === activeFilter;
      const coincideBusqueda = doc.nombre.toLowerCase().includes(searchQuery.toLowerCase());
      return coincideFiltro && coincideBusqueda;
    });
  }, [activeFilter, searchQuery, archivos]);

  const limpiarNombre = (nombreCompleto: string) => {
    return nombreCompleto.substring(0, nombreCompleto.lastIndexOf('.')) || nombreCompleto;
  };

  return (
    <div className="w-full min-h-full bg-[#f8fafc] p-4 md:p-10 font-sans">
      {/* Breadcrumbs con ancho controlado */}
      <nav className="flex items-center gap-x-2 text-[11px] md:text-xs font-medium mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="flex items-center gap-1 text-slate-400 hover:text-[#8dc63f] transition-all">
          <Home className="h-3.5 w-3.5" />
          <span>Sedes</span>
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-300" />
        <Link href={`/documents/${sedeId}`} className="text-slate-400 hover:text-[#8dc63f] transition-all capitalize">
          {sedeNombreFormateado}
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-300" />
        <span className="bg-[#8dc63f]/10 text-[#8dc63f] px-2.5 py-1 rounded-md font-bold border border-[#8dc63f]/20">
          {areaNombre}
        </span>
      </nav>

      {/* Título de Sección */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-2">{areaNombre}</h1>
        <p className="text-slate-500">Documentación oficial y registros actualizados</p>
      </div>

      {/* Buscador Optimizado */}
      <div className="relative mb-8">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input 
          type="text"
          placeholder="Buscar documentos por nombre..."
          className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8dc63f]/20 transition-all font-medium text-slate-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-10">
        {filtros.map((filtro) => {
          const count = counts[filtro] || 0;
          if (filtro !== "Todos" && count === 0) return null;
          return (
            <button
              key={filtro}
              onClick={() => setActiveFilter(filtro)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 border ${
                activeFilter === filtro 
                ? "bg-[#8dc63f] text-white border-[#8dc63f] shadow-lg shadow-[#8dc63f]/20" 
                : "bg-white text-slate-500 border-slate-100 hover:border-[#8dc63f]/30"
              }`}
            >
              {filtro} <span className={`text-[10px] ${activeFilter === filtro ? "text-white" : "text-slate-400"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Listado de Archivos - Corrección de Grid para evitar estiramiento */}
      <div className="grid gap-4 w-full">
        {archivosFiltrados.length > 0 ? (
          archivosFiltrados.map((doc: any) => (
            <div key={doc.id} className="bg-white border border-slate-100 rounded-[24px] p-5 flex flex-col lg:flex-row lg:items-center justify-between group hover:border-[#8dc63f] hover:shadow-md transition-all">
              <div className="flex items-center gap-x-5">
                <div className="p-4 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-[#8dc63f] group-hover:text-white transition-all shadow-inner">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-y-1">
                  <h3 className="text-lg font-bold text-[#1e293b] group-hover:text-[#8dc63f] transition-colors leading-tight">
                    {limpiarNombre(doc.nombre)}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-[10px] font-bold text-[#8dc63f] uppercase bg-[#8dc63f]/10 px-2 py-0.5 rounded border border-[#8dc63f]/10">
                      {doc.categoria}
                    </span>
                    
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                      <HardDrive className="h-3.5 w-3.5" />
                      <span>{doc.peso}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{doc.fecha}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400 text-xs uppercase font-bold">
                      <FileCode className="h-3.5 w-3.5 text-[#8dc63f]" />
                      <span>{doc.nombre.split('.').pop()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-x-3 mt-6 lg:mt-0">
                <Link href={`/documents/${sedeId}/${areaId}/${doc.id}`} className="flex-1 lg:flex-none">
                  <button className="w-full px-6 py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-100 flex items-center justify-center gap-x-2 transition-colors">
                    <Eye className="h-4 w-4" /> Ver
                  </button>
                </Link>
                <a 
                  href={`/docs/${doc.nombre}`} 
                  download 
                  className="flex-1 lg:flex-none px-6 py-3 bg-[#8dc63f]/10 text-[#8dc63f] rounded-xl font-bold text-sm hover:bg-[#8dc63f] hover:text-white transition-all flex items-center justify-center gap-x-2"
                >
                  <Download className="h-4 w-4" /> Descargar
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center bg-white rounded-[24px] border border-dashed border-slate-200">
            <Search className="h-10 w-10 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No se encontraron documentos que coincidan con tu búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
}