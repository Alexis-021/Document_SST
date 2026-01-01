"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FileText, Download, Eye, Search, Calendar, HardDrive, ChevronRight } from "lucide-react";

export default function AreaClientPage({ sedeId, areaId, areaNombre, archivos }: any) {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filtros = ["Todos", "Procedimientos", "Matriz IPERC", "Políticas", "Instructivos", "Formatos", "Registros"];

  // 1. Cálculo de contadores
  const counts = useMemo(() => {
    const stats: Record<string, number> = { Todos: archivos.length };
    archivos.forEach((doc: any) => {
      stats[doc.categoria] = (stats[doc.categoria] || 0) + 1;
    });
    return stats;
  }, [archivos]);

  // 2. Filtrado dinámico
  const archivosFiltrados = useMemo(() => {
    return archivos.filter((doc: any) => {
      const coincideFiltro = activeFilter === "Todos" || doc.categoria === activeFilter;
      const coincideBusqueda = doc.nombre.toLowerCase().includes(searchQuery.toLowerCase());
      return coincideFiltro && coincideBusqueda;
    });
  }, [activeFilter, searchQuery, archivos]);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-12">
      {/* Título */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">{areaNombre}</h1>
        <p className="text-slate-500 font-medium">Gestión Documental SST</p>
      </div>

      {/* CUADRO DE BÚSQUEDA */}
      <div className="relative mb-8">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input 
          type="text"
          placeholder="Buscar documentos en esta área..."
          className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* FILTROS CON CONTADORES */}
      <div className="flex flex-wrap gap-3 mb-10">
        {filtros.map((filtro) => (
          <button
            key={filtro}
            onClick={() => setActiveFilter(filtro)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-x-3 ${
              activeFilter === filtro 
              ? "bg-[#0066ff] text-white shadow-lg shadow-blue-200" 
              : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
            }`}
          >
            {filtro}
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
              activeFilter === filtro ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
            }`}>
              {counts[filtro] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* LISTA DE DOCUMENTOS */}
      <div className="grid gap-4">
        {archivosFiltrados.length > 0 ? (
          archivosFiltrados.map((doc: any) => (
            <div key={doc.id} className="bg-white border border-slate-100 rounded-[24px] p-5 flex flex-col md:flex-row md:items-center justify-between hover:shadow-md transition-all group">
              <div className="flex items-center gap-x-5">
                <div className="p-4 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{doc.nombre}</h3>
                  <div className="flex items-center gap-x-4 mt-1 text-xs text-slate-400 font-semibold">
                    <span className="flex items-center gap-x-1"><Calendar className="h-3 w-3" /> {doc.fecha}</span>
                    <span className="flex items-center gap-x-1"><HardDrive className="h-3 w-3" /> {doc.tamano}</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded uppercase text-[9px] font-black">{doc.categoria}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-x-3 mt-4 md:mt-0">
                <Link href={`/documents/${sedeId}/${areaId}/${doc.id}`}>
                  <button className="px-5 py-2.5 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-100 flex items-center gap-x-2">
                    <Eye className="h-4 w-4" /> Ver
                  </button>
                </Link>
                <a href={`/docs/${doc.nombre}`} download className="px-5 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-100 flex items-center gap-x-2">
                  <Download className="h-4 w-4" /> Descargar
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No se encontraron documentos con esos criterios.</p>
          </div>
        )}
      </div>
    </div>
  );
}