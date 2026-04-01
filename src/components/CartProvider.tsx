"use client";

import { ReactNode, useEffect, useState } from "react";
import CartDrawer from "./CartDrawer";

export default function CartProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <>
      {children}
      <CartDrawer />
    </>
  );
}