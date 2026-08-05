# Velvet Fork Experience

<!DOCTYPE html>
<html lang="en" data-theme="dark" data-lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Velvet Fork — Fine Dining Redefined</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<style>
/* =============================================
   RESET & BASE
   ============================================= */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

/* =============================================
   THEME VARIABLES — DARK (default)
   ============================================= */
:root,
[data-theme="dark"]{
  --gold:#c9a96e;
  --gold-light:#e8cfa0;
  --gold-dim:#8a6f45;
  --black:#0a0a08;
  --dark:#111109;
  --dark2:#181815;
  --dark3:#222220;
  --cream:#f5f0e8;
  --muted:#8a8a7a;
  --white:#fdfcf8;
  --bg:var(--black);
  --bg2:var(--dark);
  --bg3:var(--dark2);
  --bg4:var(--dark3);
  --text:var(--cream);
  --text-muted:var(--muted);
  --text-white:var(--white);
  --border-gold:rgba(201,169,110,.12);
  --border-gold2:rgba(201,169,110,.2);
  --border-gold3:rgba(201,169,110,.35);
  --nav-blur:rgba(10,10,8,.92);
  --card-hover:rgba(201,169,110,.04);
  --review-bg:var(--dark2);
  --hours-bg:var(--dark2);
  --table-th:var(--dark2);
  --hero-overlay:linear-gradient(to bottom,rgba(10,10,8,.3) 0%,rgba(10,10,8,.6) 60%,#0a0a08 100%);
  --page-hero-overlay:rgba(10,10,8,.5);
  --section-featured:var(--dark);
  --testimonials-bg:var(--black);
  --shadow-card:none;
  --mode-icon:"☀️";
}

/* =============================================
   THEME VARIABLES — LIGHT
   ============================================= */
[data-theme="light"]{
  --gold:#a07835;
  --gold-light:#7a5b22;
  --gold-dim:#c4a060;
  --black:#f5f0e8;
  --dark:#ede8de;
  --dark2:#e2ddd3;
  --dark3:#d6d0c5;
  --cream:#2a2519;
  --muted:#6b6254;
  --white:#1a1510;
  --bg:#f5f0e8;
  --bg2:#ede8de;
  --bg3:#e2ddd3;
  --bg4:#d6d0c5;
  --text:#2a2519;
  --text-muted:#6b6254;
  --text-white:#1a1510;
  --border-gold:rgba(120,88,30,.15);
  --border-gold2:rgba(120,88,30,.25);
  --border-gold3:rgba(120,88,30,.45);
  --nav-blur:rgba(245,240,232,.95);
  --card-hover:rgba(120,88,30,.05);
  --review-bg:#e2ddd3;
  --hours-bg:#e2ddd3;
  --table-th:#e2ddd3;
  --hero-overlay:linear-gradient(to bottom,rgba(245,240,232,.25) 0%,rgba(245,240,232,.55) 60%,#f5f0e8 100%);
  --page-hero-overlay:rgba(245,240,232,.45);
  --section-featured:#ede8de;
  --testimonials-bg:#f5f0e8;
  --shadow-card:0 2px 20px rgba(0,0,0,.08);
  --mode-icon:"🌙";
}

html{scroll-behavior:smooth;font-size:16px}
body{background:var(--bg);color:var(--text);font-family:'Jost',sans-serif;font-weight:300;line-height:1.7;overflow-x:hidden;transition:background .4s,color .4s}
img{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
button{cursor:pointer;border:none;background:none;font-family:inherit}
ul{list-style:none}

/* =============================================
   SCROLLBAR
   ============================================= */
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--gold-dim);border-radius:2px}

/* =============================================
   TYPOGRAPHY HELPERS
   ============================================= */
.serif{font-family:'Cormorant Garamond',Georgia,serif}
.gold{color:var(--gold)}
.muted{color:var(--text-muted)}

.section-label{
  font-family:'Jost',sans-serif;
  font-size:.72rem;letter-spacing:.25em;text-transform:uppercase;
  color:var(--gold);margin-bottom:1rem;
}
.section-title{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:clamp(2.2rem,5vw,3.8rem);
  font-weight:300;line-height:1.15;color:var(--text-white);
}
.section-title em{font-style:italic;color:var(--gold)}

/* =============================================
   BUTTONS
   ============================================= */
.btn{
  display:inline-flex;align-items:center;gap:.6rem;
  font-family:'Jost',sans-serif;font-size:.78rem;font-weight:500;
  letter-spacing:.18em;text-transform:uppercase;
  padding:.9rem 2.4rem;
  transition:all .3s cubic-bezier(.4,0,.2,1);
  position:relative;overflow:hidden;
}
.btn::after{
  content:'';position:absolute;inset:0;
  background:rgba(255,255,255,.06);
  transform:translateX(-110%) skewX(-15deg);
  transition:transform .4s cubic-bezier(.4,0,.2,1);
}
.btn:hover::after{transform:translateX(110%) skewX(-15deg)}
.btn-gold{
  background:var(--gold);color:var(--bg);
  clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
}
.btn-gold:hover{background:var(--gold-light);color:var(--bg)}
.btn-outline{border:1px solid var(--gold);color:var(--gold)}
.btn-outline:hover{background:var(--gold);color:var(--bg)}

/* =============================================
   NAV
   ============================================= */
#nav{
  position:fixed;top:0;left:0;right:0;z-index:1000;
  height:72px;
  display:flex;align-items:center;
  padding:0 5%;
  transition:background .4s,backdrop-filter .4s;
}
#nav.scrolled{
  background:var(--nav-blur);
  backdrop-filter:blur(18px);
  border-bottom:1px solid var(--border-gold);
}
.nav-logo{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:1.5rem;font-weight:400;
  color:var(--text-white);letter-spacing:.05em;
  margin-right:auto;
  display:flex;align-items:center;gap:.5rem;
}
.nav-logo span{color:var(--gold)}
.nav-links{display:flex;gap:2.5rem;align-items:center}
.nav-links a{
  font-size:.75rem;letter-spacing:.18em;text-transform:uppercase;
  color:rgba(245,240,232,.7);
  transition:color .25s;position:relative;
}
[data-theme="light"] .nav-links a{color:rgba(42,37,25,.65)}
.nav-links a::after{
  content:'';position:absolute;bottom:-3px;left:0;right:0;
  height:1px;background:var(--gold);
  transform:scaleX(0);transform-origin:right;
  transition:transform .3s cubic-bezier(.4,0,.2,1);
}
.nav-links a:hover,.nav-links a.active{color:var(--gold)}
.nav-links a:hover::after,.nav-links a.active::after{transform:scaleX(1);transform-origin:left}
.nav-reserve{
  margin-left:2rem;
  font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;
  padding:.6rem 1.4rem;
  border:1px solid var(--gold);color:var(--gold);
  transition:all .3s;
}
.nav-reserve:hover{background:var(--gold);color:var(--bg)}

/* =============================================
   THEME + LANG CONTROLS
   ============================================= */
.nav-controls{
  display:flex;align-items:center;gap:.6rem;
  margin-left:1.2rem;
}

/* Theme toggle */
.theme-toggle{
  width:42px;height:22px;
  background:var(--dark3);
  border:1px solid var(--border-gold2);
  border-radius:11px;
  position:relative;
  cursor:pointer;
  transition:background .3s,border-color .3s;
  flex-shrink:0;
}
[data-theme="light"] .theme-toggle{background:var(--dark3)}
.theme-toggle-knob{
  position:absolute;top:2px;left:2px;
  width:16px;height:16px;border-radius:50%;
  background:var(--gold);
  transition:transform .3s cubic-bezier(.4,0,.2,1),background .3s;
  display:flex;align-items:center;justify-content:center;
  font-size:9px;line-height:1;
}
[data-theme="light"] .theme-toggle-knob{transform:translateX(20px)}
.theme-toggle-knob::before{content:"🌙"}
[data-theme="light"] .theme-toggle-knob::before{content:"☀️"}

/* Language selector */
.lang-select-wrap{
  position:relative;
}
.lang-btn{
  display:flex;align-items:center;gap:.35rem;
  font-size:.68rem;letter-spacing:.15em;text-transform:uppercase;
  padding:.4rem .75rem;
  border:1px solid var(--border-gold2);
  color:var(--gold);
  transition:all .25s;
  cursor:pointer;
  white-space:nowrap;
  background:transparent;
}
.lang-btn:hover{border-color:var(--gold);background:rgba(201,169,110,.07)}
.lang-btn .lang-flag{font-size:1rem;line-height:1}
.lang-dropdown{
  position:absolute;top:calc(100% + 6px);right:0;
  background:var(--bg3);
  border:1px solid var(--border-gold2);
  min-width:150px;
  z-index:200;
  display:none;
  box-shadow:0 8px 32px rgba(0,0,0,.3);
}
.lang-dropdown.open{display:block;animation:dropIn .2s ease}
@keyframes dropIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
.lang-option{
  display:flex;align-items:center;gap:.6rem;
  padding:.65rem 1rem;
  font-size:.75rem;letter-spacing:.1em;
  color:var(--text-muted);
  cursor:pointer;
  transition:background .2s,color .2s;
  border-bottom:1px solid var(--border-gold);
}
.lang-option:last-child{border-bottom:none}
.lang-option:hover,.lang-option.active{background:rgba(201,169,110,.1);color:var(--gold)}
.lang-option .flag{font-size:1.1rem}

.nav-burger{
  display:none;flex-direction:column;gap:5px;padding:4px;
  margin-left:.5rem;
}
.nav-burger span{display:block;width:24px;height:1px;background:var(--text);transition:all .3s}

/* =============================================
   PAGES CONTAINER
   ============================================= */
.page{display:none;min-height:100vh;padding-top:72px}
.page.active{display:block}

/* =============================================
   HOME — HERO
   ============================================= */
.hero{
  position:relative;height:100vh;min-height:600px;
  display:flex;align-items:center;justify-content:center;
  overflow:hidden;
  margin-top:-72px;padding-top:72px;
}
.hero-bg{
  position:absolute;inset:0;
  background:var(--hero-overlay),url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=80') center/cover no-repeat;
  transform:scale(1.05);
  animation:heroZoom 18s ease-in-out infinite alternate;
  transition:background .4s;
}
@keyframes heroZoom{0%{transform:scale(1.05)}100%{transform:scale(1.12)}}
.hero-content{
  position:relative;z-index:2;text-align:center;padding:0 1.5rem;
  animation:fadeUp .9s cubic-bezier(.4,0,.2,1) both;
}
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
.hero-tag{
  font-size:.7rem;letter-spacing:.35em;text-transform:uppercase;
  color:var(--gold);
  display:flex;align-items:center;justify-content:center;gap:1rem;
  margin-bottom:1.5rem;
}
.hero-tag::before,.hero-tag::after{content:'';width:40px;height:1px;background:var(--gold-dim)}
.hero-title{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:clamp(3.5rem,10vw,8rem);
  font-weight:300;line-height:1;
  color:var(--text-white);letter-spacing:.02em;margin-bottom:.4rem;
}
.hero-title em{display:block;font-style:italic;color:var(--gold);font-size:.65em;margin-top:-.1em}
.hero-sub{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:clamp(1rem,2.5vw,1.35rem);
  font-weight:300;font-style:italic;
  color:rgba(245,240,232,.7);
  margin-bottom:3rem;letter-spacing:.04em;
}
[data-theme="light"] .hero-sub{color:rgba(42,37,25,.65)}
.hero-cta{display:flex;gap:1.2rem;justify-content:center;flex-wrap:wrap}
.hero-scroll{
  position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);z-index:2;
  display:flex;flex-direction:column;align-items:center;gap:.6rem;
  font-size:.65rem;letter-spacing:.25em;text-transform:uppercase;
  color:var(--text-muted);
  animation:bob 2.5s ease-in-out infinite;
}
@keyframes bob{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(6px)}}
.hero-scroll::after{content:'';width:1px;height:36px;background:linear-gradient(to bottom,var(--gold-dim),transparent)}

/* =============================================
   ORNAMENT
   ============================================= */
.ornament{display:flex;align-items:center;justify-content:center;gap:1rem;margin:0 auto 3rem;width:fit-content}
.ornament::before,.ornament::after{content:'';width:60px;height:1px;background:var(--gold-dim)}
.ornament-icon{font-size:1rem;color:var(--gold);transform:rotate(15deg)}

/* =============================================
   INTRO
   ============================================= */
.intro{
  padding:8rem 5%;
  display:grid;grid-template-columns:1fr 1fr;gap:6rem;
  align-items:center;max-width:1300px;margin:0 auto;
}
.intro-img-wrap{position:relative}
.intro-img{width:100%;aspect-ratio:4/5;object-fit:cover;filter:brightness(.9) contrast(1.05)}
[data-theme="light"] .intro-img{filter:brightness(.95) contrast(1.02)}
.intro-badge{
  position:absolute;bottom:-2rem;right:-2rem;
  width:130px;height:130px;background:var(--gold);border-radius:50%;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  color:var(--bg);text-align:center;
}
.intro-badge strong{font-family:'Cormorant Garamond',Georgia,serif;font-size:2rem;font-weight:400;line-height:1}
.intro-badge span{font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;font-weight:500}
.intro-text p{color:var(--text-muted);font-size:.95rem;line-height:1.9;margin-bottom:1.2rem}

/* =============================================
   FEATURED
   ============================================= */
.featured{padding:6rem 5%;background:var(--section-featured);transition:background .4s}
.featured-header{text-align:center;margin-bottom:4rem}
.dishes-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:2px;max-width:1300px;margin:0 auto 3rem}
.dish-card{position:relative;overflow:hidden;aspect-ratio:3/4;cursor:pointer}
.dish-card img{width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.4,0,.2,1);filter:brightness(.7)}
.dish-card:hover img{transform:scale(1.08)}
.dish-card-info{
  position:absolute;inset:0;
  background:linear-gradient(to top,rgba(10,10,8,.95) 0%,rgba(10,10,8,.2) 55%,transparent 100%);
  display:flex;flex-direction:column;justify-content:flex-end;
  padding:2rem 1.6rem;transition:all .3s;
}
.dish-card-tag{font-size:.65rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:.5rem}
.dish-card-name{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.5rem;font-weight:400;color:#fdfcf8;margin-bottom:.4rem;line-height:1.2}
.dish-card-desc{font-size:.8rem;color:rgba(245,240,232,.55);max-height:0;overflow:hidden;transition:max-height .4s,opacity .4s;opacity:0}
.dish-card:hover .dish-card-desc{max-height:60px;opacity:1}
.dish-card-price{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.1rem;color:var(--gold);margin-top:.8rem}

/* =============================================
   TESTIMONIALS
   ============================================= */
.testimonials{padding:8rem 5%;text-align:center;background:var(--testimonials-bg);transition:background .4s}
.testimonials-header{margin-bottom:4rem}
.reviews-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem;max-width:1200px;margin:0 auto}
.review-card{
  background:var(--review-bg);
  border:1px solid var(--border-gold);
  padding:2.5rem;text-align:left;position:relative;
  transition:border-color .3s,transform .3s,background .4s;
  box-shadow:var(--shadow-card);
}
.review-card:hover{border-color:var(--border-gold3);transform:translateY(-4px)}
.review-stars{color:var(--gold);font-size:1rem;letter-spacing:.15em;margin-bottom:1.2rem}
.review-text{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.1rem;font-style:italic;font-weight:300;color:rgba(245,240,232,.8);line-height:1.75;margin-bottom:1.5rem}
[data-theme="light"] .review-text{color:rgba(42,37,25,.8)}
.review-author{display:flex;align-items:center;gap:1rem}
.review-avatar{width:44px;height:44px;border-radius:50%;background:var(--gold-dim);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',Georgia,serif;font-size:1.1rem;color:var(--cream);flex-shrink:0}
.review-name{font-size:.85rem;font-weight:500;color:var(--text-white)}
.review-date{font-size:.72rem;color:var(--text-muted)}

/* =============================================
   PAGE HERO
   ============================================= */
.page-hero{height:42vh;min-height:300px;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;text-align:center;overflow:hidden}
.page-hero-bg{position:absolute;inset:0;background:linear-gradient(to bottom,var(--page-hero-overlay),rgba(10,10,8,.8));z-index:0;transition:background .4s}
[data-theme="light"] .page-hero-bg{background:linear-gradient(to bottom,rgba(245,240,232,.45),rgba(245,240,232,.82))}
.page-hero-img{position:absolute;inset:0;object-fit:cover;width:100%;height:100%;filter:brightness(.45) saturate(.8)}
[data-theme="light"] .page-hero-img{filter:brightness(.65) saturate(.7)}
.page-hero-content{position:relative;z-index:1;padding:0 2rem}
.page-hero-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2.5rem,7vw,5.5rem);font-weight:300;color:var(--text-white);letter-spacing:.04em;margin-bottom:.5rem}
.page-hero-title em{font-style:italic;color:var(--gold)}
.page-hero-sub{font-size:.75rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold)}

/* =============================================
   MENU PAGE
   ============================================= */
.menu-section{max-width:1200px;margin:0 auto;padding:5rem 5%}
.menu-tabs{display:flex;gap:0;border-bottom:1px solid var(--border-gold2);margin-bottom:4rem;flex-wrap:wrap}
.menu-tab{padding:.9rem 2rem;font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;color:var(--text-muted);border-bottom:2px solid transparent;margin-bottom:-1px;transition:color .25s,border-color .25s;cursor:pointer}
.menu-tab.active,.menu-tab:hover{color:var(--gold);border-bottom-color:var(--gold)}
.menu-category{display:none}
.menu-category.active{display:grid;grid-template-columns:1fr 1fr;gap:1px}
.menu-item{display:flex;gap:1.5rem;align-items:flex-start;padding:2rem;background:var(--bg3);border:1px solid transparent;transition:border-color .3s,background .3s;box-shadow:var(--shadow-card)}
.menu-item:hover{border-color:var(--border-gold2);background:var(--bg4)}
.menu-item-img{width:90px;height:90px;flex-shrink:0;object-fit:cover;clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))}
.menu-item-info{flex:1}
.menu-item-name{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.15rem;font-weight:400;color:var(--text-white);margin-bottom:.3rem}
.menu-item-desc{font-size:.8rem;color:var(--text-muted);line-height:1.7;margin-bottom:.5rem}
.menu-item-price{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.1rem;color:var(--gold)}
.menu-item-tag{display:inline-block;font-size:.58rem;letter-spacing:.15em;text-transform:uppercase;padding:.2rem .6rem;border:1px solid rgba(201,169,110,.4);color:var(--gold);margin-left:.6rem;vertical-align:middle}

/* =============================================
   ABOUT PAGE
   ============================================= */
.about-section{max-width:1200px;margin:0 auto;padding:6rem 5%}
.about-story{display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:center;margin-bottom:8rem}
.about-story-text p{color:var(--text-muted);font-size:.95rem;line-height:1.95;margin-bottom:1.2rem}
.about-img{width:100%;aspect-ratio:3/4;object-fit:cover;filter:brightness(.85) saturate(.9)}
[data-theme="light"] .about-img{filter:brightness(.92) saturate(.95)}
.about-img-caption{font-size:.72rem;letter-spacing:.15em;text-transform:uppercase;color:var(--text-muted);margin-top:.8rem;text-align:right}
.chefs{margin-bottom:6rem}
.chefs-title{text-align:center;margin-bottom:4rem}
.chefs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.chef-card{text-align:center}
.chef-img-wrap{position:relative;margin-bottom:1.5rem;overflow:hidden}
.chef-img{width:100%;aspect-ratio:1;object-fit:cover;object-position:top;filter:grayscale(.3) brightness(.85);transition:filter .4s,transform .5s}
[data-theme="light"] .chef-img{filter:grayscale(.15) brightness(.92)}
.chef-card:hover .chef-img{filter:grayscale(0) brightness(.95);transform:scale(1.03)}
.chef-name{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.4rem;font-weight:400;color:var(--text-white);margin-bottom:.2rem}
.chef-role{font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.chef-bio{font-size:.82rem;color:var(--text-muted);margin-top:.8rem;line-height:1.7}
.about-values{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;padding:5rem;background:var(--bg3);border:1px solid var(--border-gold);transition:background .4s,border-color .4s}
.value-item{text-align:center}
.value-num{font-family:'Cormorant Garamond',Georgia,serif;font-size:3rem;font-weight:300;color:var(--gold);line-height:1;margin-bottom:.5rem}
.value-label{font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:var(--text-muted)}

/* =============================================
   GALLERY PAGE
   ============================================= */
.gallery-section{padding:4rem 5%;max-width:1400px;margin:0 auto}
.gallery-grid{columns:4;column-gap:8px}
.gallery-item{break-inside:avoid;margin-bottom:8px;overflow:hidden;position:relative;cursor:pointer}
.gallery-item img{width:100%;display:block;transition:transform .5s,filter .4s;filter:brightness(.85) saturate(.85)}
[data-theme="light"] .gallery-item img{filter:brightness(.95) saturate(.95)}
.gallery-item:hover img{transform:scale(1.05);filter:brightness(1) saturate(1)}
.gallery-overlay{position:absolute;inset:0;background:rgba(10,10,8,.5);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s}
.gallery-item:hover .gallery-overlay{opacity:1}
.gallery-overlay-icon{color:var(--gold);font-size:1.8rem}

/* LIGHTBOX */
.lightbox{position:fixed;inset:0;z-index:2000;background:rgba(10,10,8,.97);display:none;align-items:center;justify-content:center;padding:2rem}
[data-theme="light"] .lightbox{background:rgba(245,240,232,.97)}
.lightbox.open{display:flex}
.lightbox img{max-width:min(900px,95vw);max-height:85vh;object-fit:contain;animation:lbIn .3s cubic-bezier(.4,0,.2,1)}
@keyframes lbIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
.lightbox-close{position:absolute;top:1.5rem;right:2rem;font-size:2rem;color:var(--text);cursor:pointer;transition:color .2s}
.lightbox-close:hover{color:var(--gold)}
.lightbox-nav{position:absolute;top:50%;transform:translateY(-50%);font-size:2rem;color:rgba(245,240,232,.5);cursor:pointer;padding:1rem;transition:color .2s}
[data-theme="light"] .lightbox-nav{color:rgba(42,37,25,.5)}
.lightbox-nav:hover{color:var(--gold)}
.lightbox-prev{left:1rem}
.lightbox-next{right:1rem}

/* =============================================
   RESERVATION
   ============================================= */
.reservation-section{max-width:900px;margin:0 auto;padding:5rem 5%}
.reservation-header{text-align:center;margin-bottom:4rem}
.reservation-header p{color:var(--text-muted);font-size:.9rem}
.res-form{background:var(--bg3);border:1px solid var(--border-gold2);padding:4rem;transition:background .4s,border-color .4s;box-shadow:var(--shadow-card)}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem}
.form-group{display:flex;flex-direction:column;gap:.5rem}
.form-group label{font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.form-group input,.form-group select,.form-group textarea{
  background:var(--bg4);border:1px solid var(--border-gold2);
  color:var(--text);padding:.85rem 1rem;
  font-family:'Jost',sans-serif;font-size:.88rem;font-weight:300;
  outline:none;transition:border-color .25s,background .4s,color .4s;
  -webkit-appearance:none;
}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{border-color:var(--gold)}
.form-group input::placeholder,.form-group textarea::placeholder{color:var(--text-muted)}
.form-group textarea{resize:vertical;min-height:100px}
.form-group select option{background:var(--bg4);color:var(--text)}
.form-submit-wrap{text-align:center;margin-top:2.5rem}
.res-success{display:none;text-align:center;padding:4rem 2rem}
.res-success-icon{font-size:3rem;margin-bottom:1.5rem;animation:popIn .5s cubic-bezier(.4,0,.2,1)}
@keyframes popIn{from{transform:scale(0)}to{transform:scale(1)}}
.res-success h3{font-family:'Cormorant Garamond',Georgia,serif;font-size:2rem;font-weight:400;color:var(--text-white);margin-bottom:1rem}
.res-success p{color:var(--text-muted)}

/* =============================================
   CONTACT
   ============================================= */
.contact-section{max-width:1200px;margin:0 auto;padding:5rem 5%}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:6rem;margin-bottom:5rem}
.contact-detail{display:flex;align-items:flex-start;gap:1.2rem;margin-bottom:2rem}
.contact-detail-icon{font-size:1.2rem;color:var(--gold);flex-shrink:0;margin-top:.1rem}
.contact-detail strong{display:block;font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);margin-bottom:.3rem;font-weight:500}
.contact-detail span{font-size:.88rem;color:var(--text-muted);line-height:1.7}
.contact-hours{margin-top:2.5rem;background:var(--hours-bg);border:1px solid var(--border-gold);padding:1.8rem;transition:background .4s}
.contact-hours h4{font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:1rem;font-weight:500}
.hours-row{display:flex;justify-content:space-between;font-size:.85rem;padding:.4rem 0;border-bottom:1px solid var(--border-gold);color:var(--text-muted)}
.hours-row:last-child{border:none}
.hours-row span:last-child{color:var(--text)}
.contact-form-wrap{background:var(--bg3);border:1px solid var(--border-gold);padding:3rem;transition:background .4s;box-shadow:var(--shadow-card)}
.contact-form .form-group{margin-bottom:1.2rem}
.contact-form .form-group input,.contact-form .form-group textarea{width:100%}
.map-wrap{height:400px;border:1px solid var(--border-gold);overflow:hidden;position:relative}
.map-wrap iframe{width:100%;height:100%;border:none;filter:grayscale(1) brightness(.6) contrast(1.2)}
[data-theme="light"] .map-wrap iframe{filter:grayscale(.3) brightness(.95) contrast(1)}
.map-label{position:absolute;bottom:1.5rem;left:1.5rem;background:var(--nav-blur);border:1px solid var(--border-gold2);padding:.8rem 1.2rem;font-size:.78rem;color:var(--text)}
.map-label strong{color:var(--gold);display:block;margin-bottom:.2rem}

/* =============================================
   ADMIN
   ============================================= */
.admin-section{max-width:1200px;margin:0 auto;padding:4rem 5%}
.admin-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:3rem;flex-wrap:wrap;gap:1rem}
.admin-tabs{display:flex;gap:0;border:1px solid var(--border-gold2);overflow:hidden;margin-bottom:2rem}
.admin-tab{padding:.7rem 1.5rem;font-size:.72rem;letter-spacing:.15em;text-transform:uppercase;color:var(--text-muted);cursor:pointer;border-right:1px solid var(--border-gold2);transition:all .25s}
.admin-tab:last-child{border-right:none}
.admin-tab.active,.admin-tab:hover{background:var(--gold);color:var(--bg)}
.admin-panel{display:none}
.admin-panel.active{display:block}
.data-table{width:100%;border-collapse:collapse;font-size:.83rem}
.data-table th{text-align:left;padding:1rem 1.2rem;font-size:.68rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);font-weight:500;background:var(--table-th);border-bottom:1px solid var(--border-gold2)}
.data-table td{padding:1rem 1.2rem;color:var(--text-muted);border-bottom:1px solid var(--border-gold);vertical-align:top}
.data-table tr:hover td{background:var(--card-hover);color:var(--text)}
.data-table td:first-child{color:var(--text)}
.badge{display:inline-block;padding:.2rem .7rem;font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;border-radius:0}
.badge-new{background:rgba(201,169,110,.15);color:var(--gold);border:1px solid rgba(201,169,110,.3)}
.badge-read{background:rgba(100,100,100,.15);color:var(--text-muted);border:1px solid rgba(100,100,100,.2)}
.admin-empty{text-align:center;padding:5rem;color:var(--text-muted)}
.admin-empty .empty-icon{font-size:2.5rem;margin-bottom:1rem}

/* =============================================
   FOOTER
   ============================================= */
footer{background:var(--bg2);border-top:1px solid var(--border-gold);padding:5rem 5% 2rem;transition:background .4s,border-color .4s}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:4rem;max-width:1300px;margin:0 auto 4rem}
.footer-brand .nav-logo{font-size:1.6rem;margin-bottom:1.2rem;display:block}
.footer-brand p{font-size:.83rem;color:var(--text-muted);line-height:1.8;margin-bottom:1.5rem}
.footer-social{display:flex;gap:1rem}
.social-link{width:38px;height:38px;border:1px solid var(--border-gold2);display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:.9rem;transition:all .25s}
.social-link:hover{border-color:var(--gold);color:var(--gold)}
.footer-col h4{font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);margin-bottom:1.5rem;font-weight:500}
.footer-col ul{display:flex;flex-direction:column;gap:.7rem}
.footer-col ul li a{font-size:.83rem;color:var(--text-muted);transition:color .2s}
.footer-col ul li a:hover{color:var(--text)}
.footer-bottom{border-top:1px solid var(--border-gold);padding-top:1.5rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;max-width:1300px;margin:0 auto}
.footer-copy{font-size:.75rem;color:var(--text-muted)}

/* =============================================
   TOAST
   ============================================= */
.toast{
  position:fixed;bottom:2rem;right:2rem;z-index:3000;
  background:var(--bg3);border:1px solid var(--gold);
  padding:1rem 1.5rem;font-size:.85rem;color:var(--text);
  display:flex;align-items:center;gap:.8rem;
  transform:translateX(120%);transition:transform .4s cubic-bezier(.4,0,.2,1);
  max-width:320px;
}
.toast.show{transform:translateX(0)}
.toast-icon{color:var(--gold);font-size:1.1rem}

/* =============================================
   MOBILE MENU
   ============================================= */
.nav-mobile{
  position:fixed;inset:0;z-index:999;
  background:var(--nav-blur);backdrop-filter:blur(20px);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2rem;
  transform:translateX(100%);transition:transform .4s cubic-bezier(.4,0,.2,1);
}
.nav-mobile.open{transform:translateX(0)}
.nav-mobile a{font-family:'Cormorant Garamond',Georgia,serif;font-size:2.2rem;font-weight:300;color:var(--text);transition:color .2s}
.nav-mobile a:hover{color:var(--gold)}
.nav-mobile-controls{display:flex;align-items:center;gap:1rem;margin-top:1rem}

/* =============================================
   RESPONSIVE
   ============================================= */
@media(max-width:1024px){
  .intro,.about-story{grid-template-columns:1fr;gap:3rem}
  .chefs-grid{grid-template-columns:1fr 1fr}
  .about-values{grid-template-columns:1fr 1fr 1fr;padding:3rem}
  .footer-grid{grid-template-columns:1fr 1fr;gap:3rem}
  .gallery-grid{columns:3}
  .contact-grid{grid-template-columns:1fr}
}
@media(max-width:900px){
  .nav-links{display:none}
  .nav-reserve{display:none}
  .nav-controls .lang-select-wrap{display:none}
  .nav-burger{display:flex}
  .menu-category.active{grid-template-columns:1fr}
  .form-row{grid-template-columns:1fr}
  .res-form{padding:2rem}
  .chefs-grid{grid-template-columns:1fr}
  .about-values{grid-template-columns:1fr 1fr;padding:2rem}
  .footer-grid{grid-template-columns:1fr}
  .gallery-grid{columns:2}
  .dishes-grid{grid-template-columns:repeat(2,1fr)}
  .reviews-grid{grid-template-columns:1fr}
}
@media(max-width:480px){
  .gallery-grid{columns:1}
  .about-values{grid-template-columns:1fr}
  .dishes-grid{grid-template-columns:1fr}
  .hero-cta{flex-direction:column;align-items:center}
  .contact-form-wrap{padding:1.5rem}
}

/* =============================================
   ANIMATIONS
   ============================================= */
.reveal{opacity:0;transform:translateY(25px);transition:opacity .7s cubic-bezier(.4,0,.2,1),transform .7s cubic-bezier(.4,0,.2,1)}
.reveal.in{opacity:1;transform:translateY(0)}






Velvet Fork


    Home
    Menu
    About
    Gallery
    Contact
    Admin



  


    
      


    
    


      
        🇬🇧
        EN
        ▾
      
      


        

🇬🇧 English


        

🇫🇷 Français


        

🇷🇺 Русский


        

🇦🇲 Հայերեն


        

🇨🇳 中文


      


    



  Reserve
    



HomeMenuAboutGalleryReserveContactAdmin


    
      


    
    


      
        🇬🇧
        EN
        ▾
      
      


        

🇬🇧 English


        

🇫🇷 Français


        

🇷🇺 Русский


        

🇦🇲 Հայերեն


        

🇨🇳 中文


      


    






    


    


      

Est. 2012 · New York City


      


        Velvet Fork
        A Table Worth Remembering
      


      

Where every plate tells a story, and every evening becomes a memory.


      


        ✦ Book a Table
        View Menu
      


    


    

Scroll



  


    


      
      


        12
        Years of Excellence
      


    


    


      

Our Philosophy


      

Food is the language of the soul


      

Velvet Fork was born from a simple conviction: that a great meal is more than sustenance — it is art, ritual, and connection. Our kitchen breathes with seasonal ingredients sourced from trusted farms and artisan producers across the Northeast.


      

Every dish on our menu carries intention. Our chefs don't follow trends — they create experiences, drawing on classical French technique and the boldness of contemporary American cuisine.


      Our Story →
    



  


    


      

Chef's Selections


      

Featured Dishes


    


    


      


        
        


          

Signature


          

Seared Duck Confit


          

48-hour confit leg, cherry gastrique, pomme purée


          

$42


        


      


      


        
        


          

Bestseller


          

Butter-Poached Lobster


          

Maine lobster, tarragon beurre blanc, shaved truffle


          

$68


        


      


      


        
        


          

Vegetarian


          

Heirloom Beet Salad


          

Golden & candy stripe beets, whipped chèvre, candied walnut


          

$24


        


      


      


        
        


          

New


          

Wagyu Tenderloin


          

A5 wagyu, bone marrow jus, roasted cipollini


          

$95


        


      


    


    


      View Full Menu →
    



  


    


      

Guest Reviews


      

What our guests say


    


    






    
    


    


      

Curated Selections


      

Our Menu


    


    


      

Starters


      

Main Course


      

Desserts


      

Drinks


    


    


    


    


    






    
    


    


      

Who We Are


      

Our Story


    


    


      


        

The Beginning


        

Born from Passion


        

In 2012, Chef Isabelle Fontaine returned to New York after a decade in Lyon, Paris, and Tokyo, carrying with her a singular vision: to create a dining room where food could be quietly extraordinary.


        

She found an old warehouse in the Meatpacking District with 14-foot ceilings. Her partner, architect Marcus Webb, transformed it into the intimate, candlelit sanctuary you see today.


        

Today, we seat 64 guests each evening across a single dining room, with a private chef's table for up to eight. Every reservation is a conversation with our kitchen, with the seasons, with the farmers whose labor fills each plate.


      


      


        
        

Velvet Fork dining room, 2018


      


    


    


      


        

The People Behind the Plates


        

Meet the Team


      


      


        


          


          

Isabelle Fontaine


          

Executive Chef & Founder


          

James Beard Award winner, 2019. Trained at École Ferrandi, Paris. Believes food should whisper, not shout.


        


        


          


          

Dominic Carver


          

Head Pastry Chef


          

Former protégé of Pierre Hermé. Brings a sculptor's precision to every dessert that leaves our kitchen.


        


        


          


          

Aiko Tanaka


          

Sous Chef


          

Tokyo-born, classically trained in Kyoto. Her Japanese sensibility brings quiet elegance to our tasting menu.


        


      


    


    


      

64

Seats, by design


      

100%

Seasonal ingredients


      

3

Michelin Stars


    






    
    


    


      

Visual Stories


      

Our Gallery


    


    





✕‹›






    
    


    


      

Join Us


      

Reserve a Table


    


    


      

Reservations


      

Book Your Evening


      

We accept reservations up to 60 days in advance. For parties of 9 or more, please contact us directly.


    


    


      


        


          Full Name
          
        


        


          Phone Number
          
        


      


      


        


          Email Address
          
        


        


          

create

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://velvetfork.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6691848f-ee92-4806-991a-97585bf7b5ff).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
