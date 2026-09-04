import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Welcome Kits",
    slug: "welcome-kits",
    description: "Thoughtfully curated onboarding kits that make a new hire's first day memorable.",
    imageUrl: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=800",
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
    imageUrl: "https://thumbs.dreamstime.com/b/diwali-celebrations-fire-crackers-shaped-homemade-chocolates-inside-beautiful-gift-box-fire-crackers-shaped-homemade-200391213.jpg",
  },
  {
    name: "Tech Gadgets",
    slug: "tech-gadgets",
    description: "Practical, modern tech accessories employees actually use every day.",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
  },
  {
    name: "Drinkware & Barware",
    slug: "drinkware-barware",
    description: "Elegant mugs, tumblers, and barware for everyday desk use or after-hours celebration.",
    imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800",
  },
  {
    name: "Apparel & Wearables",
    slug: "apparel-wearables",
    description: "Branded jackets, caps, polo shirts, scarves — wearable gifts with company identity.",
    imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800",
  },
  {
    name: "Stationery & Desk",
    slug: "stationery-desk",
    description: "Premium pens, planners, desk accessories, and organizers for the modern workspace.",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800",
  },
];

const productSeed = [
  // ── Welcome Kits ───────────────────────────────────────────────
  {
    name: "Onboarding Essentials Box",
    cat: "welcome-kits",
    price: 1299,
    desc: "A complete first-day welcome kit featuring a notebook, pen, water bottle, and branded tote — designed to make new hires feel at home from minute one.",
    tags: "onboarding,welcome,budget-friendly",
    minQty: 50,
    img: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=800",
  },
  {
    name: "New Hire Starter Kit",
    cat: "welcome-kits",
    price: 899,
    desc: "A compact welcome pack with a desk organizer, sticky notes, and a personalized welcome card, ideal for large-scale onboarding drives.",
    tags: "onboarding,affordable,bulk",
    minQty: 100,
    img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800",
  },
  {
    name: "Premium Onboarding Hamper",
    cat: "welcome-kits",
    price: 2499,
    desc: "An elevated onboarding experience with a leather-bound journal, premium pen set, and gourmet snacks for new leadership hires.",
    tags: "onboarding,premium,leadership",
    minQty: 20,
    img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800",
  },
  {
    name: "Remote Employee Welcome Box",
    cat: "welcome-kits",
    price: 1799,
    desc: "Curated for remote hires: a cozy hoodie, insulated mug, and a handwritten welcome note that ships directly to their home.",
    tags: "onboarding,remote,cozy",
    minQty: 30,
    img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800",
  },
  {
    name: "Premium Laptop Sleeve Welcome Kit",
    cat: "welcome-kits",
    price: 1599,
    desc: "A sleek neoprene laptop sleeve paired with branded stickers and a welcome booklet — practical and memorable for day-one hires.",
    tags: "onboarding,tech,practical",
    minQty: 30,
    img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800",
  },
  {
    name: "Team Welcome Snack Box",
    cat: "welcome-kits",
    price: 699,
    desc: "A cheerful snack box with gourmet cookies, trail mix, and a welcome card — perfect for budget-friendly bulk onboarding.",
    tags: "onboarding,affordable,snacks,bulk",
    minQty: 100,
    img: "https://www.wraparts.in/cdn/shop/files/Snack-boxes-20240513_212944.jpg?v=1757508835",
  },

  // ── Executive Gifts ────────────────────────────────────────────
  {
    name: "Signature Leather Portfolio",
    cat: "executive-gifts",
    price: 3499,
    desc: "A full-grain leather portfolio with a built-in tablet sleeve and card slots — a refined companion for boardroom meetings.",
    tags: "leather,premium,ceo",
    minQty: 5,
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
  },
  {
    name: "Engraved Executive Pen Set",
    cat: "executive-gifts",
    price: 2799,
    desc: "A twin fountain and ballpoint pen set in brushed metal, engraved with initials for a personal executive touch.",
    tags: "premium,ceo,engraved",
    minQty: 5,
    img: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800",
  },
  {
    name: "Single Malt Whisky Glass Set",
    cat: "executive-gifts",
    price: 4299,
    desc: "Hand-cut crystal whisky glasses paired with a walnut presentation box, perfect for celebrating leadership milestones.",
    tags: "luxury,ceo,crystal",
    minQty: 5,
    img: "https://images.unsplash.com/photo-1570598912132-0ba1dc952b7d?w=800",
  },
  {
    name: "Italian Leather Weekender Bag",
    cat: "executive-gifts",
    price: 8999,
    desc: "A hand-stitched Italian leather weekender bag for the executive who travels often — timeless, durable, and understated.",
    tags: "luxury,leather,travel,ceo",
    minQty: 3,
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
  },
  {
    name: "Rose Gold Desk Clock",
    cat: "executive-gifts",
    price: 3199,
    desc: "A minimalist rose gold desk clock with silent-sweep movement, an elegant addition to any executive workspace.",
    tags: "premium,desk,minimalist",
    minQty: 5,
    img: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800",
  },
  {
    name: "Monogrammed Leather Keychain",
    cat: "executive-gifts",
    price: 999,
    desc: "A hand-stitched leather keychain with custom monogramming, presented in a velvet pouch — a subtle yet personal executive gift.",
    tags: "leather,affordable,engraved,ceo",
    minQty: 20,
    img: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800",
  },
  {
    name: "Desktop Zen Garden Set",
    cat: "executive-gifts",
    price: 1499,
    desc: "A miniature zen garden with sand, stones, and a tiny rake — a calming desk accessory for high-pressure executives.",
    tags: "premium,desk,wellness,mindfulness",
    minQty: 10,
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
  },

  // ── Eco-Friendly ───────────────────────────────────────────────
  {
    name: "Bamboo Desk Organizer Set",
    cat: "eco-friendly",
    price: 999,
    desc: "A sustainably sourced bamboo desk organizer with compartments for stationery, cables, and a phone stand.",
    tags: "eco-friendly,sustainable,desk",
    minQty: 50,
    img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800",
  },
  {
    name: "Recycled Cotton Tote & Notebook",
    cat: "eco-friendly",
    price: 649,
    desc: "A durable recycled-cotton tote paired with a notebook made from post-consumer recycled paper.",
    tags: "eco-friendly,affordable,bulk",
    minQty: 100,
    img: "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=800",
  },
  {
    name: "Seed Paper Greeting Card Set",
    cat: "eco-friendly",
    price: 349,
    desc: "Plantable seed-paper cards that grow into wildflowers — a memorable, zero-waste way to say thank you.",
    tags: "eco-friendly,budget-friendly,unique",
    minQty: 100,
    img: "https://images.unsplash.com/photo-1416339684178-3a239570f315?w=800",
  },
  {
    name: "Bamboo Fiber Welcome Kit",
    cat: "eco-friendly",
    price: 1599,
    desc: "An onboarding kit built entirely from bamboo fiber and recycled materials — sustainable and stylish.",
    tags: "eco-friendly,onboarding,sustainable",
    minQty: 50,
    img: "https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?w=800",
  },
  {
    name: "Reusable Bamboo Cutlery Travel Set",
    cat: "eco-friendly",
    price: 549,
    desc: "A compact bamboo cutlery set in a cotton pouch, encouraging employees to cut down on single-use plastic.",
    tags: "eco-friendly,affordable,travel",
    minQty: 100,
    img: "https://images.unsplash.com/photo-1584346133934-a3afd3fbfc6e?w=800",
  },
  {
    name: "Plant-a-Tree Kit",
    cat: "eco-friendly",
    price: 799,
    desc: "A grow-your-own tree kit with seeds, biodegradable pot, and soil pellet — gift a tree to every employee.",
    tags: "eco-friendly,unique,sustainable,green",
    minQty: 50,
    img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800",
  },
  {
    name: "Organic Cotton Drawstring Bag",
    cat: "eco-friendly",
    price: 449,
    desc: "A minimalist organic cotton drawstring bag, screen-printed with your company logo — great for events and giveaways.",
    tags: "eco-friendly,affordable,bulk,branded",
    minQty: 100,
    img: "https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?w=800",
  },
  {
    name: "Solar-Powered Desk Fan",
    cat: "eco-friendly",
    price: 1699,
    desc: "A compact solar-powered desk fan with USB backup — an eco-conscious companion for warm office days.",
    tags: "eco-friendly,tech,sustainable,desk",
    minQty: 30,
    img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800",
  },

  // ── Festive & Diwali ──────────────────────────────────────────
  {
    name: "Diwali Dry Fruit Hamper",
    cat: "festive-diwali",
    price: 1899,
    desc: "A festive hamper of premium almonds, cashews, and pistachios in a hand-painted brass bowl, perfect for Diwali gifting.",
    tags: "diwali,festive,premium",
    minQty: 30,
    img: "https://rukminim2.flixcart.com/image/480/480/xif0q/nut-dry-fruit/n/4/a/480-dry-fruits-box-perfect-diwali-gift-hamper-box-pack-of-6-for-original-imah6rqktsfarppx.jpeg?q=90",
  },
  {
    name: "Diwali Diya & Sweets Box",
    cat: "festive-diwali",
    price: 999,
    desc: "Traditional clay diyas paired with assorted mithai in an elegant gift box, celebrating the festival of lights.",
    tags: "diwali,festive,affordable",
    minQty: 50,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzPTN0THupItl2rj_13GuNOD0QXJFRQbFSBVcAijx9TQ&s=10",
  },
  {
    name: "Festive Spice & Tea Gift Set",
    cat: "festive-diwali",
    price: 1299,
    desc: "A curated set of aromatic spices and premium loose-leaf teas, presented in a festive keepsake tin.",
    tags: "diwali,festive,gourmet",
    minQty: 30,
    img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800",
  },
  {
    name: "New Year Premium Hamper",
    cat: "festive-diwali",
    price: 2999,
    desc: "A luxury New Year hamper with artisanal chocolates, a scented candle, and a personalized greeting card.",
    tags: "festive,premium,new-year",
    minQty: 20,
    img: "https://images.unsplash.com/photo-1543934638-bd2e138430c4?w=800",
  },
  {
    name: "Luxury Chocolate Hamper",
    cat: "festive-diwali",
    price: 2499,
    desc: "A decadent selection of Belgian and artisanal chocolates in a premium gift box — ideal for festive client gifting.",
    tags: "festive,chocolate,luxury,premium",
    minQty: 20,
    img: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800",
  },
  {
    name: "Scented Candle Trio Set",
    cat: "festive-diwali",
    price: 1099,
    desc: "Three hand-poured soy candles in lavender, vanilla, and sandalwood — a warm, aromatic festive gift.",
    tags: "festive,candles,affordable,diwali",
    minQty: 30,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKzwSBe-8Uhq3XLzD0zednRbK4p6Vcqz1zDKymsRvXGhIJOs7JZASsQAI&s=10",
  },

  // ── Tech Gadgets ───────────────────────────────────────────────
  {
    name: "Wireless Charging Desk Pad",
    cat: "tech-gadgets",
    price: 1499,
    desc: "A vegan-leather desk pad with an integrated wireless charging pad, keeping desks tidy and phones powered.",
    tags: "tech,desk,practical",
    minQty: 30,
    img: "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?w=800",
  },
  {
    name: "Noise-Cancelling Earbuds",
    cat: "tech-gadgets",
    price: 3999,
    desc: "Compact true-wireless earbuds with active noise cancellation, ideal for focused work and calls on the go.",
    tags: "tech,premium,practical",
    minQty: 20,
    img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800",
  },
  {
    name: "Smart LED Desk Lamp",
    cat: "tech-gadgets",
    price: 2199,
    desc: "A touch-controlled LED desk lamp with adjustable warmth, a USB charging port, and a sleek aluminum body.",
    tags: "tech,desk,minimalist",
    minQty: 30,
    img: "https://images.unsplash.com/photo-1507473885765-e6ed057ab3fe?w=800",
  },
  {
    name: "Portable Power Bank 10000mAh",
    cat: "tech-gadgets",
    price: 1199,
    desc: "A slim, fast-charging power bank that fits in any laptop bag — one of the most-used corporate gifts year-round.",
    tags: "tech,affordable,bulk,practical",
    minQty: 100,
    img: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800",
  },
  {
    name: "Bluetooth Speaker Cube",
    cat: "tech-gadgets",
    price: 1699,
    desc: "A compact fabric-wrapped Bluetooth speaker with rich sound, great for desks or team offsites.",
    tags: "tech,practical,bulk",
    minQty: 50,
    img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800",
  },
  {
    name: "Multi-Device Charging Station",
    cat: "tech-gadgets",
    price: 2499,
    desc: "A bamboo-topped charging station that powers up to 3 devices simultaneously — phone, tablet, and watch.",
    tags: "tech,desk,premium,practical",
    minQty: 20,
    img: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800",
  },
  {
    name: "Webcam & Ring Light Kit",
    cat: "tech-gadgets",
    price: 2999,
    desc: "A 1080p webcam paired with a clip-on ring light — a must-have kit for remote meetings and presentations.",
    tags: "tech,remote,premium,practical",
    minQty: 20,
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800",
  },
  {
    name: "USB-C Hub & Cable Organizer",
    cat: "tech-gadgets",
    price: 1399,
    desc: "A 7-in-1 USB-C hub with an integrated silicone cable organizer — clean desks and seamless connectivity.",
    tags: "tech,affordable,practical,desk",
    minQty: 50,
    img: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800",
  },

  // ── Drinkware & Barware ────────────────────────────────────────
  {
    name: "Insulated Steel Tumbler",
    cat: "drinkware-barware",
    price: 799,
    desc: "A double-walled stainless steel tumbler that keeps drinks hot or cold for hours — a daily-use favorite.",
    tags: "affordable,bulk,practical",
    minQty: 100,
    img: "https://images.unsplash.com/photo-1577003811926-53b099a67883?w=800",
  },
  {
    name: "Ceramic Branded Mug Set",
    cat: "drinkware-barware",
    price: 599,
    desc: "A set of two minimalist ceramic mugs, customizable with company branding for onboarding or events.",
    tags: "affordable,bulk,branded",
    minQty: 100,
    img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800",
  },
  {
    name: "Crystal Wine Decanter Set",
    cat: "drinkware-barware",
    price: 5499,
    desc: "A hand-blown crystal decanter with two glasses, presented in a velvet-lined box for VIP client gifting.",
    tags: "luxury,ceo,crystal",
    minQty: 5,
    img: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800",
  },
  {
    name: "Copper Moscow Mule Mug Set",
    cat: "drinkware-barware",
    price: 2199,
    desc: "A set of four hammered-copper mugs, perfect for team celebrations or client hospitality events.",
    tags: "premium,barware,team",
    minQty: 20,
    img: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=800",
  },
  {
    name: "Glass Infuser Water Bottle",
    cat: "drinkware-barware",
    price: 999,
    desc: "A borosilicate glass water bottle with a built-in tea infuser and protective silicone sleeve.",
    tags: "affordable,eco-friendly,practical",
    minQty: 50,
    img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800",
  },
  {
    name: "Artisan Pour-Over Coffee Set",
    cat: "drinkware-barware",
    price: 1799,
    desc: "A ceramic pour-over dripper with a double-walled glass carafe and 100g of single-origin coffee beans.",
    tags: "premium,coffee,gourmet",
    minQty: 20,
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
  },

  // ── Apparel & Wearables (NEW) ──────────────────────────────────
  {
    name: "Branded Hoodie Gift Box",
    cat: "apparel-wearables",
    price: 1499,
    desc: "A premium cotton-blend hoodie with subtle embroidered branding, presented in a kraft gift box with tissue paper.",
    tags: "apparel,branded,premium,cozy",
    minQty: 30,
    img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
  },
  {
    name: "Embroidered Polo Shirt",
    cat: "apparel-wearables",
    price: 999,
    desc: "A breathable piqué polo with custom-embroidered company logo — perfect for team outings and corporate events.",
    tags: "apparel,branded,team,bulk",
    minQty: 50,
    img: "https://images.unsplash.com/photo-1625910513413-5fc421e0fd6d?w=800",
  },
  {
    name: "Cashmere Scarf in Gift Sleeve",
    cat: "apparel-wearables",
    price: 2799,
    desc: "A luxuriously soft cashmere scarf in a sleek gift sleeve — an executive-worthy wearable gift for winter occasions.",
    tags: "apparel,luxury,premium,ceo",
    minQty: 10,
    img: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800",
  },
  {
    name: "Corporate Cap & Sunglasses Set",
    cat: "apparel-wearables",
    price: 699,
    desc: "A classic six-panel cap with embroidered logo and UV-protective sunglasses in a drawstring pouch.",
    tags: "apparel,affordable,bulk,outdoor",
    minQty: 100,
    img: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=800",
  },
  {
    name: "Premium Leather Belt Gift Set",
    cat: "apparel-wearables",
    price: 1999,
    desc: "A reversible genuine leather belt with a brushed-nickel buckle, boxed with a matching leather cardholder.",
    tags: "apparel,leather,premium,executive",
    minQty: 20,
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
  },

  // ── Stationery & Desk (NEW) ────────────────────────────────────
  {
    name: "Hardbound Planner & Pen Combo",
    cat: "stationery-desk",
    price: 899,
    desc: "A linen-covered undated planner with monthly and weekly spreads, paired with a matching metallic ballpoint pen.",
    tags: "stationery,planner,practical,branded",
    minQty: 50,
    img: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800",
  },
  {
    name: "Magnetic Wireless Charging Stand",
    cat: "stationery-desk",
    price: 1299,
    desc: "A walnut-wood wireless charging stand with magnetic alignment — keeps phones charged and upright on any desk.",
    tags: "tech,desk,practical,premium",
    minQty: 30,
    img: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800",
  },
  {
    name: "Wooden Desktop Calendar",
    cat: "stationery-desk",
    price: 599,
    desc: "A handcrafted wooden perpetual calendar with interchangeable date blocks — an elegant, timeless desk accessory.",
    tags: "stationery,desk,eco-friendly,minimalist",
    minQty: 50,
    img: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800",
  },
  {
    name: "Personalized Nameplate & Card Holder",
    cat: "stationery-desk",
    price: 749,
    desc: "A brushed-metal desk nameplate with an integrated business card holder, laser-engraved with the recipient's name.",
    tags: "stationery,desk,engraved,personalized",
    minQty: 20,
    img: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=800",
  },
  {
    name: "Brass Pen & Ink Set",
    cat: "stationery-desk",
    price: 1899,
    desc: "A solid brass fountain pen with a glass inkwell, presented in a velvet-lined wooden box — a statement desk gift.",
    tags: "stationery,premium,luxury,executive",
    minQty: 10,
    img: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=800",
  },
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
        imageUrl: p.img,
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
