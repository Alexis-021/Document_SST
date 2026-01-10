"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  FileText, Download, Eye, Search, ChevronRight, Home, 
  HardDrive, FileSpreadsheet, FileType, File
} from "lucide-react";

export default function AreaClientPage({ sedeId, areaId, areaNombre, archivos }: any) {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState<Record<string, { views: number, downloads: number }>>({});

  // 1. CARGA DE ESTADÍSTICAS
  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch('/api/stats/get-all');
      if (!response.ok) throw new Error('Error en red');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error cargando estadísticas:", error);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    window.addEventListener('focus', fetchStats);
    return () => window.removeEventListener('focus', fetchStats);
  }, [fetchStats]);

  const registrarAccion = async (docId: string, action: 'view' | 'download') => {
    try {
      setStats(prev => ({
        ...prev,
        [docId]: {
          views: (prev[docId]?.views || 0) + (action === 'view' ? 1 : 0),
          downloads: (prev[docId]?.downloads || 0) + (action === 'download' ? 1 : 0),
        }
      }));
      await fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId: docId, action }),
      });
    } catch (error) { console.error(error); }
  };

  // 2. LÓGICA DE FILTROS Y PROCESAMIENTO
  const filtros = ["Todos", "Procedimientos", "Matriz IPERC", "Políticas", "Instructivos", "Formatos", "Registros", "Reglamentos"];
  const sedeNombreFormateado = sedeId.replace(/-/g, ' ');

  const counts = useMemo(() => {
    const s: Record<string, number> = { Todos: archivos.length };
    archivos.forEach((doc: any) => {
      if (doc.categoria) s[doc.categoria] = (s[doc.categoria] || 0) + 1;
    });
    return s;
  }, [archivos]);

  const archivosFiltrados = useMemo(() => {
    return archivos.filter((doc: any) => {
      const coincideFiltro = activeFilter === "Todos" || doc.categoria === activeFilter;
      const coincideBusqueda = doc.nombre.toLowerCase().includes(searchQuery.toLowerCase());
      return coincideFiltro && coincideBusqueda;
    });
  }, [activeFilter, searchQuery, archivos]);

  // A) Limpia el nombre para el título principal
  const limpiarNombre = (nombreCompleto: string) => {
    return nombreCompleto.replace(/\.[^/.]+$/, ""); 
  };

  // B) Obtiene la extensión para la etiqueta (BADGE)
  const obtenerExtension = (nombre: string) => {
    return nombre.split('.').pop()?.toUpperCase() || 'FILE';
  };

  // C) Asigna color a la etiqueta según el tipo
  const getClassPorExtension = (ext: string) => {
    if (['XLS', 'XLSX', 'CSV'].includes(ext)) return "bg-green-100 text-green-700 border-green-200"; // Excel
    if (['DOC', 'DOCX'].includes(ext)) return "bg-blue-100 text-blue-700 border-blue-200"; // Word
    if (['PDF'].includes(ext)) return "bg-red-100 text-red-700 border-red-200"; // PDF
    return "bg-slate-100 text-slate-500 border-slate-200"; // Otros
  };

  // D) Asigna icono grande
  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (['xlsx', 'xls', 'csv'].includes(ext || '')) return <FileSpreadsheet className="h-6 w-6 text-green-600" />;
    if (['doc', 'docx'].includes(ext || '')) return <FileType className="h-6 w-6 text-blue-600" />;
    if (ext === 'pdf') return <FileText className="h-6 w-6 text-red-500" />;
    return <File className="h-6 w-6 text-slate-400" />;
  };

  return (
    <div className="w-full min-h-full bg-[#f8fafc] p-4 md:p-10 font-sans">
      {/* NAVEGACIÓN */}
      <nav className="flex items-center gap-x-2 text-[11px] md:text-xs font-medium mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="flex items-center gap-1 text-slate-400 hover:text-[#8dc63f] transition-all">
          <Home className="h-3.5 w-3.5" /><span>Sedes</span>
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

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-2">{areaNombre}</h1>
        <p className="text-slate-500">Documentación oficial de Grupo Palmas</p>
      </div>

      {/* BUSCADOR */}
      <div className="relative mb-8">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input 
          type="text" placeholder="Buscar documentos..."
          className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8dc63f]/20 transition-all font-medium text-slate-700"
          value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* FILTROS TABS */}
      <div className="flex flex-wrap gap-2 mb-10">
        {filtros.map((f) => {
          const c = counts[f] || 0;
          if (f !== "Todos" && c === 0) return null;
          return (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 border ${
                activeFilter === f ? "bg-[#8dc63f] text-white shadow-lg shadow-[#8dc63f]/20" : "bg-white text-slate-500 border-slate-100"
              }`}>
              {f} <span className="text-[10px] opacity-70">{c}</span>
            </button>
          );
        })}
      </div>

      {/* LISTA DE ARCHIVOS */}
      <div className="grid gap-4 w-full pb-20">
        {archivosFiltrados.map((doc: any) => {
          const docStats = stats[doc.id] || { views: 0, downloads: 0 };
          const extension = obtenerExtension(doc.nombre);
          
          return (
            <div key={doc.id} className="bg-white border border-slate-100 rounded-[24px] p-5 flex flex-col lg:flex-row lg:items-center justify-between group hover:border-[#8dc63f] hover:shadow-md transition-all">
              <div className="flex items-center gap-x-5">
                {/* ICONO GRANDE */}
                <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-slate-100 transition-all shadow-inner">
                  {getFileIcon(doc.nombre)}
                </div>
                
                <div>
                  {/* TÍTULO LIMPIO (Sin extensión) */}
                  <h3 className="text-lg font-bold text-[#1e293b] group-hover:text-[#8dc63f] transition-colors leading-tight">
                    {limpiarNombre(doc.nombre)}
                  </h3>
                  
                  {/* ZONA DE METADATA CON ETIQUETAS */}
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    
                    {/* 1. Categoría */}
                    <span className="text-[10px] font-bold text-[#8dc63f] uppercase bg-[#8dc63f]/10 px-2 py-0.5 rounded border border-[#8dc63f]/10">
                      {doc.categoria}
                    </span>

                    {/* 2. ETIQUETA DE EXTENSIÓN (PDF/XLSX) - RESTAURADA */}
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${getClassPorExtension(extension)}`}>
                      {extension}
                    </span>

                    {/* 3. Separador */}
                    <div className="w-px h-3 bg-slate-300 mx-1"></div>

                    {/* 4. Peso del archivo */}
                    <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                      <HardDrive className="h-3 w-3" /> <span>{doc.peso}</span>
                    </div>
                    
                    {/* 5. Estadísticas de Neon */}
                    <div className="flex items-center gap-3 pl-2">
                      <div className="flex items-center gap-1 text-slate-500 text-[11px] font-bold" title="Vistas">
                        <Eye className="h-3 w-3 text-blue-500" />
                        <span>{docStats.views}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 text-[11px] font-bold" title="Descargas">
                        <Download className="h-3 w-3 text-green-600" />
                        <span>{docStats.downloads}</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* BOTONES */}
              <div className="flex items-center gap-x-3 mt-6 lg:mt-0">
                <Link 
                  href={`/documents/${sedeId}/${areaId}/${doc.id}`} 
                  className="flex-1 lg:flex-none"
                  onClick={() => registrarAccion(doc.id, 'view')}
                >
                  <button className="w-full px-6 py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-100 flex items-center justify-center gap-x-2 transition-colors">
                    <Eye className="h-4 w-4" /> Ver
                  </button>
                </Link>
                <a href={`/docs/${doc.nombre}`} download onClick={() => registrarAccion(doc.id, 'download')}
                  className="flex-1 lg:flex-none px-6 py-3 bg-[#8dc63f]/10 text-[#8dc63f] rounded-xl font-bold text-sm hover:bg-[#8dc63f] hover:text-white transition-all flex items-center justify-center gap-x-2">
                  <Download className="h-4 w-4" /> Descargar
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}