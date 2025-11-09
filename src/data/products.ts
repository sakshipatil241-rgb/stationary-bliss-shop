import notebookImg from "@/assets/products/notebook-classic.jpg";
import gelPensImg from "@/assets/products/gel-pens-set.jpg";
import stickyNotesImg from "@/assets/products/sticky-notes.jpg";
import washiTapeImg from "@/assets/products/washi-tape.jpg";
import giftBoxImg from "@/assets/products/gift-box.jpg";
import markersImg from "@/assets/products/markers.jpg";
import craftScissorsImg from "@/assets/products/craft-scissors.jpg";
import watercolorImg from "@/assets/products/watercolor-set.jpg";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: "stationery" | "gifts" | "crafts";
}

export const products: Product[] = [
  {
    id: "1",
    title: "Classic Leather Notebook",
    description: "Premium leather-bound notebook with 200 pages of high-quality paper. Perfect for journaling, note-taking, or creative writing.",
    price: 24.99,
    image: notebookImg,
    category: "stationery"
  },
  {
    id: "2",
    title: "Gel Pens Set (12 Colors)",
    description: "Vibrant gel pens with smooth ink flow. Includes 12 different colors perfect for note-taking, planning, and creative projects.",
    price: 15.99,
    image: gelPensImg,
    category: "stationery"
  },
  {
    id: "3",
    title: "Pastel Sticky Notes Collection",
    description: "Colorful sticky notes in various sizes and pastel shades. Ideal for organizing, reminders, and creative planning.",
    price: 9.99,
    image: stickyNotesImg,
    category: "stationery"
  },
  {
    id: "4",
    title: "Decorative Washi Tape Set",
    description: "Beautiful collection of washi tapes with floral and geometric patterns. Perfect for journaling, scrapbooking, and gift wrapping.",
    price: 12.99,
    image: washiTapeImg,
    category: "crafts"
  },
  {
    id: "5",
    title: "Deluxe Stationery Gift Box",
    description: "Elegant gift box containing premium notebooks, pens, and accessories. Perfect for students, professionals, or stationery lovers.",
    price: 49.99,
    image: giftBoxImg,
    category: "gifts"
  },
  {
    id: "6",
    title: "Professional Marker Set",
    description: "High-quality markers in vibrant colors. Dual-tip design with fine and broad points for versatile use.",
    price: 22.99,
    image: markersImg,
    category: "stationery"
  },
  {
    id: "7",
    title: "Decorative Craft Scissors",
    description: "Set of craft scissors with decorative cutting patterns. Perfect for scrapbooking, card making, and creative projects.",
    price: 18.99,
    image: craftScissorsImg,
    category: "crafts"
  },
  {
    id: "8",
    title: "Watercolor Paint Set",
    description: "Professional watercolor set with 24 colors and brushes. Includes mixing palette and high-quality pigments.",
    price: 34.99,
    image: watercolorImg,
    category: "crafts"
  }
];
