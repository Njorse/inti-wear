import Image from "next/image";
import Link from "next/link";

interface ProductoCardProps {
  producto: {
    id: string;
    nombre: string;
    slug: string;
    precio: number;
    imagenUrl: string;
    categoria: string;
  };
}

export default function ProductoCard({ producto }: ProductoCardProps) {
  return (
    <Link 
      href={`/producto/${producto.slug}`} 
      className="group block relative"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gris-oscuro">
        <Image
          src={producto.imagenUrl}
          alt={producto.nombre}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-negro/80 via-negro/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Quick View Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <span className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 inline-flex items-center gap-2 px-6 py-3 border border-dorado-inca text-dorado-inca text-xs uppercase tracking-widest hover:bg-dorado-inca hover:text-negro transition-colors">
            Ver Detalle
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-negro/60 backdrop-blur-sm text-blanco-roto/70 text-xs uppercase tracking-wider">
            {producto.categoria}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 space-y-1">
        <h3 className="text-blanco-roto font-body text-sm font-medium group-hover:text-dorado-inca transition-colors">
          {producto.nombre}
        </h3>
        <p className="text-dorado-inca font-display font-semibold text-lg">
          ${producto.precio}
        </p>
      </div>
    </Link>
  );
}