"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email o contraseña incorrectos");
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-negro flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="text-3xl md:text-4xl font-display font-bold">
            <span className="text-dorado-inca">INTI</span>
            <span className="text-blanco-roto"> WEAR</span>
          </Link>
          <p className="text-blanco-roto/50 mt-3 text-sm">Inicia sesión en tu cuenta</p>
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
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-dorado-inca text-negro py-4 font-body font-semibold uppercase text-sm tracking-widest hover:bg-dorado-oscuro transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
            >
              <Lock size={18} />
              {loading ? "Ingresando..." : "INICIAR SESIÓN"}
            </button>
          </form>
        </div>

        <p className="text-center text-blanco-roto/50 mt-6 text-sm">
          ¿No tienes cuenta?{" "}
          <Link href="/auth/register" className="text-dorado-inca hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}