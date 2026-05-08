import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Heart, Award, Users, Globe } from "lucide-react";

export function AboutPage() {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-secondary" />,
      title: "Passion for Tradition",
      description: "We celebrate India's rich textile heritage through authentic sarees"
    },
    {
      icon: <Award className="h-8 w-8 text-secondary" />,
      title: "Quality Excellence",
      description: "Every saree is handpicked for superior quality and craftsmanship"
    },
    {
      icon: <Users className="h-8 w-8 text-secondary" />,
      title: "Artisan Support",
      description: "We work directly with master weavers across India"
    },
    {
      icon: <Globe className="h-8 w-8 text-secondary" />,
      title: "Global Reach",
      description: "Bringing Indian elegance to women worldwide"
    }
  ];

  const process = [
    {
      step: "1",
      title: "Sourcing",
      description: "We travel across India to source the finest sarees from master weavers and artisan communities."
    },
    {
      step: "2",
      title: "Quality Check",
      description: "Each saree undergoes rigorous quality inspection to ensure authenticity and craftsmanship."
    },
    {
      step: "3",
      title: "Curation",
      description: "Our experts curate collections that blend traditional elegance with contemporary appeal."
    },
    {
      step: "4",
      title: "Delivery",
      description: "Carefully packaged and delivered to your doorstep with love and care."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1702574145861-bcb8227a31bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWF2aW5nJTIwbG9vbSUyMHRleHRpbGV8ZW58MXx8fHwxNzU5NTkwMDkzfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Traditional weaving"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/70 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl mb-4">Our Story</h1>
            <p className="text-xl">Weaving traditions into timeless elegance</p>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-secondary mb-2 tracking-widest uppercase">About Us</p>
            <h2 className="text-4xl mb-6">Draupadi Vastralya</h2>
            <p className="text-lg mb-6 leading-relaxed">
              Founded with a vision to celebrate India's rich textile heritage, Draupadi Vastralya brings together 
              the finest sarees from master weavers across the country. Our name draws inspiration from Draupadi, 
              the epitome of grace and strength in Indian mythology, reflecting the timeless elegance our sarees embody.
            </p>
            <p className="text-lg leading-relaxed">
              Each saree in our collection tells a story of tradition, craftsmanship, and cultural pride. We work 
              directly with artisan communities, ensuring fair trade practices while preserving ancient weaving 
              techniques for future generations.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-secondary mb-2 tracking-widest uppercase">Our Values</p>
            <h2 className="text-4xl mb-4">What We Stand For</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-secondary mb-2 tracking-widest uppercase">Our Process</p>
            <h2 className="text-4xl mb-4">From Loom to You</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every saree goes through a meticulous journey to ensure you receive nothing but the finest
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {process.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="aspect-[4/5] rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1631008622409-49549f02b992?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHBvcnRyYWl0JTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzU5NTkwMDkzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Artisan at work"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/5] rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1702574145861-bcb8227a31bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWF2aW5nJTIwbG9vbSUyMHRleHRpbGV8ZW58MXx8fHwxNzU5NTkwMDkzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Weaving process"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/5] rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1693987646600-c911a3f571b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZXh0aWxlJTIwcGF0dGVybnxlbnwxfHx8fDE3NTk1ODk1NTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Textile patterns"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl mb-6">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              To preserve and promote India's textile heritage by connecting artisans with connoisseurs 
              of fine sarees, while ensuring sustainable livelihoods for weaving communities and bringing 
              timeless elegance to modern wardrobes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
