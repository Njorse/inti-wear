import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const productos = [
  {
    nombre: "Hoodie Chakana Negra",
    slug: "hoodie-chakana-negra",
    descripcion: "Hoodie de felpa premium con símbolo Chakana bordado. 80% algodón, 20% polyester.",
    precio: 89,
    categoria: "hoodie",
    imagenUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop",
    tallas: "S,M,L,XL,XXL",
    colores: "Negro",
    stock: 50,
  },
  {
    nombre: "Tee Cóndor",
    slug: "tee-condor",
    descripcion: "Camiseta de algodón orgánico con gráfico de cóndor andino.",
    precio: 45,
    categoria: "camiseta",
    imagenUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop",
    tallas: "S,M,L,XL,XXL",
    colores: "Negro,Blanco",
    stock: 100,
  },
  {
    nombre: "Hoodie Wiphala",
    slug: "hoodie-wiphala",
    descripcion: "Hoodie con patrón Wiphala en colores clásicos del Tawuantinsuyu.",
    precio: 95,
    categoria: "hoodie",
    imagenUrl: "https://images.unsplash.com/photo-1578768079052-aa76e52ff63e?w=800&h=1000&fit=crop",
    tallas: "S,M,L,XL,XXL",
    colores: "Negro",
    stock: 40,
  },
  {
    nombre: "Gorra Inti Gold",
    slug: "gorra-inti-gold",
    descripcion: "Gorra snapback con brodado del sol Inti en dorado.",
    precio: 38,
    categoria: "gorra",
    imagenUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=1000&fit=crop",
    tallas: "唯一",
    colores: "Negro",
    stock: 60,
  },
  {
    nombre: "Tote Inca Maze",
    slug: "tote-inca-maze",
    descripcion: "Tote bag de lona premium con patrón geométrico inca.",
    precio: 28,
    categoria: "tote",
    imagenUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&h=1000&fit=crop",
    tallas: "唯一",
    colores: "Negro",
    stock: 80,
  },
  {
    nombre: "Tee Apus",
    slug: "teeapus",
    descripcion: "Camiseta con diseño de montañas sacred peaks.",
    precio: 45,
    categoria: "camiseta",
    imagenUrl: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=1000&fit=crop",
    tallas: "S,M,L,XL,XXL",
    colores: "Blanco",
    stock: 90,
  },
  {
    nombre: "Hoodie Pachamama",
    slug: "hoodie-pachamama",
    descripcion: "Hoodie con print de земля-мать en tonos tierra.",
    precio: 92,
    categoria: "hoodie",
    imagenUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop",
    tallas: "S,M,L,XL,XXL",
    colores: "Negro",
    stock: 35,
  },
  {
    nombre: "Gorra Qosqo",
    slug: "gorra-qosqo",
    descripcion: "Gorra trucker con tejido tradicional Cusco.",
    precio: 35,
    categoria: "gorra",
    imagenUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=1000&fit=crop",
    tallas: "唯一",
    colores: "Negro",
    stock: 55,
  },
];

async function main() {
  console.log("Iniciando seed...");

  for (const producto of productos) {
    await prisma.producto.upsert({
      where: { slug: producto.slug },
      update: {},
      create: producto,
    });
  }

  console.log("Seed completado! 8 productos creados.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });