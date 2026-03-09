const siteUrl = (import.meta.env.VITE_SITE_URL || "https://icare-app.co.uk").replace(/\/$/, "");
const siteName = import.meta.env.VITE_SITE_NAME || "ICare";

export function buildSeo({
    title,
    description,
    imagePath = "/images/og/default.jpg",
    path = "/"
}: {
    title: string;
    description: string;
    imagePath?: string;
    path?: string;
}) {
    const fullTitle = `${title} | ${siteName}`;
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    return {
        title: fullTitle,
        description,
        url: `${siteUrl}${normalizedPath}`,
        image: `${siteUrl}${imagePath}`
    };
}
