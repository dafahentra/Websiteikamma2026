/**
 * ═══════════════════════════════════════════════════════════════════
 * PHOTO REGISTRY — Manual Imports
 * ═══════════════════════════════════════════════════════════════════
 * 
 * Setiap foto di-import secara eksplisit agar mudah diganti.
 * Untuk mengganti foto, cukup ubah path import-nya saja.
 */

// ── Hero / Intro / Backgrounds ──────────────────────────────────────
import heroMain from './Background/BackgroundMain.jpg';
import aboutBg from './Background/BackgroundAbout.jpg';
import heroSectionBg from './Background/BackgroundMain.jpg';

// ── Scrapbook Photos (Flying Photos) ────────────────────────────────
import scrapbook1 from './FlyingPhoto/Flyingphoto1.JPG';
import scrapbook2 from './FlyingPhoto/FlyingPhoto2.JPG';
import scrapbook3 from './FlyingPhoto/FlyingPhoto3.jpg';
import scrapbook4 from './FlyingPhoto/FlyingPhoto4.jpg';
import scrapbook5 from './FlyingPhoto/FlyingPhoto5.jpg';
import scrapbook6 from './FlyingPhoto/FlyingPhoto6.jpg';
import scrapbook7 from './FlyingPhoto/FlyingPhoto7.jpg';
import scrapbook8 from './FlyingPhoto/FlyingPhoto8.jpg';
import scrapbook9 from './FlyingPhoto/FlyingPhoto9.jpg';
import scrapbook10 from './FlyingPhoto/FlyingPhoto10.jpg';
import scrapbook11 from './FlyingPhoto/FlyingPhoto11.jpg';
import scrapbook12 from './FlyingPhoto/FlyingPhoto12.jpg';
import scrapbook13 from './FlyingPhoto/FlyingPhoto13.jpg';
import scrapbook14 from './FlyingPhoto/FlyingPhoto14.jpg';
import scrapbook15 from './FlyingPhoto/FlyingPhoto15.jpg';

// ── Department Groups ──────────────────────────────────────────────
import PotoHRBB from './BirDepDetail/Group/HRBBGroup.jpg';
import PotoHRM from './BirDepDetail/Group/HRMGroup.JPG';
import PotoAdvance from './BirDepDetail/Group/AdvanceGroup.JPG';
import PotoMM from './BirDepDetail/Group/MMGroup.jpeg';
import PotoInternal from './BirDepDetail/Group/IntGroup.JPG';
import PotoExternal from './BirDepDetail/Group/ExtGroup.jpg';
import PotoIndev from './BirDepDetail/Group/IndevGroup.jpeg';
import PotoEntre from './BirDepDetail/Group/EntreGroup.jpeg';
import PotoSparta from './BirDepDetail/Group/SpartaGroup.jpeg';

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
import eventCard1 from './FotoEvent/FotoCI.jpg';
import eventCard2 from './FotoEvent/FotoME.JPG';
import eventCard3 from './FotoEvent/FotoMenefest.jpg';
import eventCard4 from './FotoEvent/FotoYES!.jpg';
import eventsBg from './Background/BackgroundAbout.jpg';

// ── Articles / Gallery (Fallback to old for now or use backgrounds) ──
import article1 from './Background/BackgroundAbout.jpg';
import article2 from './Background/BackgroundMain.jpg';
import article3 from './Background/BackgroundAbout.jpg';

import gallery1 from './Background/BackgroundMain.jpg';
import gallery2 from './Background/BackgroundAbout.jpg';
import gallery3 from './Background/BackgroundMain.jpg';
import gallery4 from './Background/BackgroundAbout.jpg';
import gallery5 from './Background/BackgroundMain.jpg';
import gallery6 from './Background/BackgroundAbout.jpg';

// ── Upcoming / News ────────────────────────────────────────────────
import upcoming1 from './FotoEvent/FotoCI.jpg';
import upcoming2 from './FotoEvent/FotoME.JPG';
import upcoming3 from './FotoEvent/FotoMenefest.jpg';

import newsBg from './Background/BackgroundMain.jpg';

// ═══════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════

export const HERO_IMAGE = heroMain;
export const ABOUT_BACKGROUND = aboutBg;
export const HERO_BG = heroSectionBg;

export const SCRAPBOOK_PHOTOS: string[] = [
  scrapbook1, scrapbook2, scrapbook3, scrapbook4, scrapbook5,
  scrapbook6, scrapbook7, scrapbook8, scrapbook9, scrapbook10,
  scrapbook11, scrapbook12, scrapbook13, scrapbook14, scrapbook15
];

export const LOGO_BIRDEP: string[] = [
  LogoAdvance, LogoEntre, LogoExternal, LogoHRBB, LogoHRM, LogoIndev, LogoInternal, LogoMM, LogoSparta
];

export const EVENT_PHOTOS: string[] = [eventCard1, eventCard2, eventCard3, eventCard4];
export const EVENTS_BG = eventsBg;

export const ARTICLE_PHOTOS: string[] = [article1, article2, article3];
export const GALLERY_PHOTOS: string[] = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];
export const PROGRAM_PHOTOS: string[] = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

export const DEPT_PHOTOS: string[] = [
  PotoHRBB, PotoHRM, PotoAdvance, PotoMM, PotoInternal, PotoExternal, PotoIndev, PotoEntre, PotoSparta
];

export const UPCOMING_PHOTOS: string[] = [upcoming1, upcoming2, upcoming3];
export const NEWS_BG = newsBg;

// Use some of the flying photos as placeholders for news if needed
export const NEWS_PLACEHOLDER_PHOTOS: string[] = SCRAPBOOK_PHOTOS;

export const EVENTS_PAGE_HERO = aboutBg;
export const EVENTS_PAGE_ONGOING: string[] = [eventCard1, eventCard2, eventCard3];
export const EVENTS_PAGE_PAST: string[] = [eventCard1, eventCard2, eventCard3, eventCard4];

export const ARTICLES_PAGE_HERO = aboutBg;
export const ARTICLES_PAGE_PHOTOS: string[] = [article1, article2, article3];

export const INFO_MAHASISWA_HERO = aboutBg;
export const INFO_MAHASISWA_PHOTOS: string[] = [article1, article2, article3];
