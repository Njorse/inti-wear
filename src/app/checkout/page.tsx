"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/carrito";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, CreditCard } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, shipping: 15 }),
      });

      const data = await res.json();

      if (data.url) {
        await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            items,
            subtotal: total(),
            shipping: 15,
            total: total() + 15,
          }),
        });

        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-negro flex items-center justify-center">
        <div className="animate-pulse text-dorado-inca">Cargando...</div>
      </div>
    );
  }

  if (items.length === 0) {
    router.push("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-negro py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-blanco-roto/50 hover:text-dorado-inca transition-colors text-sm mb-8"
        >
          <ArrowLeft size={16} />
          Continuar comprando
        </Link>

        <h1 className="text-4xl lg:text-5xl font-display font-bold text-blanco-roto mb-12">
          CHECKOUT
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <div className="bg-negro-claro p-8 border border-white/5">
              <h2 className="text-xl font-display font-semibold text-dorado-inca mb-6 flex items-center gap-3">
                <Lock size={20} />
                DATOS DE ENVÍO
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-blanco-roto/60 text-xs uppercase tracking-widest mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full bg-negro border border-white/10 px-4 py-4 text-blanco-roto focus:border-dorado-inca focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-blanco-roto/60 text-xs uppercase tracking-widest mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-negro border border-white/10 px-4 py-4 text-blanco-roto focus:border-dorado-inca focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-blanco-roto/60 text-xs uppercase tracking-widest mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full bg-negro border border-white/10 px-4 py-4 text-blanco-roto focus:border-dorado-inca focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-blanco-roto/60 text-xs uppercase tracking-widest mb-2">
                    Dirección
                  </label>
                  <input
                    type="text"
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                    className="w-full bg-negro border border-white/10 px-4 py-4 text-blanco-roto focus:border-dorado-inca focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-blanco-roto/60 text-xs uppercase tracking-widest mb-2">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    value={formData.ciudad}
                    onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                    className="w-full bg-negro border border-white/10 px-4 py-4 text-blanco-roto focus:border-dorado-inca focus:outline-none transition-colors"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-dorado-inca text-negro py-5 font-body font-semibold uppercase text-sm tracking-widest hover:bg-dorado-oscuro transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  <CreditCard size={18} />
                  {loading ? "Procesando..." : "PAGAR CON TARJETA"}
                </button>
              </form>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-negro-claro p-8 border border-white/5 sticky top-32">
              <h2 className="text-xl font-display font-semibold text-dorado-inca mb-6">
                RESUMEN DEL PEDIDO
              </h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-white/5">
                    <div className="w-20 h-24 relative bg-gris-oscuro shrink-0">
                      <Image src={item.imagenUrl} alt={item.nombre} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-blanco-roto text-sm font-medium">{item.nombre}</p>
                      <p className="text-blanco-roto/40 text-xs mt-1">{item.talla} / {item.color}</p>
                      <p className="text-dorado-inca text-sm mt-2">
                        ${item.precio} x {item.cantidad}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="flex justify-between text-blanco-roto/60">
                  <span>Subtotal</span>
                  <span>${total()}</span>
                </div>
                <div className="flex justify-between text-blanco-roto/60">
                  <span>Envío</span>
                  <span>$15</span>
                </div>
                <div className="flex justify-between pt-3 text-2xl font-display font-bold">
                  <span className="text-blanco-roto">TOTAL</span>
                  <span className="text-dorado-inca">${total() + 15}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}