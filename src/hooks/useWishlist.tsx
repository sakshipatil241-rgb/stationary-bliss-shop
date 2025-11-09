import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface WishlistItem {
  id: string;
  product_id: string;
  product_handle: string;
}

export const useWishlist = (userId: string | undefined) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchWishlist();
    } else {
      setWishlist([]);
      setLoading(false);
    }
  }, [userId]);

  const fetchWishlist = async () => {
    if (!userId) return;
    
    const { data, error } = await supabase
      .from("wishlist")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching wishlist:", error);
    } else {
      setWishlist(data || []);
    }
    setLoading(false);
  };

  const addToWishlist = async (productId: string, productHandle: string) => {
    if (!userId) {
      toast.error("Please sign in to add to wishlist");
      return;
    }

    const { error } = await supabase
      .from("wishlist")
      .insert({ user_id: userId, product_id: productId, product_handle: productHandle });

    if (error) {
      toast.error("Failed to add to wishlist");
    } else {
      toast.success("Added to wishlist");
      fetchWishlist();
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!userId) return;

    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", userId)
      .eq("product_id", productId);

    if (error) {
      toast.error("Failed to remove from wishlist");
    } else {
      toast.success("Removed from wishlist");
      fetchWishlist();
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.product_id === productId);
  };

  return { wishlist, loading, addToWishlist, removeFromWishlist, isInWishlist };
};
