export interface CategoryItem {
  id: string;
  name: string;
  subcategories?: string[];
}

export interface CategoryGroup {
  name: string;
  icon?: string;
  items: CategoryItem[];
}

export const productOccasions = [
  { id: "wedding", name: "Wedding" },
  { id: "festive", name: "Festive" },
  { id: "ceremonies", name: "Ceremonies" },
  { id: "traditional", name: "Traditional" },
  { id: "casual", name: "Casual" },
];

export const categories: CategoryGroup[] = [
  {
    name: "Women Collections",
    items: [
      {
        id: "all-women-collections",
        name: "All Women Collections",
      },
      {
        id: "sarees",
        name: "Sarees",
      },

      {
        id: "sale-sarees",
        name: "Sale Sarees",
      },
      {
        id: "lehenga-cholli",
        name: "Lehenga Cholli",
      },
      {
        id: "lehenga",
        name: "Lehenga",
      },
      {
        id: "Chuddidhar",
        name: "Chuddidhar Collections",
      },
      {
        id: "blouse-collections",
        name: "Blouse Collections",
      },
      {
        id: "daily-wear-kurtas",
        name: "Daily Wear Kurtas",
      },
      {
        id: "traditional-kurtas",
        name: "Traditional Kurtas",
      },
      {
        id: "daily-wear-dresses",
        name: "Daily Wear Dresses - Nighty, Inners",
      },
      {
        id: "half-sarees",
        name: "Half Sarees",
      },
      {
        id: "saree-skirts",
        name: "Saree Skirts",
      },
    ],
  },
  {
    name: "Man Collections",
    items: [
      {
        id: "all-men-collections",
        name: "All Men Collections",
      },
      {
        id: "sherwani-collections",
        name: "Sherwani Collections",
      },
      {
        id: "shirt-collections",
        name: "Shirt Collections",
      },
      {
        id: "kurtha-collections",
        name: "Kurtha Collections",
      },
      {
        id: "national",
        name: "National",
      },
      {
        id: "dhoti-collections",
        name: "Dhoti Collections",
      },
      {
        id: "dhoti-shirt",
        name: "Dhoti Shirt",
      },
      {
        id: "pant",
        name: "Pant",
      },
      {
        id: "vest",
        name: "Vest",
      },
      {
        id: "vest-coat",
        name: "Vest Coat",
      },
      {
        id: "thalapakai",
        name: "Thalapakai",
      },
      {
        id: "schesh",
        name: "Schesh",
      },
    ],
  },
  {
    name: "Kids Girls",
    items: [
      {
        id: "all-kids-girls-collections",
        name: "All Kids Girls Collections",
      },
      {
        id: "kids-lehanga-cholli",
        name: "Lehanga Cholli",
      },
      {
        id: "kids-chudidhar",
        name: "Chuddidhar",
      },
      {
        id: "kids-pattu-pavadai",
        name: "Pattu Pavadai",
      },
      {
        id: "kids-party-frock",
        name: "Party Frock",
      },
      {
        id: "kids-nighty",
        name: "Nighty",
      },
      {
        id: "kids-sandals",
        name: "Sandals",
      },
    ],
  },
  {
    name: "Kids Boys",
    items: [
      {
        id: "all-kids-boys-collections",
        name: "All Kids Boys Collections",
      },
      {
        id: "kids-sherwani-collections",
        name: "Sherwani Collections",
      },
      {
        id: "kids-shirt-collections",
        name: "Shirt Collections",
      },
      {
        id: "kids-kurtha-collections",
        name: "Kurtha Collections",
      },
      {
        id: "kids-national",
        name: "National",
      },
      {
        id: "kids-dhoti-collections",
        name: "Dhoti Collections",
      },
      {
        id: "kids-dhoti-shirt",
        name: "Dhoti Shirt",
      },
      {
        id: "kids-pant",
        name: "Pant",
      },
      {
        id: "kids-coat-suit",
        name: "Coat Suit",
      },
      {
        id: "kids-thalapakai",
        name: "Thalapakai",
      },
      {
        id: "kids-schesh",
        name: "Schesh",
      },
    ],
  },
  {
    name: "Accessories",
    items: [
      {
        id: "all-accessories",
        name: "All Accessories",
      },
      {
        id: "jwellery",
        name: "Jwellery",
      },
      {
        id: "gift-items",
        name: "Gift Items",
      },
      {
        id: "dress-materials",
        name: "Dress Materials",
      },
    ],
  },
];

// Flatten all categories for easy lookup
export const allCategories = categories.flatMap((group) =>
  group.items.map((item) => ({
    ...item,
    group: group.name,
  })),
);
