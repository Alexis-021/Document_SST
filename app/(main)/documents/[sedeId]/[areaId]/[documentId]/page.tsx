"use client";

import { use, useEffect, useState } from "react";
import { X, Download, FileText, Smartphone, Monitor, FileCode } from "lucide-react";
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
  const [baseUrl, setBaseUrl] = useState("");

  // 1. Detectar dispositivo y obtener la URL base para Office Online
  useEffect(() => {
    setBaseUrl(window.location.origin);
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

  const docData = DATA_SEDES[sedeId]?.areas
    .find((a: any) => a.nombre.toLowerCase().replace(/ /g, "-") === areaId)
    ?.archivos.find((d: any) => d.id.toString() === documentId);

  if (!docData) return null;

  // 2. Lógica de rutas y extensiones
  const nombreArchivo = docData.nombre;
  const rutaArchivoLocal = `/docs/${nombreArchivo}`;
  const esPDF = nombreArchivo.toLowerCase().endsWith('.pdf');
  
  // URL absoluta necesaria para el visor de Microsoft Office Online
  const urlPublicaCompleta = `${baseUrl}${rutaArchivoLocal}`;
  const urlOfficeViewer = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(urlPublicaCompleta)}`;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-0 md:p-6">
      <div className="bg-[#f3f3f3] w-full h-full md:max-h-[98vh] md:rounded-xl overflow-hidden flex flex-col shadow-2xl animate-in fade-in duration-200">
        
        {/* Cabecera Adaptativa */}
        <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <div className="bg-blue-50 p-2 rounded-lg hidden md:block">
              {esPDF ? <FileText className="h-4 w-4 text-red-600" /> : <FileCode className="h-4 w-4 text-blue-600" />}
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-700 truncate max-w-[180px] md:max-w-md">
                {docData.nombre}
              </h2>
              <div className="flex items-center gap-x-2">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
                  {esPDF ? (isMobile ? 'Modo Lectura Táctil' : 'Modo Escritorio Adobe') : 'Visor Office Online'}
                </span>
                {isMobile ? <Smartphone className="h-2.5 w-2.5 text-blue-500" /> : <Monitor className="h-2.5 w-2.5 text-green-500" />}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-x-2">
            <a href={rutaArchivoLocal} download className="p-2.5 bg-slate-100 rounded-xl md:px-4 md:py-2 md:text-xs font-bold flex items-center gap-x-2 text-slate-700 hover:bg-slate-200 transition-colors">
              <Download className="h-4 w-4" /> <span className="hidden md:inline">Descargar</span>
            </a>
            <button onClick={() => router.back()} className="p-2.5 hover:bg-red-50 rounded-xl text-slate-400 transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>
        </header>

        {/* CONTENEDOR DINÁMICO MULTI-FORMATO */}
        <div className="flex-1 bg-[#525659] relative overflow-hidden">
          {isMobile === null ? (
            <div className="h-full flex items-center justify-center text-white">Cargando visor...</div>
          ) : esPDF ? (
            /* LÓGICA PARA PDF (ADAPTATIVA) */
            isMobile ? (
              <div className="h-full bg-white overflow-y-auto">
                <DocViewer 
                  documents={[{ uri: rutaArchivoLocal }]} 
                  pluginRenderers={DocViewerRenderers}
                  style={{ height: "100%" }}
                  config={{
                    header: { disableHeader: true },
                    pdfVerticalScrollByDefault: true,
                    pdfZoom: { defaultZoom: 0.8, zoomJump: 0.1 }
                  }}
                />
              </div>
            ) : (
              <object
                data={`${rutaArchivoLocal}#toolbar=1&navpanes=1&view=FitH`}
                type="application/pdf"
                width="100%"
                height="100%"
              >
                <iframe src={rutaArchivoLocal} className="w-full h-full border-none" />
              </object>
            )
          ) : (
            /* LÓGICA PARA WORD / EXCEL (OFFICE ONLINE) */
            <div className="w-full h-full bg-white">
              <iframe 
                src={urlOfficeViewer}
                width="100%"
                height="100%"
                frameBorder="0"
                className="w-full h-full"
                title="Office Document Viewer"
              >
                No se puede previsualizar el documento. <a href={rutaArchivoLocal}>Descargar archivo</a>.
              </iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}