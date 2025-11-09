import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { CartDrawer } from "./CartDrawer";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <ShoppingBag className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
            <span className="text-xl font-bold text-foreground">Stationary Bliss</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Shop
            </Link>
            <Link to="/about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          <CartDrawer />
        </div>
      </div>
    </nav>
  );
};
