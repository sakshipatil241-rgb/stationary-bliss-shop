import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getProductByHandle } from "@/lib/shopify";
import { ShoppingCart, Loader2, Heart, Star } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useWishlist } from "@/hooks/useWishlist";
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const { user } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist(user?.id);
  const [ratings, setRatings] = useState<any[]>([]);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return;
      
      try {
        const fetchedProduct = await getProductByHandle(handle);
        setProduct(fetchedProduct);
        fetchRatings(fetchedProduct.id);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  const fetchRatings = async (productId: string) => {
    const { data, error } = await supabase
      .from("product_ratings")
      .select("*, profiles(full_name)")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRatings(data);
      const avg = data.reduce((acc, r) => acc + r.rating, 0) / data.length || 0;
      setAvgRating(avg);
      
      const userR = data.find(r => r.user_id === user?.id);
      if (userR) {
        setUserRating(userR.rating);
        setUserReview(userR.review || "");
      }
    }
  };

  const handleSubmitRating = async () => {
    if (!user) {
      toast.error("Please sign in to rate this product");
      return;
    }
    if (userRating === 0) {
      toast.error("Please select a rating");
      return;
    }

    const { error } = await supabase
      .from("product_ratings")
      .upsert({
        user_id: user.id,
        product_id: product.id,
        product_handle: product.handle,
        rating: userRating,
        review: userReview,
      });

    if (error) {
      toast.error("Failed to submit rating");
    } else {
      toast.success("Rating submitted!");
      fetchRatings(product.id);
    }
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id, product.handle);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const selectedVariant = product.variants.edges[selectedVariantIndex]?.node;
    if (!selectedVariant) return;

    const cartItem = {
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: `${product.title} has been added to your cart.`,
      position: "top-center",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Product not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  const selectedVariant = product.variants.edges[selectedVariantIndex]?.node;
  const imageUrl = product.images.edges[0]?.node.url;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary/20">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No image
                </div>
              )}
            </div>
            
            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-4xl font-bold">{product.title}</h1>
                <Button variant="outline" size="icon" onClick={handleWishlistToggle}>
                  <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${star <= Math.round(avgRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {avgRating > 0 ? `${avgRating.toFixed(1)} (${ratings.length} reviews)` : "No reviews yet"}
                </span>
              </div>
              
              <p className="text-3xl font-bold text-primary mb-6">
                ${parseFloat(selectedVariant.price.amount).toFixed(2)}
              </p>
              
              <div className="mb-8">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {product.description}
                </p>
              </div>
              
              {product.variants.edges.length > 1 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Select Variant</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.edges.map((variant: any, index: number) => (
                      <Button
                        key={variant.node.id}
                        variant={selectedVariantIndex === index ? "default" : "outline"}
                        onClick={() => setSelectedVariantIndex(index)}
                      >
                        {variant.node.title}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              <Button 
                onClick={handleAddToCart}
                size="lg"
                className="w-full md:w-auto"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>

              {/* Rating Section */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
                
                {user && (
                  <Card className="mb-6">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-3">Your Rating</h4>
                      <div className="flex gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setUserRating(star)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 ${star <= userRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          </button>
                        ))}
                      </div>
                      <Textarea
                        placeholder="Write your review (optional)"
                        value={userReview}
                        onChange={(e) => setUserReview(e.target.value)}
                        className="mb-4"
                      />
                      <Button onClick={handleSubmitRating}>Submit Rating</Button>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-4">
                  {ratings.map((rating) => (
                    <Card key={rating.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{rating.profiles?.full_name || "Anonymous"}</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${star <= rating.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                        {rating.review && (
                          <p className="text-muted-foreground">{rating.review}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(rating.created_at).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
