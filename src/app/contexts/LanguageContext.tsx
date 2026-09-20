import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "de" | "en";

const translations: Record<string, string> = {
  "Flash Sale Going On!": "Flash-Sale läuft!",
  Home: "Startseite",
  Collections: "Kollektionen",
  Contact: "Kontakt",
  Account: "Konto",
  Cart: "Warenkorb",
  Menu: "Menü",
  "View account": "Konto anzeigen",
  "View wishlist": "Wunschliste anzeigen",
  "New Collection 2026": "Neue Kollektion 2026",
  "Festival Ready": "Bereit fürs Fest",
  "Luxury Silk": "Luxuriöse Seide",
  "Curated for You": "Für Sie ausgewählt",
  "Elegance Woven with Tradition": "Eleganz, verwoben mit Tradition",
  "Drapes That Tell a Story": "Saris, die Geschichten erzählen",
  "Soft, Rich, and Radiant": "Zart, edel und strahlend",
  "Crafted to Celebrate You": "Gefertigt, um Sie zu feiern",
  "Timeless saree stories, now in motion":
    "Zeitlose Sari-Geschichten in Bewegung",
  "Curated Sarees": "Ausgewählte Saris",
  "Shop by Price": "Nach Preis shoppen",
  Bestsellers: "Bestseller",
  "Newly Arrived": "Neu eingetroffen",
  "Handpicked selections from our most loved collections":
    "Handverlesene Auswahl aus unseren beliebtesten Kollektionen",
  "View All Products": "Alle Produkte ansehen",
  "Loading products...": "Produkte werden geladen...",
  "Your Cart is Empty": "Ihr Warenkorb ist leer",
  "Looks like you haven't added any items to your cart yet.":
    "Sie haben Ihrem Warenkorb noch keine Artikel hinzugefügt.",
  "Continue Shopping": "Weiter einkaufen",
  "Shopping Cart": "Warenkorb",
  "Order Summary": "Bestellübersicht",
  "Enter promo code": "Gutscheincode eingeben",
  Apply: "Anwenden",
  "Promo code applied!": "Gutscheincode angewendet!",
  Subtotal: "Zwischensumme",
  Discount: "Rabatt",
  Shipping: "Versand",
  FREE: "KOSTENLOS",
  Total: "Gesamt",
  "Proceed to Checkout": "Zur Kasse",
  "Add €{amount} more for free shipping!":
    "Noch €{amount} für kostenlosen Versand hinzufügen!",
  "Welcome Back": "Willkommen zurück",
  "Login or create an account to continue":
    "Anmelden oder Konto erstellen, um fortzufahren",
  Login: "Anmelden",
  "Sign Up": "Registrieren",
  Password: "Passwort",
  Email: "E-Mail",
  "Remember me": "Angemeldet bleiben",
  "Forgot password?": "Passwort vergessen?",
  "First Name": "Vorname",
  "Last Name": "Nachname",
  "Confirm Password": "Passwort bestätigen",
  "Create Account": "Konto erstellen",
  "Get in Touch": "Kontakt aufnehmen",
  "Have a question or need assistance? We're here to help you find the perfect saree.":
    "Haben Sie eine Frage oder benötigen Sie Hilfe? Wir helfen Ihnen, den perfekten Sari zu finden.",
  "Visit Us": "Besuchen Sie uns",
  "Call Us": "Rufen Sie uns an",
  "Email Us": "Schreiben Sie uns",
  "Send us a Message": "Nachricht senden",
  Name: "Name",
  Subject: "Betreff",
  Message: "Nachricht",
  "Send Message": "Nachricht senden",
  "Store Hours": "Öffnungszeiten",
  "Frequently Asked Questions": "Häufig gestellte Fragen",
  "Our Story": "Unsere Geschichte",
  "About Us": "Über uns",
  "Our Values": "Unsere Werte",
  "What We Stand For": "Wofür wir stehen",
  "Our Process": "Unser Prozess",
  "From Loom to You": "Vom Webstuhl zu Ihnen",
  "Our Mission": "Unsere Mission",
  "Collections curated for festive elegance":
    "Kollektionen für festliche Eleganz",
  "Discover latest saree collections in a premium showcase":
    "Entdecken Sie die neuesten Sari-Kollektionen in einer exklusiven Auswahl",
  "View ": "Ansehen: ",
  "All Categories Collection": "Kollektion aller Kategorien",
  "Saree Collections": "Sari-Kollektionen",
  "Shop by Occasion": "Nach Anlass shoppen",
  Clear: "Löschen",
  items: "Artikel",
  "Clear All Filters": "Alle Filter löschen",
  Hide: "Ausblenden",
  Show: "Anzeigen",
  "Price: Low to High": "Preis: aufsteigend",
  "Price: High to Low": "Preis: absteigend",
  "All Sarees": "Alle Saris",
  Lehenga: "Lehenga",
  "Festive Collections": "Festliche Kollektionen",
  "Cotton Sarees": "Baumwollsaris",
  Skirts: "Röcke",
  "Sherwani Suit": "Sherwani-Anzug",
  "Wedding Shirt": "Hochzeitshemd",
  "Boys Soft Cotton Dhoti & Shirt Set":
    "Weiches Baumwoll-Dhoti-Hemd-Set für Jungen",
  "Kids Frock": "Kinderkleid",
  Filters: "Filter",
  Sort: "Sortieren",
  "Clear All": "Alle löschen",
  "No products found": "Keine Produkte gefunden",
  "No products found matching your filters.":
    "Keine Produkte entsprechen Ihren Filtern.",
  "Clear Filters": "Filter löschen",
  "Add to cart": "In den Warenkorb",
  "Add to wishlist": "Zur Wunschliste hinzufügen",
  "Remove from wishlist": "Von der Wunschliste entfernen",
  "Product Details": "Produktdetails",
  "Add to Cart": "In den Warenkorb",
  Bestseller: "Top-Seller",
  "New Arrival": "Neu eingetroffen",
  "Niorra Edit": "Niorra-Auswahl",
  "We started Niorra in 2012,": "Niorra wurde 2012 gegründet.",
  "Since our first day we've brought the best selection of Indian Bollywood Textiles and Jewellery to our customers. Our name has become synonymous with quality throughout the entire Frankfurt, Germany. We do our best to ensure a permanent variety of fantastic items along with unique limited edition and seasonal items to fit any budget.":
    "Seit dem ersten Tag bringen wir unseren Kunden eine erlesene Auswahl indischer Bollywood-Textilien und Schmuck. In ganz Frankfurt und Deutschland steht unser Name für Qualität. Wir sorgen für eine dauerhafte Vielfalt fantastischer Artikel sowie einzigartige limitierte und saisonale Stücke für jedes Budget.",
  "Quick Links": "Schnellzugriff",
  "Visit Our Store": "Besuchen Sie unser Geschäft",
  "All rights reserved.": "Alle Rechte vorbehalten.",
  "Privacy Policy": "Datenschutzrichtlinie",
  "Terms & Conditions": "Allgemeine Geschäftsbedingungen",
  "Decrease quantity": "Menge verringern",
  "Increase quantity": "Menge erhöhen",
  "Remove item from cart": "Artikel aus dem Warenkorb entfernen",
  "Passwords don't match!": "Die Passwörter stimmen nicht überein!",
  "Your name": "Ihr Name",
  "How can we help?": "Wie können wir helfen?",
  "Tell us more about your inquiry...":
    "Erzählen Sie uns mehr über Ihre Anfrage ...",
  "My Account": "Mein Konto",
  "Manage your orders and account settings":
    "Verwalten Sie Ihre Bestellungen und Kontoeinstellungen",
  "My Orders": "Meine Bestellungen",
  Wishlist: "Wunschliste",
  Addresses: "Adressen",
  Profile: "Profil",
  Logout: "Abmelden",
  Orders: "Bestellungen",
  "View Details": "Details ansehen",
  "Your wishlist is empty": "Ihre Wunschliste ist leer",
  "Browse Products": "Produkte entdecken",
  "Profile Information": "Profilinformationen",
  "Weaving traditions into timeless elegance":
    "Traditionen zu zeitloser Eleganz verwoben",
  "Shop by Category": "Nach Kategorie shoppen",
  "Price Range": "Preisspanne",
  Fabric: "Stoff",
  Color: "Farbe",
  "Sort by:": "Sortieren nach:",
  Popular: "Beliebt",
  "New Arrivals": "Neu eingetroffen",
  "Low to High": "Aufsteigend",
  "High to Low": "Absteigend",
  "Order Placed Successfully!": "Bestellung erfolgreich aufgegeben!",
  "Thank you for your purchase. Your order confirmation has been sent to your email.":
    "Vielen Dank für Ihren Einkauf. Die Bestellbestätigung wurde an Ihre E-Mail-Adresse gesendet.",
  "Order Number": "Bestellnummer",
  Checkout: "Kasse",
  "Shipping Info": "Versandinformationen",
  Payment: "Zahlung",
  "Shipping Information": "Versandinformationen",
  "Phone Number": "Telefonnummer",
  Address: "Adresse",
  City: "Stadt",
  State: "Bundesland",
  Pincode: "Postleitzahl",
  "Payment Method": "Zahlungsart",
  "Related Products": "Ähnliche Produkte",
  "Loading product details...": "Produktdetails werden geladen ...",
  "Product not found.": "Produkt nicht gefunden.",
  "Select Size": "Größe auswählen",
  Quantity: "Menge",
  Brand: "Marke",
  Occasion: "Anlass",
  "Free Shipping": "Kostenloser Versand",
  "Easy Returns": "Einfache Rückgabe",
  "Secure Payments": "Sichere Zahlungen",
  Description: "Beschreibung",
  Details: "Details",
  Showing: "Anzeige von",
  products: "Produkten",
  Everyday: "Alltag",
  Festive: "Festlich",
  Wedding: "Hochzeit",
  Ceremonies: "Zeremonien",
  Traditional: "Traditionell",
  Casual: "Lässig",
  Silks: "Seide",
  Premium: "Premium",
  Bridal: "Brautmode",
  "Shop sarees priced": "Saris shoppen zum Preis",
  "Why Niorra": "Warum Niorra",
  "Crafted with Love, Delivered with Care":
    "Mit Liebe gefertigt, mit Sorgfalt geliefert",
  "Authentic Craftsmanship": "Authentische Handwerkskunst",
  "Direct sourcing from traditional weavers ensures genuine quality":
    "Die direkte Zusammenarbeit mit traditionellen Webern garantiert echte Qualität",
  "Curated Collections": "Ausgewählte Kollektionen",
  "Every piece is carefully selected to match your style":
    "Jedes Stück wird sorgfältig passend zu Ihrem Stil ausgewählt",
  "Sustainable Practices": "Nachhaltige Praktiken",
  "Supporting artisan communities and preserving traditions":
    "Wir unterstützen Handwerksgemeinschaften und bewahren Traditionen",
  "No. 1 Saree collection in Germany": "Deutschlands führende Sari-Kollektion",
  "Happy Customers": "Zufriedene Kunden",
  "Unique Designs": "Einzigartige Designs",
  "Master Weavers": "Meisterweber",
  "States Covered": "Abgedeckte Bundesländer",
  "View collection": "Kollektion ansehen",
  New: "Neu",
  "In Stock": "Auf Lager",
  "Hurry up!": "Beeilen Sie sich!",
  Only: "Nur",
  "left in stock.": "auf Lager.",
  "Low stock": "Geringer Bestand",
  "pcs left": "Stück übrig",
  "Out of Stock": "Nicht auf Lager",
  "Add To Cart": "In den Warenkorb",
  "On orders above 200€": "Bei Bestellungen über 200 €",
  "7 day return policy": "7 Tage Rückgaberecht",
  "100% secure checkout": "100 % sicherer Checkout",
  Sarees: "Saris",
  Blouses: "Blusen",
  Kutis: "Kurtis",
  Kids: "Kinder",
  Blog: "Blog",
  "Contact Us": "Kontaktieren Sie uns",
  "Women Collections": "Damen",
  "Man Collections": "Herren",
  "Kids Girls": "Mädchen",
  "Kids Boys": "Jungen",
  Accessories: "Accessoires",
  "All Women Collections": "Alle Damenkollektionen",
  "Sale Sarees": "Saris im Angebot",
  "Lehenga Cholli": "Lehenga Cholli",
  "Chuddidhar Collections": "Chuddidhar-Kollektionen",
  "Blouse Collections": "Blusenkollektionen",
  "Daily Wear Kurtas": "Kurtas für den Alltag",
  "Traditional Kurtas": "Traditionelle Kurtas",
  "Daily Wear Dresses - Nighty, Inners":
    "Alltagskleider, Nachthemden und Unterwäsche",
  "Half Sarees": "Halbe Saris",
  "Saree Skirts": "Sari-Röcke",
  "All Men Collections": "Alle Herrenkollektionen",
  "Sherwani Collections": "Sherwani-Kollektionen",
  "Shirt Collections": "Hemdenkollektionen",
  "Kurtha Collections": "Kurta-Kollektionen",
  National: "Traditionell",
  "Dhoti Collections": "Dhoti-Kollektionen",
  "Dhoti Shirt": "Dhoti-Hemd",
  Pant: "Hose",
  Vest: "Weste",
  "Vest Coat": "Westenanzug",
  Thalapakai: "Thalapakai",
  Schesh: "Schal",
  "All Kids Girls Collections": "Alle Mädchenkollektionen",
  Lehanga: "Lehanga",
  Chuddidhar: "Chuddidhar",
  "Pattu Pavadai": "Pattu Pavadai",
  "Party Frock": "Partykleid",
  Nighty: "Nachthemd",
  Sandals: "Sandalen",
  "All Kids Boys Collections": "Alle Jungenkollektionen",
  "Coat Suit": "Anzug",
  "All Accessories": "Alle Accessoires",
  Jwellery: "Schmuck",
  "Gift Items": "Geschenkartikel",
  "Dress Materials": "Stoffe für Kleidung",
  Testimonials: "Kundenstimmen",
  "What Our Customers Say": "Was unsere Kunden sagen",
  "Trusted by thousands of women across India for their special occasions":
    "Tausende Frauen in Indien vertrauen uns für ihre besonderen Anlässe",
  "2 weeks ago": "vor 2 Wochen",
  "1 month ago": "vor 1 Monat",
  "3 weeks ago": "vor 3 Wochen",
  "Absolutely stunning collection! The quality of the silk saree I purchased exceeded my expectations. The intricate zari work is exquisite.":
    "Eine absolut atemberaubende Kollektion! Die Qualität des gekauften Seidensaris hat meine Erwartungen übertroffen. Die kunstvolle Zari-Arbeit ist exquisit.",
  "Perfect for my wedding! The bridal collection is breathtaking. Customer service was exceptional and delivery was prompt.":
    "Perfekt für meine Hochzeit! Die Brautkollektion ist atemberaubend. Der Kundenservice war außergewöhnlich und die Lieferung schnell.",
  "I've ordered multiple sarees and each one is more beautiful than the last. The attention to detail and traditional craftsmanship is remarkable.":
    "Ich habe mehrere Saris bestellt und jeder ist schöner als der vorherige. Die Liebe zum Detail und die traditionelle Handwerkskunst sind bemerkenswert.",
  "Experience premium sarees that blend heritage craftsmanship with bold modern flair.":
    "Erleben Sie hochwertige Saris, die traditionelles Handwerk mit modernem Stil verbinden.",
  "From wedding mandaps to evening soirées, every piece embraces timeless charm.":
    "Von der Hochzeit bis zum Abendempfang versprüht jedes Stück zeitlosen Charme.",
  "Feel the luxury of silk sarees finished with delicate motifs and rich hues.":
    "Spüren Sie den Luxus von Seidensaris mit feinen Mustern und kräftigen Farben.",
  "Discover curated looks made for every celebration, every memory, every you.":
    "Entdecken Sie ausgewählte Looks für jede Feier, jede Erinnerung und für Sie.",
  "Niorra has become the best online shopping site in Sarees & ready made Blouses. Niorra brings you an array of silk sarees, cotton sari and linen handloom sarees online. Famously known as pure silk saree brand in India, A perfect place to buy hand loom silk sari from the best online shopping website for a popular bridal, party wear & reception saree choice.":
    "Niorra ist zu einer der besten Online-Adressen für Saris und fertige Blusen geworden. Wir bieten online eine große Auswahl an Seidensaris, Baumwollsaris und handgewebten Leinensaris. Als bekannte Marke für reine Seidensaris in Indien sind wir der perfekte Ort, um handgewebte Seidensaris für Brautmode, Partys und Empfänge zu kaufen.",
  "More then 2000 designs in sarees are available in stock. A range of pure silk sarees is available at your fingertips for you to explore and choose. Shop from the comforts of your surrounding and look for what you want. No bargaining or haggling, but certainly various options for online saree shopping in Germany, such as Pay by card, Pay Pal":
    "Mehr als 2.000 Sari-Designs sind auf Lager. Entdecken und wählen Sie aus einer großen Auswahl reiner Seidensaris. Kaufen Sie bequem von zu Hause aus und finden Sie genau das, was Sie suchen. Ohne Feilschen, dafür mit vielen Möglichkeiten zum Online-Sari-Shopping in Deutschland, etwa per Karte oder PayPal.",
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (value: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() =>
    localStorage.getItem("niorra-language") === "en" ? "en" : "de",
  );

  useEffect(() => {
    localStorage.setItem("niorra-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (value: string) =>
        language === "de" ? translations[value] || value : value,
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
