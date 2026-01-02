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

  const filtros = ["Todos", "Procedimientos", "Matriz IPERC", "Políticas", "Instructivos", "Formatos", "Registros"];
  const sedeNombreFormateado = sedeId.replace(/-/g, ' ');

  // 1. Cálculo de contadores
  const counts = useMemo(() => {
    const stats: Record<string, number> = { Todos: archivos.length };
    archivos.forEach((doc: any) => {
      if (doc.categoria) stats[doc.categoria] = (stats[doc.categoria] || 0) + 1;
    });
    return stats;
  }, [archivos]);

  // 2. Filtrado de archivos
  const archivosFiltrados = useMemo(() => {
    return archivos.filter((doc: any) => {
      const coincideFiltro = activeFilter === "Todos" || doc.categoria === activeFilter;
      const coincideBusqueda = doc.nombre.toLowerCase().includes(searchQuery.toLowerCase());
      return coincideFiltro && coincideBusqueda;
    });
  }, [activeFilter, searchQuery, archivos]);

  // FUNCIÓN PARA LIMPIAR EL NOMBRE (Quita la extensión)
  const limpiarNombre = (nombreCompleto: string) => {
    return nombreCompleto.substring(0, nombreCompleto.lastIndexOf('.')) || nombreCompleto;
  };

  return (
    <div className="w-full bg-[#f8fafc] p-6 md:p-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-x-2 text-[11px] md:text-xs font-medium mb-6">
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

      {/* Buscador y Filtros */}
      <div className="relative mb-6">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input 
          type="text"
          placeholder="Buscar documentos..."
          className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8dc63f]/20 transition-all font-medium"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {filtros.map((filtro) => {
          const count = counts[filtro] || 0;
          if (filtro !== "Todos" && count === 0) return null;
          return (
            <button
              key={filtro}
              onClick={() => setActiveFilter(filtro)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 border ${
                activeFilter === filtro 
                ? "bg-[#8dc63f] text-white border-[#8dc63f]" 
                : "bg-white text-slate-500 border-slate-100 hover:border-[#8dc63f]/30"
              }`}
            >
              {filtro} <span className="text-[10px] opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Listado de Archivos con Nombre Limpio */}
      <div className="grid gap-4">
        {archivosFiltrados.map((doc: any) => (
          <div key={doc.id} className="bg-white border border-slate-100 rounded-[24px] p-5 flex flex-col md:flex-row md:items-center justify-between group hover:border-[#8dc63f] transition-all">
            <div className="flex items-center gap-x-5">
              <div className="p-4 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-[#8dc63f] group-hover:text-white transition-all">
                <FileText className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-y-1">
                {/* MOSTRANDO NOMBRE SIN EXTENSIÓN */}
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#8dc63f] transition-colors">
                  {limpiarNombre(doc.nombre)}
                </h3>
                
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-[10px] font-bold text-[#8dc63f] uppercase bg-[#8dc63f]/10 px-2 py-0.5 rounded">
                    {doc.categoria}
                  </span>
                  
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                    <HardDrive className="h-3.5 w-3.5" />
                    <span>{doc.peso}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{doc.fecha}</span>
                  </div>

                  {/* Mostramos la extensión aquí como metadata */}
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs uppercase font-bold">
                    <FileCode className="h-3.5 w-3.5 text-[#8dc63f]" />
                    <span>{doc.nombre.split('.').pop()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-x-3 mt-4 md:mt-0">
              <Link href={`/documents/${sedeId}/${areaId}/${doc.id}`} replace>
                <button className="px-5 py-2.5 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-100 flex items-center gap-x-2">
                  <Eye className="h-4 w-4" /> Ver
                </button>
              </Link>
              <a href={`/docs/${doc.nombre}`} download className="px-5 py-2.5 bg-[#8dc63f]/10 text-[#8dc63f] rounded-xl font-bold text-sm hover:bg-[#8dc63f] hover:text-white transition-all flex items-center gap-x-2">
                <Download className="h-4 w-4" /> Descargar
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}