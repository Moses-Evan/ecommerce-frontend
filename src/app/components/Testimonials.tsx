import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "Absolutely stunning collection! The quality of the silk saree I purchased exceeded my expectations. The intricate zari work is exquisite.",
    date: "2 weeks ago"
  },
  {
    name: "Ananya Reddy",
    location: "Hyderabad",
    rating: 5,
    text: "Perfect for my wedding! The bridal collection is breathtaking. Customer service was exceptional and delivery was prompt.",
    date: "1 month ago"
  },
  {
    name: "Meera Patel",
    location: "Ahmedabad",
    rating: 5,
    text: "I've ordered multiple sarees and each one is more beautiful than the last. The attention to detail and traditional craftsmanship is remarkable.",
    date: "3 weeks ago"
  }
];

export function Testimonials() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-secondary mb-2 tracking-widest uppercase">Testimonials</p>
          <h2 className="text-4xl md:text-5xl mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by thousands of women across India for their special occasions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-sm text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{testimonial.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
