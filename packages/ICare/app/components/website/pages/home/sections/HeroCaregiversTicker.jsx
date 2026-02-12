import styles from "./HeroCaregiversTicker.module.scss";

const people = [
    { n: "Ann", age: 34, city: "Amsterdam", joined: "Jan 2026", imgId: "d2KfqHOZsCE" },
    { n: "Valerie", age: 41, city: "Berlin", joined: "Jan 2026", imgId: "eXYuC9k6P_c" },
    { n: "Margaret", age: 29, city: "Lisbon", joined: "Feb 2026", imgId: "v7Jja2ChN6s" },
    { n: "Paulina", age: 48, city: "Vienna", joined: "Feb 2026", imgId: "Xmy_E8diY4w" },
    { n: "Elena", age: 37, city: "Barcelona", joined: "Jan 2026", imgId: "c_GmwfHBDzk" },
    { n: "Marta", age: 45, city: "Prague", joined: "Feb 2026", imgId: "iFgRcqHznqg" },
];

export default function ICareNewCaregiversTickerSection() {
    const base = [...people, ...people, ...people, ...people];

    return (
        <section className={styles.section} aria-label="New people on ICare">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>New people on ICare</h2>
                    <p className={styles.lead}>People are joining ICare and setting up their profiles.</p>
                </div>

                <div className={styles.rail}>
                    <div className={styles.marqueeTrack}>
                        <ul className={styles.list}>
                            {base.map((x, i) => (
                                <li key={`a-${i}`} className={styles.card}>
                                    <img
                                        src={`https://source.unsplash.com/${x.imgId}/140x140`}
                                        alt={`Photo of ${x.n}`}
                                        className={styles.avatar}
                                    />
                                    <div className={styles.info}>
                                        <strong className={styles.name}>{x.n}</strong>
                                        <div className={styles.joined}>
                                            Joined {x.joined}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
