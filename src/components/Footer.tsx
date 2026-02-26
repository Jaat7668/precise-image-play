const Footer = () => (
  <footer className="bg-foreground text-background py-12">
    <div className="container mx-auto px-4 text-center">
      <h3 className="font-display text-2xl font-bold mb-2">Crust<span className="text-primary">&</span>Chill</h3>
      <p className="text-background/60 text-sm mb-6">Fresh pizza, artisan breads & cold drinks</p>
      <div className="flex justify-center gap-8 text-sm text-background/50">
        <span>📍 123 Baker Street</span>
        <span>📞 (555) 123-4567</span>
        <span>🕐 11am – 11pm</span>
      </div>
      <p className="text-background/30 text-xs mt-8">© 2026 Crust & Chill. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
