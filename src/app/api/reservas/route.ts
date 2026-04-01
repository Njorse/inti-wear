import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface ReservaBody {
  productos: Array<{
    nombre: string;
    talla: string;
    color: string;
    cantidad: number;
    precio: number;
  }>;
  total: number;
  nombre: string;
  whatsapp: string;
}

export async function POST(request: Request) {
  try {
    const body: ReservaBody = await request.json();

    if (!body.productos || !body.total || !body.nombre || !body.whatsapp) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    const reserva = await prisma.reserva.create({
      data: {
        productos: JSON.stringify(body.productos),
        total: body.total,
        nombre: body.nombre,
        whatsapp: body.whatsapp,
        estado: "pendiente",
      },
    });

    return NextResponse.json(reserva, { status: 201 });
  } catch (error) {
    console.error("Error creating reserva:", error);
    return NextResponse.json(
      { error: "Error al crear reserva" },
      { status: 500 }
    );
  }
}