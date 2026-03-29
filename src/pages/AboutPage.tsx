import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import heroBg from "@/assets/hero-bg.jpg";
import aboutDining from "@/assets/about-dining.jpg";
import chefIsabelle from "@/assets/chef-isabelle.jpg";
import chefDominic from "@/assets/chef-dominic.jpg";
import chefAiko from "@/assets/chef-aiko.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const chefs = [
  { name: "Isabelle Fontaine", role: "Executive Chef & Founder", bio: "James Beard Award winner, 2019. Trained at École Ferrandi, Paris. Believes food should whisper, not shout.", img: chefIsabelle },
  { name: "Dominic Carver", role: "Head Pastry Chef", bio: "Former protégé of Pierre Hermé. Brings a sculptor's precision to every dessert that leaves our kitchen.", img: chefDominic },
  { name: "Aiko Tanaka", role: "Sous Chef", bio: "Tokyo-born, classically trained in Kyoto. Her Japanese sensibility brings quiet elegance to our tasting menu.", img: chefAiko },
];

const AboutPage = () => {
  const { t } = useLanguage();

  const values = [
    { num: "64", label: t("about.seats") },
    { num: "100%", label: t("about.seasonal") },
    { num: "3", label: t("about.stars") },
  ];

  return (
    <div className="min-h-screen">
      <PageHero title={t("about.our")} titleAccent={t("about.story")} subtitle={t("about.subtitle")} image={heroBg} />

      <section className="max-w-[1200px] mx-auto py-24 px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <div>
            <p className="font-sans text-[0.72rem] tracking-[0.25em] uppercase text-primary mb-4">{t("about.beginning")}</p>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-light leading-[1.15] text-foreground mb-6">
              {t("about.bornFrom")} <em className="italic text-primary">{t("about.passion")}</em>
            </h2>
            <p className="text-muted-foreground text-[0.95rem] leading-relaxed mb-5">{t("about.intro1")}</p>
            <p className="text-muted-foreground text-[0.95rem] leading-relaxed mb-5">{t("about.intro2")}</p>
            <p className="text-muted-foreground text-[0.95rem] leading-relaxed">{t("about.intro3")}</p>
          </div>
          <div>
            <img src={aboutDining} alt="Velvet Fork dining room" className="w-full aspect-[3/4] object-cover brightness-[0.85] saturate-[0.9]" loading="lazy" width={810} height={1080} />
            <p className="text-[0.72rem] tracking-[0.15em] uppercase text-muted-foreground mt-3 text-right">{t("about.diningCaption")}</p>
          </div>
        </div>

        <div className="mb-24">
          <div className="text-center mb-16">
            <p className="font-sans text-[0.72rem] tracking-[0.25em] uppercase text-primary mb-4">{t("about.people")}</p>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-light text-foreground">{t("about.meetTeam")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chefs.map((chef, i) => (
              <motion.div key={chef.name} className="text-center group" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15, duration: 0.6 }} viewport={{ once: true }}>
                <div className="relative mb-6 overflow-hidden">
                  <img src={chef.img} alt={chef.name} className="w-full aspect-square object-cover object-top grayscale-[0.3] brightness-[0.85] transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-[0.95] group-hover:scale-[1.03]" loading="lazy" width={800} height={800} />
                </div>
                <h3 className="font-serif text-xl font-normal text-foreground mb-1">{chef.name}</h3>
                <p className="text-[0.72rem] tracking-[0.2em] uppercase text-primary">{chef.role}</p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{chef.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-12 sm:p-20 bg-muted border border-border">
          {values.map((v) => (
            <div key={v.label} className="text-center">
              <div className="font-serif text-5xl font-light text-primary leading-none mb-2">{v.num}</div>
              <div className="text-[0.72rem] tracking-[0.2em] uppercase text-muted-foreground">{v.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
