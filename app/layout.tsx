import "./globals.css";
import type { Metadata } from "next"; // 1. Importamos el tipo Metadata
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

// 2. Aquí definimos el título y el ícono de la pestaña
export const metadata: Metadata = {
  title: "SST Palmas - Gestión Documental",
  description: "Plataforma de gestión de documentos de seguridad y salud en el trabajo",

};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-screen overflow-hidden">
      <body className={`${inter.className} antialiased h-screen bg-[#f8fafc] overflow-hidden`}>
        
        <div className="flex flex-col h-screen">
          
          <main className="flex-grow overflow-y-auto w-full relative">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>

          {/* FOOTER CORPORATIVO CON LOGO AL BORDE DE LA PANTALLA */}
          <footer className="shrink-0 bg-white border-t border-slate-200 py-6 z-50">
            <div className="w-full px-6 relative flex items-center justify-center min-h-[40px]">
              
              {/* LOGO FOOTER */}
              <div className="absolute left-6">
                <img 
                  src="/logo-grupo-palmas.png" 
                  alt="Grupo Palmas" 
                  className="h-8 md:h-10 w-auto object-contain opacity-90" 
                />
              </div>

              {/* BLOQUE CENTRAL */}
              <div className="max-w-7xl mx-auto text-center">
                <p className="text-slate-500 text-sm font-medium mb-1">
                  © {new Date().getFullYear()} <span className="text-[#8dc63f] font-bold">TI - Grupo Palmas</span>. Todos los derechos reservados.
                </p>
                
                <div className="flex items-center justify-center gap-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#8dc63f] animate-pulse" />
                  <span>Gestión de Documentos SST</span>
                  <span className="text-slate-300">|</span>
                  <span>Versión 1.0.3</span>
                </div>
              </div>

            </div>
          </footer>
        </div>
        
        {/* Componentes de monitoreo de Vercel */}
        <Analytics />
        <SpeedInsights /> 
      </body>
    </html>
  );
}