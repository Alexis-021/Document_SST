export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-16 border-b bg-white flex items-center justify-between px-10 z-50">
      {/* Solo un pequeño logo o círculo de perfil para mantener la estructura */}
      <div className="flex items-center">
        <div className="h-8 w-8 rounded-lg bg-slate-100 border border-slate-200" />
      </div>
      
      <div className="flex items-center">
        <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200" />
      </div>
    </nav>
  );
};