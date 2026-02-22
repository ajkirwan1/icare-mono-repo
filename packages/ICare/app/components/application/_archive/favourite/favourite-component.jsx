import { useState } from "react";
import styles from "../../styles/components/favourite/favourite-component.module.scss";

export default function FavouriteComponent() {
  const [isFavourited, setIsFavourited] = useState(false);
  const toggleFavourite = () => setIsFavourited(v => !v);
  return (
    <div>
      <button type="button" onClick={toggleFavourite} className={styles.favButton} aria-label={isFavourited ? "Remove from favourites" : "Add to favourites"} aria-pressed={isFavourited}>
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill={isFavourited ? "#619482" : "none"} stroke="#619482" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" /></svg>
      </button>
    </div>
  );
}
