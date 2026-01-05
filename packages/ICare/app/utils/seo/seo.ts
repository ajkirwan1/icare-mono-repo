const siteUrl = import.meta.env.VITE_SITE_URL;
const siteName = import.meta.env.VITE_SITE_NAME;

export function buildSeo({
  title,
  description,
  imagePath = "/images/og/default.jpg"
}: {
  title: string;
  description: string;
  imagePath?: string;
}) {
  const fullTitle = `${siteName} | ${title}`;

  return {
    title: fullTitle,
    description,
    url: siteUrl,
    image: `${siteUrl}${imagePath}`
  };
}
