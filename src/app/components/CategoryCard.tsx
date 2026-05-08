import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useNavigation } from "../contexts/NavigationContext";

interface CategoryCardProps {
  title: string;
  image: string;
  itemCount?: string;
  categoryId?: string;
}

export function CategoryCard({ title, image, itemCount, categoryId }: CategoryCardProps) {
  const { navigate } = useNavigation();

  return (
    <div 
      onClick={() => navigate("category", { category: categoryId || title.toLowerCase() })}
      className="group relative overflow-hidden rounded-lg cursor-pointer"
    >
      <div className="aspect-[3/4] overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl mb-1">{title}</h3>
          {itemCount && (
            <p className="text-sm text-white/80">{itemCount} Sarees</p>
          )}
          <div className="mt-3 inline-flex items-center gap-2 text-secondary group-hover:gap-3 transition-all">
            <span>Explore Collection</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
