import { Award, CreditCard, Truck } from "lucide-react";

const trustItems = [
  {
    icon: Award,
    title: "Touch of Quality",
    description: "Style in every step",
  },
  {
    icon: Truck,
    title: "Shipping Worldwide",
    description: "100% customer satisfaction",
  },
  {
    icon: CreditCard,
    title: "Secure Checkout",
    description: "100% Secure Payment",
  },
];

export function HomeTrustStrip() {
  return (
    <section className="bg-gradient-to-r from-primary to-[#610000] py-6 text-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 rounded-lg border border-white/60 px-5 py-6 sm:grid-cols-3 sm:gap-8 md:px-8">
          {trustItems.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex items-center gap-4 sm:justify-center md:justify-start"
            >
              <Icon className="h-10 w-10 flex-shrink-0 stroke-[1.5] text-white md:h-12 md:w-12" />
              <div>
                <h3 className="mb-1 text-base font-semibold leading-tight">
                  {title}
                </h3>
                <p className="text-sm leading-tight text-white/90">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
