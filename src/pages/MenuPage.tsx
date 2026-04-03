import { useState } from "react";
import PageHero from "@/components/PageHero";
import menuHero from "@/assets/menu-hero.jpg";
import dishDuck from "@/assets/dish-duck.jpg";
import dishLobster from "@/assets/dish-lobster.jpg";
import dishBeet from "@/assets/dish-beet.jpg";
import dishWagyu from "@/assets/dish-wagyu.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const menuItems = {
  Starters: [
    { key: "tuna_tartare", price: "$26", img: dishBeet },
    { key: "foie_gras", price: "$34", tag: "Signature", img: dishDuck },
    { key: "oysters", price: "$28", img: dishLobster },
    { key: "beet_salad", price: "$24", tag: "Vegetarian", img: dishBeet },
  ],
  "Main Course": [
    { key: "duck_confit", price: "$42", tag: "Signature", img: dishDuck },
    { key: "lobster", price: "$68", tag: "Bestseller", img: dishLobster },
    { key: "wagyu", price: "$95", tag: "New", img: dishWagyu },
    { key: "halibut", price: "$48", img: dishLobster },
  ],
  Desserts: [
    { key: "chocolate_souffle", price: "$18", img: dishDuck },
    { key: "creme_brulee", price: "$16", tag: "Classic", img: dishBeet },
    { key: "tarte_tatin", price: "$17", img: dishWagyu },
    { key: "lemon_posset", price: "$15", img: dishBeet },
  ],
  Drinks: [
    { key: "velvet_manhattan", price: "$22", tag: "Signature", img: dishDuck },
    { key: "french_75", price: "$20", img: dishLobster },
    { key: "sommelier", price: "$85", img: dishWagyu },
    { key: "espresso_martini", price: "$19", img: dishBeet },
  ],
};

const categoryKeys = ["Starters", "Main Course", "Desserts", "Drinks"] as const;
const categoryTranslationKeys: Record<string, string> = {
  "Starters": "menu.starters",
  "Main Course": "menu.mainCourse",
  "Desserts": "menu.desserts",
  "Drinks": "menu.drinks",
};

const MenuPage = () => {
  const [active, setActive] = useState<string>("Starters");
  const items = menuItems[active as keyof typeof menuItems] || [];
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <PageHero title={t("menu.our")} titleAccent={t("menu.menu")} subtitle={t("menu.subtitle")} image={menuHero} />
      <section className="max-w-[1200px] mx-auto py-20 px-[5%]">
        <div className="flex gap-0 border-b border-primary/20 mb-16 flex-wrap">
          {categoryKeys.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-8 py-4 text-xs tracking-[0.2em] uppercase border-b-2 -mb-px transition-colors cursor-pointer ${
                active === cat
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-primary hover:border-primary"
              }`}
            >
              {t(categoryTranslationKeys[cat])}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
          {items.map((item) => (
            <div key={item.key} className="flex gap-6 items-start p-8 bg-muted border border-transparent transition-all hover:border-primary/20 hover:bg-accent">
              <img src={item.img} alt={t(`dish.${item.key}.name`)} className="w-[90px] h-[90px] flex-shrink-0 object-cover" style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }} loading="lazy" />
              <div className="flex-1">
                <h3 className="font-serif text-lg font-normal text-foreground mb-1">{t(`dish.${item.key}.name`)}</h3>
                <p className="text-[0.8rem] text-muted-foreground leading-relaxed mb-2">{t(`dish.${item.key}.desc`)}</p>
                <span className="font-serif text-lg text-primary">{item.price}</span>
                {item.tag && (
                  <span className="inline-block ml-3 text-[0.58rem] tracking-[0.15em] uppercase px-2 py-0.5 border border-primary/40 text-primary align-middle">{t(`menu.tag.${item.tag.toLowerCase()}`)}</span>
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
