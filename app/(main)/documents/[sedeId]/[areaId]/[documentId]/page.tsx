"use client";

import { use, useEffect, useState } from "react";
import { X, Download, FileText, Smartphone, Monitor, FileCode, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { DATA_SEDES } from "@/lib/data";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export default function DocumentModalPage({ 
  params 
}: { 
  params: Promise<{ sedeId: string, areaId: string, documentId: string }> 
}) {
  const router = useRouter();
  const { sedeId, areaId, documentId } = use(params);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [baseUrl, setBaseUrl] = useState<string | null>(null); // Iniciamos como null

  useEffect(() => {
    // 1. Detectar el dominio (Ej: https://mi-proyecto.vercel.app)
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }
    
    // 2. Detectar móvil
    const detectDevice = () => {
      const ua = navigator.userAgent.toLowerCase();
      const mobileKeywords = [/android/, /iphone/, /ipad/, /ipod/, /blackberry/, /windows phone/];
      const isMob = mobileKeywords.some((keyword) => ua.match(keyword)) || window.innerWidth < 1024;
      setIsMobile(isMob);
    };

    detectDevice();
    window.addEventListener('resize', detectDevice);
    return () => window.removeEventListener('resize', detectDevice);
  }, []);

  // Lógica de búsqueda de datos
  const sede = DATA_SEDES[sedeId];
  const area = sede?.areas.find((a: any) => {
    const nombreNormalizado = a.nombre.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");
    return nombreNormalizado === areaId;
  });

  const docData = area?.archivos.find((d: any) => d.id.toString() === documentId);

  if (!docData) return null;

  const nombreArchivo = docData.nombre;
  // encodeURIComponent en el nombre del archivo maneja espacios y caracteres especiales
  const rutaArchivoLocal = `/docs/${encodeURIComponent(nombreArchivo)}`;
  const esPDF = nombreArchivo.toLowerCase().endsWith('.pdf');
  
  // Construcción de URLs (Solo si baseUrl existe)
  const urlPublicaCompleta = baseUrl ? `${baseUrl}/docs/${nombreArchivo}` : "";
  const urlOfficeViewer = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(urlPublicaCompleta)}`;

  const handleClose = () => {
    router.replace(`/documents/${sedeId}/${areaId}`);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-0 md:p-6">
      <div className="bg-[#f3f3f3] w-full h-full md:max-h-[98vh] md:rounded-xl overflow-hidden flex flex-col shadow-2xl animate-in fade-in duration-200">
        
        {/* HEADER */}
        <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <div className="bg-blue-50 p-2 rounded-lg hidden md:block">
              {esPDF ? <FileText className="h-4 w-4 text-red-600" /> : <FileCode className="h-4 w-4 text-green-600" />}
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-700 truncate max-w-[180px] md:max-w-md">
                {docData.nombre}
              </h2>
              <div className="flex items-center gap-x-2">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
                  {esPDF ? (isMobile ? 'Modo Lectura Táctil' : 'Lector PDF Nativo') : 'Visor Office Online'}
                </span>
                {isMobile ? <Smartphone className="h-2.5 w-2.5 text-blue-500" /> : <Monitor className="h-2.5 w-2.5 text-green-500" />}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-x-2">
            <a href={`/docs/${docData.nombre}`} download className="p-2.5 bg-slate-100 rounded-xl md:px-4 md:py-2 md:text-xs font-bold flex items-center gap-x-2 text-slate-700 hover:bg-slate-200 transition-colors">
              <Download className="h-4 w-4" /> <span className="hidden md:inline">Descargar</span>
            </a>
            <button 
              onClick={handleClose} 
              className="p-2.5 hover:bg-red-50 rounded-xl text-slate-400 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </header>

        {/* VISOR PRINCIPAL */}
        <div className="flex-1 bg-[#525659] relative overflow-hidden flex items-center justify-center">
          
          {/* Si no tenemos baseUrl aún, mostramos carga */}
          {!baseUrl ? (
             <div className="flex flex-col items-center gap-3 text-white">
               <Loader2 className="h-8 w-8 animate-spin text-[#8dc63f]" />
               <span className="text-sm font-medium">Conectando visor...</span>
             </div>
          ) : esPDF ? (
            // LOGICA PDF
            isMobile ? (
              <div className="w-full h-full bg-white overflow-y-auto">
                <DocViewer 
                  documents={[{ uri: `/docs/${docData.nombre}` }]} 
                  pluginRenderers={DocViewerRenderers}
                  style={{ height: "100%" }}
                  config={{ header: { disableHeader: true }, pdfVerticalScrollByDefault: true }}
                />
              </div>
            ) : (
              <iframe src={`/docs/${encodeURIComponent(docData.nombre)}`} className="w-full h-full border-none bg-white" />
            )
          ) : (
            // LOGICA OFFICE (WORD/EXCEL)
            <div className="w-full h-full bg-white">
              {/* key={urlOfficeViewer} obliga a React a reiniciar el iframe si la URL cambia */}
              <iframe 
                key={urlOfficeViewer}
                src={urlOfficeViewer}
                width="100%"
                height="100%"
                className="w-full h-full border-none"
                title="Office Document Viewer"
                onError={(e) => console.error("Error cargando iframe de Office", e)}
              >
                <div className="p-10 text-center">
                  <p>Tu navegador no soporta la visualización directa.</p>
                  <a href={`/docs/${docData.nombre}`} className="text-blue-600 underline">Descargar archivo</a>
                </div>
              </iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}