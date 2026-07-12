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

export const categories: CategoryGroup[] = [
  {
    name: "Woman Collections",
    items: [
      {
        id: "all",
        name: "All Collections",
      },
      {
        id: "sarees",
        name: "Sarees",
      },
      {
        id: "lehenga",
        name: "Lehenga",
      },
      {
        id: "Chuddidhar",
        name: "Chuddidhar Collections",
      },
      // {
      //   id: "cotton-sarees",
      //   name: "Cotton Sarees",
      // },
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
        id: "skirts",
        name: "Skirts",
      },
    ],
  },
  {
    name: "Man Collections",
    items: [
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
    ],
  },
  {
    name: "Kids Collections",
    items: [
      {
        id: "pattu-pavadai",
        name: "Pattu Pavadai",
      },
      {
        id: "boys-dhoti-shirt",
        name: "Boys Soft Cotton Dhoti & Shirt Set",
      },
      {
        id: "kids-frock",
        name: "Kids Frock",
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
