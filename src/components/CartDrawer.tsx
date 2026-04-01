"use client";

import { X, Minus, Plus, Trash2, CreditCard, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/carrito";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, total, clear } = useCartStore();

  useEffect(() => {
    const handleOpenCart = () => setIsOpen(true);
    window.addEventListener("open-cart", handleOpenCart);
    return () => window.removeEventListener("open-cart", handleOpenCart);
  }, []);

  const handleWhatsApp = async () => {
    if (items.length === 0) return;

    const mensaje = `Hola! Quiero hacer un pedido INTI WEAR 🔥\n\n${items
      .map(
        (item) =>
          `- ${item.nombre} / Talla ${item.talla} / ${item.color} x${item.cantidad} — $${item.precio * item.cantidad}`
      )
      .join("\n")}\n\nTOTAL: $${total()}\n\nMi nombre: `;

    const encoded = encodeURIComponent(mensaje);
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51954157560";
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
    
    await fetch("/api/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productos: items.map((i) => ({
          nombre: i.nombre,
          talla: i.talla,
          color: i.color,
          cantidad: i.cantidad,
          precio: i.precio,
        })),
        total: total(),
        nombre: "Cliente WhatsApp",
        whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51954157560",
      }),
    });
    
    clear();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-negro/80 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-negro-claro border-l border-white/5 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <ShoppingBag size={24} className="text-dorado-inca" />
            <h2 className="text-xl font-display font-bold text-blanco-roto">
              TU BOLSA
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-blanco-roto/50 hover:text-blanco-roto transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={48} className="mx-auto text-blanco-roto/20 mb-4" />
              <p className="text-blanco-roto/40 mb-6">Tu bolsa está vacía</p>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 text-dorado-inca hover:text-dorado-oscuro transition-colors text-sm"
              >
                Ver productos
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item, idx) => (
                <div 
                  key={`${item.id}-${item.talla}-${item.color}-${idx}`}
                  className="flex gap-4 pb-6 border-b border-white/5"
                >
                  <div className="w-24 h-28 relative bg-gris-oscuro shrink-0">
                    <Image
                      src={item.imagenUrl}
                      alt={item.nombre}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-blanco-roto font-body font-medium text-sm truncate">
                      {item.nombre}
                    </h3>
                    <p className="text-blanco-roto/40 text-xs mt-1">
                      {item.talla} / {item.color}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.cantidad - 1)
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center border border-white/10 text-blanco-roto/60 hover:border-dorado-inca hover:text-dorado-inca transition-colors text-xs"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-blanco-roto text-sm w-6 text-center">
                          {item.cantidad}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                          className="w-7 h-7 flex items-center justify-center border border-white/10 text-blanco-roto/60 hover:border-dorado-inca hover:text-dorado-inca transition-colors text-xs"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-dorado-inca font-display font-semibold">
                        ${item.precio * item.cantidad}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="self-start p-1 text-blanco-roto/30 hover:text-rojo-andino transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-blanco-roto/60">Subtotal</span>
              <span className="text-blanco-roto font-medium">${total()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-blanco-roto/40">Envío</span>
              <span className="text-blanco-roto/40">Calculado en checkout</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span className="text-lg font-display font-semibold text-blanco-roto">TOTAL</span>
              <span className="text-2xl font-display font-bold text-dorado-inca">
                ${total()}
              </span>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2 border border-white/20 text-blanco-roto py-3 font-body text-xs uppercase tracking-wider hover:border-dorado-inca hover:text-dorado-inca transition-colors"
              >
                <CreditCard size={14} />
                WhatsApp
              </button>
              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 bg-dorado-inca text-negro py-3 font-body text-xs uppercase tracking-wider hover:bg-dorado-oscuro transition-colors"
              >
                <CreditCard size={14} />
                Pagar
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}