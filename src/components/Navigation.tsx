import {useEffect, useState} from 'react';
import {Menu, X} from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion';
import {Button} from './ui/button';
import {cn} from '@/lib/utils';

import logoMoodl from '@/assets/logo-moodl.png';

const links = [
  {to: '/', label: 'Accueil'},
  {to: '/lieux', label: 'Lieux'},
  {to: '/programmes', label: 'Programmes'},
  {to: '/journal', label: 'Journal'},
  {to: '/simulateur', label: 'Simulateur'},
  {to: '/contact', label: 'Contact'},
];

export default function Navigation({pathname = '/'}: {pathname?: string}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open
          ? 'bg-background/85 backdrop-blur-md border-b border-border/60'
          : 'bg-transparent',
      )}
    >
      <nav className="container mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <a
          href="/"
          aria-label="Moodl — Accueil"
          onClick={() => setOpen(false)}
          className="relative z-10 flex items-center"
        >
          <img src={logoMoodl.src ?? logoMoodl} alt="Moodl" className="h-9 w-auto" width={160} height={36} />
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((link) => {
            const active = pathname === link.to || (link.to !== '/' && pathname.startsWith(link.to));
            return (
              <li key={link.to}>
                <a
                  href={link.to}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    active ? 'text-primary' : 'text-foreground/75 hover:text-primary',
                  )}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a href="/contact" className="hidden sm:block">
            <Button variant="moodl" size="default">Investir</Button>
          </a>

          <button
            type="button"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden relative z-10 w-11 h-11 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{rotate: -90, opacity: 0}}
                  animate={{rotate: 0, opacity: 1}}
                  exit={{rotate: 90, opacity: 0}}
                  transition={{duration: 0.18}}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{rotate: 90, opacity: 0}}
                  animate={{rotate: 0, opacity: 1}}
                  exit={{rotate: -90, opacity: 0}}
                  transition={{duration: 0.18}}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-background/95 backdrop-blur-lg overflow-y-auto"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: {transition: {staggerChildren: 0.05}},
                hidden: {},
              }}
              className="container mx-auto px-6 py-10 space-y-1"
            >
              {links.map((link) => (
                <motion.li
                  key={link.to}
                  variants={{
                    hidden: {opacity: 0, x: -20},
                    visible: {opacity: 1, x: 0},
                  }}
                >
                  <a
                    href={link.to}
                    onClick={() => setOpen(false)}
                    className="block py-4 font-display text-3xl font-bold tracking-tight border-b border-border/40 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: {opacity: 0, y: 20},
                  visible: {opacity: 1, y: 0},
                }}
                className="pt-8"
              >
                <a href="/contact" onClick={() => setOpen(false)}>
                  <Button variant="moodl" size="lg" className="w-full">Investir avec Moodl</Button>
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
