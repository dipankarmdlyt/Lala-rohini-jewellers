export const BRAND_NAME = "Lala Rohini Jewellers";
export const BRAND_TAGLINE = "Legacy of Elegance, Crafted for Generations";

export const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Catalog", href: "#catalog" },
  { name: "Bridal", href: "#bridal" },
  { name: "Try-On", href: "#try-on" },
  { name: "Store", href: "#contact" },
];

export const CATEGORIES = [
  {
    id: "gold",
    title: "Gold Jewellery",
    image: "https://images.unsplash.com/photo-1611085583191-a3b1a308c021?auto=format&fit=crop&q=80&w=800",
    description: "22K BIS Hallmarked gold masterpieces."
  },
  {
    id: "diamond",
    title: "Diamond Collection",
    image: "https://images.unsplash.com/photo-1615655404745-a10d242f1345?auto=format&fit=crop&q=80&w=800",
    description: "Certified brilliant cut diamonds."
  },
  {
    id: "bridal",
    title: "Bridal Suite",
    image: "https://images.unsplash.com/photo-1601054704854-1a2e79dea4d3?auto=format&fit=crop&q=80&w=800",
    description: "Heritage sets for your special day."
  },
  {
    id: "silver",
    title: "Silver Artistry",
    image: "https://images.unsplash.com/photo-1635767798638-3e2827e84236?auto=format&fit=crop&q=80&w=800",
    description: "Premium 925 sterling silver gifts."
  }
];

export const ALL_PRODUCTS = [
  // BRIDAL COLLECTION (High-Ticket)
  {
    id: 1,
    name: "Maharani Heritage Polki Choker Set",
    category: "Bridal",
    collection: "Heritage",
    metal: "22K Gold",
    gemstone: "Polki & Emeralds",
    occasion: "Wedding",
    priceRange: "Above 5L",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1599643477193-a3a71059ef8d?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1599643477193-a3a71059ef8d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1611085583191-a3b1a308c021?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1591115765373-520b7a21769b?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A royal masterpiece featuring uncut diamonds and Zambian emeralds, handcrafted for the traditional Indian bride.",
    tag: "Bridal Pick"
  },
  {
    id: 2,
    name: "Regal Kundan Bridal Haram",
    category: "Bridal",
    collection: "Heritage",
    metal: "22K Gold",
    gemstone: "Kundan & Rubies",
    occasion: "Wedding",
    priceRange: "Above 8L",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1615655404745-a10d242f1345?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1615655404745-a10d242f1345?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1599643477193-a3a71059ef8d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1591115765373-520b7a21769b?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Multi-layered long necklace featuring meticulous kundan work and hand-strung South Sea pearls.",
    tag: "Exquisite"
  },
  {
    id: 3,
    name: "Devi Temple Nakshi Waistbelt",
    category: "Bridal",
    collection: "Heritage",
    metal: "22K Gold",
    gemstone: "None",
    occasion: "Wedding",
    priceRange: "Above 3L",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1629227352021-c73ab78a1366?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Traditional Vaddanam featuring intricate carvings of Goddess Lakshmi, symbolizing prosperity.",
    tag: "Trending"
  },
  {
    id: 4,
    name: "Aadhya Signature Diamond Mangalsutra",
    category: "Bridal",
    collection: "Modern",
    metal: "18K Gold",
    gemstone: "Diamond",
    occasion: "Daily Wear",
    priceRange: "1L - 2L",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1638309102462-fc8e121703e4?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1638309102462-fc8e121703e4?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1635445210344-9333918a032d?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A contemporary take on a sacred tradition, featuring VS-GH clarity diamonds in a sleek gold chain.",
    tag: "Best Seller"
  },
  {
    id: 5,
    name: "Royal Peacock Antique Jhumkas",
    category: "Bridal",
    collection: "Heritage",
    metal: "22K Gold",
    gemstone: "Ruby & Emerald",
    occasion: "Wedding",
    priceRange: "2L - 4L",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1630030538559-911246948cbe?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1630030538559-911246948cbe?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1599643477193-a3a71059ef8d?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Heirloom-quality earrings with traditional bird motifs and dangling seed pearls.",
    tag: "Trending"
  },
  {
    id: 6,
    name: "Celestial Diamond Bridal Tiara",
    category: "Bridal",
    collection: "Modern",
    metal: "Platinum",
    gemstone: "Diamond",
    occasion: "Wedding",
    priceRange: "Above 10L",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1515562141207-7a18b5ce7142?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a18b5ce7142?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A crown of light featuring pear and marquise cut diamonds for a princess-inspired look.",
    tag: "Limited Design"
  },

  // GOLD JEWELLERY
  {
    id: 7,
    name: "Sovereign Gold Coin Necklace",
    category: "Gold",
    collection: "Heritage",
    metal: "22K Gold",
    gemstone: "None",
    occasion: "Festive",
    priceRange: "1L - 3L",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1542385151-50e567210e74?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1542385151-50e567210e74?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A timeless Lakshmi coin necklace with a contemporary matte finish for elegant festive styling.",
    tag: "Trending"
  },
  {
    id: 8,
    name: "Aarohi Triple Layered Gold Mala",
    category: "Gold",
    collection: "Heritage",
    metal: "22K Gold",
    gemstone: "None",
    occasion: "Party",
    priceRange: "3L - 5L",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1611085583191-a3b1a308c021?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1611085583191-a3b1a308c021?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1630030538559-911246948cbe?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Sophisticated three-strand necklace with precision-cut beads that catch light at every angle.",
    tag: "Handcrafted"
  },
  {
    id: 9,
    name: "Lustrous CNC Finished Bangles",
    category: "Gold",
    collection: "Modern",
    metal: "22K Gold",
    gemstone: "None",
    occasion: "Daily Wear",
    priceRange: "50k - 1L",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1629227352021-c73ab78a1366?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1629227352021-c73ab78a1366?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1615655404745-a10d242f1345?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Ultra-modern bangles with laser-cut detailing for everyday luxury and durability.",
    tag: "Modernist"
  },
  {
    id: 10,
    name: "Floral Meenakari Enamel Jhumas",
    category: "Gold",
    collection: "Heritage",
    metal: "22K Gold",
    gemstone: "None",
    occasion: "Social",
    priceRange: "1L - 2L",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1630030538559-911246948cbe?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1630030538559-911246948cbe?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1602751584552-8ba7a8ad6531?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Vibrant enamel work from Bikaner met Heritage Gold, creating a splash of color and culture.",
    tag: "Trending"
  },
  {
    id: 11,
    name: "Classic Khada Bangle Pair",
    category: "Gold",
    collection: "Heritage",
    metal: "22K Gold",
    gemstone: "None",
    occasion: "Daily Wear",
    priceRange: "2L - 4L",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1629227352021-c73ab78a1366?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1629227352021-c73ab78a1366?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1611085583191-a3b1a308c021?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Solid 22K gold bracelets with a high-polish finish, perfect for layering or wearing solo.",
    tag: "Timeless"
  },
  {
    id: 12,
    name: "Infinity Gold Knot Ring",
    category: "Gold",
    collection: "Modern",
    metal: "22K Gold",
    gemstone: "None",
    occasion: "Gift",
    priceRange: "Under 50k",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1627252827522-13657aa4cabc?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1627252827522-13657aa4cabc?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A delicate symbol of eternal love, crafted in hallmarked yellow gold.",
    tag: "Perfect Gift"
  },

  // DIAMOND JEWELLERY
  {
    id: 13,
    name: "Stellar Solitaire Engagement Ring",
    category: "Diamond",
    collection: "Modern",
    metal: "Platinum",
    gemstone: "Diamond",
    occasion: "Engagement",
    priceRange: "Above 2L",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A breathtaking 1.5ct IGI certified diamond set in a minimalist four-prong platinum band.",
    tag: "Enquiry High"
  },
  {
    id: 14,
    name: "Infinite Loop Diamond Tennis Bracelet",
    category: "Diamond",
    collection: "Modern",
    metal: "18K White Gold",
    gemstone: "Diamond",
    occasion: "Evening Wear",
    priceRange: "Above 5L",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1598560912005-59a1cc557e2d?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A continuous circle of 5ct brilliant-cut diamonds, representing infinite elegance.",
    tag: "Luxury"
  },
  {
    id: 15,
    name: "Ethereal Diamond Halo Earrings",
    category: "Diamond",
    collection: "Modern",
    metal: "18K Gold",
    gemstone: "Diamond",
    occasion: "Social",
    priceRange: "1L - 2L",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1588444839799-eb6bf27e346a?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1588444839799-eb6bf27e346a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Classic round studs surrounded by a halo of micro-diamonds for maximum brilliance.",
    tag: "Crowd Favorite"
  },
  {
    id: 16,
    name: "Baguette Cut Stackable Band",
    category: "Diamond",
    collection: "Modern",
    metal: "18K Rose Gold",
    gemstone: "Diamond",
    occasion: "Daily Wear",
    priceRange: "50k - 1L",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1627252827522-13657aa4cabc?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Modern baguette diamonds in a sleek rose gold setting, designed for the contemporary woman.",
    tag: "Minimalist"
  },
  {
    id: 17,
    name: "Champagne Diamond Cocktail Ring",
    category: "Diamond",
    collection: "Modern",
    metal: "18K Gold",
    gemstone: "Yellow Diamond",
    occasion: "Party",
    priceRange: "Above 3L",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1598560912005-59a1cc557e2d?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1598560912005-59a1cc557e2d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A center cushion-cut yellow diamond paired with pavé white diamonds for a bold statement.",
    tag: "Unique"
  },

  // SILVER JEWELLERY (Accessible)
  {
    id: 18,
    name: "Sterling Filigree Bridal Anklets",
    category: "Silver",
    collection: "Heritage",
    metal: "Silver",
    gemstone: "None",
    occasion: "Wedding",
    priceRange: "Under 50k",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1635767798638-3e2827e84236?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1635767798638-3e2827e84236?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1599643477193-a3a71059ef8d?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Heavily oxidized sterling silver anklets with traditional Rajasthani filigree work.",
    tag: "Artisanal"
  },
  {
    id: 19,
    name: "Moissanite Silver Statement Pendant",
    category: "Silver",
    collection: "Modern",
    metal: "Silver",
    gemstone: "Moissanite",
    occasion: "Daily Wear",
    priceRange: "Under 50k",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1629227352021-c73ab78a1366?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1629227352021-c73ab78a1366?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1635767798638-3e2827e84236?auto=format&fit=crop&q=80&w=800"
    ],
    description: "High-brilliance moissanite stones set in hallmarked 92.5 sterling silver.",
    tag: "Trending"
  },
  {
    id: 20,
    name: "Modernist Silver Torque Choker",
    category: "Silver",
    collection: "Modern",
    metal: "Silver",
    gemstone: "None",
    occasion: "Social",
    priceRange: "Under 20k",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1515562141207-7a18b5ce7142?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a18b5ce7142?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1635767798638-3e2827e84236?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A bold, minimalist neckpiece featuring hand-polished silver for a chic, industrial look.",
    tag: "Trendsetter"
  },
  // ADDITIONAL GOLD
  {
    id: 21,
    name: "Floral Filigree Gold Kada",
    category: "Gold",
    collection: "Heritage",
    metal: "22K Gold",
    gemstone: "None",
    occasion: "Festive",
    priceRange: "1L - 2L",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1535633302704-b02f4faad7b1?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1535633302704-b02f4faad7b1?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1611085583191-a3b1a308c021?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Opulent openable kada featuring fine wire-work patterns inspired by Mughal gardens.",
    tag: "Artisanal"
  },
  {
    id: 22,
    name: "Geometric Gold Drop Earrings",
    category: "Gold",
    collection: "Modern",
    metal: "22K Gold",
    gemstone: "None",
    occasion: "Daily Wear",
    priceRange: "30k - 50k",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1630030538559-911246948cbe?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1630030538559-911246948cbe?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1602751584552-8ba7a8ad6531?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Contemporary lightweight drops designed for the modern workspace.",
    tag: "Trending"
  },
  {
    id: 23,
    name: "Guttapusalu Signature Necklace",
    category: "Gold",
    collection: "Heritage",
    metal: "22K Gold",
    gemstone: "Pearls & Rubies",
    occasion: "Wedding",
    priceRange: "Above 4L",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1615655404745-a10d242f1345?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1615655404745-a10d242f1345?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1599643477193-a3a71059ef8d?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Classic South Indian fringe necklace with bunches of small pearls and vibrant rubies.",
    tag: "Heritage Pick"
  },
  // ADDITIONAL DIAMOND
  {
    id: 24,
    name: "Starlight Diamond Tennis Necklace",
    category: "Diamond",
    collection: "Modern",
    metal: "18K White Gold",
    gemstone: "Diamond",
    occasion: "Red Carpet",
    priceRange: "Above 8L",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1599643477193-a3a71059ef8d?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1599643477193-a3a71059ef8d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Over 10 carats of high-clarity diamonds in a seamless white gold setting.",
    tag: "Limited Design"
  },
  {
    id: 25,
    name: "Vintage Pear-Cut Halo Ring",
    category: "Diamond",
    collection: "Modern",
    metal: "18K Gold",
    gemstone: "Diamond",
    occasion: "Engagement",
    priceRange: "1L - 3L",
    price: "Enquire for Price",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1598560912005-59a1cc557e2d?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A romantic pear-shaped center stone accented by a brilliant diamond halo.",
    tag: "Best Seller"
  }
];

export const FEATURED_PRODUCTS = [
  ...ALL_PRODUCTS.filter(p => p.tag === "Best Seller"),
  ...ALL_PRODUCTS.filter(p => p.tag === "Bridal Pick").slice(0, 2),
  ...ALL_PRODUCTS.filter(p => p.tag === "Limited Design").slice(0, 1)
];

export const TRUST_INDICATORS = [
  { label: "BIS Hallmark", sub: "100% Certified Gold" },
  { label: "IGA Certified", sub: "GIA/IGI Graded Diamonds" },
  { label: "40+ Years", sub: "Legacy of Trust" },
  { label: "Custom Craft", sub: "Bespoke Design Studio" }
];
