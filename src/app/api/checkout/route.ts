import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

interface CartItem {
  nombre: string;
  precio: number;
  cantidad: number;
  talla: string;
  color: string;
  imagenUrl: string;
}

export async function POST(request: Request) {
  try {
    const { items, shipping = 10 }: { items: CartItem[]; shipping?: number } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No hay items en el carrito" },
        { status: 400 }
      );
    }

    const lineItems = items.map((item: CartItem) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.nombre,
          description: `${item.talla} / ${item.color}`,
          images: [item.imagenUrl],
        },
        unit_amount: Math.round(item.precio * 100),
      },
      quantity: item.cantidad,
    }));

    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Envío",
          description: "Costo de envío",
          images: [],
        },
        unit_amount: Math.round(shipping * 100),
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Error al crear sesión de pago" },
      { status: 500 }
    );
  }
}