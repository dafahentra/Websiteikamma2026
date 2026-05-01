import { useState, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'motion/react';
import { Home, Info, BookOpen, CalendarDays, Phone, ChevronDown, ChevronRight } from 'lucide-react';
import LogoPutihRaw from '../../assets/LogoPutih.svg?raw';

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
    href: '/#about',
    label: 'About Us',
    icon: Info,
    dropdown: [
      { label: 'IKAMMA', href: '/about' },
      {
        label: 'Bureau',
        subDropdown: [
          { label: 'HR Monitoring', href: '/departemen/hr-monitoring' },
          { label: 'HR Birdept Buddy', href: '/departemen/hrbb' },
          { label: 'Marketing & Media', href: '/departemen/mm' },
          { label: 'Administration & Finance', href: '/departemen/advance' },
        ]
      },
      {
        label: 'Department',
        subDropdown: [
          { label: 'Internal', href: '/departemen/internal' },
          { label: 'External', href: '/departemen/external' },
          { label: 'Intellectual & Development', href: '/departemen/indev' },
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
      { label: 'Aspirasi Manajemen', href: '/#aspirasi' },
      {
        label: 'Bank Soal',
        subDropdown: [
          { label: 'IUP', href: '/#bank-soal-iup' },
          { label: 'Reguler', href: '/#bank-soal-reguler' },
          { label: 'Textbook', href: '/#bank-soal-textbook' },
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
          { label: 'Register', href: '/#alumni-register' },
          { label: 'Database', href: '/#alumni-database' },
        ]
      },
    ],
  },
  { href: '/events', label: 'Our Events', icon: CalendarDays },
  { href: '/contact', label: 'Contact Us', icon: Phone },
];

/* ── Mobile item variants ───────────────────────────────────────── */
const itemVariants = {
  hidden: { opacity: 0, y: -6 },
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
function DesktopDropdownItem({ item }: { item: DropdownItem }) {
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
        className="flex items-center justify-between px-5 py-2.5 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-150 whitespace-nowrap"
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
              background: 'rgba(12, 35, 64, 0.85)',
              backdropFilter: 'blur(30px) saturate(150%)',
              WebkitBackdropFilter: 'blur(30px) saturate(150%)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
            }}
          >
            <ul className="m-0 list-none py-2">
              {item.subDropdown!.map((sub) => (
                <li key={sub.href}>
                  <a
                    href={sub.href}
                    className="block px-5 py-2.5 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-150 whitespace-nowrap"
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
}: {
  open: boolean;
  items: DropdownItem[];
  anchorRef: React.RefObject<HTMLLIElement>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
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
            background: 'rgba(12, 35, 64, 0.85)',
            backdropFilter: 'blur(30px) saturate(150%)',
            WebkitBackdropFilter: 'blur(30px) saturate(150%)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
          }}
        >
          <ul className="m-0 list-none py-2">
            {items.map((item, idx) => (
              <DesktopDropdownItem key={idx} item={item} />
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ── Desktop nav item ────────────────────────────────────────────── */
function DesktopNavItem({ link }: { link: NavLink }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const anchorRef = useRef<HTMLLIElement>(null);

  const show = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(true); };
  const hide = () => { closeTimer.current = setTimeout(() => setOpen(false), 120); };

  return (
    <li
      ref={anchorRef}
      className="relative flex items-center"
      onMouseEnter={link.dropdown ? show : undefined}
      onMouseLeave={link.dropdown ? hide : undefined}
    >
      <a
        href={link.href}
        className="relative group flex items-center gap-1.5 text-white/80 hover:text-white transition-colors duration-200 py-2"
        style={{ fontSize: '14px', fontWeight: 500 }}
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
        />
      )}
    </li>
  );
}

/* ── Mobile Accordion Item (supports nested) ───────────────────── */
function MobileAccordionItem({ item, onClose }: { item: DropdownItem; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const hasSub = !!item.subDropdown;

  return (
    <li className="flex flex-col">
      <div className="flex items-center justify-between pr-2">
        <a
          href={hasSub ? undefined : item.href}
          onClick={hasSub ? (e) => { e.preventDefault(); setOpen(!open); } : onClose}
          className="flex-1 flex items-center gap-3 pl-12 py-[10px] text-white/50 hover:text-white/90 hover:bg-white/5 transition-all duration-150 rounded-full"
          style={{ fontSize: '13.5px' }}
        >
          <span className="w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
          {item.label}
        </a>
        {hasSub && (
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-white/50 hover:text-white focus:outline-none"
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
                  onClick={onClose}
                  className="block pl-16 pr-4 py-2 text-white/40 hover:text-white/80 hover:bg-white/5 transition-all duration-150 rounded-full"
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
function MobileAccordion({ items, onClose }: { items: DropdownItem[]; onClose: () => void }) {
  return (
    <motion.ul
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
      className="overflow-hidden m-0 list-none"
    >
      {items.map((item, idx) => (
        <MobileAccordionItem key={idx} item={item} onClose={onClose} />
      ))}
    </motion.ul>
  );
}

/* ── Main Navbar ─────────────────────────────────────────────────── */
export function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [mobileExpand, setMobileExpand] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const toggleExpand = (label: string) =>
    setMobileExpand((prev) => (prev === label ? null : label));

  return (
    <motion.div
      className="fixed top-6 left-1/2 z-[50] flex flex-col items-center"
      style={{ x: "-50%" }}
      initial={false}
    >
      {/* ── Desktop & Tablet Liquid Glass Pill ─────────────────────────────────── */}
      <nav
        className="flex items-center h-[56px] pl-4 pr-3 rounded-full pointer-events-auto transition-colors duration-300"
        style={{
          background: 'rgba(12, 35, 64, 0.9)',
          border: '1px solid rgba(12, 35, 64, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          backdropFilter: 'blur(24px) saturate(150%)',
          WebkitBackdropFilter: 'blur(24px) saturate(150%)',
        }}
      >
        {/* Always visible: Logo and Burger */}
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center justify-center h-full">
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
        </div>

        {/* Expanded Links (Desktop) - Memanjang ke kanan */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="hidden lg:flex items-center overflow-hidden h-full"
            >
              <ul className="flex items-center h-full gap-7 pl-6 pr-4 whitespace-nowrap m-0 list-none">
                {links.map((link) => (
                  <DesktopNavItem key={link.href} link={link} />
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Mobile dropdown (Vertical) ────────────────────────────────── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.9, y: -10, x: "-50%" }}
            animate={{ opacity: 1, scaleY: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scaleY: 0.9, y: -10, x: "-50%" }}
            transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 16px)',
              left: '50%',
              width: 'calc(100vw - 48px)', // Responsive width
              maxWidth: '350px',
              transformOrigin: 'top left',
              background: 'rgba(12, 35, 64, 0.95)',
              backdropFilter: 'blur(30px) saturate(150%)',
              WebkitBackdropFilter: 'blur(30px) saturate(150%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 12px 48px rgba(0, 0, 0, 0.2)',
              borderRadius: '24px',
              overflow: 'hidden',
            }}
            className="lg:hidden"
          >
            <ul className="p-3 flex flex-col gap-1 m-0 list-none">
              {links.map((link, i) => {
                const Icon = link.icon;
                const hasDropdown = !!link.dropdown;
                const isExpanded = mobileExpand === link.label;

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
                      className="flex items-center justify-between cursor-pointer"
                      onClick={hasDropdown ? () => toggleExpand(link.label) : undefined}
                    >
                      <a
                        href={hasDropdown ? undefined : link.href}
                        className="flex items-center gap-4 flex-1 px-4 py-3 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-150"
                        style={{ fontSize: '15px' }}
                        onClick={hasDropdown ? (e) => e.preventDefault() : () => setExpanded(false)}
                      >
                        <span className="text-white/40"><Icon size={18} /></span>
                        {link.label}
                      </a>
                      {hasDropdown && (
                        <button
                          className="pr-4 pl-2 py-3 text-white/50 hover:text-white transition-colors focus:outline-none"
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
                        <MobileAccordion items={link.dropdown!} onClose={() => setExpanded(false)} />
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