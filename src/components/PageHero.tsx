interface PageHeroProps {
  title: string;
  titleAccent?: string;
  subtitle: string;
  image: string;
}

const PageHero = ({ title, titleAccent, subtitle, image }: PageHeroProps) => (
  <div className="h-[42vh] min-h-[300px] flex flex-col items-center justify-center relative text-center overflow-hidden">
    <img
      src={image}
      alt=""
      className="absolute inset-0 w-full h-full object-cover brightness-[0.45] saturate-[0.8]"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/80 z-0" />
    <div className="relative z-10 px-8">
      <h1 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-light text-foreground tracking-wide mb-2">
        {titleAccent ? (
          <>
            {title} <em className="italic text-primary">{titleAccent}</em>
          </>
        ) : (
          title
        )}
      </h1>
      <p className="text-xs tracking-[0.3em] uppercase text-primary">{subtitle}</p>
    </div>
  </div>
);

export default PageHero;
