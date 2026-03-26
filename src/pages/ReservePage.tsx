import { useState } from "react";
import PageHero from "@/components/PageHero";
import heroBg from "@/assets/hero-bg.jpg";
import { toast } from "sonner";

const ReservePage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Reservation request received!");
  };

  return (
    <div className="min-h-screen">
      <PageHero title="Reserve a" titleAccent="Table" subtitle="Join Us" image={heroBg} />

      <section className="max-w-[900px] mx-auto py-20 px-[5%]">
        <div className="text-center mb-16">
          <p className="font-sans text-[0.72rem] tracking-[0.25em] uppercase text-primary mb-4">Reservations</p>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-light text-foreground mb-4">Book Your Evening</h2>
          <p className="text-muted-foreground text-sm">We accept reservations up to 60 days in advance. For parties of 9 or more, please contact us directly.</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="bg-muted border border-primary/20 p-8 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">Full Name</label>
                <input required className="bg-accent border border-primary/20 text-foreground px-4 py-3 font-sans text-sm font-light outline-none focus:border-primary transition-colors placeholder:text-muted-foreground" placeholder="Your name" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">Phone Number</label>
                <input required className="bg-accent border border-primary/20 text-foreground px-4 py-3 font-sans text-sm font-light outline-none focus:border-primary transition-colors placeholder:text-muted-foreground" placeholder="+1 (555) 000-0000" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">Email Address</label>
                <input type="email" required className="bg-accent border border-primary/20 text-foreground px-4 py-3 font-sans text-sm font-light outline-none focus:border-primary transition-colors placeholder:text-muted-foreground" placeholder="your@email.com" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">Party Size</label>
                <select className="bg-accent border border-primary/20 text-foreground px-4 py-3 font-sans text-sm font-light outline-none focus:border-primary transition-colors">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">Preferred Date</label>
                <input type="date" required className="bg-accent border border-primary/20 text-foreground px-4 py-3 font-sans text-sm font-light outline-none focus:border-primary transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">Preferred Time</label>
                <select className="bg-accent border border-primary/20 text-foreground px-4 py-3 font-sans text-sm font-light outline-none focus:border-primary transition-colors">
                  {["5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">Special Requests</label>
              <textarea className="bg-accent border border-primary/20 text-foreground px-4 py-3 font-sans text-sm font-light outline-none focus:border-primary transition-colors resize-y min-h-[100px] placeholder:text-muted-foreground" placeholder="Dietary restrictions, celebrations, seating preferences..." />
            </div>
            <div className="text-center mt-10">
              <button
                type="submit"
                className="inline-flex items-center gap-2 font-sans text-[0.78rem] font-medium tracking-[0.18em] uppercase px-10 py-4 bg-primary text-primary-foreground transition-all hover:bg-primary-light"
                style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
              >
                Confirm Reservation
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-16 px-8">
            <div className="text-5xl mb-6 animate-fade-up">✓</div>
            <h3 className="font-serif text-3xl font-normal text-foreground mb-4">Reservation Received</h3>
            <p className="text-muted-foreground">We'll confirm your booking via email within 24 hours. For immediate assistance, call +1 (212) 555-0178.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ReservePage;
