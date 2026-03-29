import { useState } from "react";
import PageHero from "@/components/PageHero";
import galleryHero from "@/assets/gallery-hero.jpg";
import dishDuck from "@/assets/dish-duck.jpg";
import dishLobster from "@/assets/dish-lobster.jpg";
import dishBeet from "@/assets/dish-beet.jpg";
import dishWagyu from "@/assets/dish-wagyu.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import introChef from "@/assets/intro-chef.jpg";
import aboutDining from "@/assets/about-dining.jpg";
import chefIsabelle from "@/assets/chef-isabelle.jpg";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const images = [dishDuck, dishLobster, heroBg, dishBeet, introChef, dishWagyu, aboutDining, chefIsabelle];

const GalleryPage = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { t } = useLanguage();

  const navigate = (dir: 1 | -1) => {
    if (lightbox === null) return;
    setLightbox((lightbox + dir + images.length) % images.length);
  };

  return (
    <div className="min-h-screen">
      <PageHero title={t("gallery.our")} titleAccent={t("gallery.gallery")} subtitle={t("gallery.subtitle")} image={galleryHero} />

      <section className="py-16 px-[5%] max-w-[1400px] mx-auto">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-2">
          {images.map((img, i) => (
            <div key={i} className="break-inside-avoid mb-2 overflow-hidden relative cursor-pointer group" onClick={() => setLightbox(i)}>
              <img src={img} alt={`Gallery ${i + 1}`} className="w-full block brightness-[0.85] saturate-[0.85] transition-all duration-500 group-hover:scale-105 group-hover:brightness-100 group-hover:saturate-100" loading="lazy" />
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-primary text-3xl">+</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {lightbox !== null && (
        <div className="fixed inset-0 z-[2000] bg-background/[0.97] flex items-center justify-center p-8">
          <img src={images[lightbox]} alt="" className="max-w-[min(900px,95vw)] max-h-[85vh] object-contain animate-fade-up" />
          <button onClick={() => setLightbox(null)} className="absolute top-6 right-8 text-foreground hover:text-primary transition-colors"><X className="w-8 h-8" /></button>
          <button onClick={() => navigate(-1)} className="absolute top-1/2 -translate-y-1/2 left-4 text-foreground/50 hover:text-primary transition-colors p-4"><ChevronLeft className="w-8 h-8" /></button>
          <button onClick={() => navigate(1)} className="absolute top-1/2 -translate-y-1/2 right-4 text-foreground/50 hover:text-primary transition-colors p-4"><ChevronRight className="w-8 h-8" /></button>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
