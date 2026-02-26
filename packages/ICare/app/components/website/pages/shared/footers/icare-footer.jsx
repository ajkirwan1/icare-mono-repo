import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faFacebook,
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import styles from "./icare-footer.module.scss";

export default function ICareFooter() {
  const year = new Date().getFullYear();
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const shareMenuRef = useRef(null);

  const COMPANY = {
    brand: "ICare",
    socials: {
      linkedin: "https://www.linkedin.com/company/icare-platform/?viewAsMember=true",
      facebook: "https://www.facebook.com/profile.php?id=61587936540417"
    }
  };

  const LOGO_SRC = "/images/logo/icareblack.svg";

  const iconStyle = {
    fontSize: "0.9em",
    lineHeight: 1
  };

  const getShareData = () => ({
    title: "ICare",
    text: "A transparent way to arrange home care - without agency markups.",
    url: typeof window !== "undefined" ? window.location.href : ""
  });

  const copyUrlWithFallback = async (url) => {
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
      return true;
    }

    const tempInput = document.createElement("textarea");
    tempInput.value = url;
    tempInput.setAttribute("readonly", "");
    tempInput.style.position = "fixed";
    tempInput.style.left = "-9999px";
    document.body.appendChild(tempInput);
    tempInput.select();

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }

    document.body.removeChild(tempInput);
    return copied;
  };

  const handleShare = async () => {
    const shareData = getShareData();
    if (!shareData.url) return;

    setShareCopied(false);

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err?.name === "AbortError") return;
        try {
          await navigator.share({ title: shareData.title, url: shareData.url });
          return;
        } catch (retryErr) {
          if (retryErr?.name === "AbortError") return;
        }
      }
    }

    setShareMenuOpen(true);
  };

  const handleCopyLink = async () => {
    const shareData = getShareData();
    if (!shareData.url) return;

    try {
      const copied = await copyUrlWithFallback(shareData.url);
      setShareCopied(copied);
      if (copied) {
        window.setTimeout(() => setShareCopied(false), 1600);
      }
    } catch {
      setShareCopied(false);
    }
  };

  const shareData = getShareData();
  const shareMessage = `${shareData.title} - ${shareData.url}`;
  const facebookShareHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
  const whatsappShareHref = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
  const emailShareHref = `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(shareMessage)}`;

  useEffect(() => {
    if (!shareMenuOpen) return;

    const handlePointerDown = (event) => {
      if (!shareMenuRef.current?.contains(event.target)) {
        setShareMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShareMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [shareMenuOpen]);

  return (
    <footer aria-label="Site footer" className={styles.footer}>
      <div className={styles.inner}>
        {/* TOP GRID */}
        <div className={styles.topGrid}>
          {/* BRAND */}
          <div className={`${styles.col} ${styles.brandSectionCol}`}>
            <NavLink to="/" aria-label="ICare home" className={styles.brandLink}>
              <img
                src={LOGO_SRC}
                alt="ICare"
                width="89"
                height="35"
                className={styles.logo}
              />
              <span className={styles.slogan}>Care made human</span>
            </NavLink>

            <p className={styles.tagline}>
              Helping families find trusted, independent caregivers without agency pressure or markups.
            </p>

            {/* SOCIAL ICONS + SHARE */}
            <div className={styles.socials}>
              <a
                href={COMPANY.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ICare on LinkedIn"
                className={styles.socialLink}
              >
                <FontAwesomeIcon icon={faLinkedin} style={iconStyle} />
              </a>

              <a
                href={COMPANY.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ICare on Facebook"
                className={styles.socialLink}
              >
                <FontAwesomeIcon icon={faFacebook} style={iconStyle} />
              </a>

              <div ref={shareMenuRef} className={styles.shareMenuWrap}>
                <button
                  type="button"
                  onClick={() => {
                    if (shareMenuOpen) {
                      setShareMenuOpen(false);
                      return;
                    }
                    handleShare();
                  }}
                  aria-label="Share ICare"
                  aria-expanded={shareMenuOpen}
                  aria-haspopup="menu"
                  className={styles.socialLink}
                >
                  <FontAwesomeIcon icon={faShareNodes} style={iconStyle} />
                </button>

                {shareMenuOpen && (
                  <div className={styles.shareMenu} role="menu" aria-label="Share options">
                    <a
                      href={facebookShareHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.shareMenuItem}
                      onClick={() => setShareMenuOpen(false)}
                    >
                      Facebook
                    </a>
                    <a
                      href={whatsappShareHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.shareMenuItem}
                      onClick={() => setShareMenuOpen(false)}
                    >
                      WhatsApp
                    </a>
                    <a
                      href={emailShareHref}
                      className={styles.shareMenuItem}
                      onClick={() => setShareMenuOpen(false)}
                    >
                      Email
                    </a>
                    <button
                      type="button"
                      className={styles.shareMenuButton}
                      onClick={handleCopyLink}
                    >
                      {shareCopied ? "Copied" : "Copy link"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* BUSINESS DETAILS */}
          <div className={`${styles.col} ${styles.legalSectionCol}`}>
            <div className={styles.heading}>Legal information</div>

            <div className={styles.detailsGrid}>
              <div className={styles.valueMuted}>
                ICare is not a care agency.
                <br />
                Operated in the United Kingdom.
              </div>

              <a
                href="https://wa.me/447448016876?text=Hi%2C%20I%27m%20Kate%20from%20ICare.%0A%0AThanks%20for%20getting%20in%20touch%20-%20feel%20free%20to%20message%20me%20with%20any%20questions.%0AI%27ll%20reply%20as%20soon%20as%20I%20can%20%3A%29"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Write to us on Whatsapp"
                className={styles.whatsappCta}
              >
                <span className={styles.whatsappLink}>
                  <FontAwesomeIcon icon={faWhatsapp} />
                </span>
                <span className={styles.supportBubble}>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* LINKS */}
          <div className={`${styles.col} ${styles.linksSectionCol}`}>
            <nav aria-label="Footer links" className={styles.links}>
              <div className={styles.linksCol}>
                <NavLink to="/" className={styles.navLink}>Home</NavLink>
                <NavLink to="/who-we-are" className={styles.navLink}>Who we are</NavLink>
                <NavLink to="/trust-and-safety" className={styles.navLink}>Trust & safety</NavLink>
                <NavLink to="/frequently-asked-questions" className={`${styles.navLink} ${styles.faqLink}`}>FAQ</NavLink>
              </div>

              <div className={styles.linksCol}>
                <NavLink to="/how-it-works" className={styles.navLink}>How it works</NavLink>
                <NavLink to="/care-knowledge" className={styles.navLink}>Care guidance</NavLink>
                <NavLink to="/contact-us" className={styles.navLink}>Contact us</NavLink>
              </div>
            </nav>
          </div>
        </div>

        {/* DIVIDER */}
        <div className={styles.divider} />

        {/* BOTTOM BAR: legal left / copyright right */}
        <div className={styles.bottomBar}>
          <div className={styles.legalLinks} aria-label="Legal links">
            <NavLink to="/safety-commitment">Safety commitment</NavLink>
            <NavLink to="/privacy">Privacy</NavLink>
          </div>

          <div className={styles.copyright}>
            © {year} {COMPANY.brand}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
