export default function SedeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-[#f8fafc] overflow-y-auto">
      <main className="max-w-6xl mx-auto w-full h-full">
        {children}
      </main>
    </div>
  );
}