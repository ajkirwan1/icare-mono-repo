/* global process */

function getPublicApiBaseUrl(req) {
    const envBase = process.env.PUBLIC_API_URL;
    if (envBase) { return envBase.replace(/\/$/, ""); }

    return `${req.protocol}://${req.get("host")}`;
}

function safeRedirect(res, path) {
    const site = (process.env.PUBLIC_SITE_URL || "").replace(/\/$/, "");
    if (site) { return res.redirect(`${site}${path}`); }
    return res.redirect(path);
}

export {
    getPublicApiBaseUrl,
    safeRedirect
};
