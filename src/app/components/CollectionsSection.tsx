import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageWithFallback from '../components/ImageWithFallback';

interface Collection {
  id: number;
  name: string;
  description: string;
  image: string;
}

const CollectionsSection = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching collections from backend
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        // In a real app, this would be an API call:
        // const response = await api getCollections();
        // setCollections(response.data);
        
        // Mock data for demonstration
        setTimeout(() => {
          const mockCollections: Collection[] = [
            {
              id: 1,
              name: "Summer Collections",
              description: "Lightweight and breathable sarees perfect for the hot season",
              image: "https://images.unsplash.com/photo-1607990281513-2c110a250c2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8c2FyZWV8ZW58MXx8fHwxNzU5NTkwMTkzfDA&ixlib=rb-4.1.0&q=80&w=1080"
            },
            {
              id: 2,
              name: "Silk Collection",
              description: "Elegant silk sarees with intricate designs and luxurious textures",
              image: "https://images.unsplash.com/photo-1607990281513-2c110a250c2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8c2FyZWV8ZW58MXx8fHwxNzU5NTkwMTkzfDA&ixlib=rb-4.1.0&q=80&w=1080"
            },
            {
              id: 3,
              name: "Traditional Sarees",
              description: "Classic sarees that represent the rich heritage of Indian textiles",
              image: "https://images.unsplash.com/photo-1607990281513-2c110a250c2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8c2FyZWV8ZW58MXx8fHwxNzU5NTkwMTkzfDA&ixlib=rb-4.1.0&q=80&w=1080"
            }
          ];
          setCollections(mockCollections);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching collections:', error);
        setIsLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (isLoading) {
    return (
      <div className="py-20 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-lg rounded-3xl border border-white/20 mx-4 md:mx-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse flex justify-center mb-12">
            <div className="h-16 w-64 bg-white/20 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20">
                <div className="h-64 bg-white/20"></div>
                <div className="p-6">
                  <div className="h-8 bg-white/20 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-white/20 rounded w-full mb-2"></div>
                  <div className="h-4 bg-white/20 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-lg rounded-3xl border border-white/20 mx-4 md:mx-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 bg-clip-text text-transparent">
            Premium Collections
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 shadow-xl group"
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  fallbackSrc="/placeholder-saree.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-4 left-4 right-4 text-white"
                >
                  <h3 className="text-xl font-bold">{collection.name}</h3>
                </motion.div>
              </div>
              <div className="p-6">
                <p className="text-gray-200 mb-4">{collection.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Explore Collection
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;