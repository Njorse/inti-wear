import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get("categoria");

    const where = categoria && categoria !== "todos"
      ? { activo: true, categoria }
      : { activo: true };

    const productos = await prisma.producto.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(productos);
  } catch (error) {
    console.error("Error fetching productos:", error);
    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 }
    );
  }
}