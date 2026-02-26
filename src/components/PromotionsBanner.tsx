import { usePromotions } from "@/hooks/use-promotions";
import { Sparkles } from "lucide-react";

const PromotionsBanner = () => {
  const { data: promotions = [] } = usePromotions();

  if (promotions.length === 0) return null;

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border border-primary/20 rounded-xl p-5 overflow-hidden"
            >
              <Sparkles className="absolute top-3 right-3 w-5 h-5 text-primary/40" />
              <h3 className="font-display font-bold text-lg text-foreground mb-1">{promo.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{promo.description}</p>
              {promo.discount_percent > 0 && (
                <span className="inline-block bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">
                  {promo.discount_percent}% OFF
                </span>
              )}
              {promo.ends_at && (
                <p className="text-xs text-muted-foreground mt-2">
                  Ends {new Date(promo.ends_at).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionsBanner;
