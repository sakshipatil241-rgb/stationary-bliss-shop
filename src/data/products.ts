import notebookImg from "@/assets/products/notebook-classic.jpg";
import gelPensImg from "@/assets/products/gel-pens-set.jpg";
import stickyNotesImg from "@/assets/products/sticky-notes.jpg";
import washiTapeImg from "@/assets/products/washi-tape.jpg";
import giftBoxImg from "@/assets/products/gift-box.jpg";
import markersImg from "@/assets/products/markers.jpg";
import craftScissorsImg from "@/assets/products/craft-scissors.jpg";
import watercolorImg from "@/assets/products/watercolor-set.jpg";
import ballpointPensImg from "@/assets/products/ballpoint-pens.jpg";
import plannerDiaryImg from "@/assets/products/planner-diary.jpg";
import paperClipsImg from "@/assets/products/paper-clips.jpg";
import pencilCaseImg from "@/assets/products/pencil-case.jpg";
import deskOrganizerImg from "@/assets/products/desk-organizer.jpg";
import bookmarksImg from "@/assets/products/bookmarks.jpg";
import greetingCardsImg from "@/assets/products/greeting-cards.jpg";
import giftBagsImg from "@/assets/products/gift-bags.jpg";
import scentedCandleImg from "@/assets/products/scented-candle.jpg";
import wrappingPaperImg from "@/assets/products/wrapping-paper.jpg";
import glueSticksImg from "@/assets/products/glue-sticks.jpg";
import constructionPaperImg from "@/assets/products/construction-paper.jpg";
import sketchPencilsImg from "@/assets/products/sketch-pencils.jpg";
import acrylicPaintsImg from "@/assets/products/acrylic-paints.jpg";
import foamSheetsImg from "@/assets/products/foam-sheets.jpg";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: "stationery" | "gifts" | "crafts";
}

export const products: Product[] = [
  // Stationery Products
  {
    id: "1",
    title: "Classic Leather Notebook",
    description: "Premium leather-bound notebook with 200 pages of high-quality paper. Perfect for journaling, note-taking, or creative writing.",
    price: 8.99,
    image: notebookImg,
    category: "stationery"
  },
  {
    id: "2",
    title: "Gel Pens Set (12 Colors)",
    description: "Vibrant gel pens with smooth ink flow. Includes 12 different colors perfect for note-taking, planning, and creative projects.",
    price: 4.99,
    image: gelPensImg,
    category: "stationery"
  },
  {
    id: "3",
    title: "Pastel Sticky Notes Collection",
    description: "Colorful sticky notes in various sizes and pastel shades. Ideal for organizing, reminders, and creative planning.",
    price: 2.99,
    image: stickyNotesImg,
    category: "stationery"
  },
  {
    id: "6",
    title: "Professional Marker Set",
    description: "High-quality markers in vibrant colors. Dual-tip design with fine and broad points for versatile use.",
    price: 6.99,
    image: markersImg,
    category: "stationery"
  },
  {
    id: "9",
    title: "Ballpoint Pens (10 Colors)",
    description: "Smooth-writing ballpoint pens in 10 vibrant colors. Perfect for everyday writing, note-taking, and color-coding.",
    price: 3.49,
    image: ballpointPensImg,
    category: "stationery"
  },
  {
    id: "10",
    title: "Premium Planner Diary",
    description: "Elegant hardcover planner with monthly and weekly layouts. Features ribbon bookmark and premium paper quality.",
    price: 10.99,
    image: plannerDiaryImg,
    category: "stationery"
  },
  {
    id: "11",
    title: "Colorful Paper Clips Jar",
    description: "Large jar filled with colorful paper clips in assorted colors. Perfect for organizing documents and adding a pop of color.",
    price: 2.49,
    image: paperClipsImg,
    category: "stationery"
  },
  {
    id: "12",
    title: "Canvas Pencil Case",
    description: "Durable canvas pencil case with zipper closure. Spacious design holds all your writing essentials in style.",
    price: 4.49,
    image: pencilCaseImg,
    category: "stationery"
  },
  {
    id: "13",
    title: "Wooden Desk Organizer",
    description: "Multi-compartment desk organizer made from quality wood. Keep your workspace tidy with style and functionality.",
    price: 12.99,
    image: deskOrganizerImg,
    category: "stationery"
  },
  
  // Gifts Products
  {
    id: "5",
    title: "Deluxe Stationery Gift Box",
    description: "Elegant gift box containing premium notebooks, pens, and accessories. Perfect for students, professionals, or stationery lovers.",
    price: 15.99,
    image: giftBoxImg,
    category: "gifts"
  },
  {
    id: "14",
    title: "Decorative Bookmarks Set",
    description: "Beautiful set of 6 bookmarks with tassels and unique designs. Perfect gift for book lovers and readers.",
    price: 3.99,
    image: bookmarksImg,
    category: "gifts"
  },
  {
    id: "15",
    title: "Floral Greeting Cards Set",
    description: "Box of elegant greeting cards with floral designs. Includes envelopes, perfect for any occasion.",
    price: 5.99,
    image: greetingCardsImg,
    category: "gifts"
  },
  {
    id: "16",
    title: "Decorative Gift Bags (3 Pack)",
    description: "Set of 3 beautiful gift bags with ribbon handles and floral patterns. Perfect for presenting your gifts in style.",
    price: 4.49,
    image: giftBagsImg,
    category: "gifts"
  },
  {
    id: "17",
    title: "Luxury Scented Candle",
    description: "Premium scented candle in decorative glass jar with lid. Creates a relaxing ambiance with long-lasting fragrance.",
    price: 8.99,
    image: scentedCandleImg,
    category: "gifts"
  },
  {
    id: "18",
    title: "Designer Wrapping Paper Rolls",
    description: "Collection of decorative wrapping papers with various patterns. Make every gift look special and memorable.",
    price: 6.49,
    image: wrappingPaperImg,
    category: "gifts"
  },
  
  // Crafts Products
  {
    id: "4",
    title: "Decorative Washi Tape Set",
    description: "Beautiful collection of washi tapes with floral and geometric patterns. Perfect for journaling, scrapbooking, and gift wrapping.",
    price: 4.99,
    image: washiTapeImg,
    category: "crafts"
  },
  {
    id: "7",
    title: "Decorative Craft Scissors",
    description: "Set of craft scissors with decorative cutting patterns. Perfect for scrapbooking, card making, and creative projects.",
    price: 6.99,
    image: craftScissorsImg,
    category: "crafts"
  },
  {
    id: "8",
    title: "Watercolor Paint Set",
    description: "Professional watercolor set with 24 colors and brushes. Includes mixing palette and high-quality pigments.",
    price: 11.99,
    image: watercolorImg,
    category: "crafts"
  },
  {
    id: "19",
    title: "Glue Sticks (5 Pack)",
    description: "Pack of 5 high-quality glue sticks. Washable, non-toxic formula perfect for school and craft projects.",
    price: 2.99,
    image: glueSticksImg,
    category: "crafts"
  },
  {
    id: "20",
    title: "Construction Paper Pack",
    description: "Assorted colored construction paper in vibrant colors. 50 sheets perfect for arts, crafts, and school projects.",
    price: 3.99,
    image: constructionPaperImg,
    category: "crafts"
  },
  {
    id: "21",
    title: "Professional Sketch Pencils",
    description: "Complete set of sketch pencils in metal tin case. Various grades from 2H to 6B for all your drawing needs.",
    price: 9.99,
    image: sketchPencilsImg,
    category: "crafts"
  },
  {
    id: "22",
    title: "Acrylic Paint Set (12 Colors)",
    description: "Vibrant acrylic paints in 12 colors. Perfect for canvas, wood, and various craft projects.",
    price: 10.99,
    image: acrylicPaintsImg,
    category: "crafts"
  },
  {
    id: "23",
    title: "Craft Foam Sheets (Assorted)",
    description: "Pack of colorful craft foam sheets. Soft, flexible, and perfect for kids' crafts and creative projects.",
    price: 3.49,
    image: foamSheetsImg,
    category: "crafts"
  }
];
