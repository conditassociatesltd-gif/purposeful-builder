"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Podcast", href: "/podcast" },
    { label: "Writing", href: "/writing" },
    { label: "Portfolio", href: "/#portfolio" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Search", href: "/search" },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 -mr-2 text-current hover:opacity-70 transition-opacity"
        aria-label="Open menu"
      >
        <Menu size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
            />

            {/* Sidebar Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white dark:bg-[#1a1a1a] z-[101] shadow-2xl flex flex-col"
            >
              {/* Header inside sidebar */}
              <div className="flex justify-between items-center p-6 border-b border-black/10 dark:border-white/10">
                <span className="text-[10px] tracking-widest uppercase font-bold text-black/50 dark:text-white/50">Menu</span>
                <button
                  onClick={closeMenu}
                  className="p-2 -mr-2 bg-black/5 dark:bg-white/10 rounded-full text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col flex-1 overflow-y-auto pt-2">
                {menuItems.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    onClick={closeMenu}
                    className="px-6 py-5 border-b border-black/5 dark:border-white/5 text-sm tracking-[0.2em] uppercase font-bold text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
