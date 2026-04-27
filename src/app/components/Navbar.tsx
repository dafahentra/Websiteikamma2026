import { useState, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useAnimationFrame,
  useMotionValue,
  MotionValue,
} from 'motion/react';
import { Home, Info, BookOpen, CalendarDays, Phone, ChevronDown } from 'lucide-react';
import LogoPutihRaw from '../../imports/LogoPutih.svg?raw';

/* ── Ekstrak isi SVG (path, dll) dari raw string ─────────────────── */
const svgInner = LogoPutihRaw
  .replace(/<\?xml[^>]*\?>/g, '')
  .replace(/<svg[^>]*>/g, '')
  .replace(/<\/svg>/g, '')
  .trim();

/* ── Logo putih — full path via ?raw import ──────────────────────── */
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
type DropdownItem = { label: string; href: string };
type NavLink = {
  href: string;
  label: string;
  icon: React.ElementType;
  dropdown?: DropdownItem[];
};

const links: NavLink[] = [
  { href: '#home', label: 'Home', icon: Home },
  {
    href: '#about',
    label: 'About Us',
    icon: Info,
    dropdown: [
      { label: 'IKAMMA',     href: '#about-ikamma' },
      { label: 'Bureau',     href: '#about-bureau' },
      { label: 'Department', href: '#about-department' },
    ],
  },
  {
    href: '#programs',
    label: 'Info Mahasiswa',
    icon: BookOpen,
    dropdown: [
      { label: 'Artikel',             href: '#artikel' },
      { label: 'Aspirasi Manajemen',  href: '#aspirasi' },
      { label: 'Bank Soal',           href: '#bank-soal' },
      { label: 'Info Manajemen',      href: '#info-manajemen' },
      { label: 'Alumni Database',     href: '#alumni' },
    ],
  },
  { href: '#events', label: 'Our Events', icon: CalendarDays },
  {
    href: '#contact',
    label: 'Contact Us',
    icon: Phone,
    dropdown: [
      { label: 'IKAMMA', href: '#contact-ikamma' },
      { label: 'Event',  href: '#contact-event' },
    ],
  },
];

/* ── Mobile item variants ───────────────────────────────────────── */
const itemVariants = {
  hidden:  { opacity: 0, y: -6 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.045, duration: 0.26, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
  exit: (i: number) => ({
    opacity: 0, y: -4,
    transition: { delay: i * 0.015, duration: 0.16, ease: [0.4, 0, 1, 1] as const },
  }),
};

/* ── Hamburger → X ───────────────────────────────────────────────── */
function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="w-[26px] h-[18px] relative flex flex-col justify-between cursor-pointer">
      <motion.span className="block h-[2px] bg-white rounded-full origin-center"
        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }} />
      <motion.span className="block h-[2px] bg-white rounded-full"
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }} />
      <motion.span className="block h-[2px] bg-white rounded-full origin-center"
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }} />
    </div>
  );
}

/* ── Desktop dropdown — dirender via portal ke document.body ─────── */
function DesktopDropdown({
  open,
  items,
  dropLeft,
  navTop,
  dropHalfWRef,
  navBg,
  navBorder,
  onMouseEnter,
  onMouseLeave,
}: {
  open:         boolean;
  items:        DropdownItem[];
  dropLeft:     MotionValue<number>;
  navTop:       MotionValue<number>;
  dropHalfWRef: React.MutableRefObject<number>;
  navBg:        MotionValue<string>;
  navBorder:    MotionValue<string>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const dropRef = useRef<HTMLDivElement>(null);

  // Ukur lebar setelah dropdown muncul → update halfW untuk frame berikutnya
  useLayoutEffect(() => {
    if (open && dropRef.current) {
      dropHalfWRef.current = dropRef.current.offsetWidth / 2;
    }
  }, [open, dropHalfWRef]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dropRef}
          key="dd"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          exit={{    opacity: 0, y: -6, scale: 0.97 }}
          transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
          style={{
            position:             'fixed',
            top:                  navTop,
            left:                 dropLeft,
            zIndex:               9999,
            minWidth:             '176px',
            background:           navBg,
            backdropFilter:       'blur(28px) saturate(150%)',
            WebkitBackdropFilter: 'blur(28px) saturate(150%)',
            border:               navBorder,
            boxShadow:            '0 12px 40px rgba(6,36,74,0.45)',
            borderRadius:         '14px',
            overflow:             'hidden',
          }}
        >
          {/* caret */}
          <div style={{
            position:    'absolute',
            top:         '-5px',
            left:        '50%',
            transform:   'translateX(-50%) rotate(45deg)',
            width:       10,
            height:      10,
            background:  'rgba(6,36,74,0.92)',
            border:      '1px solid rgba(118,132,173,0.25)',
            borderRight: 'none',
            borderBottom:'none',
            borderRadius:'2px',
          }} />
          <ul style={{ margin: 0, listStyle: 'none', padding: '6px 0' }}>
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150 whitespace-nowrap"
                  style={{ fontSize: '13.5px', textDecoration: 'none' }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/* ── Desktop nav item ────────────────────────────────────────────── */
function DesktopNavItem({ link, navTop, navBg, navBorder }: {
  link:      NavLink;
  navTop:    MotionValue<number>;
  navBg:     MotionValue<string>;
  navBorder: MotionValue<string>;
}) {
  const [open, setOpen]   = useState(false);
  const closeTimer        = useRef<ReturnType<typeof setTimeout> | null>(null);
  const liRef             = useRef<HTMLLIElement>(null);
  const dropLeft          = useMotionValue(0);
  const dropHalfWRef      = useRef(88);

  useAnimationFrame(() => {
    if (!liRef.current) return;
    const rect = liRef.current.getBoundingClientRect();
    dropLeft.set(rect.left + rect.width / 2 - dropHalfWRef.current);
  });

  const show = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(true); };
  const hide = () => { closeTimer.current = setTimeout(() => setOpen(false), 120); };

  return (
    <li
      ref={liRef}
      className="relative"
      onMouseEnter={link.dropdown ? show : undefined}
      onMouseLeave={link.dropdown ? hide  : undefined}
    >
      <a
        href={link.href}
        className="relative group flex items-center gap-1 text-white/80 hover:text-[#00A855] transition-colors duration-200"
        style={{ fontSize: '14px' }}
      >
        {link.label}
        {link.dropdown && (
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="inline-flex"
          >
            <ChevronDown size={13} strokeWidth={2.2} />
          </motion.span>
        )}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00A855] group-hover:w-full transition-all duration-300 rounded-full" />
      </a>

      {/* Portal ke document.body — bebas dari backdrop-filter nav */}
      {link.dropdown && (
        <DesktopDropdown
          open={open}
          items={link.dropdown}
          dropLeft={dropLeft}
          navTop={navTop}
          dropHalfWRef={dropHalfWRef}
          navBg={navBg}
          navBorder={navBorder}
          onMouseEnter={show}
          onMouseLeave={hide}
        />
      )}
    </li>
  );
}

/* ── Mobile accordion sub-items ──────────────────────────────────── */
function MobileAccordion({ items, onClose }: { items: DropdownItem[]; onClose: () => void }) {
  return (
    <motion.ul
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{    opacity: 0, height: 0 }}
      transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
      className="overflow-hidden"
    >
      {items.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            className="flex items-center gap-3 pl-12 pr-4 py-[10px] text-white/50 hover:text-white/90 hover:bg-white/5 transition-all duration-150 rounded-full"
            style={{ fontSize: '13.5px' }}
            onClick={onClose}
          >
            <span className="w-1 h-1 rounded-full bg-[#7684AD] flex-shrink-0" />
            {item.label}
          </a>
        </li>
      ))}
    </motion.ul>
  );
}

/* ── Main Navbar ─────────────────────────────────────────────────── */
export function Navbar() {
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [mobileExpand,  setMobileExpand]  = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  const widthAnim        = useTransform(scrollY, [0, 400], ['100%',  '84%']);
  const marginTopAnim    = useTransform(scrollY, [0, 400], ['0px',   '18px']);
  const borderRadiusAnim = useTransform(scrollY, [0, 400], ['0px',   '100px']);
  const bgAnim           = useTransform(scrollY, [0, 400], ['rgba(6,36,74,0)', 'rgba(6,36,74,0.85)']);
  const shadowAnim       = useTransform(scrollY, [0, 400], ['0 0px 0px rgba(0,0,0,0)', '0 8px 40px rgba(6,36,74,0.40)']);
  const borderAnim       = useTransform(scrollY, [0, 400], ['1px solid rgba(255,255,255,0)', '1px solid rgba(118,132,173,0.28)']);
  const paddingAnim      = useTransform(scrollY, [0, 400], ['1.4rem 2.5rem', '0.7rem 1.8rem']);

  // Dropdown mengikuti warna navbar
  const dropBgAnim = useTransform(scrollY, [0, 400], ['rgba(6,36,74,0)', 'rgba(6,36,74,0.85)']);
  const dropBorderAnim = useTransform(scrollY, [0, 400], ['1px solid rgba(118,132,173,0.12)', '1px solid rgba(118,132,173,0.28)']);

  const mvLeft  = useMotionValue(0);
  const mvWidth = useMotionValue(typeof window !== 'undefined' ? window.innerWidth : 390);
  const mvTop   = useMotionValue(80);

  // navHeight: tinggi navbar (stable setelah mount)
  const navHeightRef = useRef(80);

  useAnimationFrame(() => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    navHeightRef.current = rect.height;
    mvLeft.set(rect.left);
    mvWidth.set(rect.width);
    // top dropdown = bottom navbar + 4px gap
    mvTop.set(rect.bottom + 4);
  });

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileExpand(null);
  };

  const toggleExpand = (label: string) =>
    setMobileExpand((prev) => (prev === label ? null : label));

  return (
    <>
      {/* ── Fixed wrapper ─────────────────────────────────── */}
      <div className={`w-full fixed top-0 left-0 flex justify-center pointer-events-none ${mobileOpen ? 'z-[45]' : 'z-50'}`}>
        <motion.nav
          ref={navRef}
          style={{
            width:           widthAnim,
            marginTop:       marginTopAnim,
            borderRadius:    borderRadiusAnim,
            backgroundColor: bgAnim,
            boxShadow:       shadowAnim,
            border:          borderAnim,
            padding:         paddingAnim,
          }}
          className="pointer-events-auto backdrop-blur-md flex items-center justify-between w-full max-w-[1400px]"
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 flex-shrink-0">
            <IkammaLogo className="h-10 w-auto object-contain" />
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-7">
            {links.map((link) => (
              <DesktopNavItem key={link.href} link={link} navTop={mvTop} navBg={dropBgAnim} navBorder={dropBorderAnim} />
            ))}
          </ul>

          {/* Mobile toggle */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-white p-1"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <MenuIcon isOpen={mobileOpen} />
            </button>
          </div>
        </motion.nav>
      </div>

      {/* ── Mobile dropdown ────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[38] lg:hidden"
              onClick={closeMobile}
            />

            <motion.div
              key="dropdown"
              initial={{ opacity: 0, scaleY: 0.84, y: -10 }}
              animate={{ opacity: 1, scaleY: 1,    y: 0 }}
              exit={{    opacity: 0, scaleY: 0.88, y: -8 }}
              transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
              style={{
                position:           'fixed',
                zIndex:             39,
                transformOrigin:    'top center',
                top:                mvTop,
                left:               mvLeft,
                width:              mvWidth,
                background:         'rgba(6,36,74,0.90)',
                backdropFilter:     'blur(32px) saturate(120%)',
                WebkitBackdropFilter: 'blur(32px) saturate(120%)',
                border:             '1px solid rgba(118,132,173,0.25)',
                boxShadow:          '0 12px 48px rgba(6,36,74,0.45)',
                borderRadius:       '24px',
                overflow:           'hidden',
              }}
              className="lg:hidden"
            >
              <ul className="p-3 flex flex-col gap-0.5">
                {links.map((link, i) => {
                  const Icon = link.icon;
                  const hasDropdown = !!link.dropdown;
                  const isExpanded  = mobileExpand === link.label;

                  return (
                    <motion.li
                      key={link.href}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {/* Main row */}
                      <div
                        className="flex items-center justify-between"
                        onClick={hasDropdown ? () => toggleExpand(link.label) : undefined}
                      >
                        <a
                          href={hasDropdown ? undefined : link.href}
                          className="flex items-center gap-4 flex-1 px-4 py-[13px] rounded-full text-white/75 hover:text-white hover:bg-white/10 transition-all duration-150"
                          style={{ fontSize: '15px' }}
                          onClick={hasDropdown ? (e) => e.preventDefault() : closeMobile}
                        >
                          <span className="text-white/30"><Icon size={18} /></span>
                          {link.label}
                        </a>
                        {hasDropdown && (
                          <button
                            className="pr-4 pl-2 py-[13px] text-white/40 hover:text-white/70 transition-colors"
                            onClick={(e) => { e.stopPropagation(); toggleExpand(link.label); }}
                            aria-label="toggle"
                          >
                            <motion.span
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="inline-flex"
                            >
                              <ChevronDown size={15} strokeWidth={2} />
                            </motion.span>
                          </button>
                        )}
                      </div>

                      {/* Sub-items accordion */}
                      <AnimatePresence>
                        {hasDropdown && isExpanded && (
                          <MobileAccordion items={link.dropdown!} onClose={closeMobile} />
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}