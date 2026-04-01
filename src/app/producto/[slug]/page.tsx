import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductoDetail from "@/components/ProductoDetail";

export const dynamic = "force-dynamic";

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const producto = await prisma.producto.findUnique({
    where: { slug, activo: true },
  });

  if (!producto) {
    notFound();
  }

  return <ProductoDetail producto={producto} />;
}