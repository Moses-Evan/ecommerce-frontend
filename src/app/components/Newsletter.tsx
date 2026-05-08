import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Newsletter() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl mb-4">Stay Connected</h2>
          <p className="text-lg mb-8 text-primary-foreground/90">
            Subscribe to our newsletter for exclusive offers, new arrivals, and styling tips
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:bg-white/20"
            />
            <Button type="submit" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Subscribe
            </Button>
          </form>

          <p className="text-sm mt-4 text-primary-foreground/70">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
