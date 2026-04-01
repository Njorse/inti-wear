"use client";

import Link from "next/link";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/carrito";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { items } = useCartStore();
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenCart = () => {
    window.dispatchEvent(new Event("open-cart"));
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-negro/95 backdrop-blur-md border-b border-white/5 py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-2xl md:text-3xl font-display font-bold tracking-tight group"
        >
          <span className="text-dorado-inca group-hover:text-dorado-oscuro transition-colors">
            INTI
          </span>
          <span className="text-blanco-roto group-hover:text-white transition-colors">
            {" "}WEAR
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <Link
            href="/"
            className="text-sm font-medium text-blanco-roto/70 hover:text-dorado-inca transition-colors relative group"
          >
            TIENDA
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dorado-inca transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="/#nosotros"
            className="text-sm font-medium text-blanco-roto/70 hover:text-dorado-inca transition-colors relative group"
          >
            NOSOTROS
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dorado-inca transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {mounted && status === "loading" ? null : mounted && session ? (
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/cuenta"
                className="flex items-center gap-2 text-sm font-medium text-blanco-roto/70 hover:text-dorado-inca transition-colors"
              >
                <User size={18} />
                <span>CUENTA</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm font-medium text-blanco-roto/50 hover:text-rojo-andino transition-colors"
              >
                SALIR
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="hidden md:inline-flex text-sm font-medium text-blanco-roto/70 hover:text-dorado-inca transition-colors"
            >
              LOGIN
            </Link>
          )}

          {/* Cart Button */}
          <button 
            className="relative p-2 text-blanco-roto hover:text-dorado-inca transition-colors group"
            onClick={handleOpenCart}
          >
            <ShoppingBag size={22} className="group-hover:scale-110 transition-transform" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-dorado-inca text-negro text-xs font-bold flex items-center justify-center">
                {items.length}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-blanco-roto"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-negro border-b border-white/10 transition-all duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          <Link
            href="/"
            className="block text-base font-medium text-blanco-roto"
            onClick={() => setMenuOpen(false)}
          >
            TIENDA
          </Link>
          <Link
            href="/#nosotros"
            className="block text-base font-medium text-blanco-roto/70"
            onClick={() => setMenuOpen(false)}
          >
            NOSOTROS
          </Link>
          {mounted && session ? (
            <>
              <Link
                href="/cuenta"
                className="block text-base font-medium text-blanco-roto/70"
                onClick={() => setMenuOpen(false)}
              >
                MI CUENTA
              </Link>
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  setMenuOpen(false);
                }}
                className="block text-base font-medium text-rojo-andino"
              >
                SALIR
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="block text-base font-medium text-dorado-inca"
              onClick={() => setMenuOpen(false)}
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}