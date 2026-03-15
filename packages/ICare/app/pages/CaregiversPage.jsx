import { useEffect, useRef, useState } from "react";
import CaregiverCard from "../components/CaregiverCard";
import TrustSection from "../components/TrustSection";
import ICareFooter from "../components/website/pages/shared/footers/icare-footer";
import ICareAppNavbar from "../components/website/pages/shared/icare-navbar";
import styles from "./caregivers-page.module.scss";

export default function CaregiversPage({ caregivers }) {
  const sliderRef = useRef(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const hasMultipleCaregivers = caregivers.length > 1;

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const syncViewport = () => {
      setIsMobileViewport(window.innerWidth <= 920);
    };

    syncViewport();
    window.addEventListener("resize", syncViewport);
    return () => {
      window.removeEventListener("resize", syncViewport);
    };
  }, []);

  useEffect(() => {
    const sliderElement = sliderRef.current;
    if (!sliderElement) {
      return undefined;
    }

    const syncActiveIndex = () => {
      const firstSlide = sliderElement.firstElementChild;
      if (!firstSlide) {
        setActiveIndex(0);
        return;
      }

      const slideWidth = firstSlide.getBoundingClientRect().width;
      if (slideWidth <= 0) {
        return;
      }

      const nextIndex = Math.round(sliderElement.scrollLeft / slideWidth);
      setActiveIndex(Math.max(0, Math.min(caregivers.length - 1, nextIndex)));
    };

    syncActiveIndex();
    sliderElement.addEventListener("scroll", syncActiveIndex, { passive: true });
    window.addEventListener("resize", syncActiveIndex);

    return () => {
      sliderElement.removeEventListener("scroll", syncActiveIndex);
      window.removeEventListener("resize", syncActiveIndex);
    };
  }, [caregivers.length]);

  const scrollToIndex = (index) => {
    const sliderElement = sliderRef.current;
    const nextSlide = sliderElement?.children?.[index];
    if (!sliderElement || !nextSlide) {
      return;
    }

    sliderElement.scrollTo({
      left: nextSlide.offsetLeft,
      behavior: "smooth"
    });
    setActiveIndex(index);
  };

  useEffect(() => {
    if (!hasMultipleCaregivers || !isAutoplayEnabled || !isMobileViewport) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      const nextIndex = (activeIndexRef.current + 1) % caregivers.length;
      scrollToIndex(nextIndex);
    }, 2800);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [caregivers.length, hasMultipleCaregivers, isAutoplayEnabled, isMobileViewport]);

  const handleArrowClick = (direction) => {
    if (!hasMultipleCaregivers) {
      return;
    }

    setIsAutoplayEnabled(false);
    const delta = direction === "next" ? 1 : -1;
    const nextIndex = (activeIndex + delta + caregivers.length) % caregivers.length;
    scrollToIndex(nextIndex);
  };

  return (
    <>
      <ICareAppNavbar />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.copy}>
              <span className={styles.eyebrow}>Find the right fit</span>
              <h1 className={styles.title}>Find a carer who feels right for your family</h1>
            </div>
          </div>
        </section>

        <TrustSection />

        <section className={styles.gridSection}>
          <div className={styles.mobileCarousel}>
            {hasMultipleCaregivers ? (
              <button
                type="button"
                className={`${styles.carouselArrow} ${styles.carouselArrowPrev}`}
                aria-label="Show previous caregiver"
                onClick={() => handleArrowClick("prev")}
              />
            ) : null}

            <div
              ref={sliderRef}
              className={styles.grid}
              onPointerDown={() => setIsAutoplayEnabled(false)}
              onTouchStart={() => setIsAutoplayEnabled(false)}
            >
            {caregivers.map((caregiver) => (
              <CaregiverCard key={caregiver._id} caregiver={caregiver} />
            ))}
            </div>

            {hasMultipleCaregivers ? (
              <button
                type="button"
                className={`${styles.carouselArrow} ${styles.carouselArrowNext}`}
                aria-label="Show next caregiver"
                onClick={() => handleArrowClick("next")}
              />
            ) : null}
          </div>

          {hasMultipleCaregivers ? (
            <div className={styles.carouselDots} aria-label="Caregiver carousel pagination">
              {caregivers.map((caregiver, index) => (
                <button
                  key={caregiver._id}
                  type="button"
                  className={`${styles.carouselDot} ${index === activeIndex ? styles.carouselDotActive : ""}`}
                  aria-label={`Show caregiver ${index + 1}`}
                  aria-pressed={index === activeIndex}
                  onClick={() => {
                    setIsAutoplayEnabled(false);
                    scrollToIndex(index);
                  }}
                />
              ))}
            </div>
          ) : null}
        </section>
      </main>

      <ICareFooter />
    </>
  );
}
