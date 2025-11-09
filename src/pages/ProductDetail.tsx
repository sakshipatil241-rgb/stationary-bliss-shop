import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/data/products";
import { ArrowLeft, ShoppingCart, Heart, Star } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Rating {
  id: string;
  rating: number;
  review: string | null;
  created_at: string;
  profiles: {
    full_name: string | null;
  };
}

const ProductDetail = () => {
  const { handle } = useParams();
  const product = products.find(p => p.id === handle);
  const addItem = useCartStore((state) => state.addItem);
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [loading, setLoading] = useState(false);

  const isInWishlist = product ? wishlistItems.includes(product.id) : false;

  useEffect(() => {
    if (product) {
      fetchRatings();
    }
  }, [product]);

  const fetchRatings = async () => {
    if (!product) return;

    const { data, error } = await supabase
      .from("product_ratings")
      .select(`
        id,
        rating,
        review,
        created_at,
        profiles (
          full_name
        )
      `)
      .eq("product_id", product.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRatings(data as Rating[]);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      toast.success("Added to cart", {
        description: `${product.title} has been added to your cart`,
      });
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      toggleWishlist(product.id, product.id);
    }
  };

  const handleSubmitRating = async () => {
    if (!user) {
      toast.error("Please sign in to leave a rating");
      return;
    }

    if (!product || userRating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("product_ratings")
      .insert({
        user_id: user.id,
        product_id: product.id,
        product_handle: product.id,
        rating: userRating,
        review: userReview || null,
      });

    if (error) {
      toast.error("Failed to submit rating");
    } else {
      toast.success("Rating submitted successfully");
      setUserRating(0);
      setUserReview("");
      fetchRatings();
    }

    setLoading(false);
  };

  const averageRating = ratings.length > 0
    ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
    : "No ratings yet";

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to="/shop">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Button>
          </Link>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary/20">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "w-5 h-5",
                          star <= Number(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-muted"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({ratings.length} {ratings.length === 1 ? "review" : "reviews"})
                  </span>
                </div>
              </div>

              <p className="text-3xl font-bold text-primary">
                ₹{(product.price * 83).toFixed(2)}
              </p>
              
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {product.description}
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" onClick={handleWishlistToggle}>
                  <Heart className={cn("w-5 h-5", isInWishlist && "fill-red-500 text-red-500")} />
                </Button>
              </div>
            </div>
          </div>

          {/* Ratings Section */}
          <div className="max-w-6xl mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            
            {user && (
              <Card className="mb-8">
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <Label>Your Rating</Label>
                    <div className="flex gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setUserRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={cn(
                              "w-8 h-8 transition-colors cursor-pointer",
                              star <= userRating ? "fill-yellow-400 text-yellow-400" : "text-muted hover:text-yellow-400"
                            )}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="review">Your Review (Optional)</Label>
                    <Textarea
                      id="review"
                      placeholder="Share your thoughts about this product..."
                      value={userReview}
                      onChange={(e) => setUserReview(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button onClick={handleSubmitRating} disabled={loading || userRating === 0}>
                    {loading ? "Submitting..." : "Submit Review"}
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {ratings.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No reviews yet. Be the first to review this product!
                </p>
              ) : (
                ratings.map((rating) => (
                  <Card key={rating.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">
                            {rating.profiles?.full_name || "Anonymous"}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={cn(
                                  "w-4 h-4",
                                  star <= rating.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(rating.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {rating.review && (
                        <p className="text-muted-foreground mt-2">{rating.review}</p>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
