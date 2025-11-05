import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Heart, Star, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="bg-secondary/30 py-12 mb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-lg text-muted-foreground">
              Learn more about Stationary Bliss and our story
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-3xl mx-auto">
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Stationary Bliss was founded with a simple mission: to bring joy and creativity into everyday life through beautiful stationery, thoughtful gifts, and inspiring craft supplies.
              </p>
              <p className="text-muted-foreground">
                We believe that the right tools can transform ordinary moments into extraordinary experiences. Whether you're journaling, gift-giving, or creating art, we're here to provide you with quality products that inspire and delight.
              </p>
            </section>
            
            <section className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-card rounded-lg">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Quality First</h3>
                <p className="text-sm text-muted-foreground">
                  We carefully curate our collection to ensure every product meets our high standards
                </p>
              </div>
              
              <div className="text-center p-6 bg-card rounded-lg">
                <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Customer Love</h3>
                <p className="text-sm text-muted-foreground">
                  Your satisfaction is our priority, and we're here to help with every order
                </p>
              </div>
              
              <div className="text-center p-6 bg-card rounded-lg">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Creative Inspiration</h3>
                <p className="text-sm text-muted-foreground">
                  We provide products that spark creativity and bring your ideas to life
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Premium Stationery</h3>
                  <p className="text-muted-foreground">
                    From elegant notebooks to fine writing instruments, we offer stationery that makes every word count.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Unique Gifts</h3>
                  <p className="text-muted-foreground">
                    Discover thoughtfully curated gifts perfect for any occasion, from birthdays to celebrations.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Creative Crafts</h3>
                  <p className="text-muted-foreground">
                    Everything you need for your next creative project, from art supplies to DIY materials.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
