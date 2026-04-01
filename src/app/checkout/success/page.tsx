"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/carrito";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const { clear } = useCartStore();
  const [orderId, setOrderId] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    clear();
    const id = searchParams.get("session_id");
    if (id) {
      setOrderId(id.slice(-8).toUpperCase());
    }
  }, [searchParams, clear]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-negro flex items-center justify-center">
        <div className="animate-pulse text-dorado-inca">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-negro flex items-center justify-center px-6 py-12">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 border-4 border-dorado-inca rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={48} className="text-dorado-inca" />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-blanco-roto mb-4">
          ¡PEDIDO CONFIRMADO!
        </h1>
        <p className="text-blanco-roto/60 mb-2">
          Tu pago fue procesado exitosamente.
        </p>
        <p className="text-blanco-roto/60 mb-8">
          Te enviaremos un email con los detalles de tu pedido.
        </p>
        {orderId && (
          <p className="text-dorado-inca text-sm mb-8">
            Orden: #{orderId}
          </p>
        )}
        <Link
          href="/"
          className="inline-block bg-dorado-inca text-negro px-8 py-4 font-body font-semibold uppercase text-sm tracking-wider hover:bg-dorado-oscuro transition-colors"
        >
          VOLVER A LA TIENDA
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-negro flex items-center justify-center">
        <div className="animate-pulse text-dorado-inca">Cargando...</div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}