import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [minRating, setMinRating] = useState<number>(0);
  
  const filteredProducts = useMemo(() => {
    let filtered = selectedCategory === "all" 
      ? products 
      : products.filter(product => product.category === selectedCategory);
    
    // Filter by price range (in INR)
    filtered = filtered.filter(product => {
      const priceInr = product.price * 83;
      return priceInr >= priceRange[0] && priceInr <= priceRange[1];
    });
    
    // Filter by rating (placeholder - would come from database in real app)
    // For now, products without ratings are shown when minRating is 0
    if (minRating > 0) {
      filtered = filtered.filter(() => Math.random() > 0.3); // Simulated filter
    }
    
    return filtered;
  }, [selectedCategory, priceRange, minRating]);

  const categories = [
    { id: "all", label: "All Products" },
    { id: "stationery", label: "Stationery" },
    { id: "gifts", label: "Gifts" },
    { id: "crafts", label: "Crafts" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="bg-secondary/30 py-12 mb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Shop</h1>
            <p className="text-lg text-muted-foreground">
              Browse our complete collection of stationery, gifts, and crafts
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="flex flex-wrap lg:flex-col gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        onClick={() => setSelectedCategory(category.id)}
                        className="capitalize w-full justify-start"
                        size="sm"
                      >
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</Label>
                  <Slider
                    min={0}
                    max={500}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Minimum Rating: {minRating} {minRating > 0 && "⭐"}</Label>
                  <Slider
                    min={0}
                    max={5}
                    step={1}
                    value={[minRating]}
                    onValueChange={(val) => setMinRating(val[0])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
