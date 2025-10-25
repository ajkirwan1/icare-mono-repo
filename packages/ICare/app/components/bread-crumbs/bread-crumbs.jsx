import { useLocation, NavLink } from "react-router";
import { breadcrumbMap } from "../../data/breadcrump-map";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  // Detect numeric or UUID-like segments
  const idRegex = /^(\d+|[a-f0-9-]{8,})$/i;
  let finalPath = "";
  const crumbs = [];

  for (let i = 0; i < pathnames.length; i++) {
    const segment = pathnames[i];
    finalPath += "/" + segment;

    // Determine if this segment looks like an ID
    let lookupPath = finalPath;
    if (idRegex.test(segment)) {
      // Find which pattern matches our base (contacts / caregivers / appointments)
      const base = finalPath.split("/").slice(0, -1).join("/");
      const dynamicMatch = Object.keys(breadcrumbMap).find((key) =>
        key.startsWith(base + "/:")
      );

      if (dynamicMatch) {
        lookupPath = dynamicMatch;
      }
    }

    const label = breadcrumbMap[lookupPath];
    if (label) {
      crumbs.push({ label, path: finalPath });
    }
  }

  if (crumbs.length === 0) { return null; }

  return (
    <nav aria-label="breadcrumb" style={{ margin: "1rem 0" }}>
      <ul
        className="breadcrumb"
        style={{
          listStyleType: "none",
          padding: 0,
          display: "flex",
          flexWrap: "wrap",
          fontSize: "0.9rem",
          color: "#555"
        }}
      >
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li
              key={crumb.path}
              className={`breadcrumb-item ${isLast ? "active" : ""}`}
              style={{ display: "flex", alignItems: "center" }}
              aria-current={isLast ? "page" : undefined}
            >
              {isLast ? (
                <span>{crumb.label}</span>
              ) : (
                <>
                  <NavLink
                    to={crumb.path}
                    style={{
                      textDecoration: "none",
                      color: "#0d6efd",
                      marginRight: 4
                    }}
                  >
                    {crumb.label}
                  </NavLink>
                  <span style={{ margin: "0 6px", color: "#999" }}>/</span>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
