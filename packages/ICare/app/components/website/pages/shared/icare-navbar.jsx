import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router";
import styles from "./icare-navbar.module.scss";

function DropdownPortal({ anchorEl, open, onClose, navDropdownAnchor, children }) {
    const menuRef = useRef(null);
    const [pos, setPos] = useState({ top: 0, left: 0 });
    const [animateIn, setAnimateIn] = useState(false);

    useEffect(() => {
        if (!open || !anchorEl) { return; }

        const update = () => {
            const rect = anchorEl.getBoundingClientRect();

            const navRect = navDropdownAnchor.current?.getBoundingClientRect();
            setPos({
                top: navRect?.bottom,
                left: rect.left + rect.width / 2
            });
        };

        update();
        setAnimateIn(false);
        requestAnimationFrame(() => setAnimateIn(true));
        window.addEventListener("scroll", update, true);
        window.addEventListener("resize", update);

        return () => {
            window.removeEventListener("scroll", update, true);
            window.removeEventListener("resize", update);
        };
    }, [open, anchorEl, navDropdownAnchor]);

    useEffect(() => {
        if (!open) { return; }

        const onKey = (e) => e.key === "Escape" && onClose();
        const onDown = (e) => {
            if (
                !menuRef.current?.contains(e.target) &&
                !anchorEl?.contains(e.target)
            ) {
                onClose();
            }
        };

        document.addEventListener("keydown", onKey);
        document.addEventListener("mousedown", onDown);

        return () => {
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("mousedown", onDown);
        };
    }, [open, anchorEl, onClose]);

    if (!open) { return null; }

    return createPortal(
        <div
            ref={menuRef}
            className={`${styles.dropdown} ${animateIn ? styles.dropdownOpen : ""}`}
            style={{
                top: pos.top,
                left: pos.left
                // transform: "translateX(-50%)"
            }}
            role="menu"
        >
            {children}
        </div>,
        document.body
    );
}

export default function ICareAppNavbar() {
    const [open, setOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const mobileMenuRef = useRef(null);
    const dropdownAnchors = useRef({});
    const navDropdownAnchor = useRef({});

    const items = useMemo(
        () => [
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
            { to: "/news-and-articles", label: "News and articles" },
            {
                id: "privacy",
                label: "Privacy",
                children: [
                    { to: "/privacy", label: "Privacy policy" },
                    { to: "/trust-and-safety", label: "Trust and safety" }
                ]
            }
        ],
        []
    );

    useEffect(() => {
        const onDocClick = (e) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        const onHeroHover = (e) => {
            setOpenDropdown(e.detail.active);
        };
        document.addEventListener("mousedown", onDocClick);
        window.addEventListener("hero-hover", onHeroHover);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, []);

    const closeAll = () => {
        setOpen(false);
        setOpenDropdown(null);
    };

    const activeItem = items.find((i) => i.id === openDropdown);
    const anchor = openDropdown ? dropdownAnchors.current[openDropdown] : null;

    return (
        <header className={styles.header} ref={(el) => (navDropdownAnchor.current = el)}>
            <NavLink to="/" className={styles.brand} onClick={closeAll}>
                <img src="/images/logo/icarehub-w.svg" alt="ICare" />
                <span style={{ fontWeight: 600 }}>Care made human</span>
            </NavLink>

            <nav className={styles.desktopNav}>
                {items.map((item) =>
                    !item.children ? (
                        <NavLink key={item.to} to={item.to} className={styles.link} onPointerEnter={() => setOpenDropdown(null)}>
                            {item.label}
                        </NavLink>
                    ) : (
                        <button
                            key={item.id}
                            ref={(el) => (dropdownAnchors.current[item.id] = el)}
                            className={styles.dropdownBtn}
                            aria-expanded={openDropdown === item.id}
                            onPointerOver={() =>
                                setOpenDropdown(openDropdown === item.id ? null : item.id)
                            }
                        >
                            {item.label}
                        </button>
                    )
                )}
            </nav>

            {activeItem && (
                <DropdownPortal
                    open
                    anchorEl={anchor}
                    navDropdownAnchor={navDropdownAnchor}
                    onClose={() => setOpenDropdown(null)}
                >
                    {activeItem.children.map((c, idx) => (
                        <NavLink
                            key={c.to}
                            to={c.to}
                            className={styles.dropdownLink}
                            style={{ "--i": idx }}
                            onClick={() => setOpenDropdown(null)}
                        >
                            {c.label}
                        </NavLink>
                    ))}
                </DropdownPortal>
            )}

            <button
                className={styles.mobileToggle}
                onClick={() => setOpen((v) => !v)}
            >
                ☰
            </button>

            {/* {open && (
        <div ref={mobileMenuRef} className={styles.mobileMenu}>
          {items.map((item) =>
            !item.children ? (
              <NavLink key={item.to} to={item.to} className={styles.link} onClick={closeAll}>
                {item.label}
              </NavLink>
            ) : (
              <div key={item.id} className={styles.mobileGroup}>
                <button
                  className={styles.dropdownBtn}
                  onClick={() =>
                    setOpenDropdown(openDropdown === item.id ? null : item.id)
                  }
                >
                  {item.label}
                  <span aria-hidden>▾</span>
                </button>
                {openDropdown === item.id && (
                  <div className={styles.mobileSub}>
                    {item.children.map((c) => (
                      <NavLink
                        key={c.to}
                        to={c.to}
                        className={styles.link}
                        onClick={closeAll}
                      >
                        {c.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      )} */}
        </header>
    );
}
