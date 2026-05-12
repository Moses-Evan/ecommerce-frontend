import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="relative h-[600px] md:h-[1100px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1739429946375-0a703857a86a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzYXJlZSUyMHdvbWFuJTIwZWxlZ2FudHxlbnwxfHx8fDE3NTk1ODk1NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Elegant Saree Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <p className="text-secondary mb-4 tracking-widest uppercase">New Collection 2025</p>
          <h1 className="text-5xl md:text-7xl mb-6 leading-tight">
            Elegance in Every Drape
          </h1>
          <p className="text-xl mb-8 text-white/90">
            Discover our exquisite collection of handcrafted sarees that celebrate tradition and contemporary elegance
          </p>
          <div className="flex gap-4 flex-wrap">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur">
              Explore Collections
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
