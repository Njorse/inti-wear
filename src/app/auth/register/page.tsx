"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Error al crear cuenta");
      setLoading(false);
      return;
    }

    router.push("/auth/login?registered=true");
  };

  return (
    <div className="min-h-screen bg-negro flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="text-3xl md:text-4xl font-display font-bold">
            <span className="text-dorado-inca">INTI</span>
            <span className="text-blanco-roto"> WEAR</span>
          </Link>
          <p className="text-blanco-roto/50 mt-3 text-sm">Crea tu cuenta</p>
        </div>

        <div className="bg-negro-claro p-8 border border-white/5">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-rojo-andino/20 border border-rojo-andino/50 text-rojo-andino px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-blanco-roto/60 text-xs uppercase tracking-widest mb-2">
                Nombre
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-negro border border-white/10 px-4 py-4 text-blanco-roto focus:border-dorado-inca focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-blanco-roto/60 text-xs uppercase tracking-widest mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-negro border border-white/10 px-4 py-4 text-blanco-roto focus:border-dorado-inca focus:outline-none transition-colors"
                required
                minLength={6}
              />
              <p className="text-blanco-roto/30 text-xs mt-1">Mínimo 6 caracteres</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-dorado-inca text-negro py-4 font-body font-semibold uppercase text-sm tracking-widest hover:bg-dorado-oscuro transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
            >
              <UserPlus size={18} />
              {loading ? "Creando cuenta..." : "CREAR CUENTA"}
            </button>
          </form>
        </div>

        <p className="text-center text-blanco-roto/50 mt-6 text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link href="/auth/login" className="text-dorado-inca hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}