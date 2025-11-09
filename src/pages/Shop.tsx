import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { Loader2, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts(50);
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products by price range
    const filtered = products.filter((product) => {
      const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
      return price >= priceRange[0] && price <= priceRange[1];
    });
    setFilteredProducts(filtered);
  }, [priceRange, products]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="bg-secondary/30 py-12 mb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Shop</h1>
                <p className="text-lg text-muted-foreground">
                  Browse our complete collection of stationery, gifts, and crafts
                </p>
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="lg">
                    <SlidersHorizontal className="h-5 w-5 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Products</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <div className="space-y-4">
                      <Label>Price Range: ${priceRange[0]} - ${priceRange[1]}</Label>
                      <Slider
                        min={0}
                        max={1000}
                        step={10}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="w-full"
                      />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No products found</p>
              <p className="text-sm text-muted-foreground">
                {products.length === 0 
                  ? "Create your first product by telling me what you'd like to sell and the price."
                  : "Try adjusting your filters to see more products."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
