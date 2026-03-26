import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import introChef from "@/assets/intro-chef.jpg";
import dishDuck from "@/assets/dish-duck.jpg";
import dishLobster from "@/assets/dish-lobster.jpg";
import dishBeet from "@/assets/dish-beet.jpg";
import dishWagyu from "@/assets/dish-wagyu.jpg";
import SectionHeader from "@/components/SectionHeader";
import Ornament from "@/components/Ornament";

const dishes = [
  { tag: "Signature", name: "Seared Duck Confit", desc: "48-hour confit leg, cherry gastrique, pomme purée", price: "$42", img: dishDuck },
  { tag: "Bestseller", name: "Butter-Poached Lobster", desc: "Maine lobster, tarragon beurre blanc, shaved truffle", price: "$68", img: dishLobster },
  { tag: "Vegetarian", name: "Heirloom Beet Salad", desc: "Golden & candy stripe beets, whipped chèvre, candied walnut", price: "$24", img: dishBeet },
  { tag: "New", name: "Wagyu Tenderloin", desc: "A5 wagyu, bone marrow jus, roasted cipollini", price: "$95", img: dishWagyu },
];

const reviews = [
  { stars: "★★★★★", text: "An absolutely transcendent evening. The tasting menu was a revelation — every course surprised and delighted.", author: "Alexandra M.", date: "December 2023" },
  { stars: "★★★★★", text: "We've dined at Michelin-starred restaurants worldwide. Velvet Fork stands in its own category. Flawless.", author: "Jonathan R.", date: "January 2024" },
  { stars: "★★★★★", text: "The wagyu was the finest I've ever tasted. The ambiance, the service — everything was perfect. We'll be back.", author: "Sophia L.", date: "February 2024" },
];

const Home = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden -mt-[72px]">
      <div
        className="absolute inset-0 bg-cover bg-center animate-[heroZoom_18s_ease-in-out_infinite_alternate]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(10,10,8,0.3) 0%, rgba(10,10,8,0.6) 60%, hsl(var(--background)) 100%), url(${heroBg})`,
          transform: "scale(1.05)",
        }}
      />
      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      >
        <p className="text-[0.7rem] tracking-[0.35em] uppercase text-primary flex items-center justify-center gap-4 mb-6">
          <span className="w-10 h-px bg-primary-dim" />
          Est. 2012 · New York City
          <span className="w-10 h-px bg-primary-dim" />
        </p>
        <h1 className="font-serif text-[clamp(3.5rem,10vw,8rem)] font-light leading-none text-foreground tracking-wide mb-1">
          Velvet Fork
        </h1>
        <p className="font-serif text-[clamp(1rem,2.5vw,1.35rem)] font-light italic text-foreground/70 mb-12 tracking-wide">
          A Table Worth Remembering
        </p>
        <div className="flex gap-5 justify-center flex-wrap">
          <Link
            to="/reserve"
            className="inline-flex items-center gap-2 font-sans text-[0.78rem] font-medium tracking-[0.18em] uppercase px-10 py-4 bg-primary text-primary-foreground transition-all hover:bg-primary-light hover:text-primary-foreground relative overflow-hidden"
            style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
          >
            ✦ Book a Table
          </Link>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 font-sans text-[0.78rem] font-medium tracking-[0.18em] uppercase px-10 py-4 border border-primary text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            View Menu
          </Link>
        </div>
      </motion.div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground animate-[bob_2.5s_ease-in-out_infinite]">
        Scroll
        <span className="w-px h-9 bg-gradient-to-b from-primary-dim to-transparent" />
      </div>
    </section>

    {/* Intro */}
    <section className="py-32 px-[5%] max-w-[1300px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="relative">
          <img src={introChef} alt="Chef plating a dish" className="w-full aspect-[4/5] object-cover brightness-90 contrast-105" loading="lazy" width={800} height={1000} />
          <div className="absolute -bottom-8 -right-8 w-[130px] h-[130px] bg-primary rounded-full flex flex-col items-center justify-center text-primary-foreground text-center">
            <strong className="font-serif text-[2rem] font-normal leading-none">12</strong>
            <span className="text-[0.62rem] tracking-[0.12em] uppercase font-medium">Years of Excellence</span>
          </div>
        </div>
        <div>
          <p className="font-sans text-[0.72rem] tracking-[0.25em] uppercase text-primary mb-4">Our Philosophy</p>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-light leading-[1.15] text-foreground mb-6">
            Food is the language of the <em className="italic text-primary">soul</em>
          </h2>
          <p className="text-muted-foreground text-[0.95rem] leading-relaxed mb-5">
            Velvet Fork was born from a simple conviction: that a great meal is more than sustenance — it is art, ritual, and connection. Our kitchen breathes with seasonal ingredients sourced from trusted farms and artisan producers across the Northeast.
          </p>
          <p className="text-muted-foreground text-[0.95rem] leading-relaxed mb-5">
            Every dish on our menu carries intention. Our chefs don't follow trends — they create experiences, drawing on classical French technique and the boldness of contemporary American cuisine.
          </p>
          <Link to="/about" className="text-primary text-sm tracking-[0.15em] uppercase hover:text-primary-light transition-colors">
            Our Story →
          </Link>
        </div>
      </div>
    </section>

    {/* Featured Dishes */}
    <section className="py-24 px-[5%] bg-secondary transition-colors">
      <SectionHeader label="Chef's Selections" title="Featured" titleAccent="Dishes" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px] max-w-[1300px] mx-auto mb-12">
        {dishes.map((dish) => (
          <div key={dish.name} className="relative overflow-hidden aspect-[3/4] cursor-pointer group">
            <img src={dish.img} alt={dish.name} className="w-full h-full object-cover transition-transform duration-700 brightness-[0.7] group-hover:scale-[1.08]" loading="lazy" width={800} height={1066} />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,8,0.95)] via-[rgba(10,10,8,0.2)_55%] to-transparent flex flex-col justify-end p-6 lg:p-7">
              <span className="text-[0.65rem] tracking-[0.2em] uppercase text-primary mb-2">{dish.tag}</span>
              <h3 className="font-serif text-2xl font-normal text-foreground mb-1 leading-tight">{dish.name}</h3>
              <p className="text-[0.8rem] text-foreground/55 max-h-0 overflow-hidden opacity-0 group-hover:max-h-[60px] group-hover:opacity-100 transition-all duration-400">{dish.desc}</p>
              <span className="font-serif text-lg text-primary mt-3">{dish.price}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 font-sans text-[0.78rem] font-medium tracking-[0.18em] uppercase px-10 py-4 border border-primary text-primary transition-all hover:bg-primary hover:text-primary-foreground"
        >
          View Full Menu →
        </Link>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-32 px-[5%] text-center">
      <SectionHeader label="Guest Reviews" title="What our guests" titleAccent="say" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            className="bg-muted border border-border p-10 text-left transition-all hover:border-primary/35 hover:-translate-y-1"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-primary text-base tracking-[0.15em] mb-5">{r.stars}</div>
            <p className="font-serif text-lg italic font-light text-foreground/80 leading-relaxed mb-6">"{r.text}"</p>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-primary-dim flex items-center justify-center font-serif text-lg text-foreground flex-shrink-0">
                {r.author[0]}
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{r.author}</div>
                <div className="text-xs text-muted-foreground">{r.date}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <Ornament />
  </div>
);

export default Home;
