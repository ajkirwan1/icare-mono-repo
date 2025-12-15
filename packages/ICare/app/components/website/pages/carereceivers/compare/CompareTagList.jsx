import React from "react";
import CompareTag from "./CompareTag";

export default function CompareTagList({ tags }) {
    return (
        <ul
            style={{
                listStyle: "none",
                padding: 0,
                margin: "0 auto 40px",
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                justifyContent: "center",
                maxWidth: 820,
            }}
        >
            {tags.map((t) => (
                <CompareTag key={t} label={t} />
            ))}
        </ul>
    );
}
