// components/overlays/contactBus.ts
"use client";

import { useEffect } from "react";

export const CONTACT_OPEN_EVENT = "contact:open";
export const CONTACT_CLOSE_EVENT = "contact:close";

/** Programmatically open the Contact drawer */
export function openContactDrawer() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONTACT_OPEN_EVENT));
}

/** Programmatically close the Contact drawer */
export function closeContactDrawer() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONTACT_CLOSE_EVENT));
}

/** React hook: subscribe to open/close events */
export function useContactEvents(setOpen: (v: boolean) => void) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    window.addEventListener(CONTACT_OPEN_EVENT, onOpen as EventListener);
    window.addEventListener(CONTACT_CLOSE_EVENT, onClose as EventListener);

    return () => {
      window.removeEventListener(CONTACT_OPEN_EVENT, onOpen as EventListener);
      window.removeEventListener(CONTACT_CLOSE_EVENT, onClose as EventListener);
    };
  }, [setOpen]);
}