import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductoCard from "@/components/ProductoCard";

export const dynamic = "force-dynamic";

const categorias = [
  { id: "todos", label: "Todos" },
  { id: "hoodie", label: "Hoodies" },
  { id: "camiseta", label: "Camisetas" },
  { id: "gorra", label: "Gorras" },
  { id: "tote", label: "Totes" },
];

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-negro-claro via-negro to-negro" />
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-dorado-inca/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-rojo-andino/5 rounded-full blur-3xl" />
      
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-dorado-inca/30 rounded-full mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-dorado-inca rounded-full animate-pulse" />
          <span className="text-dorado-inca text-xs uppercase tracking-widest">
            Streetwear Andino
          </span>
        </div>

        <h1 className="text-7xl md:text-9xl font-display font-bold leading-[0.9] mb-6 animate-fade-in-up">
          <span className="text-blanco-roto">WEAR THE</span>
          <br />
          <span className="text-gradient">ANDES</span>
        </h1>

        <p className="text-blanco-roto/60 text-lg md:text-xl font-body max-w-xl mx-auto mb-10 animate-fade-in-up delay-200">
          Diseños únicos inspirados en la cultura Cusco. 
          Premium quality, authentic style.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
          <Link
            href="#tienda"
            className="group relative inline-flex items-center gap-3 bg-dorado-inca text-negro px-8 py-4 font-body font-semibold text-sm uppercase tracking-wider overflow-hidden"
          >
            <span className="relative z-10">Explorar Colección</span>
            <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/#nosotros"
            className="inline-flex items-center gap-3 border border-white/20 text-blanco-roto px-8 py-4 font-body font-medium text-sm uppercase tracking-wider hover:border-dorado-inca hover:text-dorado-inca transition-colors"
          >
            Conoce Nuestra Historia
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in-up delay-500">
        <span className="text-blanco-roto/30 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-dorado-inca to-transparent" />
      </div>
    </section>
  );
}

function CategoryFilter({ categoria }: { categoria?: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-8" id="tienda">
      {categorias.map((cat, index) => {
        const isActive = (categoria || "todos") === cat.id;
        return (
          <Link
            key={cat.id}
            href={cat.id === "todos" ? "/" : `/?categoria=${cat.id}`}
            className={`relative px-6 py-3 font-body text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
              isActive 
                ? "text-negro" 
                : "text-blanco-roto/50 hover:text-blanco-roto"
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {isActive && (
              <span className="absolute inset-0 bg-dorado-inca" />
            )}
            <span className="relative z-10">{cat.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  
  const where = categoria && categoria !== "todos"
    ? { activo: true, categoria }
    : { activo: true };

  const productos = await prisma.producto.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <CategoryFilter categoria={categoria} />

      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productos.map((producto, index) => (
              <div 
                key={producto.id} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductoCard producto={producto} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}