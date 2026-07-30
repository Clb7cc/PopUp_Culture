export type ListingCategory = "retail" | "event" | "photoshoot" | "gallery" | "culinary";

export type CoArtist = {
  id: string;
  name: string;
  avatar: string;
  type: string;
  instagram?: string;
  dateRange: string;
  section?: string;
  verified: boolean;
};

export type Listing = {
  id: string;
  title: string;
  category: ListingCategory;
  neighborhood: string;
  city: string;
  blurb: string;
  description: string;
  image: string;
  images: string[];
  price: number;
  unit: "hour" | "day";
  capacity: number;
  deposit: number;
  sqft: number;
  rating: number;
  reviewsCount: number;
  host: {
    name: string;
    avatar: string;
    verified: boolean;
    insurance: string;
    responseTime: string;
    bio: string;
  };
  rules: string[];
  amenities: string[];
  address: string;
  lat: number;
  lng: number;
  featured?: boolean;
  sharingEnabled: boolean;
  availableSlots?: number;
  coArtists?: CoArtist[];
};

// Reliable image helper — all from Unsplash with stable IDs
const IMG = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const LISTINGS: Listing[] = [
  // ── 1. Queen West Glasshouse Storefront ──────────────────────────────
  {
    id: "queen-west-glasshouse",
    title: "Queen West Glasshouse Storefront",
    category: "retail",
    neighborhood: "Queen West",
    city: "Toronto",
    blurb: "Floor-to-ceiling glass display on Toronto's premier fashion drag.",
    description:
      "Located right in the beating heart of West Queen West, this 1,800 sq ft minimalist venue features soaring 14-foot ceilings, polished concrete floors, customizable modular clothing racks, and track lighting tuned for high-impact brand activations, boutique retail pop-ups, and product launches.",
    image:   IMG("1555529669-e69e7aa0ba9a"),
    images: [
      IMG("1555529669-e69e7aa0ba9a"),
      IMG("1567401893414-76b7b1e5a7a5"),
      IMG("1441986300917-64674bd600d8"),
      IMG("1513151233558-d860c5398176"),
    ],
    price: 180,
    unit: "hour",
    capacity: 75,
    deposit: 500,
    sqft: 1800,
    rating: 4.96,
    reviewsCount: 42,
    host: {
      name: "Marcus Vance",
      avatar: IMG("1534528741775-53994a69daeb", 300),
      verified: true,
      insurance: "Full $2M Commercial General Liability Coverage",
      responseTime: "Responds in under 15 minutes",
      bio: "Retail interior designer with 10+ years hosting pop-ups for independent brands and international labels.",
    },
    rules: [
      "No open flames or pyrotechnics",
      "Load-in via side lane accessibility doors only",
      "Sound levels limited to 85 dB after 10 PM",
      "Space returned swept and trash bagged",
    ],
    amenities: [
      "High-speed Wi-Fi 6",
      "Modular retail racks & shelving",
      "Dimmable museum-grade LED track lighting",
      "Private fitting rooms (2)",
      "Sonos Sound System",
      "ADA Compliant Entrance",
    ],
    address: "942 Queen Street West, Toronto, ON M6J 1G8",
    lat: 43.6449,
    lng: -79.4172,
    featured: true,
    sharingEnabled: false,
  },

  // ── 2. Yorkville Marble & Gallery Loft ───────────────────────────────
  {
    id: "yorkville-gallery-loft",
    title: "Yorkville Marble & Gallery Loft",
    category: "gallery",
    neighborhood: "Yorkville",
    city: "Toronto",
    blurb: "Sleek architectural gallery space for fine art, jewellery, and luxury launches.",
    description:
      "An elegant, sun-drenched gallery situated steps from Bloor Street luxury boutiques. Designed with Venetian plaster walls, Italian marble accents, and museum-grade picture hanging systems — perfect for high-end art exhibitions, VIP trunk shows, and private dinner experiences.",
    image:   IMG("1600585154340-be6161a56a0c"),
    images: [
      IMG("1600585154340-be6161a56a0c"),
      IMG("1513694203232-719a280e022f"),
      IMG("1582555172866-f73bb12a2ab3"),
      IMG("1513889961551-628c1e5e2ee9"),
    ],
    price: 250,
    unit: "hour",
    capacity: 110,
    deposit: 1000,
    sqft: 2400,
    rating: 4.98,
    reviewsCount: 29,
    host: {
      name: "Sophia Sterling",
      avatar: IMG("1580489944761-15a19d654956", 300),
      verified: true,
      insurance: "Full $5M Fine Art & Commercial Umbrella Policy",
      responseTime: "Responds within 30 minutes",
      bio: "Curator and gallery owner specialising in contemporary installations and high-concept pop-ups.",
    },
    rules: [
      "No food or drink near unframed artwork",
      "Only approved gallery hanging wire system to be used on walls",
      "Security guard required for events exceeding 60 guests",
    ],
    amenities: [
      "Gallery Hanging System",
      "Climate & Humidity Controlled Environment",
      "Catering Prep Kitchen",
      "Valet Parking Available",
      "Wireless Security Cameras",
      "Motorised Blackout Blinds",
    ],
    address: "128 Cumberland Street, Toronto, ON M5R 1A6",
    lat: 43.6705,
    lng: -79.3924,
    featured: true,
    sharingEnabled: false,
  },

  // ── 3. King West Skyline Terrace ──────────────────────────────────────
  {
    id: "king-west-skyline-terrace",
    title: "King West Skyline Terrace & Lounge",
    category: "event",
    neighborhood: "King West",
    city: "Toronto",
    blurb: "Panoramic CN Tower views, outdoor lounge, and cocktail bar setup.",
    description:
      "Perched high above King West's entertainment district, this penthouse combines a 1,500 sq ft indoor lounge with a heated 1,200 sq ft wrap-around terrace boasting unobstructed views of the Toronto skyline and CN Tower. Ideal for brand activations, cocktail receptions, and corporate networking.",
    image:   IMG("1519167758481-83f550bb49b3"),
    images: [
      IMG("1519167758481-83f550bb49b3"),
      IMG("1533105079780-92b9be482077"),
      IMG("1571896349842-33c89424de2d"),
      IMG("1507679799987-c73779587ccf"),
    ],
    price: 320,
    unit: "hour",
    capacity: 120,
    deposit: 1200,
    sqft: 2700,
    rating: 4.93,
    reviewsCount: 56,
    host: {
      name: "Liam O'Connor",
      avatar: IMG("1507003211169-0a1dd7228f2d", 300),
      verified: true,
      insurance: "Full $2M Commercial & Liquor Liability Included",
      responseTime: "Responds in under 10 minutes",
      bio: "Hospitality entrepreneur managing boutique event spaces across downtown Toronto.",
    },
    rules: [
      "Outdoor terrace music off at 11 PM (city noise ordinance)",
      "Licensed bartenders mandatory for alcohol service",
      "No glass on terrace edge ledges",
    ],
    amenities: [
      "Heated Wrap-around Terrace",
      "Built-in Marble Cocktail Bar",
      "Pro DJ Booth & HK Audio System",
      "Freight Elevator Access",
      "Lounge Furniture Included",
      "RGB LED Mood Lighting",
    ],
    address: "560 King Street West, Toronto, ON M5V 1M3",
    lat: 43.6444,
    lng: -79.3985,
    featured: true,
    sharingEnabled: false,
  },

  // ── 4. Kensington Sunlit Studio ───────────────────────────────────────
  {
    id: "kensington-sunlit-studio",
    title: "Kensington Sunlit Creative Studio",
    category: "photoshoot",
    neighborhood: "Kensington Market",
    city: "Toronto",
    blurb: "Industrial brick loft with south-facing natural light and photo cyclorama.",
    description:
      "A bright, bohemian industrial studio in quirky Kensington Market. Features original exposed brickwork, 16-ft timber beams, a 15 × 15 ft white seamless cyclorama wall, and a curated library of vintage props, plants, and backdrops. Perfect for fashion lookbooks, editorial shoots, and video podcasts.",
    image:   IMG("1598928506311-c55ded91a20c"),
    images: [
      IMG("1598928506311-c55ded91a20c"),
      IMG("1524758631624-e2822e304c36"),
      IMG("1513519245088-0e12902e5a38"),
      IMG("1560518883-ce09059eeffa"),
    ],
    price: 95,
    unit: "hour",
    capacity: 35,
    deposit: 300,
    sqft: 1200,
    rating: 4.99,
    reviewsCount: 88,
    host: {
      name: "Elena Rostova",
      avatar: IMG("1544005313-94ddf0286df2", 300),
      verified: true,
      insurance: "Full $2M Studio Liability Coverage",
      responseTime: "Responds in under 5 minutes",
      bio: "Commercial photographer and set stylist passionate about providing creative space for independent artists.",
    },
    rules: [
      "Shoe-free on white cyclorama (overshoes provided)",
      "No glitter or confetti without written consent",
      "Clean up props and reset equipment before rental end time",
    ],
    amenities: [
      "15×15 White Cyclorama Wall",
      "South-Facing Factory Windows",
      "Godox Lighting Strobes & Softboxes",
      "Full Makeup Station & Steamer",
      "Vintage Velvet Sofas & Plants",
      "High-speed Fiber Wi-Fi",
    ],
    address: "74 Kensington Avenue, Toronto, ON M5T 2K1",
    lat: 43.6547,
    lng: -79.4005,
    featured: true,
    sharingEnabled: false,
  },

  // ── 5. Distillery Heritage Warehouse ─────────────────────────────────
  {
    id: "distillery-heritage-warehouse",
    title: "Distillery Heritage Brick Warehouse",
    category: "culinary",
    neighborhood: "Distillery District",
    city: "Toronto",
    blurb: "Historic Victorian brick hall with commercial tasting kitchen and bar.",
    description:
      "Located within the cobblestone avenues of the historic Distillery District, this 1890s brick warehouse boasts soaring timber rafters, exposed ductwork, and a fully equipped chef's prep kitchen — ideal for food pop-ups, chef dinners, wine tastings, and craft market activations.",
    image:   IMG("1517248135467-4c7edcad34c4"),
    images: [
      IMG("1517248135467-4c7edcad34c4"),
      IMG("1555396273-367ea4eb4db5"),
      IMG("1550966871-3ed3cdb5ed0c"),
      IMG("1414235077428-338989a2e8c0"),
    ],
    price: 210,
    unit: "hour",
    capacity: 150,
    deposit: 750,
    sqft: 3100,
    rating: 4.91,
    reviewsCount: 34,
    host: {
      name: "Mateo Rossi",
      avatar: IMG("1500648767791-00dcc994a43e", 300),
      verified: true,
      insurance: "Full $2M Hospitality & Food Safety Insurance",
      responseTime: "Responds in under 20 minutes",
      bio: "Restaurateur and event producer dedicated to hosting unique culinary pop-ups in Toronto.",
    },
    rules: [
      "Kitchen grease trap guidelines must be strictly followed",
      "Compost, recycling, and garbage sorting mandatory",
      "Distillery District pedestrian access only (loading bay for setup)",
    ],
    amenities: [
      "Commercial Gas Range & Convection Ovens",
      "Walk-in Refrigeration Unit",
      "Rustic Oak Dining Tables & Chairs (seats 80)",
      "Sound System & Wireless Microphones",
      "Double Bay Loading Dock",
      "Dishwashing Station",
    ],
    address: "28 Tank House Lane, Toronto, ON M5A 3C4",
    lat: 43.6503,
    lng: -79.3596,
    featured: false,
    sharingEnabled: false,
  },

  // ── 6. Ossington Corner Fashion Pop-Up ────────────────────────────────
  {
    id: "ossington-boutique-corner",
    title: "Ossington Corner Fashion Pop-Up",
    category: "retail",
    neighborhood: "Ossington Strip",
    city: "Toronto",
    blurb: "High foot-traffic corner space on Toronto's trendiest cultural corridor.",
    description:
      "Positioned right on the vibrant Ossington Strip, surrounded by acclaimed restaurants, cocktail bars, and streetwear boutiques. Features massive double-corner window exposure, clean white walls, energy-efficient warm lighting, and a turn-key POS setup.",
    image:   IMG("1528698827591-e19ccd7bc23d"),
    images: [
      IMG("1528698827591-e19ccd7bc23d"),
      IMG("1472851294608-062f824d29cc"),
      IMG("1441984904996-e0b6ba687e04"),
      IMG("1560518883-ce09059eeffa"),
    ],
    price: 160,
    unit: "hour",
    capacity: 60,
    deposit: 450,
    sqft: 1400,
    rating: 4.95,
    reviewsCount: 51,
    host: {
      name: "Chloe Tremblay",
      avatar: IMG("1534528741775-53994a69daeb", 300),
      verified: true,
      insurance: "Full $2M Retail Property & Liability Protection",
      responseTime: "Responds in under 10 minutes",
      bio: "Fashion buyer and venue owner helping local and global fashion brands activate temporary shops.",
    },
    rules: [
      "Window decals permitted with non-damaging vinyl",
      "No food preparation on premises",
      "Storefront sidewalk clearance maintained for pedestrians",
    ],
    amenities: [
      "Double Corner Display Windows",
      "Integrated Square POS Dock",
      "Stockroom & Inventory Storage Loft",
      "Customisable Branding Backdrop",
      "Security Alarm & Smart Locks",
      "High-speed Wi-Fi",
    ],
    address: "215 Ossington Avenue, Toronto, ON M6J 2Z8",
    lat: 43.6481,
    lng: -79.4198,
    featured: false,
    sharingEnabled: false,
  },

  // ── 7. Kensington Collective — CO-SHARING EXAMPLE ─────────────────────
  {
    id: "kensington-shared-collective",
    title: "Kensington Collective — Multi-Artist Studio",
    category: "retail",
    neighborhood: "Kensington Market",
    city: "Toronto",
    blurb: "Split-cost creative hub: 3 independently curated zones in one open-plan loft.",
    description:
      "A sprawling 2,600 sq ft open-plan loft in the heart of Kensington Market, thoughtfully divided into three distinct artist zones: a front glass retail zone (~800 sq ft), a central studio stage with natural brick backdrop (~1,000 sq ft), and a rear lounge/gallery wall section (~800 sq ft). Each zone can be booked independently or the full space rented as one unit. Up to 3 independent artists or brands can share the address simultaneously — reducing costs dramatically while creating a curated multi-brand market experience for visitors.",
    image:   IMG("1513519245088-0e12902e5a38"),
    images: [
      IMG("1513519245088-0e12902e5a38"),
      IMG("1524758631624-e2822e304c36"),
      IMG("1598928506311-c55ded91a20c"),
      IMG("1441984904996-e0b6ba687e04"),
    ],
    price: 85,
    unit: "hour",
    capacity: 90,
    deposit: 350,
    sqft: 2600,
    rating: 4.97,
    reviewsCount: 63,
    host: {
      name: "Priya Nair",
      avatar: IMG("1487412720507-e7ab37603c6f", 300),
      verified: true,
      insurance: "Full $2M Multi-Tenant Commercial Liability",
      responseTime: "Responds in under 10 minutes",
      bio: "Artist and community space curator focused on making premium creative real estate accessible and affordable for independent Toronto artists.",
    },
    rules: [
      "Each artist is responsible for their designated zone only",
      "Shared entrance and washrooms — mutual respect required",
      "No competing product categories permitted on the same booking weekend",
      "All co-tenants must sign individual digital agreements",
    ],
    amenities: [
      "3 Independently Curated Zones (800 sqft each)",
      "Shared Front Glass Retail Display Window",
      "Modular Pegboards & Floating Shelves (each zone)",
      "Individual Zone Lighting Control",
      "Shared High-speed Wi-Fi & Square POS",
      "Shared Loading Bay Access",
    ],
    address: "188 Augusta Avenue, Toronto, ON M5T 2L5",
    lat: 43.6553,
    lng: -79.402,
    featured: true,
    sharingEnabled: true,
    availableSlots: 2,
    coArtists: [
      {
        id: "artist-luna-park",
        name: "Luna Park Studio",
        avatar: IMG("1531746020798-e6953c6e8e04", 300),
        type: "Ceramic & Textile Artist",
        instagram: "@lunaparkstudio",
        dateRange: "Aug 8–10, 2026",
        section: "Zone A — Front Glass Retail Display",
        verified: true,
      },
    ],
  },
];

export function getListingById(id: string): Listing | undefined {
  return LISTINGS.find((l) => l.id === id);
}

export function searchListings(
  query?: string,
  category?: string,
  neighborhood?: string
): Listing[] {
  return LISTINGS.filter((l) => {
    if (query) {
      const q = query.toLowerCase();
      if (
        !l.title.toLowerCase().includes(q) &&
        !l.blurb.toLowerCase().includes(q) &&
        !l.neighborhood.toLowerCase().includes(q) &&
        !l.category.toLowerCase().includes(q)
      )
        return false;
    }
    if (category && category !== "all" && l.category !== category) return false;
    if (neighborhood && neighborhood !== "all" && l.neighborhood !== neighborhood)
      return false;
    return true;
  });
}
