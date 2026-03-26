import { useState } from "react";
import PageHero from "@/components/PageHero";
import menuHero from "@/assets/menu-hero.jpg";
import dishDuck from "@/assets/dish-duck.jpg";
import dishLobster from "@/assets/dish-lobster.jpg";
import dishBeet from "@/assets/dish-beet.jpg";
import dishWagyu from "@/assets/dish-wagyu.jpg";

const categories = ["Starters", "Main Course", "Desserts", "Drinks"] as const;

const menuData: Record<string, Array<{ name: string; desc: string; price: string; tag?: string; img: string }>> = {
  Starters: [
    { name: "Yellowfin Tuna Tartare", desc: "Avocado mousse, crispy shallot, sesame tuile", price: "$26", img: dishBeet },
    { name: "Foie Gras Terrine", desc: "Sauternes gelée, toasted brioche, fig compote", price: "$34", tag: "Signature", img: dishDuck },
    { name: "Oysters Rockefeller", desc: "Six Blue Points, spinach, Pernod butter, gratin", price: "$28", img: dishLobster },
    { name: "Heirloom Beet Salad", desc: "Golden & candy stripe beets, whipped chèvre, candied walnut", price: "$24", tag: "Vegetarian", img: dishBeet },
  ],
  "Main Course": [
    { name: "Seared Duck Confit", desc: "48-hour confit leg, cherry gastrique, pomme purée", price: "$42", tag: "Signature", img: dishDuck },
    { name: "Butter-Poached Lobster", desc: "Maine lobster, tarragon beurre blanc, shaved truffle", price: "$68", tag: "Bestseller", img: dishLobster },
    { name: "Wagyu Tenderloin", desc: "A5 wagyu, bone marrow jus, roasted cipollini", price: "$95", tag: "New", img: dishWagyu },
    { name: "Pan-Roasted Halibut", desc: "Saffron risotto, broccolini, lemon beurre blanc", price: "$48", img: dishLobster },
  ],
  Desserts: [
    { name: "Chocolate Soufflé", desc: "Valrhona dark chocolate, crème anglaise", price: "$18", img: dishDuck },
    { name: "Crème Brûlée", desc: "Madagascar vanilla bean, caramelized sugar", price: "$16", tag: "Classic", img: dishBeet },
    { name: "Tarte Tatin", desc: "Caramelized apple, flaky pastry, calvados cream", price: "$17", img: dishWagyu },
    { name: "Lemon Posset", desc: "Shortbread crumble, fresh berries, mint", price: "$15", img: dishBeet },
  ],
  Drinks: [
    { name: "Velvet Manhattan", desc: "Bulleit rye, sweet vermouth, Angostura, Luxardo cherry", price: "$22", tag: "Signature", img: dishDuck },
    { name: "French 75", desc: "Hendrick's gin, Champagne, lemon, lavender sugar", price: "$20", img: dishLobster },
    { name: "Sommelier's Selection", desc: "Curated wine pairing per course", price: "$85", img: dishWagyu },
    { name: "Espresso Martini", desc: "Belvedere vodka, fresh espresso, Kahlúa", price: "$19", img: dishBeet },
  ],
};

const MenuPage = () => {
  const [active, setActive] = useState<string>("Starters");
  const items = menuData[active] || [];

  return (
    <div className="min-h-screen">
      <PageHero title="Our" titleAccent="Menu" subtitle="Curated Selections" image={menuHero} />
      <section className="max-w-[1200px] mx-auto py-20 px-[5%]">
        <div className="flex gap-0 border-b border-primary/20 mb-16 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-8 py-4 text-xs tracking-[0.2em] uppercase border-b-2 -mb-px transition-colors cursor-pointer ${
                active === cat
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-primary hover:border-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
          {items.map((item) => (
            <div
              key={item.name}
              className="flex gap-6 items-start p-8 bg-muted border border-transparent transition-all hover:border-primary/20 hover:bg-accent"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-[90px] h-[90px] flex-shrink-0 object-cover"
                style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
                loading="lazy"
              />
              <div className="flex-1">
                <h3 className="font-serif text-lg font-normal text-foreground mb-1">{item.name}</h3>
                <p className="text-[0.8rem] text-muted-foreground leading-relaxed mb-2">{item.desc}</p>
                <span className="font-serif text-lg text-primary">{item.price}</span>
                {item.tag && (
                  <span className="inline-block ml-3 text-[0.58rem] tracking-[0.15em] uppercase px-2 py-0.5 border border-primary/40 text-primary align-middle">
                    {item.tag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MenuPage;
