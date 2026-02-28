import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration
} from "react-router";

import type { Route } from "./+types/root";
import { buildSeo } from "./utils/seo/seo";
import NotFoundPage from "./routes/not-found";
import AiChat from "./components/website/common/modals/AiChat";
import "./app.css";
import "./styles/main.scss";
import "../../icare-components/src/globals/styles/_globals.scss";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-RKJ82LMFTY";
const HAS_GA_MEASUREMENT_ID = /^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID);

export const meta: Route.MetaFunction = () => {
    const seo = buildSeo({
        title: "Companionship & Home Support Platform",
        description:
            "Find trusted companionship and everyday support at home. ICare connects families and independent carers directly, without agencies or intermediaries."
    });

    return [
        { title: seo.title },
        { name: "description", content: seo.description },
        { property: "og:title", content: seo.title },
        { property: "og:description", content: seo.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: seo.url },
        { property: "og:image", content: seo.image },
        { property: "og:site_name", content: "ICare" }
    ];
};

export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
    },
    {
        rel: "preload",
        href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,600;1,700&family=Poppins:wght@300;400;500;600;700&display=swap",
        as: "style"
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,600;1,700&family=Poppins:wght@300;400;500;600;700&display=swap"
    }
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#B0C47F" />
                <Meta />
                <Links />

                {/* public assets (bez /public w URL) */}
                <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="ICare" />
                <link rel="manifest" href="/site.webmanifest" />

                {HAS_GA_MEASUREMENT_ID ? (
                    <>
                        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
                `.trim()
                            }}
                        />
                    </>
                ) : null}
            </head>

            <body>
                {children}

                <ScrollRestoration />

                <Scripts />

                {/* Cloudflare Web Analytics */}
                {import.meta.env.VITE_CF_BEACON_TOKEN && (
                    <script
                        defer
                        src="https://static.cloudflareinsights.com/beacon.min.js"
                        data-cf-beacon={`{"token":"${import.meta.env.VITE_CF_BEACON_TOKEN}"}`}
                    />
                )}
            </body>
        </html>
    );
}

export default function App() {
    return (
        <>
            <Outlet />
            <AiChat />
        </>
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    if (isRouteErrorResponse(error) && error.status === 404) {
        return <NotFoundPage />;
    }

    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = `Error ${error.status}`;
        details = error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}
