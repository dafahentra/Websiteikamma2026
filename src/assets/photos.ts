/**
 * ═══════════════════════════════════════════════════════════════════
 * PHOTO REGISTRY — Manual Imports
 * ═══════════════════════════════════════════════════════════════════
 * 
 * Setiap foto di-import secara eksplisit agar mudah diganti.
 * Untuk mengganti foto, cukup ubah path import-nya saja.
 */

// ── Hero / Intro / Backgrounds ──────────────────────────────────────
import heroMain from './Background/BackgroundMain.webp';
import aboutBg from './Background/BackgroundMain.webp';
import heroSectionBg from './Background/BackgroundMain.webp';
import artikelBg from './Background/BackgroundArtikel.webp';
import infoMhsBg from './Background/BackgroundInfoMahasiswa.webp';

// ── Scrapbook Photos (Flying Photos) ────────────────────────────────
// Removed as requested

// ── Department Groups ──────────────────────────────────────────────
import PotoHRBB from './BirDepDetail/Group/HRBBGroup.webp';
import PotoHRM from './BirDepDetail/Group/HRMGroup.webp';
import PotoAdvance from './BirDepDetail/Group/AdvanceGroup.webp';
import PotoMM from './BirDepDetail/Group/MMGroup.webp';
import PotoInternal from './BirDepDetail/Group/IntGroup.webp';
import PotoExternal from './BirDepDetail/Group/ExtGroup.webp';
import PotoIndev from './BirDepDetail/Group/IndevGroup.webp';
import PotoEntre from './BirDepDetail/Group/EntreGroup.webp';
import PotoSparta from './BirDepDetail/Group/SpartaGroup.webp';

// ── Logos ───────────────────────────────────────────────────────────
import LogoHRM from './LogoBirDept/HRM.svg';
import LogoHRBB from './LogoBirDept/HRBB.svg';
import LogoAdvance from './LogoBirDept/ADVANCE.svg';
import LogoMM from './LogoBirDept/MM.svg';
import LogoInternal from './LogoBirDept/INTERNAL.svg';
import LogoExternal from './LogoBirDept/EXTERNAL.svg';
import LogoIndev from './LogoBirDept/INDEV.svg';
import LogoEntre from './LogoBirDept/ENTRE.svg';
import LogoSparta from './LogoBirDept/SPARTA.svg';

// ── Events ──────────────────────────────────────────────────────────
import eventCard1 from './FotoEvent/FotoME.webp';
import eventCard2 from './FotoEvent/FotoCI.webp';
import eventCard3 from './FotoEvent/FotoMenefest.webp';
import eventCard4 from './FotoEvent/FotoYES.webp';
import eventCard5 from './FotoEvent/FotoGMSC.webp';
import eventsBg from './Background/BackgroundNotableEvent.webp';

// ── Articles / Gallery (Fallback to old for now or use backgrounds) ──
import article1 from './Background/HeroAbout.webp';
import article2 from './Background/BackgroundMain.webp';
import article3 from './Background/HeroAbout.webp';

import gallery1 from './Background/HeroAbout.webp';
import gallery2 from './Background/HeroAbout.webp';
import gallery3 from './Background/HeroAbout.webp';
import gallery4 from './Background/HeroAbout.webp';
import gallery5 from './Background/HeroAbout.webp';
import gallery6 from './Background/HeroAbout.webp';

// ── Upcoming / News ────────────────────────────────────────────────
import upcoming1 from './FotoEvent/FotoCI.webp';
import upcoming2 from './FotoEvent/FotoME.webp';
import upcoming3 from './FotoEvent/FotoMenefest.webp';

import newsBg from './Background/BackgroundMain.webp';

// ═══════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════

export const HERO_IMAGE = heroMain;
export const ABOUT_BACKGROUND = aboutBg;
export const HERO_BG = heroSectionBg;



export const LOGO_BIRDEP: string[] = [
  LogoAdvance, LogoEntre, LogoExternal, LogoHRBB, LogoHRM, LogoIndev, LogoInternal, LogoMM, LogoSparta
];

export const EVENT_PHOTOS: string[] = [eventCard1, eventCard2, eventCard3, eventCard4, eventCard5];
export const EVENTS_BG = eventsBg;

export const ARTICLE_PHOTOS: string[] = [article1, article2, article3];
export const GALLERY_PHOTOS: string[] = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];
export const PROGRAM_PHOTOS: string[] = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

export const DEPT_PHOTOS: string[] = [
  PotoHRBB, PotoHRM, PotoAdvance, PotoMM, PotoInternal, PotoExternal, PotoIndev, PotoEntre, PotoSparta
];

export const UPCOMING_PHOTOS: string[] = [upcoming1, upcoming2, upcoming3];
export const NEWS_BG = newsBg;

export const NEWS_PLACEHOLDER_PHOTOS: string[] = EVENT_PHOTOS;

export const EVENTS_PAGE_HERO = eventsBg;
export const EVENTS_PAGE_ONGOING: string[] = [eventCard1, eventCard2, eventCard3, eventCard4, eventCard5];
export const EVENTS_PAGE_PAST: string[] = [eventCard1, eventCard2, eventCard3, eventCard4, eventCard5];

export const ARTICLES_PAGE_HERO = artikelBg;
export const ARTICLES_PAGE_PHOTOS: string[] = [article1, article2, article3];

export const INFO_MAHASISWA_HERO = infoMhsBg;
export const INFO_MAHASISWA_PHOTOS: string[] = [article1, article2, article3];
