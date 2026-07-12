"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { categories } from "../../data/categories";
import { useNavigation } from "../contexts/NavigationContext";

interface CategoryItem {
  id: string;
  name: string;
}

interface CollectionGroupDropdownProps {
  groupName: string;
  items: CategoryItem[];
}

export function CollectionGroupDropdown({
  groupName,
  items,
}: CollectionGroupDropdownProps) {
  const { navigate } = useNavigation();

  const handleCategoryClick = (categoryId: string) => {
    navigate("category", { category: categoryId });
  };

  return (
    <div className="relative group">
      <button className="text-foreground hover:text-accent transition-colors cursor-pointer flex items-center gap-1 group-hover:text-primary">
        {groupName}
        <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
      </button>

      {/* Desktop Dropdown */}
      <div className="absolute left-0 top-full hidden group-hover:block pt-2 z-50 animate-in fade-in-0 zoom-in-95 origin-top-left">
        <div className="bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 rounded-xl shadow-2xl border border-white/20 dark:border-slate-700/50 backdrop-blur-sm overflow-hidden min-w-max">
          {/* Glass morphism effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

          <div className="relative px-4 py-3">
            <ul className="space-y-0">
              {items.map((item: any) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleCategoryClick(item.id)}
                    className="block w-full text-left px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 rounded-md transition-all duration-200 hover:translate-x-1 whitespace-nowrap cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Glossy shine effect */}
          <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
        </div>
      </div>
    </div>
  );
}
