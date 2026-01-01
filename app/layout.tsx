import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased bg-[#f8fafc]">
        {/* Borra la línea de <Navbar /> que estaba aquí */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}