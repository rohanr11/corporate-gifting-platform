import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Welcome Kits",
    slug: "welcome-kits",
    description: "Thoughtfully curated onboarding kits that make a new hire's first day memorable.",
    imageUrl: "https://media.istockphoto.com/id/585282190/photo/funny-donkey-on-road.jpg?s=612x612&w=0&k=20&c=5MLX9g_jVrW77IQJ0wHY8VqEvdsktLs43m38X_rtEHk=",
  },
  {
    name: "Executive Gifts",
    slug: "executive-gifts",
    description: "Premium, understated gifts for leadership, board members, and VIP clients.",
    imageUrl: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800",
  },
  {
    name: "Eco-Friendly",
    slug: "eco-friendly",
    description: "Sustainable gifting made from recycled, biodegradable, or ethically sourced materials.",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
  },
  {
    name: "Festive & Diwali",
    slug: "festive-diwali",
    description: "Celebratory hampers designed for Diwali, New Year, and other festive occasions.",
    imageUrl: "https://images.unsplash.com/photo-1605021154813-9b1abf6b7f0e?w=800",
  },
  {
    name: "Tech Gadgets",
    slug: "tech-gadgets",
    description: "Practical, modern tech accessories employees actually use every day.",
    imageUrl: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=800",
  },
  {
    name: "Drinkware & Barware",
    slug: "drinkware-barware",
    description: "Elegant mugs, tumblers, and barware for everyday desk use or after-hours celebration.",
    imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800",
  },
];

const productSeed = [
  // Welcome Kits
  { name: "Onboarding Essentials Box", cat: "welcome-kits", price: 1299, desc: "A complete first-day welcome kit featuring a notebook, pen, water bottle, and branded tote — designed to make new hires feel at home from minute one.", tags: "onboarding,welcome,budget-friendly", minQty: 50 },
  { name: "New Hire Starter Kit", cat: "welcome-kits", price: 899, desc: "A compact welcome pack with a desk organizer, sticky notes, and a personalized welcome card, ideal for large-scale onboarding drives.", tags: "onboarding,affordable,bulk", minQty: 100 },
  { name: "Premium Onboarding Hamper", cat: "welcome-kits", price: 2499, desc: "An elevated onboarding experience with a leather-bound journal, premium pen set, and gourmet snacks for new leadership hires.", tags: "onboarding,premium,leadership", minQty: 20 },
  { name: "Remote Employee Welcome Box", cat: "welcome-kits", price: 1799, desc: "Curated for remote hires: a cozy hoodie, insulated mug, and a handwritten welcome note that ships directly to their home.", tags: "onboarding,remote,cozy", minQty: 30 },

  // Executive Gifts
  { name: "Signature Leather Portfolio", cat: "executive-gifts", price: 3499, desc: "A full-grain leather portfolio with a built-in tablet sleeve and card slots — a refined companion for boardroom meetings.", tags: "leather,premium,ceo", minQty: 5 },
  { name: "Engraved Executive Pen Set", cat: "executive-gifts", price: 2799, desc: "A twin fountain and ballpoint pen set in brushed metal, engraved with initials for a personal executive touch.", tags: "premium,ceo,engraved", minQty: 5 },
  { name: "Single Malt Whisky Glass Set", cat: "executive-gifts", price: 4299, desc: "Hand-cut crystal whisky glasses paired with a walnut presentation box, perfect for celebrating leadership milestones.", tags: "luxury,ceo,crystal", minQty: 5 },
  { name: "Italian Leather Weekender Bag", cat: "executive-gifts", price: 8999, desc: "A hand-stitched Italian leather weekender bag for the executive who travels often — timeless, durable, and understated.", tags: "luxury,leather,travel,ceo", minQty: 3 },
  { name: "Rose Gold Desk Clock", cat: "executive-gifts", price: 3199, desc: "A minimalist rose gold desk clock with silent-sweep movement, an elegant addition to any executive workspace.", tags: "premium,desk,minimalist", minQty: 5 },

  // Eco-Friendly
  { name: "Bamboo Desk Organizer Set", cat: "eco-friendly", price: 999, desc: "A sustainably sourced bamboo desk organizer with compartments for stationery, cables, and a phone stand.", tags: "eco-friendly,sustainable,desk", minQty: 50 },
  { name: "Recycled Cotton Tote & Notebook", cat: "eco-friendly", price: 649, desc: "A durable recycled-cotton tote paired with a notebook made from post-consumer recycled paper.", tags: "eco-friendly,affordable,bulk", minQty: 100 },
  { name: "Seed Paper Greeting Card Set", cat: "eco-friendly", price: 349, desc: "Plantable seed-paper cards that grow into wildflowers — a memorable, zero-waste way to say thank you.", tags: "eco-friendly,budget-friendly,unique", minQty: 100 },
  { name: "Bamboo Fiber Welcome Kit", cat: "eco-friendly", price: 1599, desc: "An onboarding kit built entirely from bamboo fiber and recycled materials — sustainable and stylish.", tags: "eco-friendly,onboarding,sustainable", minQty: 50 },
  { name: "Reusable Bamboo Cutlery Travel Set", cat: "eco-friendly", price: 549, desc: "A compact bamboo cutlery set in a cotton pouch, encouraging employees to cut down on single-use plastic.", tags: "eco-friendly,affordable,travel", minQty: 100 },

  // Festive & Diwali
  { name: "Diwali Dry Fruit Hamper", cat: "festive-diwali", price: 1899, desc: "A festive hamper of premium almonds, cashews, and pistachios in a hand-painted brass bowl, perfect for Diwali gifting.", tags: "diwali,festive,premium", minQty: 30 },
  { name: "Diwali Diya & Sweets Box", cat: "festive-diwali", price: 999, desc: "Traditional clay diyas paired with assorted mithai in an elegant gift box, celebrating the festival of lights.", tags: "diwali,festive,affordable", minQty: 50 },
  { name: "Festive Spice & Tea Gift Set", cat: "festive-diwali", price: 1299, desc: "A curated set of aromatic spices and premium loose-leaf teas, presented in a festive keepsake tin.", tags: "diwali,festive,gourmet", minQty: 30 },
  { name: "New Year Premium Hamper", cat: "festive-diwali", price: 2999, desc: "A luxury New Year hamper with artisanal chocolates, a scented candle, and a personalized greeting card.", tags: "festive,premium,new-year", minQty: 20 },

  // Tech Gadgets
  { name: "Wireless Charging Desk Pad", cat: "tech-gadgets", price: 1499, desc: "A vegan-leather desk pad with an integrated wireless charging pad, keeping desks tidy and phones powered.", tags: "tech,desk,practical", minQty: 30 },
  { name: "Noise-Cancelling Earbuds", cat: "tech-gadgets", price: 3999, desc: "Compact true-wireless earbuds with active noise cancellation, ideal for focused work and calls on the go.", tags: "tech,premium,practical", minQty: 20 },
  { name: "Smart LED Desk Lamp", cat: "tech-gadgets", price: 2199, desc: "A touch-controlled LED desk lamp with adjustable warmth, a USB charging port, and a sleek aluminum body.", tags: "tech,desk,minimalist", minQty: 30 },
  { name: "Portable Power Bank 10000mAh", cat: "tech-gadgets", price: 1199, desc: "A slim, fast-charging power bank that fits in any laptop bag — one of the most-used corporate gifts year-round.", tags: "tech,affordable,bulk,practical", minQty: 100 },
  { name: "Bluetooth Speaker Cube", cat: "tech-gadgets", price: 1699, desc: "A compact fabric-wrapped Bluetooth speaker with rich sound, great for desks or team offsites.", tags: "tech,practical,bulk", minQty: 50 },

  // Drinkware & Barware
  { name: "Insulated Steel Tumbler", cat: "drinkware-barware", price: 799, desc: "A double-walled stainless steel tumbler that keeps drinks hot or cold for hours — a daily-use favorite.", tags: "affordable,bulk,practical", minQty: 100 },
  { name: "Ceramic Branded Mug Set", cat: "drinkware-barware", price: 599, desc: "A set of two minimalist ceramic mugs, customizable with company branding for onboarding or events.", tags: "affordable,bulk,branded", minQty: 100 },
  { name: "Crystal Wine Decanter Set", cat: "drinkware-barware", price: 5499, desc: "A hand-blown crystal decanter with two glasses, presented in a velvet-lined box for VIP client gifting.", tags: "luxury,ceo,crystal", minQty: 5 },
  { name: "Copper Moscow Mule Mug Set", cat: "drinkware-barware", price: 2199, desc: "A set of four hammered-copper mugs, perfect for team celebrations or client hospitality events.", tags: "premium,barware,team", minQty: 20 },
];

async function main() {
  console.log("Seeding database...");

  await prisma.cartItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const categoryMap: Record<string, number> = {};

  for (const cat of categories) {
    const created = await prisma.category.create({ data: cat });
    categoryMap[cat.slug] = created.id;
  }

  for (const p of productSeed) {
    const slug = p.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    await prisma.product.create({
      data: {
        name: p.name,
        slug,
        description: p.desc,
        shortDescription: p.desc.split(".")[0] + ".",
        price: p.price,
        imageUrl: `https://source.unsplash.com/800x800/?${encodeURIComponent(p.name)}`,
        categoryId: categoryMap[p.cat],
        tags: p.tags,
        minOrderQty: p.minQty,
        inStock: true,
        rating: Math.round((4 + Math.random()) * 10) / 10,
      },
    });
  }

  console.log(`Seeded ${categories.length} categories and ${productSeed.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
