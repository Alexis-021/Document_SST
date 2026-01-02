import "./globals.css"; 
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className={`${inter.className} antialiased h-full bg-[#f8fafc]`}>
        
        {/* Estructura Flex para empujar el footer siempre al final */}
        <div className="flex flex-col h-full overflow-hidden">
          
          {/* Contenedor de contenido con scroll independiente */}
          <main className="flex-grow overflow-y-auto w-full relative scroll-smooth">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>

          {/* FOOTER CORPORATIVO CENTRADO EN DOS LÍNEAS */}
          <footer className="shrink-0 bg-white border-t border-slate-200 py-6 z-50">
            <div className="max-w-7xl mx-auto px-6 text-center">
              
              {/* Línea 1: Derechos Reservados con color institucional #8dc63f */}
              <p className="text-slate-500 text-sm font-medium mb-2">
                © {new Date().getFullYear()} <span className="text-[#8dc63f] font-bold">TI - Grupo Palmas</span>. Todos los derechos reservados.
              </p>
              
              {/* Línea 2: Sistema y Versión con indicador institucional */}
              <div className="flex items-center justify-center gap-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <div className="h-1.5 w-1.5 rounded-full bg-[#8dc63f] animate-pulse" />
                <span>Gestión Documental SST</span>
                <span className="text-slate-300">|</span>
                <span>Versión 1.0.1</span>
              </div>

            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}