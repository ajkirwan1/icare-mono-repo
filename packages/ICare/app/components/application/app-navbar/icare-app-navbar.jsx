import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router";
import styles from "./icare-app-navbar.module.scss";

/* ----------------------------- Mobile menu portal -------------------------- */

function MobileMenuPortal({ open, onClose, items, mountElRef }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // body class (scroll lock)
  useEffect(() => {
    if (!mounted) { return; }
    const body = document.body;
    const html = document.documentElement;

    const clearFixedLock = () => {
      const saved = body.dataset.icareScrollY;
      if (!saved) { return; }          // nothing to restore

      const scrollY = parseInt(saved, 10);
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      delete body.dataset.icareScrollY;

      window.scrollTo(0, scrollY);
    };

    body.classList.toggle("icare-mobile-open", open);
    html.classList.toggle("icare-mobile-open", open);

    if (open) {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      body.dataset.icareScrollY = String(scrollY);
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
    } else {
      clearFixedLock();
    }

    return () => {
      body.classList.remove("icare-mobile-open");
      html.classList.remove("icare-mobile-open");
      clearFixedLock();
    };
  }, [open, mounted]);

  // ESC closes
  useEffect(() => {
    if (!open || !mounted) { return; }
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, mounted]);

  if (!mounted || typeof document === "undefined") { return null; }

  const mountEl = mountElRef?.current;
  if (!mountEl || !open) { return null; }

  return createPortal(
    <div
      className={`${styles.mobileOverlay} ${styles.mobileOverlayOpen}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) { onClose(); }
      }}
    >
      <div
        className={`${styles.mobilePanel} ${styles.mobilePanelOpen}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {items.map((item) =>
            !item.children ? (
              <NavLink
                key={item.to}
                to={item.to}
                className={styles.mobileLink}
                onClick={onClose}
              >
                {item.label}
              </NavLink>
            ) : (
              <div key={item.id} className={styles.mobileGroup}>
                <div className={styles.mobileGroupTitle}>{item.label}</div>
                <div className={styles.mobileSub}>
                  {item.children.map((c) => (
                    <NavLink
                      key={c.to}
                      to={c.to}
                      className={styles.mobileSublink}
                      onClick={onClose}
                    >
                      {c.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            )
          )}
        </nav>
      </div>
    </div>,
    mountEl
  );
}

/* ---------------------------------- Navbar -------------------------------- */

const CLOSE_DELAY = 120; // ms grace period when moving between trigger and menu

const DEFAULT_ITEMS = [
  {
    id: "icare",
    label: "ICare",
    children: [
      { to: "/icare-for-caregivers", label: "For caregivers" },
      { to: "/icare-for-carereceivers", label: "For care receivers" }
    ]
  },
  { to: "/how-it-works", label: "How it works" },
  { to: "/who-we-are", label: "Who we are" },
  { to: "/care-knowledge", label: "Care guidance" },
  { to: "/trust-and-safety", label: "Trust and safety" },
  { to: "/login", label: "Login" }
];

export default function ICareAppNavbar({ navItems, noShadow = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const closeTimer = useRef(null);

  const navDropdownAnchor = useRef(null);
  const mobileHostRef = useRef(null);

  const items = useMemo(() => navItems ?? DEFAULT_ITEMS, [navItems]);

  // --- hover helpers (shared timer so trigger <-> menu travel is seamless) ---
  const openMenu = useCallback((id) => {
    clearTimeout(closeTimer.current);
    setOpenDropdown(id);
  }, []);

  const scheduleClose = useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), CLOSE_DELAY);
  }, []);

  const cancelClose = useCallback(() => {
    clearTimeout(closeTimer.current);
  }, []);

  // cleanup timer on unmount
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const closeAll = useCallback(() => {
    clearTimeout(closeTimer.current);
    setMobileOpen(false);
    setOpenDropdown(null);
  }, []);

  // hero hover hook — expects e.detail.id (e.g. "icare") or null
  useEffect(() => {
    const onHeroHover = (e) => {
      const id = e.detail?.id ?? e.detail?.active;
      if (id && typeof id === "string") {
        openMenu(id);
      } else {
        scheduleClose();
      }
    };
    window.addEventListener("hero-hover", onHeroHover);
    return () => window.removeEventListener("hero-hover", onHeroHover);
  }, [openMenu, scheduleClose]);

  // ESC closes dropdown on desktop
  useEffect(() => {
    if (!openDropdown) { return; }
    const onKey = (e) => {
      if (e.key === "Escape") { setOpenDropdown(null); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openDropdown]);

  const activeItem = items.find((i) => i.id === openDropdown);

  return (
    <>
      <header
        className={`${styles.header} ${noShadow ? styles.headerNoShadow : ""}`}
        ref={navDropdownAnchor}
      >
        <NavLink to="/" className={styles.brand} onClick={closeAll}>
          <img className={styles.logoNormal} src="/images/logo/icarelogo20.svg" alt="ICare" width={121} height={48} />
          <img className={styles.logoBlack} src="/images/logo/icareblack.svg" alt="ICare" width={121} height={48} />
          <span className={styles.brandTagline}>Care made human</span>
        </NavLink>

        <nav className={styles.desktopNav}>
          {items.map((item) =>
            !item.children ? (
              <NavLink
                key={item.to}
                to={item.to}
                className={styles.link}
                onPointerEnter={() => setOpenDropdown(null)}
              >
                {item.label}
              </NavLink>
            ) : (
              <div
                key={item.id}
                className={styles.dropdownWrapper}
                onPointerEnter={() => openMenu(item.id)}
                onPointerLeave={scheduleClose}
              >
                <button
                  className={styles.dropdownBtn}
                  aria-expanded={openDropdown === item.id}
                  aria-haspopup="true"
                  type="button"
                  onClick={() =>
                    setOpenDropdown((prev) =>
                      prev === item.id ? null : item.id
                    )
                  }
                >
                  {item.label}
                </button>

                {openDropdown === item.id && activeItem && (
                  <div
                    className={`${styles.dropdown} ${styles.dropdownOpen}`}
                    role="menu"
                    onPointerEnter={cancelClose}
                    onPointerLeave={scheduleClose}
                  >
                    {activeItem.children.map((c, idx) => (
                      <NavLink
                        key={c.to}
                        to={c.to}
                        className={styles.dropdownLink}
                        role="menuitem"
                        style={{ "--i": idx }}
                        onClick={() => setOpenDropdown(null)}
                      >
                        {c.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </nav>

        {/* HAMBURGER */}
        <button
          type="button"
          className={`${styles.mobileToggle} ${mobileOpen ? styles.mobileToggleOpen : ""}`}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className={styles.burger} aria-hidden="true">
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </span>
        </button>
      </header>

      <div ref={mobileHostRef} className={styles.mobileHost} />

      <MobileMenuPortal
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={items}
        mountElRef={mobileHostRef}
      />
    </>
  );
}
