import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useState } from "react";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4">Get in Touch</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a question or need assistance? We're here to help you find the perfect saree.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Information Cards */}
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-secondary/10 p-4 rounded-full">
                <MapPin className="h-6 w-6 text-secondary" />
              </div>
            </div>
            <h3 className="text-lg mb-2">Visit Us</h3>
            <p className="text-sm text-muted-foreground">
              Ludwigstr.19<br />
              60327 <br />
              Frankfurt Germany
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-secondary/10 p-4 rounded-full">
                <Phone className="h-6 w-6 text-secondary" />
              </div>
            </div>
            <h3 className="text-lg mb-2">Call Us</h3>
            <p className="text-sm text-muted-foreground">
             0049 069 2713 3944<br />
          
              Mon-Sat, 10 AM - 7 PM
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-secondary/10 p-4 rounded-full">
                <Mail className="h-6 w-6 text-secondary" />
              </div>
            </div>
            <h3 className="text-lg mb-2">Email Us</h3>
            <p className="text-sm text-muted-foreground">
             hello@niorra.com
        
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-3xl mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Additional Information */}
          <div className="space-y-8">
            {/* Store Hours */}
            <div className="bg-muted/30 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-secondary mt-1" />
                <div>
                  <h3 className="text-lg mb-3">Store Hours</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span>10:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span>10:00 AM - 9:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span>11:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <p className="mb-1">Do you offer international shipping?</p>
                  <p className="text-sm text-muted-foreground">
                    Yes, we ship worldwide. Shipping charges vary by location.
                  </p>
                </div>
                <div>
                  <p className="mb-1">What is your return policy?</p>
                  <p className="text-sm text-muted-foreground">
                    We accept returns within 7 days of delivery. Product must be unused.
                  </p>
                </div>
                <div>
                  <p className="mb-1">Can I customize my saree?</p>
                  <p className="text-sm text-muted-foreground">
                    Yes, we offer customization services. Contact us for details.
                  </p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Map Location</p>
                <p className="text-sm text-muted-foreground">Ludwigstr.19 60327 Frankfurt Germany</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
