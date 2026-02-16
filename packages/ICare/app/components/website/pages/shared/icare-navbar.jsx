import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router";
import styles from "./icare-navbar.module.scss";

/* ----------------------------- Desktop dropdown ---------------------------- */

function DropdownPortal({ anchorEl, open, onClose, navDropdownAnchor, children }) {
    const menuRef = useRef(null);
    const [pos, setPos] = useState({ top: 0, left: 0 });
    const [animateIn, setAnimateIn] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!open || !anchorEl) return;

        const update = () => {
            const rect = anchorEl.getBoundingClientRect();
            const navRect = navDropdownAnchor.current?.getBoundingClientRect();

            setPos({
                top: navRect?.bottom ?? 0,
                left: rect.left + rect.width / 2,
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
        if (!open) return;

        const onKey = (e) => e.key === "Escape" && onClose();
        const onDown = (e) => {
            if (!menuRef.current?.contains(e.target) && !anchorEl?.contains(e.target)) {
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

    if (!open || !mounted || typeof document === "undefined") return null;

    return createPortal(
        <div
            ref={menuRef}
            className={`${styles.dropdown} ${animateIn ? styles.dropdownOpen : ""}`}
            style={{ top: pos.top, left: pos.left }}
            role="menu"
        >
            {children}
        </div>,
        document.body
    );
}

/* ----------------------------- Mobile menu portal -------------------------- */

function MobileMenuPortal({ open, onClose, items, mountElRef }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    // body class (scroll lock etc.)
    useEffect(() => {
        if (!mounted) return;
        document.body.classList.toggle("icare-mobile-open", open);
        return () => document.body.classList.remove("icare-mobile-open");
    }, [open, mounted]);

    // ESC closes
    useEffect(() => {
        if (!open || !mounted) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose, mounted]);

    if (!mounted || typeof document === "undefined") return null;

    // ✅ Portal target = host right under the header (NOT body)
    const mountEl = mountElRef?.current;
    if (!mountEl) return null;

    // ✅ keep in DOM always (for opacity transition)
    return createPortal(
        <div
            className={`${styles.mobileOverlay} ${open ? styles.mobileOverlayOpen : ""}`}
            onMouseDown={(e) => {
                // close only when clicking overlay, not panel
                if (e.target === e.currentTarget) onClose();
            }}
            aria-hidden={!open}
        >
            <div
                className={`${styles.mobilePanel} ${open ? styles.mobilePanelOpen : ""}`}
                role="dialog"
                aria-modal="true"
            >
                <nav className={styles.mobileNav} aria-label="Mobile navigation">
                    {items.map((item) =>
                        !item.children ? (
                            <NavLink key={item.to} to={item.to} className={styles.mobileLink} onClick={onClose}>
                                {item.label}
                            </NavLink>
                        ) : (
                            <div key={item.id} className={styles.mobileGroup}>
                                <div className={styles.mobileGroupTitle}>{item.label}</div>

                                {/* submenu always open */}
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

export default function ICareAppNavbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    const dropdownAnchors = useRef({});
    const navDropdownAnchor = useRef(null);

    // ✅ host where mobile portal mounts (right under header)
    const mobileHostRef = useRef(null);

    const items = useMemo(
        () => [
            {
                id: "icare",
                label: "ICare",
                children: [
                    { to: "/icare-for-caregivers", label: "For caregivers" },
                    { to: "/icare-for-carereceivers", label: "For care receivers" },
                ],
            },
            { to: "/how-it-works", label: "How it works" },
            { to: "/who-we-are", label: "Who we are" },
            { to: "/care-knowledge", label: "Care guidance" },
            { to: "/trust-and-safety", label: "Trust and safety" },
        ],
        []
    );

    const closeAll = () => {
        setMobileOpen(false);
        setOpenDropdown(null);
    };

    // hero hover hook
    useEffect(() => {
        const onHeroHover = (e) => setOpenDropdown(e.detail.active);
        window.addEventListener("hero-hover", onHeroHover);
        return () => window.removeEventListener("hero-hover", onHeroHover);
    }, []);

    const activeItem = items.find((i) => i.id === openDropdown);
    const anchor = openDropdown ? dropdownAnchors.current[openDropdown] : null;

    return (
        <>
            <header className={styles.header} ref={navDropdownAnchor}>
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
                            <button
                                key={item.id}
                                ref={(el) => (dropdownAnchors.current[item.id] = el)}
                                className={styles.dropdownBtn}
                                aria-expanded={openDropdown === item.id}
                                onPointerOver={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
                                type="button"
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

            {/* ✅ Mobile menu mounts HERE (still portal, but under header in DOM) */}
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
