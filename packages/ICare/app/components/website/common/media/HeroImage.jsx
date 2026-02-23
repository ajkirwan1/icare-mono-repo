import { useEffect, useMemo, useRef, useState } from "react";

const MOBILE_HERO_WIDTH = 1200;

export default function HeroImage({
  src,
  mobileSrc,
  width,
  height,
  alt = "",
  className,
  role,
  loading = "eager",
  fetchPriority = "high",
}) {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, [src, mobileSrc]);

  const srcSet = useMemo(() => {
    if (!mobileSrc || !width) return undefined;
    return `${mobileSrc} ${MOBILE_HERO_WIDTH}w, ${src} ${width}w`;
  }, [mobileSrc, src, width]);

  return (
    <img
      ref={imgRef}
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? "(max-width: 600px) 100vw, 100vw" : undefined}
      width={width}
      height={height}
      alt={alt}
      role={role}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setLoaded(true)}
      className={className}
      style={{
        opacity: loaded ? 1 : 0,
        transition: "opacity 320ms ease",
      }}
    />
  );
}
