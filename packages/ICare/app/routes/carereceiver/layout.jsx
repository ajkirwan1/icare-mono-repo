import { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router";
import ICareAppNavbar from "~/components/application/app-navbar/icare-app-navbar";
import { careReceiverNavItems } from "~/components/application/app-navbar/nav-items";
import ICareFooter from "~/components/website/pages/shared/footers/icare-footer";
import { getUnreadMessagesCount } from "./dashboard/dashboard-api-client";

function resolveWsUrl() {
    const explicit = String(import.meta.env.VITE_WS_URL || "").trim();
    if (explicit) {
        return explicit;
    }

    const apiBase = String(import.meta.env.VITE_API_URL || "").trim();
    if (apiBase) {
        const base = apiBase.replace(/\/$/, "");
        if (base.startsWith("https://")) {
            return `${base.replace("https://", "wss://")}/ws`;
        }
        if (base.startsWith("http://")) {
            return `${base.replace("http://", "ws://")}/ws`;
        }
    }

    if (typeof window !== "undefined") {
        return `${window.location.origin.replace(/^http/, "ws")}/api/v1/ws`;
    }

    return "";
}

export default function CarereceiverLayout() {
    const location = useLocation();
    const [unreadCount, setUnreadCount] = useState(0);

    const loadUnreadCount = useCallback((signal) => {
        return getUnreadMessagesCount({ signal }).then((result) => {
            setUnreadCount(Number(result.unreadCount || 0));
        });
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        loadUnreadCount(controller.signal).catch(() => {
            // ignore fetch failures, fallback behavior is handled in data client
        });
        return () => {
            controller.abort();
        };
    }, [location.pathname, location.search, loadUnreadCount]);

    useEffect(() => {
        if (typeof window === "undefined") {
            return undefined;
        }

        const handler = () => {
            const controller = new AbortController();
            loadUnreadCount(controller.signal).catch(() => { });
            window.setTimeout(() => controller.abort(), 3000);
        };

        window.addEventListener("carereceiver:messages_state_changed", handler);
        return () => {
            window.removeEventListener("carereceiver:messages_state_changed", handler);
        };
    }, [loadUnreadCount]);

    useEffect(() => {
        const wsUrl = resolveWsUrl();
        if (!wsUrl || typeof window === "undefined") {
            return undefined;
        }

        let socket;
        let reconnectTimer;
        let stopped = false;

        const connect = () => {
            socket = new WebSocket(wsUrl);

            socket.onmessage = (event) => {
                try {
                    const payload = JSON.parse(event.data);
                    const eventName = payload?.event || payload?.type;
                    const detail = payload?.data || {};

                    if (eventName === "new_message") {
                        setUnreadCount((current) => {
                            const explicitTotal = Number(
                                detail?.unreadCountTotal ??
                                detail?.totalUnreadCount ??
                                detail?.unreadCount ??
                                NaN
                            );
                            return Number.isFinite(explicitTotal) ? explicitTotal : current + 1;
                        });
                        window.dispatchEvent(new CustomEvent("carereceiver:new_message", { detail }));
                    }

                    if (eventName === "booking_status_changed") {
                        window.dispatchEvent(new CustomEvent("carereceiver:booking_status_changed", { detail }));
                    }
                } catch {
                    // ignore malformed socket payloads
                }
            };

            socket.onclose = () => {
                if (stopped) {
                    return;
                }
                reconnectTimer = window.setTimeout(connect, 3000);
            };
        };

        connect();

        return () => {
            stopped = true;
            if (reconnectTimer) {
                window.clearTimeout(reconnectTimer);
            }
            if (socket) {
                socket.close();
            }
        };
    }, []);

    const navItems = useMemo(() => {
        return careReceiverNavItems.map((item) => {
            if (item.to !== "/carereceiver/messages") {
                return item;
            }

            return {
                ...item,
                label: unreadCount > 0 ? `Messages (${unreadCount})` : "Messages"
            };
        });
    }, [unreadCount]);

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <ICareAppNavbar navItems={navItems} />
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
            <ICareFooter />
        </div>
    );
}
