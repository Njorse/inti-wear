"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore, CartItem } from "@/store/carrito";
import { Minus, Plus, Truck, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Producto {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagenUrl: string;
  tallas: string;
  colores: string;
  stock: number;
}

export default function ProductoDetail({ producto }: { producto: Producto }) {
  const addItem = useCartStore((state) => state.addItem);
  
  const tallas = producto.tallas.split(",").map((t) => t.trim()).filter(t => t !== "唯一");
  const colores = producto.colores.split(",").map((c) => c.trim());
  
  const [tallaSeleccionada, setTallaSeleccionada] = useState(tallas[0] || "");
  const [colorSeleccionado, setColorSeleccionado] = useState(colores[0] || "");
  const [cantidad, setCantidad] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    const item: CartItem = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagenUrl: producto.imagenUrl,
      cantidad,
      talla: tallaSeleccionada,
      color: colorSeleccionado,
    };
    addItem(item);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const colorMap: Record<string, string> = {
    negro: "#000000",
    blanco: "#F5F0E8",
    rojo: "#8B1A1A",
    verde: "#2D5A3D",
    azul: "#1E3A5F",
  };

  return (
    <div className="min-h-screen bg-negro">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-blanco-roto/50 hover:text-dorado-inca transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Volver a la tienda
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="relative aspect-[3/4] lg:aspect-auto lg:h-[80vh] bg-gris-oscuro overflow-hidden">
            <Image
              src={producto.imagenUrl}
              alt={producto.nombre}
              fill
              className="object-cover"
              priority
            />
            
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-negro/20 via-transparent to-transparent" />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center py-8 lg:py-0">
            {/* Category */}
            <span className="text-dorado-inca text-xs uppercase tracking-[0.2em] mb-4">
              {producto.categoria}
            </span>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-blanco-roto mb-4">
              {producto.nombre}
            </h1>

            {/* Price */}
            <p className="text-3xl lg:text-4xl font-display font-semibold text-dorado-inca mb-8">
              ${producto.precio}
            </p>

            {/* Description */}
            <p className="text-blanco-roto/60 leading-relaxed mb-8">
              {producto.descripcion}
            </p>

            {/* Tallas */}
            {tallas.length > 0 && (
              <div className="mb-6">
                <h3 className="text-blanco-roto/60 text-xs uppercase tracking-widest mb-3">
                  Selecciona tu talla
                </h3>
                <div className="flex gap-3">
                  {tallas.map((talla) => (
                    <button
                      key={talla}
                      onClick={() => setTallaSeleccionada(talla)}
                      className={`w-14 h-14 font-body text-sm border transition-all duration-300 ${
                        tallaSeleccionada === talla
                          ? "bg-dorado-inca text-negro border-dorado-inca"
                          : "border-white/20 text-blanco-roto hover:border-dorado-inca"
                      }`}
                    >
                      {talla}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colores */}
            {colores.length > 0 && (
              <div className="mb-8">
                <h3 className="text-blanco-roto/60 text-xs uppercase tracking-widest mb-3">
                  Color: <span className="text-blanco-roto">{colorSeleccionado}</span>
                </h3>
                <div className="flex gap-3">
                  {colores.map((color) => (
                    <button
                      key={color}
                      onClick={() => setColorSeleccionado(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                        colorSeleccionado === color
                          ? "border-dorado-inca scale-110"
                          : "border-transparent"
                      }`}
                      style={{ 
                        backgroundColor: colorMap[color.toLowerCase()] || "#666" 
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Cantidad */}
            <div className="mb-8">
              <h3 className="text-blanco-roto/60 text-xs uppercase tracking-widest mb-3">
                Cantidad
              </h3>
              <div className="inline-flex items-center gap-4 border border-white/20">
                <button
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  className="w-12 h-12 flex items-center justify-center text-blanco-roto hover:text-dorado-inca transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="text-blanco-roto font-medium w-8 text-center">
                  {cantidad}
                </span>
                <button
                  onClick={() => setCantidad(cantidad + 1)}
                  className="w-12 h-12 flex items-center justify-center text-blanco-roto hover:text-dorado-inca transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-dorado-inca text-negro py-5 font-body font-semibold uppercase text-sm tracking-widest hover:bg-dorado-oscuro transition-colors"
            >
              AGREGAR AL CARRITO — ${producto.precio * cantidad}
            </button>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3">
                <Truck size={20} className="text-dorado-inca" />
                <span className="text-blanco-roto/50 text-sm">Envío gratis +$100</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-dorado-inca" />
                <span className="text-blanco-roto/50 text-sm">Garantía de calidad</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-dorado-inca text-negro px-6 py-4 font-body font-medium flex items-center gap-3 animate-slide-up shadow-2xl shadow-dorado-inca/20">
          <span className="w-6 h-6 rounded-full bg-negro/20 flex items-center justify-center">✓</span>
          Producto agregado al carrito
        </div>
      )}
    </div>
  );
}