import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <img
        src={heroBanner}
        alt="Delicious pizza, bread and cold drinks on a rustic table"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-foreground/10" />
      <div className="relative z-10 text-center px-4 max-w-3xl animate-fade-in-up">
        <span className="inline-block text-sm font-semibold tracking-widest uppercase mb-4 text-primary bg-primary/10 px-4 py-1.5 rounded-full backdrop-blur-sm border border-primary/20">
          Fresh • Fast • Delicious
        </span>
        <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight font-display">
          Crust & Chill
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 font-body mb-8 max-w-xl mx-auto">
          Artisan pizzas, fresh-baked breads, and ice-cold drinks — delivered to your door.
        </p>
        <a
          href="#menu"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
        >
          Browse Menu
          <span aria-hidden>↓</span>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
