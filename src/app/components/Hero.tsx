import * as React from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";

const heroSlides = [
  {
    src: "src/images/hero/hero-1.png",
    alt: "Saree collection in warm tones",
    label: "New Collection 2026",
    headline: "Elegance Woven with Tradition",
    description:
      "Experience premium sarees that blend heritage craftsmanship with bold modern flair.",
  },
  {
    src: "src/images/hero/hero-2.png",
    alt: "Elegant saree drapes with floral detailing",
    label: "Festival Ready",
    headline: "Drapes That Tell a Story",
    description:
      "From wedding mandaps to evening soirées, every piece embraces timeless charm.",
  },
  {
    src: "src/images/hero/hero-3.png",
    alt: "Luxury silk saree styled for modern fashion",
    label: "Luxury Silk",
    headline: "Soft, Rich, and Radiant",
    description:
      "Feel the luxury of silk sarees finished with delicate motifs and rich hues.",
  },
  {
    src: "src/images/hero/hero-4.png",
    alt: "Saree outfit with contemporary accessories",
    label: "Curated for You",
    headline: "Crafted to Celebrate You",
    description:
      "Discover curated looks made for every celebration, every memory, every you.",
  },
];

const AUTO_PLAY_INTERVAL = 3000;

export function Hero() {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    const updateSelected = () => {
      setActiveSlide(api.selectedScrollSnap());
    };

    updateSelected();
    api.on("select", updateSelected);
    api.on("reInit", updateSelected);

    return () => {
      api.off("select", updateSelected);
      api.off("reInit", updateSelected);
    };
  }, [api]);

  React.useEffect(() => {
    if (!api || isPaused) return;

    const interval = window.setInterval(() => {
      api.scrollNext();
    }, AUTO_PLAY_INTERVAL);

    return () => window.clearInterval(interval);
  }, [api, isPaused]);

  const goToSlide = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <section
      className="relative h-[400px] sm:h-[500px] md:h-[900px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Carousel
        opts={{ loop: true, skipSnaps: false, align: "center" }}
        setApi={setApi}
        className="h-full"
      >
        <CarouselContent className="h-full !ml-0 w-full">
          {heroSlides.map((slide) => (
            <CarouselItem
              key={slide.src}
              className="relative h-full basis-full !pl-0"
            >
              <ImageWithFallback
                src={slide.src}
                alt={slide.alt}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-end md:justify-center md:px-6">
                <div className="hidden md:block w-full max-w-3xl text-center text-white md:text-left pb-0">
                  <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/90 shadow-black/20 shadow-sm backdrop-blur-sm md:text-xs">
                    {slide.label}
                  </p>
                  <h1 className="text-3xl font-semibold leading-tight tracking-tight mb-3 md:text-6xl md:mb-6">
                    {slide.headline}
                  </h1>
                  <p className="text-sm text-white/85 mb-4 md:text-xl md:mb-6">
                    {slide.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="" />
        <CarouselNext className="" />

        <div className="absolute inset-x-0 bottom-4 z-20 flex flex-col items-center gap-3 px-4 md:bottom-8">
          <div className="hidden max-w-full items-center justify-center gap-2 rounded-full bg-[rgba(255,255,255,0.1)] px-4 py-2 text-[10px] uppercase tracking-[0.32em] text-white/85 shadow-xl shadow-black/20 backdrop-blur-sm md:px-5 md:py-2 md:text-xs md:flex">
            <span className="inline-flex h-2 w-2 rounded-full bg-secondary" />
            <span>Timeless saree stories, now in motion</span>
          </div>
          <div className="flex items-center gap-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={activeSlide === index ? "true" : "false"}
                className="group rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    activeSlide === index
                      ? "w-14 bg-gradient-to-r from-secondary to-secondary/70 shadow-[0_0_24px_rgba(250,204,21,0.45)]"
                      : "w-3 bg-white/50 hover:w-7 hover:bg-white/80"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </Carousel>
    </section>
  );
}
