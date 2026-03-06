"use client"

import { useIdleTimer } from "react-idle-timer"
import { logout } from "@/app/(auth)/actions"

// Auto logout after 15 minutes of inactivity (change timeout value as needed)
const IDLE_TIMEOUT = 15 * 60 * 1000 // 15 minutes in milliseconds

export function useIdleLogout() {
    const onIdle = async () => {
        console.log("User is idle — logging out automatically...")
        await logout()
    }

    useIdleTimer({
        timeout: IDLE_TIMEOUT,
        onIdle,
        // Debounce to avoid rapid fire events
        debounce: 500,
        // Events that reset the timer (mouse move, key press, scroll, click, etc.)
        events: [
            "mousemove",
            "keydown",
            "wheel",
            "DOMMouseScroll",
            "mousewheel",
            "mousedown",
            "touchstart",
            "touchmove",
            "MSPointerDown",
            "MSPointerMove",
            "visibilitychange",
            "focus",
        ],
        // Start monitoring immediately
        startOnMount: true,
        // Cross-tab support — if user is active in another tab, don't logout
        crossTab: true,
    })
}
