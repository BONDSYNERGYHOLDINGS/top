export interface Property {
  id: string;
  title: string;
  price: string;
  priceRaw: number;
  location: string;
  state: string;
  shortDesc: string;
  fullDesc: string;
  type: "house" | "apartment" | "land" | "commercial";
  status: "for-sale" | "for-rent" | "sold";
  bedrooms?: number;
  bathrooms?: number;
  area: string;
  yearBuilt?: number;
  features: string[];
  images: string[];
  featured: boolean;
  agent: {
    name: string;
    phone: string;
    whatsapp: string;
  };
}

const MAIN_AGENT = {
  name: "Tayo Dosunmo",
  phone: "+2348056368084",
  whatsapp: "2348056368084",
};

export const properties: Property[] = [
  
  {
    id: "luxury-villa-ikoyi",
    title: "Luxury Villa in Ikoyi",
    price: "₦450,000,000",
    priceRaw: 450000000,
    location: "Ikoyi, Lagos",
    state: "Lagos",
    shortDesc: "A breathtaking 5-bedroom luxury villa with panoramic views, infinity pool, and world-class finishes.",
    fullDesc: "Nestled in the heart of Ikoyi, one of Lagos's most prestigious neighborhoods, this extraordinary villa redefines luxury living in Nigeria. The property features soaring ceilings, floor-to-ceiling windows flooding every room with natural light, and a seamless blend of indoor-outdoor living spaces. The gourmet kitchen comes equipped with top-of-the-line appliances, custom cabinetry, and a large center island perfect for entertaining. The master suite is a true retreat with a private terrace overlooking the lush garden, a spa-like bathroom with soaking tub, and a massive walk-in wardrobe. Four additional en-suite bedrooms offer unparalleled comfort for family and guests. The outdoor space features an infinity pool, landscaped gardens, and an outdoor kitchen—ideal for entertaining Lagos's elite.",
    type: "house",
    status: "for-sale",
    bedrooms: 5,
    bathrooms: 6,
    area: "650 sqm",
    yearBuilt: 2022,
    features: [
      "Infinity Swimming Pool",
      "Smart Home System",
      "24/7 Security & CCTV",
      "Generator & Solar Backup",
      "3-Car Garage",
      "Home Theatre",
      "Gym & Spa",
      "Outdoor Kitchen",
      "Water Treatment System",
      "Fiber Optic Internet",
      "Serviced Estate",
      "Staff Quarters",
    ],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687644-c7171b41b1b6?w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=85",
    ],
    featured: true,
    agent: MAIN_AGENT
  },
  {
    id: "modern-penthouse-vi",
    title: "Modern Penthouse – Victoria Island",
    price: "₦280,000,000",
    priceRaw: 280000000,
    location: "Victoria Island, Lagos",
    state: "Lagos",
    shortDesc: "Stunning 4-bedroom penthouse with panoramic ocean views and rooftop terrace in the heart of VI.",
    fullDesc: "This extraordinary penthouse sits atop one of Victoria Island's most iconic towers, offering jaw-dropping panoramic views of the Lagos Lagoon and Atlantic Ocean. Spanning an entire floor, the open-plan living and dining area is designed for those who appreciate the finer things in life. Floor-to-ceiling glass walls blur the boundary between interior luxury and the breathtaking cityscape. The chef's kitchen features imported Italian marble, integrated Miele appliances, and a wine cellar. The master bedroom suite occupies its own wing, with an ocean-facing private terrace, a rain shower with views, and two separate dressing rooms. Three additional bedrooms each offer en-suite bathrooms and their own balconies. The crown jewel is the private rooftop terrace—a 200sqm outdoor paradise perfect for sunsets, cocktail parties, or quiet reflection above the city.",
    type: "apartment",
    status: "for-sale",
    bedrooms: 4,
    bathrooms: 5,
    area: "480 sqm",
    yearBuilt: 2023,
    features: [
      "360° Panoramic Views",
      "Private Rooftop Terrace",
      "Italian Marble Finishes",
      "Miele Kitchen Appliances",
      "Wine Cellar",
      "Private Elevator Access",
      "Concierge Service",
      "Smart Home Automation",
      "2 Parking Spaces",
      "Swimming Pool Access",
      "Fully Fitted Gym",
      "24hr Doorman",
    ],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=85",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=85",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=1200&q=85",
      "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=1200&q=85",
    ],
    featured: true,
    agent: MAIN_AGENT
  },
  {
    id: "estate-land-lekki",
    title: "Prime Estate Land – Lekki Phase 2",
    price: "₦85,000,000",
    priceRaw: 85000000,
    location: "Lekki Phase 2, Lagos",
    state: "Lagos",
    shortDesc: "600 sqm C-of-O land in a fast-developing gated estate with all infrastructure already in place.",
    fullDesc: "This is a rare opportunity to acquire a prime plot of land in one of Lekki's fastest-growing gated communities. With all infrastructure already in place—including paved roads, drainage systems, electricity, and water—this 600 sqm plot is ready for immediate development. The estate is fully secured with perimeter fencing, CCTV surveillance, and 24-hour security personnel. Located just minutes from Lekki-Epe Expressway, this land enjoys excellent accessibility to major commercial hubs, international schools, hospitals, and shopping centers. The Certificate of Occupancy (C-of-O) is ready and available—a rarity that guarantees your investment is fully protected. The estate already houses several completed luxury homes, signaling the premium character of the neighborhood.",
    type: "land",
    status: "for-sale",
    area: "600 sqm",
    features: [
      "Certificate of Occupancy (C-of-O)",
      "Paved Estate Roads",
      "Drainage System",
      "Street Lighting",
      "Water & Electricity",
      "Perimeter Fencing",
      "24hr Security",
      "CCTV Surveillance",
      "Proximity to Expressway",
      "Surveyed & Mapped",
    ],
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=85",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=85",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=85",
    ],
    featured: false,
    agent: MAIN_AGENT
  },
  {
    id: "smart-apartment-abuja",
    title: "Smart 3-Bed Apartment – Maitama",
    price: "₦120,000,000",
    priceRaw: 120000000,
    location: "Maitama, Abuja",
    state: "Abuja",
    shortDesc: "Ultra-modern 3-bedroom smart apartment in Abuja's most exclusive district with premium finishes.",
    fullDesc: "This ultra-modern apartment in Maitama—Abuja's most sought-after residential district—represents the pinnacle of contemporary urban living. The property has been finished to the highest possible standard, with Italian porcelain tiles, imported kitchen fittings, and custom-designed wardrobes in every bedroom. The open-plan living and dining area opens onto a large private balcony with sweeping views of the Maitama skyline. The smart home system allows you to control lighting, climate, security, and entertainment from your smartphone. The compound features a heated swimming pool, state-of-the-art gym, and beautifully landscaped gardens maintained by the professional estate management team.",
    type: "apartment",
    status: "for-sale",
    bedrooms: 3,
    bathrooms: 4,
    area: "220 sqm",
    yearBuilt: 2023,
    features: [
      "Smart Home System",
      "Italian Porcelain Tiles",
      "Imported Kitchen Fittings",
      "Private Balcony",
      "Swimming Pool",
      "Gym & Recreation",
      "Generator Backup",
      "24hr Security",
      "1 Parking Space",
      "Fiber Internet",
    ],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1200&q=85",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=85",
    ],
    featured: true,
    agent: MAIN_AGENT
  },
  {
    id: "colonial-mansion-gra",
    title: "Colonial Mansion – GRA Ikeja",
    price: "₦320,000,000",
    priceRaw: 320000000,
    location: "GRA Ikeja, Lagos",
    state: "Lagos",
    shortDesc: "Majestic 6-bedroom colonial mansion on a 1,200 sqm plot in the prestigious GRA Ikeja.",
    fullDesc: "Standing proudly on a 1,200 sqm corner plot in the prestigious GRA Ikeja, this majestic colonial mansion combines timeless architectural elegance with modern comfort. The property was fully renovated in 2021 to the highest standards while preserving its classic character—wide verandas, high ceilings, hardwood floors, and ornate architectural details that speak to a bygone era of grandeur. The ground floor features a grand entrance foyer, formal living and dining rooms, a family room, study, and a fully equipped modern kitchen. Upstairs, six generous en-suite bedrooms offer luxurious accommodation. The grounds include a swimming pool, tropical garden, tennis court, and a separate self-contained guest chalet. This is a statement property for buyers who demand the very best.",
    type: "house",
    status: "for-sale",
    bedrooms: 6,
    bathrooms: 7,
    area: "1,200 sqm",
    yearBuilt: 1995,
    features: [
      "Tennis Court",
      "Swimming Pool",
      "Guest Chalet",
      "Hardwood Floors",
      "Formal Dining Room",
      "Home Study/Library",
      "4-Car Garage",
      "Tropical Garden",
      "Staff Quarters",
      "Water Borehole",
      "25KVA Generator",
      "Corner Plot",
    ],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=85",
    ],
    featured: false,
    agent: MAIN_AGENT
  },
  {
    id: "beachfront-villa-epe",
    title: "Beachfront Villa – Epe Waterfront",
    price: "₦195,000,000",
    priceRaw: 195000000,
    location: "Epe Waterfront, Lagos",
    state: "Lagos",
    shortDesc: "Stunning beachfront villa with private dock access, infinity pool, and breathtaking ocean views.",
    fullDesc: "Imagine waking up every morning to the sound of waves and the sight of a golden sunrise over the Atlantic. This extraordinary beachfront villa in Epe makes that dream a reality. Set directly on the waterfront with 30 meters of private beach frontage, the property features a contemporary design that maximizes views from every angle. The ground floor flows effortlessly from the open-plan living space to the terrace and infinity pool that appears to merge with the ocean horizon. Four beautifully appointed en-suite bedrooms each have their own sea view. A private dock allows direct water access for boats and leisure craft. The property includes a caretaker's cottage and is surrounded by mature tropical gardens that provide privacy and shade.",
    type: "house",
    status: "for-sale",
    bedrooms: 4,
    bathrooms: 5,
    area: "800 sqm",
    yearBuilt: 2020,
    features: [
      "30m Private Beach Frontage",
      "Private Dock & Boat Access",
      "Infinity Pool",
      "Ocean Views from All Rooms",
      "Caretaker Cottage",
      "Tropical Gardens",
      "Outdoor Shower",
      "Backup Generator",
      "Water Cistern",
      "Fully Furnished",
    ],
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=85",
      "https://images.unsplash.com/photo-1505916349660-8d91a99f6c0a?w=1200&q=85",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=85",
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&q=85",
    ],
    featured: true,
    agent: MAIN_AGENT
  },
  {
    id: "duplex-banana-island",
    title: "Executive Duplex – Banana Island",
    price: "₦380,000,000",
    priceRaw: 380000000,
    location: "Banana Island, Lagos",
    state: "Lagos",
    shortDesc: "Magnificent 5-bed executive duplex on Africa's most exclusive island address with lagoon views.",
    fullDesc: "Banana Island is Nigeria's most prestigious address and this executive duplex is among its finest properties. Located on the island's most coveted street with views of the Lagos Lagoon, this home is a masterclass in contemporary luxury. The architecture blends clean modern lines with warm natural materials—stone, timber, and glass—creating spaces that feel both grand and inviting. The lower level features a grand reception, formal sitting room, family lounge, cinema room, wine cellar, and a custom kitchen with butler's pantry. Five bedroom suites occupy the upper floors, each with bespoke wardrobes and rainfall showers. The mature landscaped garden features a lap pool, outdoor dining pavilion, and direct lagoon access. The property includes a full-time security team and is part of Banana Island's exclusive estate management.",
    type: "house",
    status: "for-sale",
    bedrooms: 5,
    bathrooms: 6,
    area: "750 sqm",
    yearBuilt: 2019,
    features: [
      "Lagoon Views",
      "Home Cinema",
      "Wine Cellar",
      "Lap Swimming Pool",
      "Butler's Kitchen",
      "Outdoor Dining Pavilion",
      "Full Smart Home",
      "4-Car Garage",
      "24hr Guard",
      "Ethernet & Fiber",
      "Generator & Solar",
      "Direct Lagoon Access",
    ],
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=85",
    ],
    featured: false,
  agent:MAIN_AGENT
  },
  {
    id: "commercial-plaza-surulere",
    title: "Commercial Plaza – Surulere",
    price: "₦550,000,000",
    priceRaw: 550000000,
    location: "Surulere, Lagos",
    state: "Lagos",
    shortDesc: "Prime commercial plaza with 12 retail units, ample parking, and high foot traffic location.",
    fullDesc: "A rare commercial investment opportunity in one of Lagos's busiest retail corridors. This modern commercial plaza sits on a prominent corner plot along Adeniran Ogunsanya Street—one of Surulere's highest foot-traffic retail streets. The property comprises 12 commercial units across two floors, with unit sizes ranging from 45–120 sqm. All units are currently tenanted with a mix of fashion, electronics, food, and professional service businesses. The property generates ₦42 million in annual rental income, representing an attractive 7.6% yield. It features ample car parking for 30 vehicles, 24-hour security, fire suppression system, and dedicated loading bays. Building management is handled by a professional facility management company. This is an ideal investment for institutional or high-net-worth investors seeking stable, growing rental income.",
    type: "commercial",
    status: "for-sale",
    area: "1,800 sqm",
    yearBuilt: 2015,
    features: [
      "12 Commercial Units",
      "Corner Lot Location",
      "30-Space Car Park",
      "Fire Suppression System",
      "24hr Security",
      "Dedicated Loading Bay",
      "Currently Fully Tenanted",
      "Facility Management",
      "CCTV & Access Control",
      "High Foot Traffic",
    ],
    images: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=85",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85",
    ],
    featured: false,
    agent: MAIN_AGENT
  },
  {
    id: "terrace-house-ajah",
    title: "Premium Terrace House – Ajah",
    price: "₦75,000,000",
    priceRaw: 75000000,
    location: "Ajah, Lagos",
    state: "Lagos",
    shortDesc: "Contemporary 4-bedroom terrace house in a secured estate with excellent facilities and great value.",
    fullDesc: "This beautifully designed terrace house in one of Ajah's premium gated estates offers exceptional quality and value for Lagos. The property features a spacious open-plan ground floor with a modern kitchen, dining area, and a bright living room leading to a private garden patio. Four well-proportioned bedrooms are located upstairs, with the master bedroom featuring an en-suite bathroom and built-in wardrobes. The estate offers comprehensive facilities including a swimming pool, children's playground, fully equipped gym, and 24-hour security with CCTV. Just minutes from Sangotedo and Ajah markets, with easy access to Lekki and VI, this property perfectly balances suburban comfort with urban connectivity.",
    type: "house",
    status: "for-sale",
    bedrooms: 4,
    bathrooms: 4,
    area: "280 sqm",
    yearBuilt: 2021,
    features: [
      "Private Garden Patio",
      "Community Swimming Pool",
      "Children's Playground",
      "Estate Gym",
      "24hr Security",
      "CCTV",
      "Backup Generator",
      "2 Parking Spaces",
      "Supermarket Nearby",
      "Good Road Network",
    ],
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=85",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=85",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=85",
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=1200&q=85",
    ],
    featured: false,
    agent: MAIN_AGENT
  },
];

export const getPropertyById = (id: string): Property | undefined =>
  properties.find((p) => p.id === id);

export const getFeaturedProperties = (): Property[] =>
  properties.filter((p) => p.featured);

export const getPropertiesByType = (type: Property["type"]): Property[] =>
  properties.filter((p) => p.type === type);

