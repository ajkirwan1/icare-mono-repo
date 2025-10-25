import { IcareSection, IcareCard } from "react-library";
import { useState, useEffect } from "react";
import { useMatches, useLoaderData, NavLink } from "react-router";
import { json } from "@remix-run/node";
import PillComponent from "../../components/pill/pill-component";
import styles from "../../styles/pages/single-caregiver.module.scss";


export function meta() {
  return [
    { title: "ICare | Home" },
    { name: "description", content: "ICare – Supporting better care through intuitive tools." }
  ];
}
// export const handle = {
//   breadcrumb: "Home"
// };


export async function loader({ params }) {
  console.log(params, "paramssssssssssssssssssssssss");
  const id = params.caregiverId;
  if (!id) {
    throw new Response("Caregiver id missing", { status: 400 });
  }

  const res = await fetch("http://localhost:4000/caregivers");
  if (!res.ok) {
    throw new Response("Failed to load caregivers", { status: res.status });
  }

  const caregivers = await res.json();
  const caregiver = caregivers.find(c => String(c.id) === id);

  if (!caregiver) {
    throw new Response("Caregiver not found", { status: 404 });
  }

  return json(caregiver);
}

export default function CaregiverRecipientHome() {
  const caregiver = useLoaderData();

  const [isFavourited, setIsFavourited] = useState(false);
  const toggleFavourite = () => setIsFavourited(v => !v);

  useEffect(() => {
    console.log("Component mounted");
    return () => console.log("Component unmounted");
  }, []);


  return (
    <>
      <IcareSection>
        <IcareCard variant="elevated">
          <span slot="contents">
            <h1>Caregiver Profile</h1>
            <div className={styles.root}>
              <div className={styles.headerRow}>
                <figure className={styles.avatar}>
                  <img src={`/${caregiver.imgSrc}`} alt="Heart Icon" />
                </figure>
                <div style={{ flex: "1", minWidth: "0" }}>
                  <article className={styles.infoArticle}>
                    <div className={styles.infoBar}>
                      <h2 className={styles.noMargin}>Personal infromation</h2>
                      <p className={styles.rating}>
                        <strong>Average rating:</strong> <span>{caregiver.averageRating}</span>
                      </p>
                      <button type="button" onClick={toggleFavourite} className={styles.favButton} aria-label={isFavourited ? "Remove from favourites" : "Add to favourites"} aria-pressed={isFavourited}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill={isFavourited ? "#619482" : "none"} stroke="#619482" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" /></svg>
                      </button>
                    </div>
                    <div className={styles.inlineMetaRow}>
                      <p className={styles.noMargin}>
                        <strong>Name:</strong> <span>{caregiver.name}</span>
                      </p>
                      <p className={styles.noMargin}>
                        <strong>Age:</strong> <span>{caregiver.age}</span>
                      </p>
                      <p className={styles.noMargin}>
                        <strong>Location:</strong> <span>{caregiver.location}</span>
                      </p>
                    </div>
                  </article>
                  <article>
                    <h2>Languages:</h2>
                    <ul className={styles.languagesList}>
                      {caregiver.languages.map((languageObj, index) => (
                        <li key={index}>
                          <div className={styles.languageLine}>
                            <h3 className={styles.noMargin}>{languageObj.language}</h3>
                            <p className={styles.noMargin}>
                              <strong>Speaking:</strong> {languageObj.speaking}
                            </p>
                            <p className={styles.noMargin}>
                              <strong>Reading:</strong> {languageObj.reading}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </article>
                  <article>
                    <h2>Expertise:</h2>
                    <ul className={styles.pillList}>
                      {caregiver.expertise.map((item, index) => (
                        <li key={index}>
                          <PillComponent>{item}</PillComponent>
                        </li>
                      ))}
                    </ul>
                  </article>
                  <article>
                    <h2>Specialist Skills:</h2>
                    <ul className={styles.pillList}>
                      {caregiver.specialties.map((item, index) => (
                        <li key={index}>
                          <PillComponent>{item}</PillComponent>
                        </li>
                      ))}
                    </ul>
                  </article>
                  <article>
                    <h2>Key Skills:</h2>
                    <ul className={styles.pillList}>
                      {caregiver.keySkills.map((item, index) => (
                        <li key={index}>
                          <PillComponent>{item}</PillComponent>
                        </li>
                      ))}
                    </ul>
                  </article>
                  <article>
                    <h2>Certifcations:</h2>
                    <ul className={styles.pillList}>
                      {caregiver.keySkills.map((item, index) => (
                        <li key={index}>
                          <PillComponent>{item}</PillComponent>
                        </li>
                      ))}
                    </ul>
                  </article>
                  <div className={styles.aboutSection}>
                    <h2>About me:</h2>
                    <p>{caregiver.bio}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.cardFooter}>
              <ul>
                <li>
                  <NavLink to={"messages"}>Contact : {caregiver.name}</NavLink>
                </li>
                <li>
                  <NavLink to={"resume"}>View resume : {caregiver.name}</NavLink>
                </li>
              </ul>
            </div>
          </span>
        </IcareCard>
      </IcareSection>
    </>
  );
}
