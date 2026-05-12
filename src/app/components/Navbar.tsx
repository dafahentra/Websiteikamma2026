import { useState, useRef, useLayoutEffect, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router';
import { createPortal } from 'react-dom';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  Variants,
} from 'motion/react';
import { Home, Info, BookOpen, CalendarDays, Phone, ChevronDown, ChevronRight } from 'lucide-react';
import LogoPutihRaw from '../../assets/LogoIKAMMA/LogoPutih.svg?raw';

/* ── Ekstrak isi SVG (path, dll) dari raw string ─────────────────── */
const svgInner = LogoPutihRaw
  .replace(/<\?xml[^>]*\?>/g, '')
  .replace(/<svg[^>]*>/g, '')
  .replace(/<\/svg>/g, '')
  .trim();

function IkammaLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 749 538"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="IKAMMA"
      dangerouslySetInnerHTML={{ __html: svgInner }}
    />
  );
}

/* ── Nav link data ───────────────────────────────────────────────── */
type SubDropdownItem = { label: string; href: string };
type DropdownItem = { label: string; href?: string; subDropdown?: SubDropdownItem[] };
type NavLink = {
  href: string;
  label: string;
  icon: React.ElementType;
  dropdown?: DropdownItem[];
};

const links: NavLink[] = [
  { href: '/#home', label: 'Home', icon: Home },
  {
    href: '/about',
    label: 'About Us',
    icon: Info,
    dropdown: [
      { label: 'IKAMMA', href: '/about' },
      {
        label: 'Bureau',
        subDropdown: [
          { label: 'HR Birdept Buddy', href: '/departemen/hrbb' },
          { label: 'HR Monitoring', href: '/departemen/hr-monitoring' },
          { label: 'Marketing Media', href: '/departemen/mm' },
          { label: 'Administration and Finance', href: '/departemen/advance' },
        ]
      },
      {
        label: 'Department',
        subDropdown: [
          { label: 'Internal', href: '/departemen/internal' },
          { label: 'External Affairs', href: '/departemen/external' },
          { label: 'Intellectual and Development', href: '/departemen/indev' },
          { label: 'Entrepreneurship', href: '/departemen/entre' },
          { label: 'Sport and Art Association', href: '/departemen/sparta' },
        ]
      },
    ],
  },
  {
    href: '/info-mahasiswa',
    label: 'Info Mahasiswa',
    icon: BookOpen,
    dropdown: [
      { label: 'Artikel', href: '/articles' },
      { label: 'Aspirasi Mahasiswa', href: 'https://docs.google.com/forms/d/e/1FAIpQLSeeUpFXQMAkwWZwFN4HGlnO-3l8szFqz7v0nKSwDvJT_Lw5EQ/viewform?usp=publish-editor' },
      {
        label: 'Bank Soal',
        subDropdown: [
          { label: 'IUP', href: 'https://drive.google.com/drive/u/0/mobile/folders/0B0eWO0cAVzQgMXVJMVZQMmdkdEE/0B0eWO0cAVzQgMlhiOEZXTHhpZkk?resourcekey=0-feOoMbPGMCYvbTfdP-LQNQ&sort=13&direction=a' },
          { label: 'Reguler', href: 'https://drive.google.com/drive/u/0/mobile/folders/0B0eWO0cAVzQgMXVJMVZQMmdkdEE/1iTM_xBzKciLqj-ZzYMJST_igHWYM3rF1?sort=13&direction=a' },
          { label: 'Textbook', href: 'https://drive.google.com/drive/u/0/mobile/folders/0B0eWO0cAVzQgMXVJMVZQMmdkdEE/0B2ZM_IB3heEWMTFZeG1fbW5FcFk?resourcekey=0-SGgLIyyuyZdxZm_oVLoo-g&sort=13&direction=a' },
        ]
      },
      {
        label: 'Info Manajemen',
        subDropdown: [
          { label: 'Internship', href: '/info-mahasiswa?category=Magang' },
          { label: 'Competition', href: '/info-mahasiswa?category=Lomba' },
          { label: 'Beasiswa', href: '/info-mahasiswa?category=Beasiswa' },
        ]
      },
      {
        label: 'Alumni Database',
        subDropdown: [
          { label: 'Register', href: 'https://docs.google.com/forms/d/e/1FAIpQLSc8LgfcD489UBhTVqcQzRCBMqCpKe5H9hyp0rqZSWVWkbrsxw/viewform?usp=sharing&ouid=104485480134326130647' },
          { label: 'Database', href: '/alumni-database' },
        ]
      },
    ],
  },
  { href: '/events', label: 'Our Events', icon: CalendarDays },
  { href: '/contact', label: 'Contact Us', icon: Phone },
];

/* ── Mobile item variants ───────────────────────────────────────── */
const itemVariants: Variants = {
  hidden: { opacity: 0, y: -6 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.045, duration: 0.26, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
  exit: (i: number) => ({
    opacity: 0, y: -4,
    transition: { duration: 0.16, ease: [0.4, 0, 1, 1] },
  }),
};

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, scaleY: 0.9, y: -10, x: "-50%" },
  visible: {
    opacity: 1, scaleY: 1, y: 0, x: "-50%",
    transition: { duration: 0.32, ease: [0.32, 0.72, 0, 1] }
  },
  exit: {
    opacity: 0, scaleY: 0.9, y: -10, x: "-50%",
    transition: { duration: 0.25, ease: [0.32, 0.72, 0, 1], when: "afterChildren" }
  }
};

/* ── Hamburger → X ───────────────────────────────────────────────── */
function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="w-[24px] h-[16px] relative flex flex-col justify-between cursor-pointer">
      <motion.span className="block h-[2px] bg-white rounded-full origin-center"
        animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }} />
      <motion.span className="block h-[2px] bg-white rounded-full"
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }} />
      <motion.span className="block h-[2px] bg-white rounded-full origin-center"
        animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }} />
    </div>
  );
}

/* ── Desktop Dropdown Item (supports nested) ───────────────────── */
function DesktopDropdownItem({ item, isLight }: { item: DropdownItem; isLight: boolean }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(true); };
  const hide = () => { closeTimer.current = setTimeout(() => setOpen(false), 120); };

  const hasSub = !!item.subDropdown;

  return (
    <li
      className="relative"
      onMouseEnter={hasSub ? show : undefined}
      onMouseLeave={hasSub ? hide : undefined}
    >
      <a
        href={hasSub ? undefined : item.href}
        target={(!hasSub && item.href?.startsWith('http')) ? "_blank" : undefined}
        rel={(!hasSub && item.href?.startsWith('http')) ? "noopener noreferrer" : undefined}
        className={`flex items-center justify-between px-5 py-2.5 transition-all duration-150 whitespace-nowrap ${isLight ? 'text-black/70 hover:text-black hover:bg-black/5' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
        style={{ fontSize: '13.5px', textDecoration: 'none', cursor: hasSub ? 'default' : 'pointer' }}
        onClick={hasSub ? (e) => e.preventDefault() : undefined}
      >
        {item.label}
        {hasSub && <ChevronRight size={14} className="ml-4 opacity-70" />}
      </a>

      <AnimatePresence>
        {open && hasSub && (
          <motion.div
            initial={{ opacity: 0, x: -8, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
            className="absolute left-full top-0 ml-1 min-w-[150px] rounded-2xl"
            style={{
              background: (isLight
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))') as any,
              backdropFilter: 'blur(32px) saturate(180%) contrast(105%)',
              WebkitBackdropFilter: 'blur(32px) saturate(180%) contrast(105%)',
              border: (isLight ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.15)') as any,
              boxShadow: (isLight
                ? '0 12px 40px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.5)'
                : '0 12px 40px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)') as any,
            }}
          >
            <ul className="m-0 list-none py-2">
              {item.subDropdown!.map((sub) => (
                <li key={sub.href}>
                  <a
                    href={sub.href}
                    target={sub.href.startsWith('http') ? "_blank" : undefined}
                    rel={sub.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    className={`block px-5 py-2.5 transition-all duration-150 whitespace-nowrap ${isLight ? 'text-black/70 hover:text-black hover:bg-black/5' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
                    style={{ fontSize: '13.5px', textDecoration: 'none' }}
                  >
                    {sub.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/* ── Desktop dropdown — menggunakan Portal agar tidak terpotong overflow ─────── */
function DesktopDropdown({
  open,
  items,
  anchorRef,
  onMouseEnter,
  onMouseLeave,
  isLight,
}: {
  open: boolean;
  items: DropdownItem[];
  anchorRef: React.RefObject<HTMLLIElement | null>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isLight: boolean;
}) {
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (open && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setCoords({ top: rect.bottom + 12, left: rect.left + rect.width / 2 });
    }
  }, [open]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.97 }}
          transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
          className="fixed -translate-x-1/2 min-w-[176px] rounded-2xl"
          style={{
            top: coords.top,
            left: coords.left,
            zIndex: 9999,
            background: (isLight
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))') as any,
            backdropFilter: 'blur(40px) saturate(180%) contrast(105%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%) contrast(105%)',
            border: (isLight ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.15)') as any,
            boxShadow: (isLight
              ? '0 12px 40px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.5)'
              : '0 12px 40px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)') as any,
          }}
        >
          <ul className="m-0 list-none py-2">
            {items.map((item, idx) => (
              <DesktopDropdownItem key={idx} item={item} isLight={isLight} />
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ── Desktop nav item ────────────────────────────────────────────── */
function DesktopNavItem({ link, isLight, isActive }: { link: NavLink; isLight: boolean; isActive: boolean }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const anchorRef = useRef<HTMLLIElement | null>(null);

  const show = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(true); };
  const hide = () => { closeTimer.current = setTimeout(() => setOpen(false), 120); };

  return (
    <li
      ref={anchorRef}
      className="relative flex items-center h-full"
      onMouseEnter={link.dropdown ? show : undefined}
      onMouseLeave={link.dropdown ? hide : undefined}
    >
      <a
        href={link.href}
        className={`relative group flex items-center gap-1.5 transition-all duration-300 px-5 py-2 rounded-full ${isActive
          ? 'text-white font-semibold'
          : (isLight ? 'text-black/70 hover:text-black hover:bg-black/5' : 'text-white/80 hover:text-white hover:bg-white/10')
          }`}
        style={{
          fontSize: '14px',
          background: isActive ? (isLight
            ? 'linear-gradient(135deg, rgba(8, 28, 54, 0.95), rgba(8, 28, 54, 0.85))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))') : undefined,
          backdropFilter: isActive ? 'blur(12px) saturate(180%)' : undefined,
          WebkitBackdropFilter: isActive ? 'blur(12px) saturate(180%)' : undefined,
          border: isActive ? (isLight ? '1px solid rgba(8, 28, 54, 0.2)' : '1px solid rgba(255, 255, 255, 0.3)') : '1px solid transparent',
          boxShadow: isActive ? (isLight ? '0 4px 15px rgba(8, 28, 54, 0.2)' : '0 4px 15px rgba(0, 0, 0, 0.2)') : undefined,
        }}
      >
        {link.label}
        {link.dropdown && (
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="inline-flex"
          >
            <ChevronDown size={14} strokeWidth={2.5} />
          </motion.span>
        )}
      </a>

      {link.dropdown && (
        <DesktopDropdown
          open={open}
          items={link.dropdown}
          anchorRef={anchorRef}
          onMouseEnter={show}
          onMouseLeave={hide}
          isLight={isLight}
        />
      )}
    </li>
  );
}

/* ── Mobile Accordion Item (supports nested) ───────────────────── */
function MobileAccordionItem({ item, onClose, isLight }: { item: DropdownItem; onClose: () => void; isLight: boolean }) {
  const [open, setOpen] = useState(false);
  const hasSub = !!item.subDropdown;

  return (
    <li className="flex flex-col">
      <div
        className={`group flex items-center justify-between pr-2 cursor-pointer rounded-full transition-all duration-150 ${isLight ? 'hover:bg-black/5' : 'hover:bg-white/5'}`}
        onClick={hasSub ? () => setOpen(!open) : undefined}
      >
        <a
          href={hasSub ? undefined : item.href}
          target={(!hasSub && item.href?.startsWith('http')) ? "_blank" : undefined}
          rel={(!hasSub && item.href?.startsWith('http')) ? "noopener noreferrer" : undefined}
          onClick={hasSub ? (e) => { e.preventDefault(); } : onClose}
          className={`flex-1 flex items-center gap-3 pl-12 py-[10px] transition-all duration-150 ${isLight ? 'text-black/60 group-hover:text-black' : 'text-white/50 group-hover:text-white/90'}`}
          style={{ fontSize: '13.5px' }}
        >
          {item.label}
        </a>
        {hasSub && (
          <button
            onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
            className={`p-2 transition-colors focus:outline-none ${isLight ? 'text-black/50 group-hover:text-black' : 'text-white/50 group-hover:text-white/90'}`}
            aria-label="Toggle submenu"
          >
            <motion.span animate={{ rotate: open ? 180 : 0 }} className="inline-flex">
              <ChevronDown size={14} />
            </motion.span>
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && hasSub && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden m-0 list-none"
          >
            {item.subDropdown!.map(sub => (
              <li key={sub.href}>
                <a
                  href={sub.href}
                  target={sub.href.startsWith('http') ? "_blank" : undefined}
                  rel={sub.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  onClick={onClose}
                  className={`block pl-16 pr-4 py-2 transition-all duration-150 rounded-full ${isLight ? 'text-black/50 hover:text-black/90 hover:bg-black/5' : 'text-white/40 hover:text-white/80 hover:bg-white/5'}`}
                  style={{ fontSize: '12.5px' }}
                >
                  {sub.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

/* ── Mobile accordion sub-items ──────────────────────────────────── */
function MobileAccordion({ items, onClose, isLight }: { items: DropdownItem[]; onClose: () => void; isLight: boolean }) {
  return (
    <motion.ul
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
      className="overflow-hidden m-0 list-none"
    >
      {items.map((item, idx) => (
        <MobileAccordionItem key={idx} item={item} onClose={onClose} isLight={isLight} />
      ))}
    </motion.ul>
  );
}

/* ── Helper: check if a color is "light" ─────────────────────────── */
function isLightColor(r: number, g: number, b: number) {
  // Perceived luminance (sRGB)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}

/* ── Main Navbar ─────────────────────────────────────────────────── */
export function Navbar() {
  const { pathname } = useLocation();
  const [expanded, setExpanded] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return false;
    return pathname !== '/';
  });
  const [isNavigating, setIsNavigating] = useState(false);
  const [mobileExpand, setMobileExpand] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [onLightBg, setOnLightBg] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  /* Detect background brightness behind the navbar */
  const detectBackground = useCallback(() => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    // Sample from the left side (Logo/Burger area) instead of center
    // This ensures consistent adaptation even when expanded
    const cx = rect.left + 40;
    const cy = rect.top + rect.height / 2;

    // Hide our navbar temporarily to sample what's behind it
    navRef.current.style.visibility = 'hidden';
    const el = document.elementFromPoint(cx, cy);
    navRef.current.style.visibility = '';

    if (!el) return;

    // Helper: check if a bg string is opaque (not transparent)
    const getOpaqueBg = (node: Element | null): { r: number; g: number; b: number } | null => {
      let current = node;
      while (current) {
        const bg = window.getComputedStyle(current).backgroundColor;
        // Match both rgb() and rgba() — extract r, g, b, and optionally alpha
        const m = bg.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\s*\)/);
        if (m) {
          const alpha = m[4] !== undefined ? parseFloat(m[4]) : 1;
          if (alpha > 0.1) {
            return { r: +m[1], g: +m[2], b: +m[3] };
          }
        }
        current = current.parentElement;
      }
      return null;
    };

    const bg = getOpaqueBg(el);
    if (bg) {
      setOnLightBg(isLightColor(bg.r, bg.g, bg.b));
    } else {
      // Fallback: assume white bg (browser default)
      setOnLightBg(true);
    }
  }, []);

  useEffect(() => {
    detectBackground();
    // Re-check on scroll & resize
    const onScroll = () => detectBackground();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [detectBackground, pathname, isScrolled]);

  // Keep expanded if on sub-page (Desktop only), fold on mobile
  useEffect(() => {
    setIsNavigating(true);
    if (pathname !== '/') {
      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
        setExpanded(true);
      } else {
        setExpanded(false);
      }
    } else {
      setExpanded(false);
    }
    const timer = setTimeout(() => setIsNavigating(false), 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const toggleExpand = (label: string) =>
    setMobileExpand((prev) => (prev === label ? null : label));

  const checkActive = (link: NavLink) => {
    // 1. Check the main link itself
    const mainPath = link.href.split('#')[0];
    if (mainPath && mainPath !== '/' && pathname.startsWith(mainPath)) return true;
    if ((link.href === '/' || link.href === '/#home') && pathname === '/') return true;

    // 2. Check all items in the dropdown
    if (link.dropdown) {
      for (const item of link.dropdown) {
        if (item.href) {
          const itemPath = item.href.split('#')[0];
          if (itemPath && itemPath !== '/' && pathname.startsWith(itemPath)) return true;
        }
        // 3. Check sub-dropdowns
        if (item.subDropdown) {
          for (const sub of item.subDropdown) {
            const subPath = sub.href.split('#')[0];
            if (subPath && subPath !== '/' && pathname.startsWith(subPath)) return true;
          }
        }
      }
    }
    return false;
  };

  return (
    <motion.div
      ref={navRef}
      className="fixed top-6 left-1/2 z-[50] flex flex-col items-center"
      initial={{ opacity: 0, x: "-50%" }}
      animate={{ opacity: 1, x: "-50%" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* ── Desktop & Tablet Liquid Glass Pill ─────────────────────────────────── */}
      <motion.nav
        className="flex items-center h-[56px] pl-4 pr-3 rounded-full pointer-events-auto"
        animate={{
          background: ((isScrolled || onLightBg)
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))') as any,
          border: ((isScrolled || onLightBg) ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.15)') as any,
          boxShadow: ((isScrolled || onLightBg)
            ? '0 12px 40px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.5)'
            : '0 12px 40px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)') as any,
          backdropFilter: 'blur(32px) saturate(180%) contrast(105%)',
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Always visible: Logo and Burger */}
        <motion.div
          className="flex items-center gap-4"
          animate={{
            filter: (isScrolled || onLightBg) ? 'invert(1)' : 'invert(0)',
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <a href="/" className="flex items-center justify-center h-full -mt-0.5">
            <IkammaLogo className="h-6 md:h-7 w-auto object-contain" />
          </a>
          <div className="w-[1px] h-5 bg-white/20" />
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-white focus:outline-none p-1 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <MenuIcon isOpen={expanded} />
          </button>
        </motion.div>

        {/* Expanded Links (Desktop) - Memanjang ke kanan */}
        <AnimatePresence mode="wait" initial={false}>
          {expanded && (
            <motion.div
              key="expanded-content"
              initial={{ width: 0, opacity: 0, x: 20 }}
              animate={{ width: "auto", opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="hidden lg:flex items-center overflow-hidden h-full"
            >
              <ul className="flex items-center h-full gap-5 pl-6 pr-4 whitespace-nowrap m-0 list-none">
                {links.map((link) => (
                  <DesktopNavItem
                    key={link.href}
                    link={link}
                    isLight={isScrolled || onLightBg}
                    isActive={checkActive(link)}
                  />
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Mobile dropdown (Vertical) ────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'absolute',
              top: 'calc(100% + 16px)',
              left: '50%',
              width: 'calc(100vw - 48px)', // Responsive width
              maxWidth: '350px',
              transformOrigin: 'top left',
              background: ((isScrolled || onLightBg)
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.75))'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.08))') as any,
              backdropFilter: 'blur(32px) saturate(180%) contrast(105%)',
              WebkitBackdropFilter: 'blur(32px) saturate(180%) contrast(105%)',
              border: ((isScrolled || onLightBg) ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.15)') as any,
              boxShadow: ((isScrolled || onLightBg)
                ? '0 12px 40px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.5)'
                : '0 12px 40px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)') as any,
              borderRadius: '24px',
              overflow: 'hidden',
              transition: 'background 0.3s, border 0.3s, box-shadow 0.3s, backdrop-filter 0.3s'
            }}
            className="lg:hidden"
          >
            <ul className="p-3 flex flex-col gap-1 m-0 list-none">
              {links.map((link, i) => {
                const Icon = link.icon;
                const hasDropdown = !!link.dropdown;
                const isExpanded = mobileExpand === link.label;
                const isActive = checkActive(link);

                return (
                  <motion.li
                    key={link.href}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div
                      className={`group flex items-center justify-between cursor-pointer rounded-full transition-all duration-300`}
                      style={{
                        background: isActive ? ((isScrolled || onLightBg)
                          ? 'linear-gradient(135deg, rgba(8, 28, 54, 0.95), rgba(8, 28, 54, 0.85))'
                          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))') : undefined,
                        backdropFilter: isActive ? 'blur(12px) saturate(180%)' : undefined,
                        WebkitBackdropFilter: isActive ? 'blur(12px) saturate(180%)' : undefined,
                        border: isActive ? ((isScrolled || onLightBg) ? '1px solid rgba(8, 28, 54, 0.2)' : '1px solid rgba(255, 255, 255, 0.3)') : '1px solid transparent',
                        boxShadow: isActive ? ((isScrolled || onLightBg) ? '0 4px 15px rgba(8, 28, 54, 0.2)' : '0 4px 15px rgba(0, 0, 0, 0.2)') : undefined,
                      }}
                      onClick={hasDropdown ? () => toggleExpand(link.label) : undefined}
                    >
                      <a
                        href={hasDropdown ? undefined : link.href}
                        className={`flex items-center gap-4 flex-1 px-4 py-3 transition-colors duration-150 ${isActive
                          ? 'text-white font-semibold'
                          : (isScrolled || onLightBg ? 'text-black/80 group-hover:text-black' : 'text-white/80 group-hover:text-white')
                          }`}
                        style={{ fontSize: '15px' }}
                        onClick={hasDropdown ? (e) => e.preventDefault() : undefined}
                      >
                        <span className={`transition-colors ${isActive
                          ? 'text-white'
                          : (isScrolled || onLightBg ? 'text-black/40 group-hover:text-black/70' : 'text-white/40 group-hover:text-white/70')
                          }`}><Icon size={18} /></span>
                        {link.label}
                      </a>
                      {hasDropdown && (
                        <button
                          className={`pr-4 pl-2 py-3 transition-colors focus:outline-none ${(isScrolled || onLightBg) ? 'text-black/50 group-hover:text-black' : 'text-white/50 group-hover:text-white'}`}
                          onClick={(e) => { e.stopPropagation(); toggleExpand(link.label); }}
                          aria-label="toggle"
                        >
                          <motion.span
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="inline-flex"
                          >
                            <ChevronDown size={16} strokeWidth={2} />
                          </motion.span>
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {hasDropdown && isExpanded && (
                        <MobileAccordion items={link.dropdown!} onClose={() => setExpanded(false)} isLight={isScrolled || onLightBg} />
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}