interface SectionHeaderProps {
  label: string;
  title: string;
  titleAccent?: string;
}

const SectionHeader = ({ label, title, titleAccent }: SectionHeaderProps) => (
  <div className="text-center mb-16">
    <p className="font-sans text-[0.72rem] tracking-[0.25em] uppercase text-primary mb-4">{label}</p>
    <h2 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-light leading-[1.15] text-foreground">
      {titleAccent ? (
        <>
          {title} <em className="italic text-primary">{titleAccent}</em>
        </>
      ) : (
        title
      )}
    </h2>
  </div>
);

export default SectionHeader;
