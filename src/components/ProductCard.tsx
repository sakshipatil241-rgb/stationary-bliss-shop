import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Heart } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useWishlist } from "@/hooks/useWishlist";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  const { user } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist(user?.id);
  
  const handleAddToCart = () => {
    const firstVariant = node.variants.edges[0]?.node;
    if (!firstVariant) return;

    const cartItem = {
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: `${node.title} has been added to your cart.`,
      position: "top-center",
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(node.id)) {
      removeFromWishlist(node.id);
    } else {
      addToWishlist(node.id, node.handle);
    }
  };

  const imageUrl = node.images.edges[0]?.node.url;
  const price = node.priceRange.minVariantPrice;

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Link to={`/product/${node.handle}`}>
          <div className="aspect-square overflow-hidden bg-secondary/20">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={node.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No image
              </div>
            )}
          </div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={handleWishlistToggle}
        >
          <Heart className={`h-5 w-5 ${isInWishlist(node.id) ? "fill-red-500 text-red-500" : ""}`} />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <Link to={`/product/${node.handle}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
            {node.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {node.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            ${parseFloat(price.amount).toFixed(2)}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full"
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
