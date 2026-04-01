import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { authOptions } from "@/lib/auth";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/auth/login");
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-display font-bold text-blanco-roto">
            MI CUENTA
          </h1>
          <Link
            href="/api/auth/signout"
            className="text-blanco-roto/60 hover:text-dorado-inca text-sm"
          >
            Cerrar sesión
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white/5 p-6">
              <div className="w-16 h-16 bg-dorado-inca rounded-full flex items-center justify-center mb-4">
                <span className="text-negro text-2xl font-bold">
                  {session.user.name?.charAt(0) || "U"}
                </span>
              </div>
              <h2 className="text-xl font-display font-semibold text-blanco-roto">
                {session.user.name}
              </h2>
              <p className="text-blanco-roto/60 text-sm">{session.user.email}</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xl font-display font-semibold text-dorado-inca mb-6">
              MIS PEDIDOS
            </h2>
            
            {orders.length === 0 ? (
              <p className="text-blanco-roto/60">No tienes pedidos aún.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const items = JSON.parse(order.items);
                  return (
                    <div key={order.id} className="bg-white/5 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-dorado-inca font-display font-semibold">
                          #{order.id.slice(-8).toUpperCase()}
                        </span>
                        <span className={`text-sm px-3 py-1 ${
                          order.estado === "pendiente" ? "bg-rojo-andino/20 text-rojo-andino" :
                          order.estado === "enviado" ? "bg-dorado-inca/20 text-dorado-inca" :
                          "bg-green-500/20 text-green-500"
                        }`}>
                          {order.estado.toUpperCase()}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm text-blanco-roto/60">
                        <p>{items.length} producto(s) - ${order.total}</p>
                        <p>{new Date(order.createdAt).toLocaleDateString("es-PE")}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}