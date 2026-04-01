export default function Footer() {
  return (
    <footer className="bg-negro-claro border-t border-white/5 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-display font-bold mb-4">
              <span className="text-dorado-inca">INTI</span>
              <span className="text-blanco-roto"> WEAR</span>
            </h3>
            <p className="text-blanco-roto/50 text-sm leading-relaxed max-w-sm">
              Streetwear de Cusco con diseños inspirados en la cultura andina. 
              Calidad premium y estilo único.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-blanco-roto font-medium text-sm uppercase tracking-wider mb-4">
              SHOP
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="/?categoria=hoodie" className="text-blanco-roto/50 hover:text-dorado-inca text-sm transition-colors">
                  Hoodies
                </a>
              </li>
              <li>
                <a href="/?categoria=camiseta" className="text-blanco-roto/50 hover:text-dorado-inca text-sm transition-colors">
                  Camisetas
                </a>
              </li>
              <li>
                <a href="/?categoria=gorra" className="text-blanco-roto/50 hover:text-dorado-inca text-sm transition-colors">
                  Gorras
                </a>
              </li>
              <li>
                <a href="/?categoria=tote" className="text-blanco-roto/50 hover:text-dorado-inca text-sm transition-colors">
                  Totes
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-blanco-roto font-medium text-sm uppercase tracking-wider mb-4">
              CONTACTO
            </h4>
            <ul className="space-y-3">
              <li className="text-blanco-roto/50 text-sm">
                Cusco, Perú
              </li>
              <li className="text-blanco-roto/50 text-sm">
                @intiwearec
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-blanco-roto/30 text-xs">
            © 2026 INTI WEAR. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-blanco-roto/20 text-xs">DISEÑO ANDINO</span>
          </div>
        </div>
      </div>
    </footer>
  );
}